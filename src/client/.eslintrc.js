module.exports = {
  // Add anything global to root eslintrc.js file
  // Anything specific to react/client can go here
  extends: ['plugin:react/recommended'],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'off', // it's bugged
    'react/jsx-props-no-spreading': [
      'error',
      {
        exceptions: ['Input'],
      },
    ],
  },
};
