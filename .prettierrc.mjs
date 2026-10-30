/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: ["wrangler.jsonc", "*.jsonc"],
      options: {
        trailingComma: "none",
      },
    },
  ],
};
