// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts', // Adjust to your entry file
  output: {
    file: 'dist/bundle.js', // Adjust to your desired output file and path
    format: 'cjs', // Use CommonJS format for Node.js
    sourcemap: true,
  },
  plugins: [
    resolve(), // Helps Rollup find modules in node_modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript({ tsconfig: './tsconfig.json' }), // Compiles TypeScript files
  ],
  external: [
    /* Add dependencies here that you don't want to bundle, like "fs" or "path" */
  ],
};
