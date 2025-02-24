// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './prose.css'
import './style.css'
import 'virtual:uno.css'
import './markdown.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp() {
    //
  }
} satisfies Theme

