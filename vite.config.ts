import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages の公開URLが
// https://<username>.github.io/ThisOne/
// の場合、base を '/ThisOne/' にする
export default defineConfig({
  plugins: [react()],
  base: '/ThisOne/',
});