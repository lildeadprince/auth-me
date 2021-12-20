import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import stylelint from '@amatlash/vite-plugin-stylelint'; // Vite, 0 config, no --fix, explicitly "no maintenance"
// import stylelint from 'vite-plugin-stylelint'; // Vite, no prettyprint stuff or im dumb
// @ts-ignore
// import stylelint from 'rollup-plugin-stylelint'; // Rollup, 2yo dead, no types
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
});
