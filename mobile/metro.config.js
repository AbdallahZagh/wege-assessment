const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const sharedRoot = path.resolve(projectRoot, "../shared");

const config = getDefaultConfig(projectRoot);

// Resolve @shared/* without watching the whole shared/assets tree on Windows.
config.watchFolders = [sharedRoot];
config.resolver.unstable_enableSymlinks = true;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("@shared/")) {
    const subpath = moduleName.slice("@shared/".length);
    return context.resolveRequest(context, path.join(sharedRoot, subpath), platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Keep Metro from crawling generated product PNGs under shared/assets.
const sharedAssetsPattern = new RegExp(
  `${sharedRoot.replace(/\\/g, "/")}/assets/.*`,
);
config.resolver.blockList = [...(config.resolver.blockList ?? []), sharedAssetsPattern];

// Fewer workers avoids rare Windows hangs on the last bundle module.
config.maxWorkers = 2;

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
