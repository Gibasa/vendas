import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets', // Define onde os assets serão colocados no build
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]', // Organiza os arquivos no diretório 'assets'
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.svg'], // Inclui imagens no processamento
})
