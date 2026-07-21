import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "127.0.0.1",
    port: 5178,
    proxy: { "/api": { target: process.env.API_PROXY_TARGET || "http://127.0.0.1:3061" } },
  },
  preview: {
    host: "127.0.0.1",
    proxy: { "/api": { target: process.env.API_PROXY_TARGET || "http://127.0.0.1:3061" } },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
