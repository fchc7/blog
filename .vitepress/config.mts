import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zjx's blog",
  description: "blog",
  vite: {
    plugins: [
      UnoCSS(),
    ]
  }
})
