import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';

const pkg = require('./package.json');
const production = process.env.BUILD === 'production';
const cjs = process.env.BUILD === 'cjs';
const file = production ? `index.js` : (cjs ? `main.js` : `index.debug.js`);
const format = cjs ? 'cjs' : 'umd';
const banner = `/*!
 * Name: ${pkg.productName}
 * Description: ${pkg.description}
 * Author: ${pkg.author}
 * Version: v${pkg.version}
 */
`;

const config = {
  input: 'lib/index.js',
  output: {
    file,
    format,
    name: "X",
    banner,
  },
  plugins: [
    typescript(),
    resolve({
      mainFields: ['jsnext:main'],
    }),
    commonjs({
      ignoreGlobal: true,
    }),
    (production && uglify({
      output: {
        comments: /^!/,
      },
    })),
  ],
};

if (process.argv.includes('--watch')) {
  config.plugins.push(serve({
    contentBase: '',
    host: 'localhost',
    port: 8080,
  }));
}

export default config;
