import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
// import { visualizer } from 'rollup-plugin-visualizer';

// @ts-ignore
// import stylelint from 'rollup-plugin-stylelint'; // Rollup, 2yo dead, no types
// import stylelint from '@amatlash/vite-plugin-stylelint'; // Vite, 0 config, no --fix, no link to code, explicitly "no maintenance"
// import stylelint from 'vite-plugin-stylelint'; // Vite, no prettyprint or im dumb, but has link to code
// import eslint from 'vite-plugin-eslint'; // caching mechanism is broken, works only with cache: false

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true, open: true },
  // build: { rollupOptions: { plugins: [visualizer()] } },

  plugins: [
    react(),
    // though e.g. Firebase will do it anyway, but anyway
    compression({algorithm: 'brotliCompress'}) // build only
  ],
});
