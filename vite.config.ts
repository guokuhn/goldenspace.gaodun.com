import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    // 允许的主机名列表
    allowedHosts: [
      'goldenspace.gaodun.com',
      'localhost',
      '127.0.0.1'
    ]
  }
})

