import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rolldownOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ass_02: fileURLToPath(new URL('./src/ass_02/index.html', import.meta.url)),
        ass_03: fileURLToPath(new URL('./src/ass_03/index.html', import.meta.url)),
        ass_04: fileURLToPath(new URL('./src/ass_04/index.html', import.meta.url)),
        ass_05: fileURLToPath(new URL('./src/ass_05/index.html', import.meta.url)),
        ass_06: fileURLToPath(new URL('./src/ass_06/index.html', import.meta.url)),
        ass_07: fileURLToPath(new URL('./src/ass_07/index.html', import.meta.url)),
      },
    },
  },
})
