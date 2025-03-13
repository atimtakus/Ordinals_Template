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


// import { defineConfig } from "vite";
// import { viteSingleFile } from "vite-plugin-singlefile";

// const removeOrdinals = () => {
//   return {
//     name: "remove-ordinals",
//     transformIndexHtml(html) {
//       return html.replace(
//         /<script\s+src="https:\/\/ordinals\.com\/content\/([^"]+)"><\/script>/g,
//         '<script src="/content/$1"></script>'
//       );
//     }
//   };
// };

// export default defineConfig({
//   plugins: [viteSingleFile(), removeOrdinals()],
//   build: {
//     target: "esnext",
//     polyfillModulePreload: false,
//     rollupOptions: {
//       output: {
//         interop: false, // Disable interop helpers that may add extra snippets
//       },
//     },
//   },
// });


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
        .replace(/\/\/ THIS PART IS FOR TESTING ONLY[\s\S]*?\/\/ TESTING END/, "")
        // Uncomment the inscription_id line
        .replace(
          /\/\/__________UNCOMMENT BELOW BEFORE INSCRIBING____________________\n\s*\/\/(let inscription_id = window\.location\.pathname\.split\("\/"\)\.pop\(\);)\n\s*\/\/_________UMCOMMENT ABOVE BEFORE INSCRIBING______________________/,
          "$1"
        );
    }
  };
};

export default defineConfig({
  plugins: [viteSingleFile(), cleanHTML()],
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
