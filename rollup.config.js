import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'whatsappChatParser',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
    },
    plugins: [commonjs()],
  },
];
