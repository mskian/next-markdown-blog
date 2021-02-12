import Head from "next/head"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

export default function BlogPost({
  blogurl,
  blogog,
  frontmatter,
  markdownBody,
}) {
  //if (!frontmatter) return <></>

  const siteurl = blogurl + frontmatter.slug + "/"

  return (
    <section className="section">
      <Head>
        <meta charSet="utf-8" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />

        <title>{frontmatter.title}</title>
        <meta name="Description" content={frontmatter.description} />

        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:site_name" content={frontmatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={blogog} />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/santhoshveercom"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={blogog} />
        <meta name="twitter:site" content="@santhoshveerece" />
        <link rel="canonical" href={siteurl} />
        <meta name="twitter:url" content={siteurl} />
        <meta property="og:url" content={siteurl} />

        <link rel="preconnect" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//cdnjs.cloudflare.com" />
        <link rel="preconnect" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://analytics.google.com" />
      </Head>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <br />
            <h1>{frontmatter.title}</h1>
            <hr />
            <p>{frontmatter.content}</p>
            <ReactMarkdown escapeHtml={true} source={markdownBody} />
            <br />
            <Link href="/">
              <a>🏠 Back to Home</a>
            </Link>
            <br />
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { blog } = ctx.params

  const content = await import(`../content/${blog}.md`)
  const siteData = await import(`../config.json`)
  const data = matter(content.default)

  return {
    props: {
      blogurl: siteData.siteurl,
      blogog: siteData.ogimage,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = (context => {
    const keys = context.keys()
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3)

      return slug
    })
    return data
  })(require.context("../content", true, /\.md$/))

  const paths = blogSlugs.map(slug => `/${slug}`)

  return {
    paths,
    fallback: false,
  }
}
