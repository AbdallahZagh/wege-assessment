import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

function getLocalIPv4s(): string[] {
  const nets = os.networkInterfaces();
  const ips: string[] = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        ips.push(net.address);
      }
    }
  }

  return ips;
}

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  // Required when opening the dev server from a phone on the same network.
  // Without this, HTML loads but client JS is blocked and nothing is clickable.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    ...getLocalIPv4s(),
    ...(process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(",").map((value) => value.trim()) ?? []),
  ],
};

export default nextConfig;
