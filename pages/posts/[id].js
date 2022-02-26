import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Date from "../../components/date"
import utilStyles from "../../styles/utils.module.css"
import NextHeadSeo from 'next-head-seo';

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  const pageUrl = `https://www.kota-kanazawa.com/posts/${postData.id}`
  const postTitle = postData.title

  return (
    <Layout>
      <NextHeadSeo
        title={`${postTitle} | Kota Kanazawa`}
        canonical={pageUrl}
        og={{
          title: postTitle,
          image: "/images/ogp.jpg"
        }}
      />
      <article>
        <h1 className={utilStyles.headingXl}>{postTitle}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
