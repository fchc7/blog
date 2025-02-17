import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            provider: 'none',
            fonts: {
                sans: 'Geist',
                mono: 'Geist Mono',
            },
            // This will download the fonts and serve them locally
            processors: createLocalFontProcessor({
                // Directory to cache the fonts
                cacheDir: 'node_modules/.cache/unocss/fonts',

                // Directory to save the fonts assets
                fontAssetsDir: 'public/fonts',

                // Base URL to serve the fonts from the client
                fontServeBaseUrl: '/fonts'
            })
        }),
    ],
    // ...UnoCSS options
})