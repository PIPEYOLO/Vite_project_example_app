import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import process from 'node:process';
import { config } from 'dotenv'

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // origin: process.env.SERVER_HOST,
    port: 8999,
    hmr: {
      port: 8998
    }
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true
  },
})
