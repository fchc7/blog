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

const calculateTooltipPosition = (event, index) => {
  const dot = event.target
  const card = dot.closest('.day-card')
  const dotRect = dot.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  
  // 获取点相对于卡片的位置
  const dotCenterX = dotRect.left - cardRect.left + dotRect.width / 2
  const dotCenterY = dotRect.top - cardRect.top + dotRect.height / 2
  
  // 计算点在卡片中的相对位置（四个象限）
  const isRight = dotCenterX > cardRect.width / 2
  const isBottom = dotCenterY > cardRect.height / 2
  
  const tooltipWidth = 80  // 减小宽度
  const tooltipHeight = 24  // 减小高度
  const padding = 4  // 减小间距
  
  let x, y
  
  // 修改位置计算逻辑
  if (isRight) {
    x = dotCenterX - tooltipWidth - 2  // 靠近点
  } else {
    x = dotCenterX + 2  // 靠近点
  }
  
  if (isBottom) {
    y = dotCenterY - tooltipHeight - 2
  } else {
    y = dotCenterY + 2
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
    <div class="day-card gap-4 p-5" :class="{ 'dark': isDark }">
      <div class="dot-grid">
        <div v-for="i in daysInYear" :key="i" class="dot-container" @mouseenter="(e) => handleMouseEnter(e, i)" @mouseleave="handleMouseLeave">
          <div class="dot" :class="{ 'active': i <= currentDay }"></div>
        </div>
      </div>

			<div class="dot-footer flex justify-between items-center">
				<span class="font-mono text-xs">{{ year }}</span>
				<span class="text-xs">
					<span class="font-mono">{{ daysInYear -currentDay }}</span>
					<span class="ml-1 text-gray-500 font-medium">days left</span>
				</span>
			</div>

						<!-- 悬浮框 -->
			<div ref="tooltipRef"
				 v-show="tooltipVisible"
				 class="tooltip"
				 :style="tooltipStyle"
			>
				<div class="tooltip-content font-mono">
					{{ tooltipContent }}
				</div>
			</div>
    </div>
  </template>
  
  <style>
  .day-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    background: var(--card-bg);
    color: var(--text-color);
    display: inline-flex;
    flex-direction: column;
  }
  
  .day-card.dark {
    --card-bg: #000;
    --text-color: #fff;
    --dot-color: rgba(255, 255, 255, 0.2);
  }
  
  .day-card:not(.dark) {
    --card-bg: #fff;
    --text-color: #000;
    --dot-color: rgba(0, 0, 0, 0.2);
  }
  
  .day-card:not(.dark) {
    --card-bg: #fff;
    --text-color: #000;
    --dot-color: rgba(0, 0, 0, 0.2);
  }
  
  .top {
    display: flex;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  .bottom {
    display: flex;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  .dot-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(15, 16px);
    gap: 0px;
  }

	.dot-container {
		position: relative;
		width: 16px;
		height: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: aquamarine; */
		opacity: .8;
	}
  
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--dot-color);
  }

	.dot.active {
		background-color: var(--text-color);
	}

	.tooltip {
		position: absolute;
		pointer-events: none;
		transition: all 0.2s ease;
	}

	.tooltip-content {
		background: var(--text-color);  /* 使用文字颜色作为背景 */
		color: var(--card-bg);         /* 使用卡片背景色作为文字颜色 */
		border: none;                  /* 移除边框 */
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 12px;
		white-space: nowrap;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
  </style>
