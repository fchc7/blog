<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useDark } from '@vueuse/core'
	import dayjs from 'dayjs'
	import dayOfYear from 'dayjs/plugin/dayOfYear' // 引入dayOfYear插件
  
	// 使用dayOfYear插件
	dayjs.extend(dayOfYear)

  const year = ref(dayjs().year())
  const isDark = useDark()
  
  // 获取当年的天数
  const daysInYear = computed(() => {
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    }
    return isLeapYear(year.value) ? 366 : 365
  })

	// 获取当年已经过去多少天
const currentDay = ref(0)

const getCurrentDayOfYear = () => {
  currentDay.value = dayjs().dayOfYear() // 使用dayjs获取当前是当年的第几天
}

const tooltipRef = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipVisible = ref(false)
const activeIndex = ref(0)
let tooltipTimer: NodeJS.Timeout | null = null

const cardRef = ref<HTMLElement | null>(null) // 添加对卡片的引用

const calculateTooltipPosition = (event, index) => {
  const dot = event.target
  const card = dot.closest('.days-card')
  if (!card || !dot) return { x: 0, y: 0 }

  const dotRect = dot.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  
  // 获取点相对于卡片的位置
  const dotCenterX = dotRect.left - cardRect.left + dotRect.width / 2
  const dotCenterY = dotRect.top - cardRect.top + dotRect.height / 2
  
  const tooltipWidth = 80
  const tooltipHeight = 24
  const gap = 4 // 与点的间距
  
  // 计算点在卡片中的相对位置（四个象限）
  const isRight = dotCenterX > cardRect.width / 2
  const isBottom = dotCenterY > cardRect.height / 2
  
  let x, y
  
  // 根据点的位置决定tooltip的显示位置
  if (isRight) {
    x = dotCenterX - tooltipWidth - gap // 显示在左侧
  } else {
    x = dotCenterX + gap // 显示在右侧
  }
  
  if (isBottom) {
    y = dotCenterY - tooltipHeight - gap // 显示在上方
  } else {
    y = dotCenterY + gap // 显示在下方
  }
  
  return { x, y }
}

// 格式化日期
const getDateInfo = (dayOfYear: number) => {
  const date = dayjs().startOf('year').add(dayOfYear - 1, 'day')
  return {
    week: date.format('ddd'),  // 周几
    date: date.format('MM.DD') // 月份和日期
  }
}

const tooltipContent = computed(() => {
  const { week, date } = getDateInfo(activeIndex.value)
  return `${week}, ${date}`
})

const handleMouseEnter = (event, index) => {
  activeIndex.value = index
  currentDay.value = index
  
  // 清除之前的定时器
  if (tooltipTimer) clearTimeout(tooltipTimer)
  
  // 设置新的定时器
  tooltipTimer = setTimeout(() => {
    const { x, y } = calculateTooltipPosition(event, index)
		console.log(x, y)
    tooltipPosition.value = { x, y }
    tooltipVisible.value = true
  }, 300)
}

const handleMouseLeave = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  tooltipVisible.value = false
  getCurrentDayOfYear()
}

const tooltipStyle = computed(() => {
  return {
    left: tooltipPosition.value.x + 'px', 
    top: tooltipPosition.value.y + 'px'
  }
})

onMounted(() => {
  getCurrentDayOfYear()
})

onBeforeUnmount(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
})
</script>

<template>
  <div ref="cardRef" class="days-card gap-4 p-4">
    <div class="dot-grid">
      <div v-for="i in daysInYear" :key="i" 
           class="dot-container" 
           @mouseenter="(e) => handleMouseEnter(e, i)" 
           @mouseleave="handleMouseLeave">
        <div class="dot" :class="{ 'active': i <= currentDay }"></div>
      </div>
    </div>

    <div class="dot-footer flex justify-between items-center px-1.5">
      <span class="font-mono text-xs">{{ year }}</span>
      <span class="text-xs">
        <span class="font-mono">{{ daysInYear - currentDay }}</span>
        <span class="ml-2 text-gray-500 font-medium">days left</span>
      </span>
    </div>

    <!-- 悬浮框 -->
    <div ref="tooltipRef"
         v-show="tooltipVisible"
         class="tooltip"
         :style="tooltipStyle">
      <div class="tooltip-content font-mono">
        {{ tooltipContent }}
      </div>
    </div>
  </div>
</template>

<style>
.days-card {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  background: var(--bg-color);
  border-radius: 18px;
  border: 1px solid color-mix(in oklab, var(--text-color) 15%, transparent);
  width: 100%;
}

.dot-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  gap: 0px;
}

.dot-container {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--text-color);
  opacity: 0.2;
}

.dot.active {
  opacity: 1;
}

.tooltip {
  position: absolute;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10; /* 添加z-index确保显示在上层 */
}

.tooltip-content {
  background: var(--text-color);
  color: var(--bg-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 500; /* 加粗文字 */
}

/* 浅色模式下加深文字颜色 */
:root:not(.dark) .tooltip-content {
  background: #000;
  color: #fff;
}
</style>
