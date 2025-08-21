import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // use '/' if your Render app is at root
  build: {
    outDir: 'dist'
  }
});
