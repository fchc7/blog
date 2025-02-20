import { createContentLoader } from 'vitepress'
import dayjs from 'dayjs'

export interface PostItem {
    // data 类型
    title: string
    date: string
    tags?: string[]
    url?: string,
    excerpt?: string
}

declare const data: PostItem[]
export { data }

export default createContentLoader('posts/*.md', {
    excerpt: true,
    transform(rawData): PostItem[] {
        return rawData.map((page) => {
            return {
                title: page.frontmatter.title,
                date: dayjs(page.frontmatter.date).format('YYYY-MM-DD'),
                excerpt: deleteP(page.excerpt),
                tags: page.frontmatter.tags,
                url: page.url,
            }
        }).sort((a, b) => {
            return +new Date(b.date) - +new Date(a.date)
        })
    }
})

/**
 * 删除 excerpt 中的 <p /> 标签
 */
function deleteP(excerpt?: string) {
    if (!excerpt) return ''
    return excerpt.replace(/<p>/g, '').replace(/<\/p>/g, '')
}