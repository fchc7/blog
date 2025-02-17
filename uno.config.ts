import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import transformerVariantGroup from '@unocss/transformer-variant-group'

const colors = {
    cream: {
        50: '#f5f4ef',
        100: '#e8e6d9',
        200: '#d9d5bf',
        300: '#cfcaaf',
        400: '#bab38c',
        500: '#aba273',
        600: '#998f5c',
        700: '#80774d',
        800: '#665f3d',
        900: '#4c472e',
    }
}

export default defineConfig({
    presets: [
        presetUno({
            dark: 'class',
        }),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
    transformers: [
        transformerVariantGroup(),
    ],
    theme: {
        colors,
    },
    shortcuts: [
        ['btn-icon', [
            'w-6 h-6 rounded-full relative',
            'before:content-[\'\']',
            'before:absolute before:inset-0',
            'before:rounded-full',
            'before:transition-all before:duration-200',
            'before:scale-0 before:opacity-0',
            'hover:before:scale-100 hover:before:opacity-100',
            'before:bg-gray-200 dark:before:bg-gray-800',
            'before:z-[-1]'
        ]],
        ['btn-icon-bg', 'before:bg-'],
    ],
    // ...UnoCSS options
})