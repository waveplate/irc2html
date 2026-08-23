import { rgbToString } from "./palettes.js";

/**
 * Escapes characters for safe HTML output.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (!str) return "";
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Resolves the computed display style for a character cell.
 * Swaps foreground and background when inverted.
 * @param {object} cell
 * @param {[number, number, number]} [defaultFg=[255, 255, 255]]
 * @param {[number, number, number]} [defaultBg=[0, 0, 0]]
 * @returns {object}
 */
export function displayStyle(cell, defaultFg = [255, 255, 255], defaultBg = [0, 0, 0]) {
  const rawFg = cell.foreground ?? defaultFg;
  const rawBg = cell.background ?? defaultBg;

  let foreground = cell.inverted ? rawBg : rawFg;
  let background = cell.inverted ? rawFg : (cell.background ?? defaultBg);

  if (cell.dim) {
    foreground = [
      Math.round(foreground[0] * 0.7),
      Math.round(foreground[1] * 0.7),
      Math.round(foreground[2] * 0.7),
    ];
  }

  return {
    foreground,
    background,
    bold: Boolean(cell.bold),
    dim: Boolean(cell.dim),
    italic: Boolean(cell.italic),
    underline: Boolean(cell.underline),
    strikethrough: Boolean(cell.strikethrough),
    hidden: Boolean(cell.hidden),
  };
}

/**
 * Determines if two computed styles are visually identical.
 * @param {object} left
 * @param {object} right
 * @returns {boolean}
 */
export function sameStyle(left, right) {
  if (!left || !right) return false;
  return (
    left.bold === right.bold &&
    left.dim === right.dim &&
    left.italic === right.italic &&
    left.underline === right.underline &&
    left.strikethrough === right.strikethrough &&
    left.hidden === right.hidden &&
    left.foreground[0] === right.foreground[0] &&
    left.foreground[1] === right.foreground[1] &&
    left.foreground[2] === right.foreground[2] &&
    left.background[0] === right.background[0] &&
    left.background[1] === right.background[1] &&
    left.background[2] === right.background[2]
  );
}

/**
 * Automatically detects whether raw art text uses ANSI sequences or IRC codes.
 * @param {string} text
 * @returns {'ansi' | 'irc' | 'plain'}
 */
export function detectFormat(text) {
  if (!text || typeof text !== "string") return "plain";

  // Check for ANSI CSI or OSC escape codes
  if (/\x1b\[|\u001b\[|\x1b\]|\u001b\]/.test(text)) {
    return "ansi";
  }

  // Check for IRC control codes (\x03 color, \x02 bold, \x1D italic, \x1F underline, \x16 reverse, \x0F reset, \x04 hex)
  if (/[\x02\x03\x04\x0F\x11\x16\x1D\x1E\x1F]/.test(text)) {
    return "irc";
  }

  return "plain";
}
