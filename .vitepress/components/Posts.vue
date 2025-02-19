<script setup lang="ts">
import { data as posts } from "../utils/posts.data.mts"
import { ref, onMounted } from 'vue'
import pinyin from 'tiny-pinyin'

// 获取首字母（支持拼音）
const getFirstLetter = (str: string) => {
  if (/^[a-zA-Z]/.test(str)) {
    return str.charAt(0).toLowerCase()
  }
  if (pinyin.isSupported() && /[\u4e00-\u9fa5]/.test(str)) {  // 使用正则检测中文
    const pinyinStr = pinyin.convertToPinyin(str)
    return pinyinStr.charAt(0).toLowerCase()
  }
  return 'n' // 默认值
}

// 根据标签首字母决定颜色
const getTagColor = (tag: string) => {
  const colors = {
    a: { color: '#3b82f6' }, // 蓝色
    b: { color: '#22c55e' }, // 绿色
    c: { color: '#14b8a6' }, // 青色
    d: { color: '#0ea5e9' }, // 天蓝色
    e: { color: '#10b981' }, // 翡翠绿
    f: { color: '#0d9488' }, // 蓝绿色
    g: { color: '#059669' }, // 绿色
    h: { color: '#0284c7' }, // 蓝色
    i: { color: '#0369a1' }, // 深蓝色
    j: { color: '#047857' }, // 深绿色
    k: { color: '#60a5fa' }, // 天蓝色
    l: { color: '#34d399' }, // 薄荷绿
    m: { color: '#818cf8' }, // 淡紫色
    n: { color: '#4f46e5' }, // 靛蓝色
    o: { color: '#2dd4bf' }, // 青绿色
    p: { color: '#38bdf8' }, // 浅蓝色
    q: { color: '#10b981' }, // 翡翠绿
    r: { color: '#6366f1' }, // 紫罗兰
    s: { color: '#0ea5e9' }, // 深天蓝
    t: { color: '#14b8a6' }, // 蓝绿色
    u: { color: '#60a5fa' }, // 天蓝色
    v: { color: '#34d399' }, // 薄荷绿
    w: { color: '#818cf8' }, // 淡紫色
    x: { color: '#4f46e5' }, // 靛蓝色
    y: { color: '#2dd4bf' }, // 青绿色
    z: { color: '#38bdf8' }  // 浅蓝色
  }
  
  const firstLetter = getFirstLetter(tag)
  return colors[firstLetter] || { color: '#3b82f6' }
}

// 入场动画
onMounted(() => {
  const items = document.querySelectorAll('.post-item')
  items.forEach((item, index) => {
    const htmlItem = item as HTMLElement;
    htmlItem.style.opacity = '0'
    htmlItem.style.transform = 'translateY(30px)'
    
    setTimeout(() => {
      htmlItem.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      htmlItem.style.opacity = '1'
      htmlItem.style.transform = 'translateY(0)'
    }, index * 100)
  })
})
</script>

<template>
  <div class="posts-container mt-20 space-y-16 max-w-[670px]">
    <a v-for="(post, index) in posts"
       :key="post.title"
       class="post-item group block relative"
       :href="`/posts/${post.title}`">
      <div class="flex flex-col gap-1">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-8">
          <span class="post-title text-lg font-medium line-clamp-1">
            {{ post.title }}
          </span>
          <time class="text-sm font-mono text-gray-500/80 whitespace-nowrap order-first sm:order-last">{{ post.date }}</time>
        </div>
        
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span v-for="tag in post.tags"
                :key="tag"
                class="tag text-xs leading-base px-2  border rounded-md transition-all duration-300"
                :style="{
                  '--tag-color': getTagColor(tag).color,
                  color: `color-mix(in oklab, var(--text-color) 40%, transparent)`,
                  borderColor: `color-mix(in oklab, var(--text-color) 15%, transparent)`,
                  backgroundColor: `color-mix(in oklab, var(--text-color) 3%, transparent)`
                }">
            {{ tag }}
          </span>
        </div>

        <p v-if="post.description" class="text-sm text-gray-500/90 mt-1 line-clamp-2">
          {{ post.description }}
        </p>
      </div>
      <!-- 悬浮背景效果 -->
      <div class="absolute -inset-6 rounded-xl bg-gray-400/5 opacity-0 transition-opacity pointer-events-none group-active:opacity-100" />
    </a>
  </div>
</template>

<style>
.post-item {
  position: relative;
  transition: transform 0.3s ease;
  text-decoration: none;
  opacity: 0;
  transform: translateY(30px);
  will-change: transform, opacity;
}

.post-item:hover {
  transform: translateX(4px);
}

.post-title {
  color: color-mix(in oklab, var(--text-color) 60%, transparent);
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
}

.post-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .post-title {
  color: var(--text-color);
}

.group:hover .post-title::after {
  transform: scaleX(1);
}

.tag {
  font-weight: 500;
  opacity: 0.7;
  transition: all 0.3s ease;
  position: relative;
  isolation: isolate;
}

.group:hover .tag {
  opacity: 1;
  color: var(--tag-color) !important;
  border-color: color-mix(in oklab, var(--tag-color) 20%, transparent) !important;
  background-color: color-mix(in oklab, var(--tag-color) 5%, transparent) !important;
}

@media (prefers-reduced-motion: reduce) {
  .post-item * {
    transition: none;
  }
}
</style>