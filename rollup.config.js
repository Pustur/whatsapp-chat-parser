import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'whatsapp-chat-parser',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [commonjs()],
  },
];
