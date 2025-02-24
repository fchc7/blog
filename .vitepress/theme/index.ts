// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './prose.css'
import './style.css'
import 'virtual:uno.css'
import './markdown.css'

// 添加这个初始化主题的函数
function initTheme() {
  const userTheme = localStorage.getItem('vitepress-theme-appearance') || 'auto'
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (userTheme === 'dark' || (userTheme === 'auto' && systemDark)) {
    document.documentElement.classList.add('dark')
  }
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp() {
    // 在应用初始化时设置主题
    if (typeof window !== 'undefined') {
      initTheme()
    }
  }
} satisfies Theme

