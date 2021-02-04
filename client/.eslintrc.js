module.exports = {
  extends: [
    '../.eslintrc.js',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      createClass: 'createElement',
      pragma: 'h'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react/no-unknown-property': 'off'
  }
};
