import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // optional if needed for other tools
  }
  // server: {
  //   proxy: {
  //     '/clarifai': {
  //       target: 'https://api.clarifai.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/clarifai/, '')
  //     }
  //   }
  // }
})

