<script setup lang="ts">
import { useData } from 'vitepress'
import NotFound from '../components/NotFound.vue'
import Header from '../components/Header.vue'
import PostWrapper from '../components/PostWrapper.vue'
import { ref } from 'vue'

const { page } = useData()

const icpNo = ref(import.meta.env.VITE_ICP_NO || 'xxx')
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <NotFound v-if="page.isNotFound" /> 
    <template v-else>

      <!-- 固定顶部 -->
      <Header class="px-4" />
      
      <!-- 主要内容区域 -->
      <main class="flex-grow my-[60px]">
        <div class="max-w-[670px] mx-auto px-4 w-full">
          <PostWrapper v-if="page.relativePath.startsWith('posts/')">
            <Content />
          </PostWrapper>
          <Content v-else />
        </div>
      </main>

      <!-- 底部备案信息 -->
      <footer class="w-full py-6 text-center text-sm text-gray-400">
        <a href="https://beian.miit.gov.cn/" target="_blank" class="max-w-[670px] mx-auto px-4 w-full">
          © {{  new Date().getFullYear() }} 备案号：{{ icpNo }}
        </a>
      </footer>
    </template>

  </div>
</template>

