export const DOCUMENT_CSS = `
@page {
  size: A4;
  margin: 2cm 2.5cm;
}

* { box-sizing: border-box; }

body {
  font-family: "Songti SC", "Noto Serif SC", "Source Han Serif CN", Georgia, "Times New Roman", serif;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  color: #1a1a1a;
  line-height: 1.8;
  font-size: 14px;
  background: #fff;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

h1, h2, h3, h4, h5, h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Helvetica, Arial, sans-serif;
  color: #111;
  margin-top: 1.8em;
  margin-bottom: 0.6em;
  line-height: 1.4;
  page-break-after: avoid;
}

h1 {
  font-size: 1.8em;
  border-bottom: 2px solid #222;
  padding-bottom: 0.3em;
  margin-top: 0;
}

h2 {
  font-size: 1.4em;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.25em;
}

h3 { font-size: 1.15em; }
h4 { font-size: 1em; }

p {
  margin: 0.8em 0;
  text-align: justify;
  orphans: 3;
  widows: 3;
}

ul, ol {
  padding-left: 2em;
  margin: 0.6em 0;
}

ul { list-style: disc; }
ol { list-style: decimal; }

li {
  margin: 0.25em 0;
  line-height: 1.7;
}

li > ul, li > ol { margin: 0.2em 0; }

blockquote {
  border-left: 3px solid #999;
  padding: 0.4em 1em;
  margin: 1em 0;
  color: #555;
  background: #fafafa;
  font-style: italic;
  page-break-inside: avoid;
}

blockquote p { margin: 0.4em 0; }

code {
  font-family: "SF Mono", "Fira Code", "Cascadia Code", Menlo, Consolas, monospace;
  background: #f0f0f0;
  padding: 0.15em 0.4em;
  border-radius: 3px;
  font-size: 0.88em;
  color: #c7254e;
}

pre {
  background: #2d2d2d;
  color: #ccc;
  padding: 1em 1.2em;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85em;
  line-height: 1.5;
  margin: 1em 0;
  page-break-inside: avoid;
  white-space: pre-wrap;
  word-wrap: break-word;
}

pre code {
  background: none;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  font-size: 0.92em;
  page-break-inside: avoid;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5em 0.8em;
  text-align: left;
}

th {
  background: #f5f5f5;
  font-weight: 600;
}

tr:nth-child(even) { background: #fafafa; }

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1em auto;
  page-break-inside: avoid;
}

a {
  color: #2563eb;
  text-decoration: underline;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2em 0;
}

input[type="checkbox"] {
  margin-right: 0.5em;
}

@media print {
  body { padding: 0; }
  pre { white-space: pre-wrap; word-wrap: break-word; }
  a[href]::after { content: " (" attr(href) ")"; font-size: 0.8em; color: #666; }
  a[href^="#"]::after, a[href^="javascript"]::after { content: ""; }
}
`;
