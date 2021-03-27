import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const input = 'src/index.ts';
const name = 'whatsappChatParser';
const sourcemap = true;
const format = 'umd';
const exports = 'named';

export default [
  {
    input,
    output: {
      name,
      file: pkg.main,
      sourcemap,
      format,
      exports,
    },
    plugins: [typescript()],
  },
  {
    input,
    output: {
      name,
      file: pkg.main.replace(/\.js$/, '.min.js'),
      sourcemap,
      format,
      exports,
    },
    plugins: [typescript(), terser()],
  },
];
