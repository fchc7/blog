<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'
import { useScroll } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const { y } = useScroll(window)
</script>

<template>
  <header class="w-full sticky top-0 z-10 py-7 px-4 backdrop-blur-sm transition-shadow"
          :class="{ 'shadow-sm': y > 0 }">
    <div class="max-w-[670px] mx-auto w-full px-4 flex justify-between items-center">
      <p class="text-xl font-bold">Fchc7</p>
      <div class="flex justify-end gap-1">
        <button title="GitHub" class="btn-icon text-lg w-7 h-7">
          <a href="https://github.com/fchc7" class="i-custom:github"></a>
        </button>
        <button @click="toggleDark()" :title="isDark ? 'Dark Mode' : 'Light Mode'" class="btn-icon text-lg w-7 h-7">
          <span v-if="isDark" class="i-material-symbols:light-mode"></span>
          <span v-else class="i-material-symbols:dark-mode"></span>
        </button>
      </div>
    </div>
  </header>
</template>