# irc2html 🎨

Fast, zero-dependency, native DOM and HTML renderer for IRC and ANSI terminal art on the web.

Directly derived from the `img2irc` native text rendering engine, **irc2html** renders raw art into crisp, selectable browser DOM elements (`<div>` rows and `<span>` text runs) using exact monospace font advance calibration and CSS subpixel anti-seam techniques.

---

## ⚙️ Defaults

- **Default Font Family**: `Iosevka Fixed, monospace`
- **Default Cell Aspect Ratio**: `0.50` (character width = 0.5 × font size)
- **Default Line Height**: `1.0x` (1.0 × font size)

---

## 📦 Installation

```bash
npm install irc2html
```

Or include directly in HTML:

```html
<link rel="stylesheet" href="node_modules/irc2html/dist/styles.css">
<script type="module">
  import { render, OutputPreview } from "irc2html";
</script>
```

---

## 🚀 Usage Example: Rendering Raw Art to a DOM Element

### 1. Simple HTML & Script

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/irc2html/dist/styles.css">
</head>
<body>
  <!-- Container where the art will be rendered -->
  <div id="terminal-art"></div>

  <script type="module">
    import { render } from "irc2html";

    // Raw IRC art string with mIRC color codes (\x03fg,bg)
    const rawArt = "\x0304,01 ▄▄▄▄▄▄▄▄ \x03\n\x0308,01 █ Hello █ \x03\n\x0304,01 ▀▀▀▀▀▀▀▀ \x03";
    const element = document.getElementById("terminal-art");

    // Render directly into the element
    render(rawArt, element, {
      fontSize: 16, // defaults to Iosevka Fixed, aspect ratio 0.5, line-height 1x
    });
  </script>
</body>
</html>
```

### 2. Using `OutputPreview` instance for Dynamic Updates

```javascript
import { OutputPreview } from "irc2html";

const container = document.getElementById("terminal-art");
const preview = new OutputPreview(container, {
  fontSize: 16,
});

// Render initial raw art
preview.draw(rawArtString);

// Update dynamically
preview.setOutputFontSize(20);
preview.draw(anotherArtString);

// Interactive hit-testing (mouse/touch coordinates -> grid cell)
container.addEventListener("mousemove", (event) => {
  const result = preview.clientPointToCell(event.clientX, event.clientY);
  if (result) {
    console.log(`Hovered cell (${result.x}, ${result.y})`);
  }
});
```

### 3. Server-Side / Static HTML String Generation

```javascript
import { toHtml, toHtmlDocument } from "irc2html";

// Generate HTML snippet
const snippet = toHtml(rawArtString);

// Generate standalone HTML document with embedded styles
const fullDoc = toHtmlDocument(rawArtString, {
  title: "My Terminal Art",
  fontSize: 16,
});
```

---

## ⚙️ Options Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fontFamily` | `string` | `'Iosevka Fixed, monospace'` | Monospace font family string |
| `aspectRatio` | `number` | `0.50` | Character width-to-height ratio |
| `fontSize` | `number` | `16` | Font size in pixels |
| `lineHeight` | `number` | `fontSize * 1.0` | Line height in pixels |
| `cellAdvance` | `number` | `fontSize * 0.50` | Character cell width advance in pixels |
| `format` | `'auto' \| 'irc' \| 'ansi' \| 'plain'` | `'auto'` | Input format detection mode |
| `palette` | `[r, g, b][]` | `IRC99` / `ANSI256` | Custom RGB color palette array |
| `defaultForeground` | `[r, g, b]` | `[255, 255, 255]` | Fallback foreground RGB color |
| `defaultBackground` | `[r, g, b]` | `[0, 0, 0]` | Fallback background RGB color |
| `inlineStyles` | `boolean` | `true` | Apply inline styles on elements |

---

## 🧪 Running the Demo

Open [`demo/index.html`](demo/index.html) directly in any browser (via `file:///` or any web server).

```bash
npm run build
npm test
```

---

## 📄 License

MIT © irc2html contributors
