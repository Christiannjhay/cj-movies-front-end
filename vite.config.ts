import path from "path"
import react from "@vitejs/plugin-react"
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz', // or '.br' for Brotli compression
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
