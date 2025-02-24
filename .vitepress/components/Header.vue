<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'
import { useScroll } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed, ref, watchEffect } from 'vue'
import { inBrowser } from 'vitepress'

const isDark = useDark()
const toggleDark = useToggle(isDark)
// 将 window 相关的操作移到客户端
const y = ref(0)

const { page, frontmatter } = useData()
const isPost = computed(() => page.value.relativePath.startsWith('posts/'))

// 将条件判断改为使用 inBrowser
if (inBrowser) {
  const { y: scrollY } = useScroll(window)
  // 监听滚动
  watchEffect(() => {
    y.value = scrollY.value
  })
}
</script>

<template>
  <header class="header-layout w-full sticky top-0 z-10 transition-all duration-200 ease-out" 
          :class="[{ 'border-b': y > 0}, isPost ? 'py-4' : 'py-7']">
    <div class="max-w-[670px] mx-auto w-full px-4 flex justify-between items-center gap-8">
      <div class="flex-1 min-w-0 relative h-8">
        <!-- 默认标题 -->
        <div class="absolute w-full"
             :class="[
               isPost ? 'hidden' : 'block'
             ]">
          <p class="text-xl font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            Fchc7
          </p>
        </div>
        
        <!-- 文章标题 -->
        <div v-if="isPost" 
             class="absolute w-full flex items-center gap-2">
          <a href="/" class="i-custom:logo text-xl"/>
          <span :title="frontmatter.title" 
                class="text-xl font-bold truncate text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            {{ frontmatter.title }}
          </span>
        </div>
      </div>

      <!-- 右侧图标 -->
      <div class="flex justify-end gap-1 flex-shrink-0">
        <button title="GitHub" class="btn-icon text-lg w-7 h-7">
          <a href="https://github.com/fchc7" class="i-custom:github"></a>
        </button>
        <button @click="toggleDark()" 
                :title="isDark ? 'Dark Mode' : 'Light Mode'" 
                class="btn-icon text-lg w-7 h-7">
          <span v-if="isDark" class="i-material-symbols:light-mode"></span>
          <span v-else class="i-material-symbols:dark-mode"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style>
.header-layout {
  --border-color: 240 5.9% 90%;
  
  border-width: 0px;
  border-style: solid;
  border-color: hsl(var(--border-color) / .6);
  background-color: hsl(var(--bg-color) / .6);
  
  backdrop-filter: blur(8px);
}


.dark .header-layout {
  --border-color: 240 3.7% 15.9%;
}
</style>