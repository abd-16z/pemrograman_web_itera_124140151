import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite dan Vitest sesuai Submodul 7
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
