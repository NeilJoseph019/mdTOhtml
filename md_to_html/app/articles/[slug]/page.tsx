
import fs from "fs"
import path from "path"
import matter from 'gray-matter'
import { markdownToHtml } from '@/app/_utils/getArticle'

type slugProp = {
  params:  Promise<{
    slug: string
  }>
}

export async function generateStaticParams()  {
    const articlesDir = path.join(process.cwd(), "articlesMD")
    const files = fs.readdirSync(articlesDir)
    return files.filter((file) => file.endsWith(".md")).map((file) => ({slug: file.replace(/\.md$/, "")}))
}

const ArticlePage = async ({params }: slugProp) => {

  const { slug } = await params

  const articlesDir = path.join(process.cwd(), "articlesMD")
  const filesPath = path.join(articlesDir, `${slug}.md`)

  const fileContent =  fs.readFileSync(filesPath, "utf8")
  const { data: _, content } = matter(fileContent)
  const html = await markdownToHtml(content)

  return (
    <article className="prose mx-auto">
        <div className='prose ' dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

export default ArticlePage