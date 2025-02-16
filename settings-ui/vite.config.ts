import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import packageSettings from './package.json';

export default defineConfig({
  base: `/${packageSettings.name}`,
  plugins: [solid()],
});
