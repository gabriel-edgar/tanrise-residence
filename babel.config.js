module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin', {disableInlineStylesWarning: true}],
    [
      'module:react-native-dotenv',
      {
        // envName: 'API_URL',
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
  ],
};
