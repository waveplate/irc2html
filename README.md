# irc2html 🎨

Fast, zero-dependency, native DOM and HTML renderer for IRC and ANSI terminal art on the web.

Unlike canvas- or bitmap-based renderers, **irc2html** renders art into real, selectable browser DOM elements (`<div>` rows and `<span>` text runs) using font metrics, CSS subpixel seam-closing, and adjacent style coalescing.

---

## ✨ Features

- **Native Text Rendering**: Pure HTML & CSS output. Selectable, copyable text that scales cleanly at any zoom level.
- **IRC / mIRC Support**: Full support for standard mIRC control codes (`\x03` colors, `\x02` bold, `\x1D` italic, `\x1F` underline, `\x16` invert, `\x0F` reset) and modern `\x04RRGGBB` 24-bit hex colors.
- **Full 99-Color IRC Palette**: Built-in 99-color mIRC palette and 16-color legacy palette.
- **ANSI / VT100 / xterm Support**: CSI SGR sequence parsing, supporting 16 standard/bright colors, 256 xterm colors (`38;5;n`), and 24-bit truecolor RGB (`38;2;r;g;b`).
- **Style Coalescing**: Automatically merges consecutive characters with identical colors and attributes into a single `<span>`, minimizing DOM overhead and maximizing render performance.
- **Anti-Seam Block Rendering**: Uses CSS text-shadow techniques to eliminate subpixel gaps between adjoining box-drawing and half-block characters (such as `█`, `▀`, `▄`, `🭞`, `🬽`).
- **Precise Font & Grid Metrics**: Calibrates font advance, letter spacing, and line heights for a crisp, aligned character grid.
- **SSR & Export Ready**: Generate standalone HTML documents or HTML string fragments for server-side rendering, static blogs, email, or chat embeds.
- **Interactive Viewer**: `IrcViewer` component with coordinate hit-testing (`clientPointToCell`), responsive font resizing, and clipboard export.
- **Zero Runtime Dependencies**: Ultra-lightweight and compatible with modern Browsers, Node.js, Deno, and Bun.

---

## 📦 Installation

```bash
npm install irc2html
```

Or use directly via ES Modules or script tag in the browser:

```html
<!-- ES Module -->
<script type="module">
  import { render, toHtml, IrcViewer } from "irc2html";
</script>

<!-- Or standalone UMD/IIFE script -->
<script src="dist/irc2html.iife.js"></script>
<!-- Exposes global window.Irc2Html -->
```

---

## 🚀 Quick Start

### 1. Render directly to a DOM element

```javascript
import { render } from "irc2html";

const rawIrcArt = "\x0304,01Hello \x0309World!\x0F";
const target = document.getElementById("art-container");

render(rawIrcArt, target, {
  fontSize: 16,
  fontFamily: "Cascadia Code, monospace",
});
```

### 2. Generate an HTML string (for SSR, static export, or clipboard)

```javascript
import { toHtml, toHtmlDocument } from "irc2html";

// HTML fragment
const htmlSnippet = toHtml(rawAnsiArt, {
  fontSize: 16,
  inlineStyles: true,
});

// Full standalone HTML document with embedded CSS
const fullDocument = toHtmlDocument(rawAnsiArt, {
  title: "My Terminal Art",
  fontSize: 16,
});
```

### 3. Interactive Viewer Component

```javascript
import { IrcViewer } from "irc2html";

const container = document.getElementById("viewer-container");
const viewer = new IrcViewer(container, {
  fontSize: 16,
  fontFamily: "monospace",
  theme: "dark",
});

// Load art
viewer.setArt(rawArt);

// Dynamic updates
viewer.setFontSize(20);
viewer.setFontFamily("Iosevka Fixed");

// Interactive hit-testing (mouse/touch coordinates -> grid cell)
container.addEventListener("mousemove", (event) => {
  const result = viewer.clientPointToCell(event.clientX, event.clientY);
  if (result) {
    console.log(`Hovered cell (${result.x}, ${result.y}):`, result.cell);
  }
});

// Copy helpers
await viewer.copyHtml();
await viewer.copyText();
```

---

## ⚙️ Options Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `format` | `'auto' \| 'irc' \| 'ansi' \| 'plain'` | `'auto'` | Input format detection mode |
| `fontSize` | `number \| string` | `16` | Font size in pixels (e.g. `16` or `'16px'`) |
| `fontFamily` | `string` | `'monospace'` | Monospace font family string |
| `lineHeight` | `number` | `fontSize * 1.0` | Line height in pixels |
| `cellAdvance` | `number` | auto | Character cell width advance in pixels |
| `aspectRatio` | `number` | `0.55` | Default character width-to-height ratio |
| `autoMeasure` | `boolean` | `true` | Auto-measure font width using canvas to set crisp `letter-spacing` |
| `theme` | `'dark' \| 'light' \| 'transparent'` | `'dark'` | Visual theme background |
| `defaultForeground` | `[r, g, b]` | `[255, 255, 255]` | Fallback foreground RGB color |
| `defaultBackground` | `[r, g, b]` | `[0, 0, 0]` | Fallback background RGB color |
| `tabWidth` | `number` | `8` | Tab stop column width |
| `palette` | `[r, g, b][]` | `IRC99` / `ANSI256` | Custom RGB color palette array |
| `trimTrailingSpaces` | `boolean` | `false` | Trim trailing whitespace from each line |
| `trimTrailingEmptyRows` | `boolean` | `false` | Trim trailing empty rows from the grid |
| `inlineStyles` | `boolean` | `true` | Apply inline styles on elements for portable HTML |
| `injectStyles` | `boolean` | `true` | Auto-inject default CSS into `document.head` |

---

## 🎨 Palettes & Custom Colors

`irc2html` exports built-in color palettes and utilities:

```javascript
import {
  IRC99_PALETTE,
  MIRC16_PALETTE,
  ANSI256_PALETTE,
  ANSI16_PALETTE,
  getIrcColor,
  getAnsiColor,
  rgbToString,
  rgbToHex,
} from "irc2html";

// Retrieve colors
const red = getIrcColor(4); // [255, 0, 0]
const colorString = rgbToString(red); // "rgb(255 0 0)"
```

---

## 🧩 DOM Structure & CSS

When rendered to DOM, `irc2html` generates the following semantic markup:

```html
<div class="irc2html-output" role="img" aria-label="Rendered terminal art">
  <div class="irc2html-row">
    <span class="irc2html-run" style="color: rgb(255 0 0); background-color: rgb(0 0 0);">Text</span>
    <span class="irc2html-run" style="color: rgb(0 255 0); background-color: rgb(0 0 0);">Run</span>
  </div>
</div>
```

The accompanying stylesheet (`irc2html/css` or `src/styles.css`):
- Sets `contain: layout paint style` for high-performance rendering.
- Disables ligatures and kerning (`font-feature-settings: "liga" 0, "calt" 0`) to preserve terminal grid alignment.
- Applies subtle subpixel text-shadows (`-0.1px 0 currentColor, 0.1px 0 currentColor, ...`) to seamlessly close rendering gaps between adjacent block characters.

---

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```

---

## 📄 License

MIT © irc2html contributors
