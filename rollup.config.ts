import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import {babel} from "@rollup/plugin-babel"
export default [
    {
        input: "src/index.ts",
        external: [
            'websocket', 
            'fs', 
            'fs/promises', 
            'http',
        ],
        output: [
            {
                file: "dist/server.js",
                format: "cjs",
                sourcemap: true,
            }
        ],
        plugins: [
            nodeResolve({
                main: true,
                preferBuiltins: true,
            }),
            json(),
            commonjs({ extensions: ['.js'] }),
            typescript({
            }),
            
            babel({babelHelpers: "bundled"}),
        ]
    }
];