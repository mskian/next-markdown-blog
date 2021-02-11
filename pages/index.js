import React from "react"
import Head from "next/head"
import matter from "gray-matter"
import Link from "next/link"

const Index = ({ data, title, description, siteurl }) => {
  const RealData = data.map(blog => matter(blog))
  const ListItems = RealData.map(listItem => listItem.data)

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

        <title>{title}</title>
        <meta name="Description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://kavithai.santhoshveer.com/sankavithai.png"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/santhoshveercom"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://kavithai.santhoshveer.com/sankavithai.png"
        />
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
      <div className="container content">
        <div className="columns is-centered">
          <div className="column is-half">
            <br />
            <h1 className="title is-4 has-text-warning has-text-centered">
              படித்தால் பிடித்தது 🍔{" "}
            </h1>
            <br />
            <div>
              <ul>
                {ListItems.map((blog, i) => (
                  <li key={i} className="title is-6">
                    <Link href={`/${blog.slug}`}>
                      <a>{blog.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index

export async function getStaticProps() {
  const siteData = await import(`../config.json`)
  const fs = require("fs")

  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8")

  const blogs = files.filter(fn => fn.endsWith(".md"))

  const data = blogs.map(blog => {
    const path = `${process.cwd()}/content/${blog}`
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    })

    return rawContent
  })

  return {
    props: {
      data: data,
      title: siteData.default.title,
      description: siteData.default.description,
      siteurl: siteData.default.siteurl,
    },
  }
}
