import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync('./certs/privkey.pem'),
  //     cert: fs.readFileSync('./certs/fullchain.pem'),
  //   },
  //   host: '0.0.0.0', // чтобы можно было подключаться с других устройств
  //   port: 5173,
  // },
});
