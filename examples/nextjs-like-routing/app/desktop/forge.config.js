/* eslint-disable @typescript-eslint/no-require-imports */

const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const { FusesPlugin } = require("@electron-forge/plugin-fuses");

module.exports = {
  packagerConfig: {
    asar: true,
    ignore: (path) => {
      if (path === "/main.js" || path.includes("/dist/")) return false;
      return /^\/(?!dist|package\.json).+|\/node_modules/.test(path);
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
