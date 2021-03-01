import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

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
    alias({
      tslib: require.resolve('tslib/tslib.es6.js'),
    }),
    resolve({
      mainFields: ['jsnext:main'],
    }),
    commonjs({
      ignoreGlobal: true,
      sourceMap: false,
    }),
    babel({
      babelrc: false,
      include: ['./lib/**/*.js'],
      presets: [
        '@babel/preset-env',
      ],
      plugins: [
        ['@babel/plugin-transform-runtime'],
      ],
      babelHelpers: 'runtime',
    }),
    (production && uglify({
      output: {
        comments: /^!/,
      },
    })),
  ],
};

export default config;
