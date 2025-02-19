import { defineLoader } from 'vitepress'

export interface PostItem {
    // data 类型
    title: string
    date: string
    tags?: string[]
    description?: string
}

declare const data: PostItem[]
export { data }

export default defineLoader({
    load() {
        // 生成模拟数据
        const posts = [
            {
                title: '从 Host 到 Serverless: 博客架构升级实践',
                date: '2025-02-19',
                tags: ['Web'],
                description: '本文记录了博客从传统的 Host + CDN 架构迁移到 Serverless 架构的过程，提升了性能、部署速度及 URL 重定向管理。通过升级到 Astro 5，博客构建时间显著缩短，性能得到优化。'
            },
            {
                title: '精确掌控 SwiftUI 滚动：自定义 Paging 实现',
                date: '2025-02-12',
                tags: ['SwiftUI', 'Rust'],
                description: 'SwiftUI scrollTargetBehavior 让滚动控制更精准，'
            },
            {
                title: '为何 Swift 6 中某些视图修饰器无法使用 @State 属性',
                date: '2024-12-24',
                tags: ['SwiftUI', 'Js'],
                description: '详解 Swift 6 中 SwiftUI 视图修饰器无法使用 @State 的原因，深入剖析 alignmentGuide 等修饰器报错机制，提供基于 wrappedValue 的解决方案。'
            },
            {
                title: 'SwiftUI onAppear 异常调用的陷阱与应对策略',
                date: '2024-12-18',
                tags: ['Kotlin'],
                description: '揭示 SwiftUI onAppear 的异常调用陷阱，分析其触发规律及对应用状态的影响，并提供临时应对策略。避免不必要的性能开销和状态变化。'
            }
        ]

        return posts
    }
})