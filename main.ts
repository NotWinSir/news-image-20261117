// news-image-20261117 entry: deliver the finished front page image.
//
// The artwork lives in this repository as entry.png (designed in
// frontpage.html, rendered by build/render.mjs). The grader runs this
// program with no arguments and no network; all it has to do is place
// the image at <output>/entry.png, byte for byte.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");

// Fail loudly rather than deliver a broken image: the file must be a
// real PNG (magic bytes) and inside the brief's 1 MiB ceiling.
const bytes = readFileSync(src);
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
if (bytes.length > 1024 * 1024) {
  throw new Error("entry.png exceeds 1 MiB: " + bytes.length + " bytes");
}
if (!PNG_MAGIC.every((b, i) => bytes[i] === b)) {
  throw new Error("entry.png is not a PNG file");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));

console.log("entry.png written to " + outDir + " (" + bytes.length + " bytes)");
