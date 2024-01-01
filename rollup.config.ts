import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
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
                dir: "dist",
                format: "cjs",
                sourcemap: true,
            }
        ],
        plugins: [
            json(),
            typescript({
            }),
            commonjs({ extensions: ['.js', '.ts'] }),
            nodeResolve({
                dedupe: ['@sinkapoy/home-core', 'node-fetch', 'http']
            }),
        ]
    }
];