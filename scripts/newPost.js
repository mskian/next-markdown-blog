const fs = require("fs")
const moment = require("moment")
const prompt = require("prompt-sync")()
const slugify = require("@sindresorhus/slugify")

const title = prompt("Enter the Post Title: ")
const blogdir = "./content"
const postDate = moment().format("YYYY-MM-DD HH:mm:ss")

if (!title) {
  console.log("Please specify a post title.")
  return
}

const basename = `${slugify(title)}`
const postslug = slugify(title)

const contents = `---
title: "${title}"
description: ""
date: ${postDate}
slug: ${postslug}
---
`

fs.writeFile(`${blogdir}/${basename}.md`, contents, () =>
  console.log(`✔ Created ${blogdir}/${basename}.md`)
)
