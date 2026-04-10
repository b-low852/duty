import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "..", "index.html");

if (process.env.VERCEL !== "1" || !process.env.VERCEL_URL) {
  process.exit(0);
}

const origin = `https://${process.env.VERCEL_URL}`;
let html = fs.readFileSync(htmlPath, "utf8");
if (!html.includes("__OG_ORIGIN__")) {
  process.exit(0);
}
html = html.replaceAll("__OG_ORIGIN__", origin);
fs.writeFileSync(htmlPath, html);
