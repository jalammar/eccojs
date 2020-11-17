import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from "rollup-plugin-terser";

export default [

    {
        input: "main.js",
         output: {
            file: 'dist/ecco-bundle.node.js',
            format: "cjs"
        }
    },
    {
        input: 'main.js',
        output: {
            file: '..\\..\\PycharmProjects\\ecco\\ecco\\ecco-bundle.js',
            format: 'umd',
            name: 'eccoBundle'
        },

        plugins: [nodeResolve(), commonjs()],
    },

    {
        input: 'main.js',
        output: {
            file: 'dist/ecco-bundle.js',
            format: 'umd',
            name: 'eccoBundle',
            indent: false,
        },

        plugins: [nodeResolve(), commonjs(),
            terser()],
    },
];