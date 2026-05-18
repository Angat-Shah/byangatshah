import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@paper-design/shaders-react')) {
            return 'vendor-shaders';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/@hugeicons') || id.includes('node_modules/@dev.icons')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
})

