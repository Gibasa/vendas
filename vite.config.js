import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    assetsInclude: ["**/*.jpg", "**/*.png"], // Especifica onde os arquivos estáticos serão colocados no build
  },
})
