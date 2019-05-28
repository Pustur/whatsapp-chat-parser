import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const input = 'src/index.js';
const name = 'whatsappChatParser';
const format = 'umd';
const exports = 'named';
const babelOptions = {
  exclude: 'node_modules/**',
};

export default [
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format,
      exports,
    },
    plugins: [babel(babelOptions), commonjs()],
  },
  {
    input,
    output: {
      name,
      file: pkg.browser.replace(/\.js$/, '.min.js'),
      format,
      exports,
    },
    plugins: [babel(babelOptions), commonjs(), uglify()],
  },
];
