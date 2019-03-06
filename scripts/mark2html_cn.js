// 编译脚本
const glob = require('glob');
const {resolve} =  require('path');
const fs = require('fs');
const marked = require('marked');

const returnHtmlModel = (markedBody) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="include/github-markdown.css">
    <title>${markedBody.title}</title>
  </head>
  <body class="markdown-body">${markedBody.body}</body>
  </html>`
};

glob.sync(resolve(__dirname, '../', 'cn/*.md'))
  .forEach(path => {
    const file = fs.readFileSync(path, 'utf-8');
    const markedBody = {
      title: path.match(/[\w-]*(?=\.md)/)[0],
      body: marked(file)
    }
    const html = returnHtmlModel(markedBody);
    fs.writeFileSync(resolve(__dirname, '../', `${markedBody.title}.html`), html, 'utf-8');
  });
