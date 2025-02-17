<script setup lang="ts">
import { useData } from 'vitepress'
import NotFound from '../components/NotFound.vue'
// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter, page } = useData()
</script>
<template>
  <NotFound v-if="!page.isNotFound" />
  <div v-else>
    <Content />
  </div>
</template>
