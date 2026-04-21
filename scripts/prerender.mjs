import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.join(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const serverEntryPath = path.join(distDir, "server", "entry-server.js");

const html = await fs.readFile(indexPath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);
const { appHtml } = render("/");

const preloadLinks = Array.from(
  appHtml.matchAll(/<link rel="preload"[^>]*>/g),
  (match) => match[0]
);
const appHtmlWithoutPreloads = appHtml.replace(/<link rel="preload"[^>]*>/g, "");

let renderedHtml = html.replace(
  /<div id="root"><\/div>/,
  `<div id="root">${appHtmlWithoutPreloads}</div>`
);

if (preloadLinks.length > 0) {
  const uniquePreloads = [...new Set(preloadLinks)].join("\n    ");
  renderedHtml = renderedHtml.replace("</head>", `    ${uniquePreloads}\n  </head>`);
}

await fs.writeFile(indexPath, renderedHtml, "utf8");
await fs.rm(path.join(distDir, "server"), { recursive: true, force: true });
