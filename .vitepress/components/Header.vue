<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'
import { useScroll } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { y } = useScroll(window)

const { page, frontmatter } = useData()
const isPost = computed(() => page.value.relativePath.startsWith('posts/'))
const isReady = ref(false)

onMounted(() => {
  // 重置状态
  isReady.value = false
  // 启动动画
  requestAnimationFrame(() => {
    isReady.value = true
  })
})
</script>

<template>
  <header class="header-layout w-full sticky top-0 z-10 py-7" :class="{ 'border-b': y > 0 }">
    <div class="max-w-[670px] mx-auto w-full px-4 flex justify-between items-center gap-8">
      <div class="flex-1 min-w-0 relative h-8">
        <!-- 默认标题 -->
        <div class="absolute w-full transition-all duration-500 ease-out"
             :class="[
               isReady ? (isPost ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100') : 'translate-y-0 opacity-0'
             ]">
          <p class="text-xl font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            Fchc7
          </p>
        </div>
        
        <!-- 文章标题 -->
        <div v-if="isPost" 
           class="absolute w-full flex items-center gap-2 transition-all duration-500 ease-out hover:text-gray-900 dark:hover:text-white transition-colors"
           :class="[
             isReady ? (isPost ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0') : 'translate-y-8 opacity-0'
           ]">
          <a href="/" class="i-custom:logo text-xl"/>
          <span :title="frontmatter.title" 
                class="text-xl font-bold truncate text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            {{ frontmatter.title }}
          </span>
        </div>
      </div>

      <!-- 右侧图标 - 移除动画相关类 -->
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