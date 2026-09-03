import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Optimize HMR for better development experience
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
    // Improve startup time
    warmupEntry: ["src/main.jsx"],
  },
  // Cache optimization
  cacheDir: ".vite",
});
