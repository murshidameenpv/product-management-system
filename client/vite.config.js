import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/product": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/jwt": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
