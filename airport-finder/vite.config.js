import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  // base: process.env.mode === "production" ? "/static/" : "/",
  root: "./src",
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  
});