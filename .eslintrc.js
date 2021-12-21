module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'settings': {
        'react': {
          'version': 'detect', // React version. 'detect' automatically picks the version you have installed.
                               // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                               // default to latest and warns if missing
                               // It will default to 'detect' in the future
      }
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'react-hooks',
        'import'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'none',
                'ignoreRestSiblings': false
            }
        ],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        // only allow functional components
        'react/prefer-stateless-function': [
            2, { 'ignorePureComponents': false }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                'devDependencies': true
            }
        ],
    }
};
