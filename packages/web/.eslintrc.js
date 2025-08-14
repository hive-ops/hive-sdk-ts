module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // Recommended to remove the below option if removing it doesn't cause adverse effects
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "typescript", "import", "jsdoc"],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": [
      "off",
      {
        default: "array",
      },
    ],
    "@typescript-eslint/await-thenable": "warn",
    "@typescript-eslint/ban-types": [
      "warn",
      {
        types: {
          Object: {
            message:
              "Avoid using the `Object` type. Did you mean `object`?",
          },
          Function: {
            message:
              "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
          },
          Boolean: {
            message:
              "Avoid using the `Boolean` type. Did you mean `boolean`?",
          },
          Number: {
            message:
              "Avoid using the `Number` type. Did you mean `number`?",
          },
          String: {
            message:
              "Avoid using the `String` type. Did you mean `string`?",
          },
          Symbol: {
            message:
              "Avoid using the `Symbol` type. Did you mean `symbol`?",
          },
        },
      },
    ],
    "typescript/class-name-casing": "warn",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-for-in-array": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-use-before-define": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/quotes": [
      "warn",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "@typescript-eslint/triple-slash-reference": [
      "warn",
      {
        path: "always",
        types: "prefer-import",
        lib: "always",
      },
    ],
    "@typescript-eslint/unified-signatures": "warn",
    camelcase: "warn",
    "comma-dangle": "off",
    complexity: [
      "warn",
      {
        max: 12,
      },
    ],
    "constructor-super": "warn",
    eqeqeq: ["warn", "smart"],
    "guard-for-in": "warn",
    "id-match": "warn",
    "import/no-deprecated": "warn",
    "import/no-extraneous-dependencies": "off",
    "import/no-internal-modules": "off",

    "import/no-unassigned-import": [
      1,
      {
        allow: ["**/*.css", "@testing-library/jest-dom/extend-expect"],
      },
    ],
    "jsdoc/check-alignment": "warn",
    "jsdoc/check-indentation": "warn",
    // "jsdoc/newline-after-description": "warn",
    "max-classes-per-file": ["warn", 1],
    "new-parens": "warn",
    "no-bitwise": "warn",
    "no-caller": "warn",
    "no-cond-assign": "warn",
    "no-console": "warn",
    "no-debugger": "warn",
    "no-duplicate-case": "warn",
    "no-duplicate-imports": "warn",
    "no-empty": "warn",
    "no-eval": "warn",
    "no-extra-bind": "warn",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-multiple-empty-lines": "warn",
    "no-new-func": "warn",
    "no-new-wrappers": "warn",
    "no-redeclare": "warn",
    "no-return-await": "warn",
    "no-sequences": "warn",
    "no-shadow": [
      "warn",
      {
        hoist: "all",
      },
    ],
    "no-sparse-arrays": "warn",
    "no-template-curly-in-string": "off",
    "no-throw-literal": "warn",
    "no-trailing-spaces": "warn",
    "no-undef-init": "warn",
    "no-underscore-dangle": "warn",
    "no-unneeded-ternary": "warn",
    "no-unsafe-finally": "warn",
    "no-unused-labels": "warn",
    "no-var": "warn",
    "object-shorthand": "warn",
    "one-var": ["warn", "never"],
    "padding-line-between-statements": [
      "off",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "prefer-const": "warn",
    "prefer-object-spread": "warn",
    radix: "warn",
    "space-in-parens": ["warn", "never"],
    "spaced-comment": [
      "warn",
      "always",
      {
        markers: ["/"],
      },
    ],
    "use-isnan": "warn",
    "valid-typeof": "off",
  },
};
