/// <reference types="vitepress" />
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog",
  head: [
    ['link', { rel: 'icon', href: '/icons/logo.svg' }]
  ],
  vite: {
    plugins: [
      // @ts-ignore vite版本不一致 `pnpm why vite`
      UnoCSS(),
    ]
  }
})
