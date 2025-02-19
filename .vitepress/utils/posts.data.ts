import { defineLoader } from 'vitepress'

export interface PostItem {
    // data 类型
    title: string
    date: string
    tags: string[]
}

declare const data: PostItem[]
export { data }

export default defineLoader({
    load() {
        // 生成模拟数据
        const posts = [
            {
                title: 'Zed now predicts your next edit with Zeta, our new open model',
                date: '2025-02-19',
                tags: ['zed', 'open model', 'ai'],
            },
            {
                title: '使用本地文件生成数据',
                date: '2025-02-18',
                tags: ['local file', 'data generation'],
            },
            {
                title: '构建时数据加载',
                date: '2025-02-01',
                tags: ['build time', 'data loading'],
            },
            {
                title: 'VuePress 又是什么？',
                date: '2025-01-27',
                tags: ['vuepress', 'documentation'],
            },
            {
                title: 'VuePress 又是什么？',
                date: '2025-01-27',
                tags: ['vuepress', 'documentation'],
            },
            {
                title: 'VitePress 和 VuePress 之间的 API 区别主要在于主题和自定义',
                date: '2025-01-17',
                tags: ['vitepress', 'vuepress', 'api'],
            },
        ]

        return posts
    }
})