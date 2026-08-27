import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',            // works on any host / subfolder
  server: { host: true, open: true },
  build: { outDir: 'dist' },
})
