import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import * as path from 'path'

export default defineConfig({
    plugins: [createVuePlugin()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

})
