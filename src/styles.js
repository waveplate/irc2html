export const DEFAULT_CSS = `
.irc2html-output {
  background-color: var(--irc2html-bg, #000000);
  color: var(--irc2html-fg, #ffffff);
  contain: layout paint style;
  display: inline-block;
  flex: none;
  font-family: var(--irc2html-font-family, "Cascadia Code", "Iosevka Fixed", "Courier New", monospace);
  font-size: var(--irc2html-font-size, 16px);
  font-kerning: none;
  font-synthesis: style weight;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  line-height: var(--irc2html-line-height, 1em);
  letter-spacing: var(--irc2html-letter-spacing, 0px);
  text-rendering: optimizeSpeed;
  user-select: text;
  box-sizing: border-box;
}

.irc2html-row {
  display: flex;
  height: var(--irc2html-line-height, 1em);
  line-height: var(--irc2html-line-height, 1em);
  overflow: hidden;
  white-space: pre;
}

.irc2html-run {
  display: block;
  flex: none;
  height: var(--irc2html-line-height, 1em);
  line-height: var(--irc2html-line-height, 1em);
  text-shadow:
    -0.1px 0 currentColor,
    0.1px 0 currentColor,
    0 -0.1px currentColor,
    0 0.1px currentColor;
  white-space: pre;
}
`.trim();

/**
 * Injects default CSS into the document <head> if not already injected.
 * @param {Document} [doc] - Target document (defaults to global window.document).
 * @returns {HTMLStyleElement | undefined}
 */
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
