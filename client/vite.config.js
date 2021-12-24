import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import Import from 'postcss-import';
import Normalize from 'postcss-normalize';
import Nested from 'postcss-nested';
import CustomProps from 'postcss-custom-properties';
import Calc from 'postcss-calc';
import AvifInCss from 'avif-in-css';
import Autoprefixer from 'autoprefixer';
import DarkThemeClass from 'postcss-dark-theme-class';
// import { visualizer } from 'rollup-plugin-visualizer';

// @ts-ignore
// import stylelint from 'rollup-plugin-stylelint'; // Rollup, 2yo dead, no types
// import stylelint from '@amatlash/vite-plugin-stylelint'; // Vite, 0 config, no --fix, no link to code, explicitly "no maintenance"
// import stylelint from 'vite-plugin-stylelint'; // Vite, no prettyprint or im dumb, but has link to code
// import eslint from 'vite-plugin-eslint'; // caching mechanism is broken, works only with cache: false

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: false, open: false },
  // build: { rollupOptions: { plugins: [visualizer()] } },

  plugins: [
    react(),
    // though e.g. Firebase will do it anyway, but anyway
    compression({ algorithm: 'brotliCompress' }), // build only
  ],

  resolve: {
    alias: {
      '~':
        console.log('Aliasing project root from ' + path.resolve(__dirname, 'src')) || path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      /* XXX: it's a mess, just use camelCase locals as encouraged by CSS Moduless themselves w/o conversion
       *  Build produces .lorem-ipsum__dolor-sit--amet -> css.dolorIpsumDolorSitAmet
       * IntelliJ expects css.loremIpsum__dolorSit--amet */
      // localsConvention: 'camelCase',
    },
    postcss: {
      plugins: [
        ...(process.env.NODE_ENV !== 'production' ? [require('stylelint')] :[]),
        Import(),
        Normalize(),
        Nested(),
        // CustomProps(),
        // Calc, // ???
        // AvifInCss({ modules: true }), // todo fix broken when nested in module, lurk docs
        Autoprefixer(),
        DarkThemeClass(),
      ],
    },
  },
});
