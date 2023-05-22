import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  // base: process.env.mode === "production" ? "/static/" : "/",
  root: "./src",
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
});