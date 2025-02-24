// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './prose.css'
import './style.css'
import 'virtual:uno.css'
import './markdown.css'

// 修改主题初始化函数
function initTheme() {
  const userPreference = localStorage.getItem('vueuse-color-scheme')
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  // 如果是浅色模式，确保移除 dark 类
  if (userPreference === 'light' || (!userPreference && !systemDark)) {
    document.documentElement.classList.remove('dark')
  }
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      initTheme()
    }
  }
} satisfies Theme

