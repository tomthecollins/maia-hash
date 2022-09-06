// import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './es6/maia-hash.js',
  output: {
    file: './maia-hash.js',
    format: 'iife',
    name: 'mf'
  }
  // ,plugins :[ commonjs() ]
}
