/**
 * irc2html - Fast, native DOM and HTML renderer for IRC and ANSI art
 */

export { parse } from "./parser.js";
export { parseIrc } from "./parser-irc.js";
export { parseAnsi } from "./parser-ansi.js";

export {
  toDOM,
  renderTo,
  renderTo as render,
  calculateMetrics,
  applyMetricsToElement,
  buildDOMRows,
} from "./dom-renderer.js";

export {
  toHtml,
  toHtmlDocument,
} from "./html-renderer.js";

export {
  IrcViewer,
  IrcViewer as IrcArtViewer,
} from "./viewer.js";

export {
  DEFAULT_CSS,
  injectDefaultStyles,
} from "./styles.js";

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
