import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Proxy /api to Firebase emulator during local dev
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001/teens-camp-26/us-central1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
