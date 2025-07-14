import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

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
            commonjs({ extensions: ['.js', '.ts'], exclude: [/glibc/g], ignoreDynamicRequires: true}),
            typescript({
            }),
            nodeResolve({
                browser: false,
                preferBuiltins: true,
                dedupe: ['@sinkapoy/home-core', 'http', "@sinkapoy/home-integrations-server-widgets"],
            }),
        ]
    }
];