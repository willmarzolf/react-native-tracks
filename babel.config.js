module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV', // Environment variable to specify the .env file (e.g., APP_ENV=staging)
          moduleName: '@env', // Module name to import variables (e.g., import { API_KEY } from '@env')
          path: '.env', // Path to the default .env file
          safe: true, // Set to true to throw errors for undefined variables
          allowUndefined: false, // Set to false to enforce defined variables
          verbose: false, // Set to true for debugging
        },
      ],
    ],
  };
};