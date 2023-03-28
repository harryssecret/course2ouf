module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin", 'transform-inline-environment-variables', ["module:react-native-dotenv", {
      "envName": "API_URL", "moduleName": "@env"
    }]],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
