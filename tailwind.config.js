/** @type {import('tailwindcss').Config} */
// You can also add custom styles to your project using Tailwind’s plugin system instead of using a CSS file:
import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
    important: true,
    corePlugins: {}, // 禁用部分核心插件
    prefix: '', // 自定义实用类前缀
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    blocklist: [
        'container',
        'collapse',
    ], // 禁止tailwind 生成无效没有使用的类名
    darkMode: 'class', // or 'media' or 'class',class为手动设置网页为暗黑模式
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./login/**/*.{vue,js,ts,jsx,tsx}",
        "./home/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                // 'green': 'green',
            },
            fontFamily: {
                sans: [
                    '-apple-system',
                    'PingFangSC-Medium',
                    'PingFang SC',
                    ...defaultTheme.fontFamily.sans,
                ],
                DiyChineseFont:"DiyChineseFont"
            }
        },
    },
    plugins: [
        plugin(function ({ addBase, addComponents, addUtilities, theme }) {
            addBase({
                'h1': {
                    fontSize: theme('fontSize.2xl'),
                },
                'h2': {
                    fontSize: theme('fontSize.xl'),
                },
            })
            addComponents({
                '.card': {
                    backgroundColor: theme('colors.white'),
                    borderRadius: theme('borderRadius.lg'),
                    padding: theme('spacing.6'),
                    boxShadow: theme('boxShadow.xl'),
                }
            })
            addUtilities({
                '.content-auto': {
                    contentVisibility: 'auto',
                }
            })
        })
    ]
}

