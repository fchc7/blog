/// <reference types="vitepress" />
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog",
  head: [
    ['link', { rel: 'icon', href: '/icons/logo.svg' }]
  ],
  cleanUrls: true,
  vite: {
    plugins: [
      // @ts-ignore vite版本不一致 `pnpm why vite`
      UnoCSS(),
    ]
  },
  markdown: {
    anchor: {
      level: [1, 2, 3],
    }
  },
})
