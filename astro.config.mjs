import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  srcDir: './src/client',

  vite: {
    plugins: [tailwindcss()]
  }
});