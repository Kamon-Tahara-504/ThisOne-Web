import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages の公開URLが
// https://<username>.github.io/ThisOne-Web/
// の場合、base を '/ThisOne-Web/' にする
export default defineConfig({
  plugins: [react()],
  base: '/ThisOne-Web/',
});