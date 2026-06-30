import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: false,
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UIKit",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },

    rollupOptions: {
      external: ["react", "react-dom"],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
