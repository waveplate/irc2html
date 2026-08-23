# irc2html

DOM and canvas bitmap renderer for IRC (mIRC 16/99 color) and ANSI (16/256/24-bit Truecolor) terminal art.

**Live Demo**: [https://waveplate.github.io/irc2html/](https://waveplate.github.io/irc2html/)

Extracted from the `img2irc` web UI, it provides two rendering modes:
- **Native text DOM mode** (default): Renders art as selectable text in `<div>` rows and `<span>` text runs with advance calibration, subpixel anti-seam styling, and font sizing.
- **Bitmap canvas mode**: Renders art directly into an HTML `<canvas>` element with pixelated scaling.

## Defaults

- Default font family: `Iosevka Fixed, monospace`
- Default cell aspect ratio: `0.50`
- Default line height: `1.0x` (`1.0 * fontSize`)
- Default render mode: `text`

## Building

```bash
npm install
npm run build
npm test
```

Build outputs are generated in `dist/`:
- `dist/index.js` (ES module)
- `dist/index.cjs` (CommonJS module)
- `dist/irc2html.iife.js` (Browser global `window.Irc2Html`)
- `dist/styles.css` (Stylesheet for text and canvas containers)

## Usage

### 1. Native DOM Text Mode

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/styles.css">
</head>
<body>
  <div id="art-container"></div>

  <script type="module">
    import { render } from "./dist/index.js";

    const rawArt = "\x0304,01 ▄▄▄▄▄▄▄▄ \x03\n\x0308,01 █ Hello █ \x03\n\x0304,01 ▀▀▀▀▀▀▀▀ \x03";
    const container = document.getElementById("art-container");

    render(rawArt, container, {
      fontSize: 16,
    });
  </script>
</body>
</html>
```

### 2. Bitmap Canvas Mode

To render into a `<canvas>` element instead of DOM text:

```javascript
import { OutputPreview, render } from "./dist/index.js";

const container = document.getElementById("art-container");

// Option A: Render directly in bitmap mode
render(rawArt, container, {
  mode: "bitmap",
  fontSize: 16,
});

// Option B: Using OutputPreview with dynamic mode switching
const preview = new OutputPreview(container, {
  mode: "bitmap",
  fontSize: 16,
});

preview.draw(rawArt);

// Switch between modes at runtime
preview.setMode("text");   // Switches to native selectable DOM text
preview.setMode("bitmap"); // Switches back to canvas bitmap
```

### 3. Interactive Coordinates and Resizing

```javascript
import { OutputPreview } from "./dist/index.js";

const container = document.getElementById("art-container");
const preview = new OutputPreview(container, { fontSize: 16 });

preview.draw(rawArt);

// Adjust font size on the fly
preview.setOutputFontSize(20);

// Hit testing (mouse client coordinates to grid column/row)
container.addEventListener("mousemove", (event) => {
  const cell = preview.clientPointToCell(event.clientX, event.clientY);
  if (cell) {
    console.log(`Cell col: ${cell.x}, row: ${cell.y}`);
  }
});
```

### 4. Static HTML Generation (Node.js / SSR)

```javascript
import { toHtml, toHtmlDocument } from "./dist/index.js";

// Generate HTML snippet
const snippet = toHtml(rawArt, { fontSize: 16 });

// Generate a complete standalone HTML document
const htmlDoc = toHtmlDocument(rawArt, {
  title: "Terminal Art",
  fontSize: 16,
});
```

## Options Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'text' \| 'bitmap'` | `'text'` | Display mode: native DOM text or canvas bitmap |
| `fontFamily` | `string` | `'Iosevka Fixed, monospace'` | Font family string |
| `aspectRatio` | `number` | `0.50` | Character width-to-height ratio |
| `fontSize` | `number` | `16` | Font size in pixels |
| `lineHeight` | `number` | `fontSize * 1.0` | Line height in pixels |
| `cellAdvance` | `number` | `fontSize * 0.50` | Cell width advance in pixels |
| `format` | `'auto' \| 'irc' \| 'ansi' \| 'plain'` | `'auto'` | Format auto-detection or override |
| `palette` | `[number, number, number][]` | `IRC99` / `ANSI256` | Color palette array |
| `defaultForeground` | `[number, number, number]` | `[255, 255, 255]` | Fallback foreground RGB |
| `defaultBackground` | `[number, number, number]` | `[0, 0, 0]` | Fallback background RGB |
| `inlineStyles` | `boolean` | `true` | Apply inline styles on generated spans |
| `includeCss` | `boolean` | `false` | Prepend `<style>` block in `toHtml()` |

## Demo

- Live online: [https://waveplate.github.io/irc2html/](https://waveplate.github.io/irc2html/)
- Local: Open `demo/index.html` or `docs/index.html` in a web browser.
