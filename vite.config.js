import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const cleanHTML = () => {
  return {
    name: "clean-html",
    transformIndexHtml(html) {
      return html
        // Remove "https://ordinals.com" from script sources
        .replace(
          /<script\s+src="https:\/\/ordinals\.com\/content\/([^"]+)"><\/script>/g,
          '<script src="/content/$1"></script>'
        )
        // Remove the testing code block
        .replace(/\/\/ THIS PART IS FOR TESTING ONLY[\s\S]*?\/\/ TESTING END\s*/, "")
        // Uncomment the inscription_id line
        .replace(
          /\/\/let inscription_id = window\.location\.pathname\.split\("\/"\)\.pop\(\);/,
          "let inscription_id = window.location.pathname.split(\"/\").pop();"
        );
    }
  };
};

export default defineConfig(({ command }) => ({
  plugins: command === "build" ? [viteSingleFile(), cleanHTML()] : [viteSingleFile()],
  build: {
    target: "esnext",
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        interop: false, // Disable interop helpers that may add extra snippets
      },
    },
  },
}));


