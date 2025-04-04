import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/miniPlanetLoader/',
  build: {
    rollupOptions: {
      external: [
        'https://www.improv-wifi.com/sdk-js/launch-button.js'
      ]
    }
  }
})