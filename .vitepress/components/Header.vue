<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'
import { useScroll } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const { y } = useScroll(window)
</script>

<template>
  <header  class="w-full sticky top-0 z-10 py-7 backdrop-blur-sm transition-shadow flex justify-between items-center" 
            :class="{ 'shadow-sm': y > 0 }">
    <p class="text-lg font-bold">Blog</p>
    <div class="flex justify-end gap-1">
      <button title="GitHub" class="btn-icon text-lg w-7 h-7">
        <a href="https://github.com/fchc7" class="i-custom:github"></a>
      </button>
      <button @click="toggleDark()" :title="isDark ? 'Dark Mode' : 'Light Mode'" class="btn-icon text-lg w-7 h-7">
        <span v-if="isDark" class="i-material-symbols:light-mode"></span>
        <span v-else class="i-material-symbols:dark-mode"></span>
      </button>
    </div>
  </header>
</template>