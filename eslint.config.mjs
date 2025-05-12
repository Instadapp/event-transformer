import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
    "**/*.md",
    "**/*.yaml",
  ],
  rules: {
    // rule overrides
    "unicorn/require-number-to-fixed-digits-argument": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
