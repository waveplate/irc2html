import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.resolve(rootDir, "src");
const distDir = path.resolve(rootDir, "dist");
const demoDir = path.resolve(rootDir, "demo");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log("Building irc2html with esbuild...");

// 1. Copy styles.css
fs.copyFileSync(
  path.join(srcDir, "styles.css"),
  path.join(distDir, "styles.css")
);

// 2. Copy TypeScript definition
fs.copyFileSync(
  path.join(srcDir, "index.d.ts"),
  path.join(distDir, "index.d.ts")
);

// 3. Bundle ESM (dist/index.js & demo/irc2html.js)
await esbuild.build({
  entryPoints: [path.join(srcDir, "index.js")],
  outfile: path.join(distDir, "index.js"),
  bundle: true,
  format: "esm",
  target: "es2020",
});

fs.copyFileSync(
  path.join(distDir, "index.js"),
  path.join(demoDir, "irc2html.js")
);

// 4. Bundle CJS (dist/index.cjs)
await esbuild.build({
  entryPoints: [path.join(srcDir, "index.js")],
  outfile: path.join(distDir, "index.cjs"),
  bundle: true,
  format: "cjs",
  target: "es2020",
});

// 5. Bundle IIFE Browser Global (dist/irc2html.iife.js)
await esbuild.build({
  entryPoints: [path.join(srcDir, "index.js")],
  outfile: path.join(distDir, "irc2html.iife.js"),
  bundle: true,
  format: "iife",
  globalName: "Irc2Html",
  target: "es2020",
});

console.log("Build complete! Output in dist/:");
fs.readdirSync(distDir).forEach((f) => {
  const stat = fs.statSync(path.join(distDir, f));
  console.log(` - ${f} (${(stat.size / 1024).toFixed(2)} KB)`);
});
