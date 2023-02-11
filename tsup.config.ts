// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs', 'iife'],
  globalName: 'whatsappChatParser',
  minify: true,
  sourcemap: true,
  splitting: false,
});
