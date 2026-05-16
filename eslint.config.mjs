import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Warns when a <Link href="..."> uses a raw path string in static page files.
// Use linkToStaticPage() from @/lib/canonical-menu-path instead so slug changes are caught automatically.
const noHardcodedStaticLink = {
  meta: { type: "suggestion", schema: [] },
  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name.name !== "href" ||
          node.value?.type !== "Literal" ||
          typeof node.value.value !== "string"
        ) return;

        const value = node.value.value;
        // Allow "/" (home is stable) and external URLs
        if (!value.startsWith("/") || value === "/") return;

        const opening = node.parent;
        if (opening?.type !== "JSXOpeningElement") return;
        const tagName = opening.name?.name ?? opening.name?.object?.name;
        if (tagName !== "Link") return;

        context.report({
          node,
          message: `Hardcoded path "${value}" in <Link>. Use linkToStaticPage() from @/lib/canonical-menu-path so slug changes are caught automatically.`,
        });
      },
    };
  },
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/app/(site)/**/*.tsx", "src/components/home/**/*.tsx"],
    plugins: { local: { rules: { "no-hardcoded-static-link": noHardcodedStaticLink } } },
    rules: { "local/no-hardcoded-static-link": "warn" },
  },
];

export default eslintConfig;
