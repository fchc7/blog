<script setup lang="ts">
import { useData } from 'vitepress'
import NotFound from '../components/NotFound.vue'
import Header from '../components/Header.vue'

const { site, frontmatter, page } = useData()

</script>

<template>
  <div class="min-h-screen layout mx-auto flex flex-col">
    <!-- 固定顶部 -->
    <Header />
    
    <!-- 主要内容区域 -->
    <main class="flex-grow">
      <div class="mx-auto">
        <NotFound v-if="page.isNotFound" />
        <Content v-else />
      </div>
    </main>

    <!-- 底部备案信息 -->
    <footer class="w-full py-6 text-center text-sm text-gray-500">
      © 2024 备案号：xxx
    </footer>
  </div>
</template>

<style>
.layout {
  max-width: 800px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

/* 移动端 */
@media (max-width: 640px) {
  .layout {
    max-width: 100%;
  }
}

/* 平板 */
@media (min-width: 641px) and (max-width: 768px) {
  .layout {
    max-width: 600px;
  }
}

/* 小屏幕桌面 */
@media (min-width: 769px) {
  .layout {
    max-width: 700px;
  }
}

@media (min-width: 1024px) {
  .layout {
    max-width: 800px;
  }
}

</style>
