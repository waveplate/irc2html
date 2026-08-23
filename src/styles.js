export const DEFAULT_CSS = `
.output-canvas {
  background: #000;
  display: block;
  flex: none;
  image-rendering: pixelated;
}

.output-canvas[hidden],
.output-text[hidden] {
  display: none !important;
}

.output-text {
  background: #000;
  color: #fff;
  contain: layout paint style;
  display: inline-block;
  flex: none;
  font-family: "Iosevka Fixed", monospace;
  font-kerning: none;
  font-size: 16px;
  font-synthesis: style weight;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  text-rendering: optimizeSpeed;
  user-select: text;
  box-sizing: border-box;
}

.output-text-row {
  display: flex;
  height: var(--output-line-height);
  line-height: var(--output-line-height);
  overflow: hidden;
  white-space: pre;
}

.output-text-run {
  display: block;
  flex: none;
  height: var(--output-line-height);
  line-height: var(--output-line-height);
  /* Close subpixel seams inside adjoining block-element glyphs. */
  text-shadow:
    -.1px 0 currentColor,
    .1px 0 currentColor,
    0 -.1px currentColor,
    0 .1px currentColor;
  white-space: pre;
}
`.trim();

export function injectDefaultStyles(doc = (typeof document !== "undefined" ? document : undefined)) {
  if (!doc || !doc.head) return undefined;
  let styleEl = doc.getElementById("irc2html-styles");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.id = "irc2html-styles";
    styleEl.textContent = DEFAULT_CSS;
    doc.head.appendChild(styleEl);
  }
  return styleEl;
}
