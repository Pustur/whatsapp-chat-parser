import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const input = 'src/index.js';
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
    plugins: [commonjs()],
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
    plugins: [commonjs(), terser()],
  },
];
