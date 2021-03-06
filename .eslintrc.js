module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    window: true,
    require: true,
  },
  extends: 'eslint-config-airbnb',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/prop-types': 2,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    "react/jsx-no-bind": 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@/*'],
      },
    ],
    'import/extensions': 0,
    'no-console': 0,
    'no-extra-boolean-cast': 0,
    'no-restricted-syntax': 0,
    'no-useless-constructor': 0,
    'no-unused-expressions': 0,
    'linebreak-style': 0,
    "max-depth": 0,
    "max-statements": [2, 50],
    "max-nested-callbacks": [2, 3],
    "camelcase": 2,
    'max-len': 0,
    'no-param-reassign': 0,
    curly: 2,
    'no-return-assign': 0,
    'no-cond-assign': 0,
    "object-curly-newline": 0
  },
};
