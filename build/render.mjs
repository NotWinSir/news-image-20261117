// Renders frontpage.html to entry.png at exactly 1024x1024.
// Run with the puppeteer install in ~/workspace/makefun/shots-tool:
//   NODE_PATH=~/workspace/makefun/shots-tool/node_modules node build/render.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const puppeteer = require(join(process.env.HOME, "workspace/makefun/shots-tool/node_modules/puppeteer"));

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await page.goto("file://" + join(root, "frontpage.html"), { waitUntil: "load" });
  await page.screenshot({ path: join(root, "entry.png"), type: "png" });
  console.log("wrote entry.png");
} finally {
  await browser.close();
}
