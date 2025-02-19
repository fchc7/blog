<script setup lang="ts">
import { data as posts } from "../utils/posts.data.ts";
</script>

<template>
  <div
    class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-1"
    v-for="post in posts"
    :key="post.title"
  >
    <div class="flex gap-2 flex-col md:flex-row items-start md:items-center">
      <a
        class="fv-style inline text-black dark:text-offgray-100 underline decoration-accent-blue/20 hover:decoration-accent-blue/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80"
        href="/blog/edit-prediction"
        >{{ post.title }}</a
      >

      <div class="flex flex-wrap gap-2">
        <div
          class="rounded-xs h-[18px] px-1 w-fit flex items-center gap-1.5 shrink-0 border border-dashed text-[.6875rem] font-bold leading-4 border-green-300 bg-green-200/20 text-green-800 dark:border-green-700/40 dark:bg-green-800/20 dark:text-green-300"
        >
          Featured
        </div>
      </div>
    </div>
    <p class="text-sm">{{ post.date }}</p>
  </div>
</template>
