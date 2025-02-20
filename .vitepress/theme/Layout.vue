<script setup lang="ts">
import { useData } from 'vitepress'
import NotFound from '../components/NotFound.vue'
import Header from '../components/Header.vue'

const { page } = useData()

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- 固定顶部 -->
    <Header class="px-4" />
    
    <!-- 主要内容区域 -->
    <main class="flex-grow my-[60px]">
      <div class="max-w-[670px] mx-auto px-4 w-full">
        <NotFound v-if="page.isNotFound" />
        <PostWrapper v-else-if="page.relativePath.startsWith('posts/')">
          <Content />
        </PostWrapper>
        <Content v-else />
      </div>
    </main>

    <!-- 底部备案信息 -->
    <footer class="w-full py-6 text-center text-sm text-gray-500">
      <div class="max-w-[670px] mx-auto px-4 w-full">
        © 2024 备案号：xxx
      </div>
    </footer>
  </div>
</template>

