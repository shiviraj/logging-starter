module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
  },
  root: true,
  ignorePatterns: ["*.js", "coverage", "lib", "node_modules", "**/*.spec.ts"],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true
  },
  rules: {
    '@typescript-eslint/array-type': ['warn', {default: 'array-simple'}],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    indent: ['warn', 2, {SwitchCase: 1, ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute']}],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    camelcase: 'error',
    'class-methods-use-this': 'warn',
    'array-bracket-spacing': ['error'],
    'comma-spacing': 'error',
    'arrow-spacing': 'error',
    curly: 'error',
    'brace-style': 'error',
    'eol-last': 'warn',
    eqeqeq: 'error',
    'getter-return': 'error',
    'global-require': 'error',
    'handle-callback-err': 'error',
    'id-length': 'warn',
    'key-spacing': 'error',
    'max-len': ['error', {
      code: 120, "ignoreComments": true,
      "ignoreTrailingComments": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }],
    'max-params': [
      'error',
      {
        max: 4
      }
    ],
    'max-statements': ['error', 10],
    'no-console': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implicit-globals': 'error',
    'prefer-const': 'error',
    'no-process-exit': 'error',
    'no-process-env': 'warn',
    'no-return-assign': 'error',
    'no-useless-return': 'error',
    'max-depth': 'error',
    'no-mixed-operators': 'error',
    complexity: ['error', 4],
    'no-template-curly-in-string': 'error',
    'array-callback-return': 'error',
    'default-param-last': 'error',
    'no-constructor-return': 'error',
    'no-invalid-this': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-proto': 'error',
    'prefer-spread': 'warn',
    'no-dupe-keys': 'error',
    'no-useless-call': 'error',
    'no-param-reassign': 'error',
    'space-infix-ops': 'error',
    'no-multi-spaces': 'error',
    'semi-spacing': 'error',
    'no-multiple-empty-lines': ['error', {max: 1}],
    'prefer-arrow-callback': ['error', {'allowNamedFunctions': true}]
  },
  overrides: [
    {
      files: "*.spec.ts",
      rules: {
        "@typescript-eslint/no-magic-numbers": "off"
      }
    },
    {
      files: "*/logger/index.*ts",
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-unsafe-assignment": "off"
      },
    },
    {
      files: "*/config/index.ts",
      rules: {
        "no-process-env": "off"
      }
    },
    {
      files: "*/types/logger.ts",
      rules: {
        "@typescript-eslint/no-explicit-any": "off"
      }
    },
    {
      files: "utils.ts",
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "complexity": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
    }
  ],
}
