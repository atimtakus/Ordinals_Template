// import { defineConfig } from "vite"
// import { viteSingleFile } from "vite-plugin-singlefile"

// const noAttr = () => {
// 	return {
// 	  name: "no-attribute",
// 	  transformIndexHtml(html) {
// 		return html.replace(`type="module" crossorigin`, "");
// 	  }
// 	}
//   }
  
//   server: {
//     cors: {
//         origin: false
//     }
// }

// export default defineConfig({
// 	// plugins: [viteSingleFile(),noAttr()],
// 	plugins: [viteSingleFile()],
// 	build: {
// 		target:'esnext',
// 		polyfillModulePreload: false,
// 		rollupOptions: {
// 		  output: {
// 			interop: false, // Disable interop helpers that may add extra snippets
// 		  },
// 		},
		
// 	},
// })


import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const removeOrdinals = () => {
  return {
    name: "remove-ordinals",
    transformIndexHtml(html) {
      return html.replace(
        /<script\s+src="https:\/\/ordinals\.com\/content\/([^"]+)"><\/script>/g,
        '<script src="/content/$1"></script>'
      );
    }
  };
};

export default defineConfig({
  plugins: [viteSingleFile(), removeOrdinals()],
  build: {
    target: "esnext",
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        interop: false, // Disable interop helpers that may add extra snippets
      },
    },
  },
});
