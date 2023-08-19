export default {
    plugins: {
        autoprefixer: {},
        tailwindcss: { config: './tailwind.config.js' },
        'postcss-import': {},
        'tailwindcss/nesting': 'postcss-nesting',
    },
}
