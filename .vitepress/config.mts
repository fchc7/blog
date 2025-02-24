/// <reference types="vitepress" />
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Blog - Zhuruyi.cn',
  description: 'Zhuruyi.cn 的个人博客',
  head: [
    ['link', { rel: 'icon', href: '/icons/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Fchc7' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Blog - Zhuruyi.cn' }],
    ['meta', { name: 'og:description', content: 'Zhuruyi.cn 的个人博客' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:creator', content: '@fchc_7' }],
    ['meta', { name: 'keywords', content: 'Fchc7, 博客, 技术, 生活' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' }],
  ],

  // 站点地图配置
  sitemap: {
    hostname: 'https://你的域名'
  },

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
    },
    headers: {
      level: [0, 0] // 不自动生成标题锚点
    }
  },
})
