const fs = require("fs")
const prompt = require("prompt-sync")()
const slugify = require("@sindresorhus/slugify")

const title = prompt("Enter the Post Title: ")
const blogdir = "./content"

if (!title) {
  console.log("Please specify a post title.")
  return
}

const basename = `${slugify(title)}`
const postslug = slugify(title)

const contents = `---
title: "${title}"
description: ""
author: "Santhosh Veer"
slug: ${postslug}
---
`

fs.writeFile(`${blogdir}/${basename}.md`, contents, () =>
  console.log(`✔ Created ${blogdir}/${basename}.md`)
)
