import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   exclude: ["leaflet"],
  // },
  // build: {
  //   rollupOptions: {
  //     external: ["leaflet"],
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
