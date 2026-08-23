import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.resolve(rootDir, "src");
const distDir = path.resolve(rootDir, "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log("Building irc2html...");

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

const files = [
  "palettes.js",
  "utils.js",
  "styles.js",
  "parser-irc.js",
  "parser-ansi.js",
  "parser.js",
  "output-preview.js",
  "html-renderer.js",
];

let bundledSource = "";
for (const file of files) {
  let content = fs.readFileSync(path.join(srcDir, file), "utf8");
  content = content.replace(/^import\s+.*?from\s+["'].\/.*?["'];?\s*$/gm, "");
  bundledSource += `\n// --- ${file} ---\n` + content;
}

// 3. Generate ESM single bundle (dist/index.js)
const esmBundle = bundledSource + `
export {
  OutputPreview,
  render,
  renderTo,
  parse,
  parseIrc,
  parseAnsi,
  toHtml,
  toHtmlDocument,
  DEFAULT_CSS,
  injectDefaultStyles,
  IRC99_HEX,
  ANSI256_HEX,
  IRC99_PALETTE,
  MIRC16_PALETTE,
  ANSI256_PALETTE,
  ANSI16_PALETTE,
  rgbToString,
  rgbToHex,
  hexNumberToRgb,
  parseHexString,
  getIrcColor,
  getAnsiColor,
  escapeHtml,
  displayStyle,
  sameStyle,
  detectFormat
};
`;
fs.writeFileSync(path.join(distDir, "index.js"), esmBundle);

// 4. Generate CJS single bundle (dist/index.cjs)
let cjsSource = bundledSource.replace(/^export\s+(?:async\s+)?function\s+([a-zA-Z0-9_$]+)/gm, "function $1");
cjsSource = cjsSource.replace(/^export\s+const\s+([a-zA-Z0-9_$]+)/gm, "const $1");
cjsSource = cjsSource.replace(/^export\s+class\s+([a-zA-Z0-9_$]+)/gm, "class $1");
cjsSource = cjsSource.replace(/^export\s+let\s+([a-zA-Z0-9_$]+)/gm, "let $1");

const cjsBundle = `"use strict";\n` + cjsSource + `
module.exports = {
  OutputPreview,
  render,
  renderTo,
  parse,
  parseIrc,
  parseAnsi,
  toHtml,
  toHtmlDocument,
  DEFAULT_CSS,
  injectDefaultStyles,
  IRC99_HEX,
  ANSI256_HEX,
  IRC99_PALETTE,
  MIRC16_PALETTE,
  ANSI256_PALETTE,
  ANSI16_PALETTE,
  rgbToString,
  rgbToHex,
  hexNumberToRgb,
  parseHexString,
  getIrcColor,
  getAnsiColor,
  escapeHtml,
  displayStyle,
  sameStyle,
  detectFormat
};
`;
fs.writeFileSync(path.join(distDir, "index.cjs"), cjsBundle);

// 5. Generate Browser IIFE bundle (dist/irc2html.iife.js)
const iifeBundle = `(function (global) {
  "use strict";

${cjsSource}

  var Irc2Html = {
    OutputPreview: OutputPreview,
    render: render,
    renderTo: renderTo,
    parse: parse,
    parseIrc: parseIrc,
    parseAnsi: parseAnsi,
    toHtml: toHtml,
    toHtmlDocument: toHtmlDocument,
    DEFAULT_CSS: DEFAULT_CSS,
    injectDefaultStyles: injectDefaultStyles,
    IRC99_HEX: IRC99_HEX,
    ANSI256_HEX: ANSI256_HEX,
    IRC99_PALETTE: IRC99_PALETTE,
    MIRC16_PALETTE: MIRC16_PALETTE,
    ANSI256_PALETTE: ANSI256_PALETTE,
    ANSI16_PALETTE: ANSI16_PALETTE,
    rgbToString: rgbToString,
    rgbToHex: rgbToHex,
    hexNumberToRgb: hexNumberToRgb,
    parseHexString: parseHexString,
    getIrcColor: getIrcColor,
    getAnsiColor: getAnsiColor,
    escapeHtml: escapeHtml,
    displayStyle: displayStyle,
    sameStyle: sameStyle,
    detectFormat: detectFormat
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Irc2Html;
  }
  global.Irc2Html = Irc2Html;
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
`;

fs.writeFileSync(path.join(distDir, "irc2html.iife.js"), iifeBundle);

console.log("Build complete! Output in dist/:");
fs.readdirSync(distDir).forEach((f) => {
  const stat = fs.statSync(path.join(distDir, f));
  console.log(` - ${f} (${(stat.size / 1024).toFixed(2)} KB)`);
});
