import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
// @ts-ignore
// import stylelint from 'rollup-plugin-stylelint'; // Rollup, 2yo dead, no types
// import stylelint from '@amatlash/vite-plugin-stylelint'; // Vite, 0 config, no --fix, no link to code, explicitly "no maintenance"
// import stylelint from 'vite-plugin-stylelint'; // Vite, no prettyprint or im dumb, but has link to code
// import eslint from 'vite-plugin-eslint'; // it just stuck or error sometime even after dev-server restart

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
