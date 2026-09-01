"""Recolor gray studio templates to exact variant hex from products.ts."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
TEMPLATES = ROOT / "assets" / "templates"
PRODUCTS_DIR = ROOT / "assets" / "products"
WEB_PUBLIC = ROOT.parent / "web" / "public" / "products"
MOBILE_ASSETS = ROOT.parent / "mobile" / "assets" / "products"
MOBILE_IMAGES_TS = ROOT.parent / "mobile" / "src" / "lib" / "images.ts"

# product folder prefix -> template file (without extension)
PRODUCT_TEMPLATE: dict[str, str] = {
    "01-linen-shirt": "shirt",
    "02-wool-coat": "coat",
    "03-crew-knit": "knit",
    "04-trouser": "pants",
    "05-slip-dress": "dress",
    "06-trucker": "jacket",
    "07-cardigan": "cardigan",
    "08-midi-skirt": "midi-skirt",
    "09-turtleneck": "turtleneck",
    "10-trench": "trench",
    "11-chino": "chino",
    "12-blazer": "blazer",
}

WIDTH, HEIGHT = 700, 1200


def hex_to_rgb(hex_code: str) -> tuple[int, int, int]:
    h = hex_code.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def load_products() -> list[dict]:
    text = (ROOT / "products.ts").read_text(encoding="utf-8")
    # Minimal parse: extract colorCode and image paths per variant blocks
    products: list[dict] = []
    product_blocks = re.split(r"\bid:\s*\d+,", text)[1:]
    for block in product_blocks:
        variants: list[dict] = []
        variant_chunks = re.split(r"color:\s*\"([^\"]+)\"", block)[1:]
        for i in range(0, len(variant_chunks), 2):
            color_name = variant_chunks[i]
            rest = variant_chunks[i + 1]
            code_match = re.search(r'colorCode:\s*"([^"]+)"', rest)
            images = re.findall(r'"(\d{2}-[^"]+\.png)"', rest)
            if code_match and images:
                variants.append(
                    {
                        "color": color_name,
                        "colorCode": code_match.group(1),
                        "images": images,
                    }
                )
        if variants:
            products.append({"variants": variants})
    return products


def recolor_template(template: Image.Image, target_rgb: tuple[int, int, int]) -> Image.Image:
    img = template.convert("RGBA").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    px = img.load()
    tr, tg, tb = target_rgb

    for y in range(HEIGHT):
        for x in range(WIDTH):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            # Keep near-white background
            if r > 235 and g > 235 and b > 235:
                continue
            lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
            lum = max(0.12, min(0.95, lum))
            px[x, y] = (
                int(tr * lum),
                int(tg * lum),
                int(tb * lum),
                a,
            )
    return img.convert("RGB")


def image_index(path: str) -> int:
    m = re.search(r"-(\d+)\.png$", path)
    return int(m.group(1)) if m else 1


def main() -> None:
    products = load_products()
    product_ids = [
        "01-linen-shirt",
        "02-wool-coat",
        "03-crew-knit",
        "04-trouser",
        "05-slip-dress",
        "06-trucker",
        "07-cardigan",
        "08-midi-skirt",
        "09-turtleneck",
        "10-trench",
        "11-chino",
        "12-blazer",
    ]

    all_paths: list[str] = []

    for idx, product in enumerate(products):
        if idx >= len(product_ids):
            break
        pid = product_ids[idx]
        template_name = PRODUCT_TEMPLATE.get(pid)
        if not template_name:
            print(f"Skip {pid}: no template mapping")
            continue
        template_path = TEMPLATES / f"{template_name}.png"
        if not template_path.exists():
            print(f"Skip {pid}: missing template {template_path.name}")
            continue

        base = Image.open(template_path)
        for variant in product["variants"]:
            rgb = hex_to_rgb(variant["colorCode"])
            colored = recolor_template(base, rgb)
            for image_path in variant["images"]:
                dest = PRODUCTS_DIR / image_path
                dest.parent.mkdir(parents=True, exist_ok=True)
                # Slight crop/zoom variation per image index
                n = image_index(image_path)
                if n > 1:
                    w, h = colored.size
                    inset = min(40 * (n - 1), 80)
                    cropped = colored.crop((inset, inset, w - inset, h - inset)).resize(
                        (w, h), Image.Resampling.LANCZOS
                    )
                    cropped.save(dest, format="PNG", optimize=True)
                else:
                    colored.save(dest, format="PNG", optimize=True)
                all_paths.append(image_path)
                print(f"Wrote {image_path} -> {variant['color']} {variant['colorCode']}")

    if WEB_PUBLIC.parent.exists():
        WEB_PUBLIC.mkdir(parents=True, exist_ok=True)
        shutil.copytree(PRODUCTS_DIR, WEB_PUBLIC, dirs_exist_ok=True)
    if MOBILE_ASSETS.parent.exists():
        MOBILE_ASSETS.mkdir(parents=True, exist_ok=True)
        shutil.copytree(PRODUCTS_DIR, MOBILE_ASSETS, dirs_exist_ok=True)

    requires = "\n".join(
        f'  "{p}": require("../../assets/products/{p}"),' for p in sorted(set(all_paths))
    )
    MOBILE_IMAGES_TS.parent.mkdir(parents=True, exist_ok=True)
    MOBILE_IMAGES_TS.write_text(
        f"""import type {{ ImageSourcePropType }} from "react-native";

const sources = {{
{requires}
}} as const satisfies Record<string, ImageSourcePropType>;

export function productImageSource(path: string): ImageSourcePropType {{
  const source = sources[path as keyof typeof sources];
  if (!source) {{
    throw new Error(`Missing product image: ${{path}}`);
  }}
  return source;
}}
""",
        encoding="utf-8",
    )
    print(f"Done. {len(set(all_paths))} images.")


if __name__ == "__main__":
    main()
