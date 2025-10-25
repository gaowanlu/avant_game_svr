import { defineConfig } from 'vite'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({
    plugins: [
        nodeResolve({
            extensions: ['.js'],
        }),
        commonjs({
            include: [/src/], // ✅ 告诉插件处理 src 下的 require
        }),
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        target: 'node24',
        rollupOptions: {
            input: path.resolve(__dirname, 'src/Freeland.js'),
            external: ['net'],
            output: {
                format: 'cjs',
                entryFileNames: 'freeland.js',
                inlineDynamicImports: true,
            },
        },
    },
})
