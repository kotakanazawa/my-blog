import Layout, { siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"
import NextHeadSeo from "next-head-seo"

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const pageUrl = `https://www.kota-kanazawa.com/`

  return (
    <Layout home>
      <NextHeadSeo
        title={siteTitle}
        canonical={pageUrl}
        description={"A portfolio by Kota Kanazawa"}
        og={{
          title: siteTitle,
          image: "/images/profile.jpg",
          type: 'article',
          siteName: siteTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <section className={utilStyles.headingMd}>
        <p>
          夫&2児の父、ソフトウェアエンジニアです。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
