<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="p-4 flex justify-end">
    <button @click="toggleDark()" class="btn-icon text-md">
      <div v-if="isDark" class="i-material-symbols:light-mode"></div>
      <div v-else class="i-material-symbols:dark-mode"></div>
    </button>
  </header>
</template>