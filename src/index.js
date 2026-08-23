/**
 * irc2html - Native DOM and HTML renderer for IRC and ANSI art extracted from img2irc
 */

export { OutputPreview, render, renderTo } from "./output-preview.js";
export { parse } from "./parser.js";
export { parseIrc } from "./parser-irc.js";
export { parseAnsi } from "./parser-ansi.js";
export { toHtml, toHtmlDocument } from "./html-renderer.js";
export { DEFAULT_CSS, injectDefaultStyles } from "./styles.js";

export {
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
} from "./palettes.js";

export {
  escapeHtml,
  displayStyle,
  sameStyle,
  detectFormat,
} from "./utils.js";
