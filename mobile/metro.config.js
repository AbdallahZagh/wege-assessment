const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);
config.watchFolders = [path.resolve(projectRoot, "../shared")];

module.exports = withNativeWind(config, { input: "./global.css" });
