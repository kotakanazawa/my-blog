import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from 'remark-html'

// /Users/kanazawa/dev/nextjs/nextjs-blog/posts ローカル
const postsDirectory = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  // [ 'pre-rendering.md', 'ssg-ssr.md' ]
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // pre-rendering, ssg-ssr が返る。idというよりはslug
    const id = fileName.replace(/\.md$/, "")

    // /Users/kanazawa/dev/nextjs/nextjs-blog/posts/pre-rendering.md, ~/ssg-ssr.md
    const fullPath = path.join(postsDirectory, fileName)

    // 記事の中身を取得
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // metadataをパース
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
