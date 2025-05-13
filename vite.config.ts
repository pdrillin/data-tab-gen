import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'data-tab-gen',
            fileName: 'data-tab-gen',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: [], // ou liste de dépendances externes
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '', // injecte globalement si besoin
            },
        },
    },
});
