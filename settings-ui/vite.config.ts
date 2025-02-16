import path from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import packageSettings from './package.json';

export default defineConfig({
  base: `/${packageSettings.name}`,
  plugins: [solid()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
});
