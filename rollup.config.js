import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const input = 'src/index.js';
const name = 'whatsappChatParser';
const format = 'umd';
const exports = 'named';

export default [
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format,
      exports,
    },
    plugins: [commonjs(), babel()],
  },
  {
    input,
    output: {
      name,
      file: pkg.browser.replace(/\.js$/, '.min.js'),
      format,
      exports,
    },
    plugins: [commonjs(), babel(), uglify()],
  },
];
