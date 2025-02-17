<script setup lang="ts">
import { useData } from 'vitepress'
import NotFound from '../components/NotFound.vue'
import Header from '../components/Header.vue'

const { site, frontmatter, page } = useData()
</script>

<template>
  <div class="min-h-screen">
    <Header />
    <NotFound v-if="page.isNotFound" />
    <div v-else class="px-4">
      <Content />
    </div>
  </div>
</template>
