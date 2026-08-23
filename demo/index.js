
// --- palettes.js ---
/**
 * Hex color values for standard 99 mIRC / IRC palette.
 * Exact match to img2irc's IRC99 palette.
 */
export const IRC99_HEX = [
  0xffffff, 0x000000, 0x00007f, 0x009300, 0xff0000, 0x7f0000, 0x9c009c, 0xfc7f00, 0xffff00,
  0x00fc00, 0x009393, 0x00ffff, 0x0000fc, 0xff00ff, 0x555555, 0xaaaaaa, 0x470000, 0x472100,
  0x474700, 0x324700, 0x004700, 0x00472c, 0x004747, 0x002747, 0x000047, 0x2e0047, 0x470047,
  0x47002a, 0x740000, 0x743a00, 0x747400, 0x517400, 0x007400, 0x007449, 0x007474, 0x004074,
  0x000074, 0x4b0074, 0x740074, 0x740045, 0xb50000, 0xb56300, 0xb5b500, 0x7db500, 0x00b500,
  0x00b571, 0x00b5b5, 0x0063b5, 0x0000b5, 0x7500b5, 0xb500b5, 0xb5006b, 0xff0000, 0xff8c00,
  0xffff00, 0xb2ff00, 0x00ff00, 0x00ffa0, 0x00ffff, 0x008cff, 0x0000ff, 0xa500ff, 0xff00ff,
  0xff0098, 0xff5959, 0xffb459, 0xffff71, 0xcfff60, 0x6fff6f, 0x65ffc9, 0x6dffff, 0x59b4ff,
  0x5959ff, 0xc459ff, 0xff66ff, 0xff59bc, 0xff9c9c, 0xffd39c, 0xffff9c, 0xe2ff9c, 0x9cff9c,
  0x9cffdb, 0x9cffff, 0x9cd3ff, 0x9c9cff, 0xdc9cff, 0xff9cff, 0xff94d3, 0x000000, 0x131313,
  0x282828, 0x363636, 0x4d4d4d, 0x656565, 0x818181, 0x9f9f9f, 0xbcbcbc, 0xe2e2e2, 0xffffff,
];

/**
 * Hex color values for standard 256 ANSI / xterm color palette.
 * Exact match to img2irc's ANSI256 palette.
 */
export const ANSI256_HEX = [
  0x000000, 0x800000, 0x008000, 0x808000, 0x000080, 0x800080, 0x008080, 0xc0c0c0, 0x808080,
  0xff0000, 0x00ff00, 0xffff00, 0x0000ff, 0xff00ff, 0x00ffff, 0xffffff, 0x000000, 0x00005f,
  0x000087, 0x0000af, 0x0000d7, 0x0000ff, 0x005f00, 0x005f5f, 0x005f87, 0x005faf, 0x005fd7,
  0x005fff, 0x008700, 0x00875f, 0x008787, 0x0087af, 0x0087d7, 0x0087ff, 0x00af00, 0x00af5f,
  0x00af87, 0x00afaf, 0x00afd7, 0x00afff, 0x00d700, 0x00d75f, 0x00d787, 0x00d7af, 0x00d7d7,
  0x00d7ff, 0x00ff00, 0x00ff5f, 0x00ff87, 0x00ffaf, 0x00ffd7, 0x00ffff, 0x5f0000, 0x5f005f,
  0x5f0087, 0x5f00af, 0x5f00d7, 0x5f00ff, 0x5f5f00, 0x5f5f5f, 0x5f5f87, 0x5f5faf, 0x5f5fd7,
  0x5f5fff, 0x5f8700, 0x5f875f, 0x5f8787, 0x5f87af, 0x5f87d7, 0x5f87ff, 0x5faf00, 0x5faf5f,
  0x5faf87, 0x5fafaf, 0x5fafd7, 0x5fafff, 0x5fd700, 0x5fd75f, 0x5fd787, 0x5fd7af, 0x5fd7d7,
  0x5fd7ff, 0x5fff00, 0x5fff5f, 0x5fff87, 0x5fffaf, 0x5fffd7, 0x5fffff, 0x870000, 0x87005f,
  0x870087, 0x8700af, 0x8700d7, 0x8700ff, 0x875f00, 0x875f5f, 0x875f87, 0x875faf, 0x875fd7,
  0x875fff, 0x878700, 0x87875f, 0x878787, 0x8787af, 0x8787d7, 0x8787ff, 0x87af00, 0x87af5f,
  0x87af87, 0x87afaf, 0x87afd7, 0x87afff, 0x87d700, 0x87d75f, 0x87d787, 0x87d7af, 0x87d7d7,
  0x87d7ff, 0x87ff00, 0x87ff5f, 0x87ff87, 0x87ffaf, 0x87ffd7, 0x87ffff, 0xaf0000, 0xaf005f,
  0xaf0087, 0xaf00af, 0xaf00d7, 0xaf00ff, 0xaf5f00, 0xaf5f5f, 0xaf5f87, 0xaf5faf, 0xaf5fd7,
  0xaf5fff, 0xaf8700, 0xaf875f, 0xaf8787, 0xaf87af, 0xaf87d7, 0xaf87ff, 0xafaf00, 0xafaf5f,
  0xafaf87, 0xafafaf, 0xafafd7, 0xafafff, 0xafd700, 0xafd75f, 0xafd787, 0xafd7af, 0xafd7d7,
  0xafd7ff, 0xafff00, 0xafff5f, 0xafff87, 0xafffaf, 0xafffd7, 0xafffff, 0xd70000, 0xd7005f,
  0xd70087, 0xd700af, 0xd700d7, 0xd700ff, 0xd75f00, 0xd75f5f, 0xd75f87, 0xd75faf, 0xd75fd7,
  0xd75fff, 0xd78700, 0xd7875f, 0xd78787, 0xd787af, 0xd787d7, 0xd787ff, 0xd7af00, 0xd7af5f,
  0xd7af87, 0xd7afaf, 0xd7afd7, 0xd7afff, 0xd7d700, 0xd7d75f, 0xd7d787, 0xd7d7af, 0xd7d7d7,
  0xd7d7ff, 0xd7ff00, 0xd7ff5f, 0xd7ff87, 0xd7ffaf, 0xd7ffd7, 0xd7ffff, 0xff0000, 0xff005f,
  0xff0087, 0xff00af, 0xff00d7, 0xff00ff, 0xff5f00, 0xff5f5f, 0xff5f87, 0xff5faf, 0xff5fd7,
  0xff5fff, 0xff8700, 0xff875f, 0xff8787, 0xff87af, 0xff87d7, 0xff87ff, 0xffaf00, 0xffaf5f,
  0xffaf87, 0xffafaf, 0xffafd7, 0xffafff, 0xffd700, 0xffd75f, 0xffd787, 0xffd7af, 0xffd7d7,
  0xffd7ff, 0xffff00, 0xffff5f, 0xffff87, 0xffffaf, 0xffffd7, 0xffffff, 0x080808, 0x121212,
  0x1c1c1c, 0x262626, 0x303030, 0x3a3a3a, 0x444444, 0x4e4e4e, 0x585858, 0x626262, 0x6c6c6c,
  0x767676, 0x808080, 0x8a8a8a, 0x949494, 0x9e9e9e, 0xa8a8a8, 0xb2b2b2, 0xbcbcbc, 0xc6c6c6,
  0xd0d0d0, 0xdadada, 0xe4e4e4, 0xeeeeee,
];

/**
 * Converts a 24-bit numeric hex color (0xRRGGBB) to [R, G, B] tuple.
 * @param {number} hex
 * @returns {[number, number, number]}
 */
export function hexNumberToRgb(hex) {
  return [
    (hex >> 16) & 0xff,
    (hex >> 8) & 0xff,
    hex & 0xff,
  ];
}

/**
 * Converts a hex string ('#ffffff', 'ffffff', '#fff') to [R, G, B] tuple.
 * @param {string} str
 * @returns {[number, number, number] | undefined}
 */
export function parseHexString(str) {
  if (!str) return undefined;
  let clean = str.startsWith("#") ? str.slice(1) : str;
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) return undefined;
  const num = parseInt(clean, 16);
  if (Number.isNaN(num)) return undefined;
  return hexNumberToRgb(num);
}

/**
 * Full standard 99 mIRC palette as RGB tuples.
 * @type {[number, number, number][]}
 */
export const IRC99_PALETTE = IRC99_HEX.map(hexNumberToRgb);

/**
 * Standard 16 mIRC colors as RGB tuples.
 * @type {[number, number, number][]}
 */
export const MIRC16_PALETTE = IRC99_PALETTE.slice(0, 16);

/**
 * Full standard 256 ANSI / xterm palette as RGB tuples.
 * @type {[number, number, number][]}
 */
export const ANSI256_PALETTE = ANSI256_HEX.map(hexNumberToRgb);

/**
 * Standard 16 ANSI colors as RGB tuples.
 * @type {[number, number, number][]}
 */
export const ANSI16_PALETTE = ANSI256_PALETTE.slice(0, 16);

/**
 * Formats an RGB tuple [r, g, b] as a CSS `rgb(r g b)` string.
 * @param {[number, number, number] | undefined | null} color
 * @param {[number, number, number]} [fallback=[0, 0, 0]]
 * @returns {string}
 */
export function rgbToString(color, fallback = [0, 0, 0]) {
  const [r, g, b] = color ?? fallback;
  return `rgb(${r} ${g} ${b})`;
}

/**
 * Formats an RGB tuple [r, g, b] as a hex string `#rrggbb`.
 * @param {[number, number, number] | undefined | null} color
 * @param {string} [fallback="#000000"]
 * @returns {string}
 */
export function rgbToHex(color, fallback = "#000000") {
  if (!color) return fallback;
  const [r, g, b] = color;
  return "#" + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
}

/**
 * Gets an IRC color by index from the palette (wraps or caps if out of range).
 * @param {number} index
 * @param {[number, number, number][]} [palette=IRC99_PALETTE]
 * @returns {[number, number, number] | undefined}
 */
export function getIrcColor(index, palette = IRC99_PALETTE) {
  if (index >= 0 && index < palette.length) {
    return palette[index];
  }
  if (palette.length > 0) {
    return palette[index % palette.length];
  }
  return undefined;
}

/**
 * Gets an ANSI color by index from the palette.
 * @param {number} index
 * @param {[number, number, number][]} [palette=ANSI256_PALETTE]
 * @returns {[number, number, number] | undefined}
 */
export function getAnsiColor(index, palette = ANSI256_PALETTE) {
  if (index >= 0 && index < palette.length) {
    return palette[index];
  }
  if (palette.length > 0) {
    return palette[index % palette.length];
  }
  return undefined;
}

// --- utils.js ---

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

// --- styles.js ---
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

// --- parser-irc.js ---

/**
 * Parses IRC/mIRC formatted text into a 2D matrix of styled character cells.
 *
 * @param {string} text - Raw IRC text containing control codes.
 * @param {object} [options={}] - Parser options.
 * @param {[number, number, number][]} [options.palette=IRC99_PALETTE] - IRC color palette.
 * @param {[number, number, number]} [options.defaultForeground=[255, 255, 255]] - Default FG RGB.
 * @param {[number, number, number]} [options.defaultBackground] - Default BG RGB (optional).
 * @param {number} [options.tabWidth=8] - Tab width for tab stops.
 * @param {boolean} [options.trimTrailingSpaces=false] - Whether to trim trailing whitespace cells.
 * @param {boolean} [options.trimTrailingEmptyRows=false] - Whether to trim trailing empty lines.
 * @returns {{ columns: number, rows: number, cells: Array<Array<object>> }}
 */
export function parseIrc(text, options = {}) {
  const palette = options.palette ?? IRC99_PALETTE;
  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground;
  const tabWidth = Math.max(1, options.tabWidth ?? 8);

  const grid = [];
  let currentRow = [];

  let fg = defaultForeground;
  let bg = defaultBackground;
  let bold = false;
  let italic = false;
  let underline = false;
  let inverted = false;
  let strikethrough = false;

  const resetStyles = () => {
    fg = defaultForeground;
    bg = defaultBackground;
    bold = false;
    italic = false;
    underline = false;
    inverted = false;
    strikethrough = false;
  };

  const createCell = (char) => ({
    character: char,
    foreground: fg ? [...fg] : undefined,
    background: bg ? [...bg] : undefined,
    bold,
    italic,
    underline,
    inverted,
    strikethrough,
  });

  const finishRow = () => {
    if (options.trimTrailingSpaces) {
      while (currentRow.length > 0 && currentRow[currentRow.length - 1].character === " ") {
        currentRow.pop();
      }
    }
    grid.push(currentRow);
    currentRow = [];
  };

  if (!text) {
    return { columns: 0, rows: 0, cells: [] };
  }

  // Normalize string into code points array to handle surrogate pairs safely
  const chars = Array.from(text);
  const len = chars.length;
  let i = 0;

  while (i < len) {
    const ch = chars[i];

    // Newline handling
    if (ch === "\r") {
      if (i + 1 < len && chars[i + 1] === "\n") {
        i++;
      }
      finishRow();
      i++;
      continue;
    }
    if (ch === "\n") {
      finishRow();
      i++;
      continue;
    }

    // Tab handling
    if (ch === "\t") {
      const spacesToAdd = tabWidth - (currentRow.length % tabWidth);
      for (let s = 0; s < spacesToAdd; s++) {
        currentRow.push(createCell(" "));
      }
      i++;
      continue;
    }

    // Reset formatting \x0F (^O)
    if (ch === "\x0f" || ch === "\u000f") {
      resetStyles();
      i++;
      continue;
    }

    // Bold \x02 (^B)
    if (ch === "\x02" || ch === "\u0002") {
      bold = !bold;
      i++;
      continue;
    }

    // Italic \x1D (^])
    if (ch === "\x1d" || ch === "\u001d") {
      italic = !italic;
      i++;
      continue;
    }

    // Underline \x1F (^_)
    if (ch === "\x1f" || ch === "\u001f") {
      underline = !underline;
      i++;
      continue;
    }

    // Reverse / Invert \x16 (^V)
    if (ch === "\x16" || ch === "\u0016") {
      inverted = !inverted;
      i++;
      continue;
    }

    // Strikethrough \x1E (^^)
    if (ch === "\x1e" || ch === "\u001e") {
      strikethrough = !strikethrough;
      i++;
      continue;
    }

    // Monospace \x11 (^Q) - no-op or handled as style
    if (ch === "\x11" || ch === "\u0011") {
      i++;
      continue;
    }

    // Hex color \x04 (^D) extension
    if (ch === "\x04" || ch === "\u0004") {
      i++;
      let hexFg = "";
      while (hexFg.length < 6 && i < len && /[0-9a-fA-F]/.test(chars[i])) {
        hexFg += chars[i];
        i++;
      }
      if (hexFg.length === 6) {
        fg = parseHexString(hexFg) ?? defaultForeground;
        if (i < len && chars[i] === ",") {
          i++;
          let hexBg = "";
          while (hexBg.length < 6 && i < len && /[0-9a-fA-F]/.test(chars[i])) {
            hexBg += chars[i];
            i++;
          }
          if (hexBg.length === 6) {
            bg = parseHexString(hexBg);
          } else {
            bg = defaultBackground;
          }
        }
      } else {
        // Reset colors
        fg = defaultForeground;
        bg = defaultBackground;
      }
      continue;
    }

    // mIRC color code \x03 (^C)
    if (ch === "\x03" || ch === "\u0003") {
      i++;
      let fgStr = "";
      // Read up to 2 digits for FG
      while (fgStr.length < 2 && i < len && /[0-9]/.test(chars[i])) {
        fgStr += chars[i];
        i++;
      }

      if (fgStr.length > 0) {
        const fgNum = parseInt(fgStr, 10);
        fg = getIrcColor(fgNum, palette) ?? defaultForeground;

        // Check for comma and BG
        if (i < len && chars[i] === ",") {
          if (i + 1 < len && /[0-9]/.test(chars[i + 1])) {
            i++; // skip ','
            let bgStr = "";
            while (bgStr.length < 2 && i < len && /[0-9]/.test(chars[i])) {
              bgStr += chars[i];
              i++;
            }
            if (bgStr.length > 0) {
              const bgNum = parseInt(bgStr, 10);
              bg = getIrcColor(bgNum, palette);
            }
          }
        }
      } else if (i < len && chars[i] === ",") {
        // Handle comma without FG (\x03,01)
        if (i + 1 < len && /[0-9]/.test(chars[i + 1])) {
          i++; // skip ','
          let bgStr = "";
          while (bgStr.length < 2 && i < len && /[0-9]/.test(chars[i])) {
            bgStr += chars[i];
            i++;
          }
          if (bgStr.length > 0) {
            const bgNum = parseInt(bgStr, 10);
            bg = getIrcColor(bgNum, palette);
          }
        }
      } else {
        // \x03 with no numbers resets colors
        fg = defaultForeground;
        bg = defaultBackground;
      }
      continue;
    }

    // Regular character
    currentRow.push(createCell(ch));
    i++;
  }

  // Push final row if any
  if (currentRow.length > 0) {
    finishRow();
  }

  if (options.trimTrailingEmptyRows) {
    while (grid.length > 0 && grid[grid.length - 1].length === 0) {
      grid.pop();
    }
  }

  const columns = grid.reduce((max, row) => Math.max(max, row.length), 0);
  const rows = grid.length;

  return {
    columns,
    rows,
    cells: grid,
  };
}

// --- parser-ansi.js ---

/**
 * Parses ANSI / VT100 / xterm formatted text into a 2D matrix of styled character cells.
 *
 * @param {string} text - Raw ANSI text containing escape sequences.
 * @param {object} [options={}] - Parser options.
 * @param {[number, number, number][]} [options.palette=ANSI256_PALETTE] - 256-color ANSI palette.
 * @param {[number, number, number]} [options.defaultForeground=[255, 255, 255]] - Default FG RGB.
 * @param {[number, number, number]} [options.defaultBackground] - Default BG RGB (optional).
 * @param {number} [options.tabWidth=8] - Tab width for tab stops.
 * @param {boolean} [options.trimTrailingSpaces=false] - Whether to trim trailing whitespace cells.
 * @param {boolean} [options.trimTrailingEmptyRows=false] - Whether to trim trailing empty lines.
 * @returns {{ columns: number, rows: number, cells: Array<Array<object>> }}
 */
export function parseAnsi(text, options = {}) {
  const palette = options.palette ?? ANSI256_PALETTE;
  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground;
  const tabWidth = Math.max(1, options.tabWidth ?? 8);

  const grid = [];
  let currentRow = [];

  let fg = defaultForeground;
  let bg = defaultBackground;
  let bold = false;
  let dim = false;
  let italic = false;
  let underline = false;
  let inverted = false;
  let strikethrough = false;
  let hidden = false;

  const resetStyles = () => {
    fg = defaultForeground;
    bg = defaultBackground;
    bold = false;
    dim = false;
    italic = false;
    underline = false;
    inverted = false;
    strikethrough = false;
    hidden = false;
  };

  const createCell = (char) => ({
    character: char,
    foreground: fg ? [...fg] : undefined,
    background: bg ? [...bg] : undefined,
    bold,
    dim,
    italic,
    underline,
    inverted,
    strikethrough,
    hidden,
  });

  const finishRow = () => {
    if (options.trimTrailingSpaces) {
      while (currentRow.length > 0 && currentRow[currentRow.length - 1].character === " ") {
        currentRow.pop();
      }
    }
    grid.push(currentRow);
    currentRow = [];
  };

  if (!text) {
    return { columns: 0, rows: 0, cells: [] };
  }

  const chars = Array.from(text);
  const len = chars.length;
  let i = 0;

  while (i < len) {
    const ch = chars[i];

    // Check for escape character \x1b (ESC)
    if (ch === "\x1b" || ch === "\u001b") {
      i++;
      if (i >= len) break;

      // CSI: ESC [
      if (chars[i] === "[") {
        i++;
        let paramStr = "";
        // Collect CSI parameters and intermediate characters (0x20-0x3F) until final byte (0x40-0x7E)
        while (i < len) {
          const c = chars[i];
          const code = c.charCodeAt(0);
          if (code >= 0x40 && code <= 0x7e) {
            // Terminator reached
            const command = c;
            i++;

            if (command === "m") {
              // SGR (Select Graphic Rendition) command
              const params = paramStr.length === 0
                ? [0]
                : paramStr
                    .split(/[:;]/)
                    .map((s) => (s.trim() === "" ? 0 : parseInt(s, 10)))
                    .filter((n) => !Number.isNaN(n));

              if (params.length === 0) {
                resetStyles();
              } else {
                let p = 0;
                while (p < params.length) {
                  const code = params[p];
                  if (code === 0) {
                    resetStyles();
                  } else if (code === 1) {
                    bold = true;
                  } else if (code === 2) {
                    dim = true;
                  } else if (code === 3) {
                    italic = true;
                  } else if (code === 4) {
                    underline = true;
                  } else if (code === 7) {
                    inverted = true;
                  } else if (code === 8) {
                    hidden = true;
                  } else if (code === 9) {
                    strikethrough = true;
                  } else if (code === 21) {
                    bold = false;
                  } else if (code === 22) {
                    bold = false;
                    dim = false;
                  } else if (code === 23) {
                    italic = false;
                  } else if (code === 24) {
                    underline = false;
                  } else if (code === 27) {
                    inverted = false;
                  } else if (code === 28) {
                    hidden = false;
                  } else if (code === 29) {
                    strikethrough = false;
                  } else if (code >= 30 && code <= 37) {
                    // Standard foreground 0..7
                    fg = getAnsiColor(code - 30, palette) ?? defaultForeground;
                  } else if (code === 38) {
                    // Extended foreground (256-color or 24-bit RGB)
                    if (p + 1 < params.length) {
                      const type = params[p + 1];
                      if (type === 5 && p + 2 < params.length) {
                        // 38;5;n
                        const colorIdx = params[p + 2];
                        fg = getAnsiColor(colorIdx, palette) ?? defaultForeground;
                        p += 2;
                      } else if (type === 2 && p + 4 < params.length) {
                        // 38;2;r;g;b
                        const r = Math.max(0, Math.min(255, params[p + 2]));
                        const g = Math.max(0, Math.min(255, params[p + 3]));
                        const b = Math.max(0, Math.min(255, params[p + 4]));
                        fg = [r, g, b];
                        p += 4;
                      }
                    }
                  } else if (code === 39) {
                    fg = defaultForeground;
                  } else if (code >= 40 && code <= 47) {
                    // Standard background 0..7
                    bg = getAnsiColor(code - 40, palette);
                  } else if (code === 48) {
                    // Extended background (256-color or 24-bit RGB)
                    if (p + 1 < params.length) {
                      const type = params[p + 1];
                      if (type === 5 && p + 2 < params.length) {
                        // 48;5;n
                        const colorIdx = params[p + 2];
                        bg = getAnsiColor(colorIdx, palette);
                        p += 2;
                      } else if (type === 2 && p + 4 < params.length) {
                        // 48;2;r;g;b
                        const r = Math.max(0, Math.min(255, params[p + 2]));
                        const g = Math.max(0, Math.min(255, params[p + 3]));
                        const b = Math.max(0, Math.min(255, params[p + 4]));
                        bg = [r, g, b];
                        p += 4;
                      }
                    }
                  } else if (code === 49) {
                    bg = defaultBackground;
                  } else if (code >= 90 && code <= 97) {
                    // High-intensity foreground 8..15
                    fg = getAnsiColor(code - 90 + 8, palette) ?? defaultForeground;
                  } else if (code >= 100 && code <= 107) {
                    // High-intensity background 8..15
                    bg = getAnsiColor(code - 100 + 8, palette);
                  }
                  p++;
                }
              }
            }
            break;
          } else {
            paramStr += c;
            i++;
          }
        }
        continue;
      }

      // OSC: ESC ] ... (BEL or ESC \)
      if (chars[i] === "]") {
        i++;
        while (i < len) {
          if (chars[i] === "\x07") {
            i++;
            break;
          }
          if (chars[i] === "\x1b" && i + 1 < len && chars[i + 1] === "\\") {
            i += 2;
            break;
          }
          i++;
        }
        continue;
      }

      // Other 2-character escape sequence (e.g. ESC M, ESC E)
      i++;
      continue;
    }

    // Newlines
    if (ch === "\r") {
      if (i + 1 < len && chars[i + 1] === "\n") {
        i++;
      }
      finishRow();
      i++;
      continue;
    }
    if (ch === "\n") {
      finishRow();
      i++;
      continue;
    }

    // Tabs
    if (ch === "\t") {
      const spacesToAdd = tabWidth - (currentRow.length % tabWidth);
      for (let s = 0; s < spacesToAdd; s++) {
        currentRow.push(createCell(" "));
      }
      i++;
      continue;
    }

    // Regular character
    currentRow.push(createCell(ch));
    i++;
  }

  if (currentRow.length > 0) {
    finishRow();
  }

  if (options.trimTrailingEmptyRows) {
    while (grid.length > 0 && grid[grid.length - 1].length === 0) {
      grid.pop();
    }
  }

  const columns = grid.reduce((max, row) => Math.max(max, row.length), 0);
  const rows = grid.length;

  return {
    columns,
    rows,
    cells: grid,
  };
}

// --- parser.js ---



/**
 * Unified parser for IRC art, ANSI art, plain text, or structured cell matrices.
 *
 * @param {string | Array<Array<object>> | { cells?: Array<Array<object>>, grid?: Array<Array<object>> }} input
 * @param {object} [options={}]
 * @param {'auto' | 'irc' | 'ansi' | 'plain'} [options.format='auto']
 * @param {[number, number, number][]} [options.palette]
 * @param {[number, number, number]} [options.defaultForeground=[255, 255, 255]]
 * @param {[number, number, number]} [options.defaultBackground]
 * @param {number} [options.tabWidth=8]
 * @param {boolean} [options.trimTrailingSpaces=false]
 * @param {boolean} [options.trimTrailingEmptyRows=false]
 * @returns {{ columns: number, rows: number, cells: Array<Array<object>> }}
 */
export function parse(input, options = {}) {
  if (!input) {
    return { columns: 0, rows: 0, cells: [] };
  }

  // If input is already an array of rows
  if (Array.isArray(input)) {
    const columns = input.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
    return {
      columns,
      rows: input.length,
      cells: input,
    };
  }

  // If input is an object with cells or grid
  if (typeof input === "object") {
    const rawCells = input.cells ?? input.grid;
    if (Array.isArray(rawCells)) {
      const columns = input.columns ?? rawCells.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
      const rows = input.rows ?? rawCells.length;
      return {
        columns,
        rows,
        cells: rawCells,
      };
    }
  }

  if (typeof input !== "string") {
    return { columns: 0, rows: 0, cells: [] };
  }

  const format = options.format && options.format !== "auto"
    ? options.format
    : detectFormat(input);

  if (format === "ansi") {
    return parseAnsi(input, options);
  }

  // Default to IRC parser for 'irc' and 'plain'
  return parseIrc(input, options);
}

// --- dom-renderer.js ---




let sharedMeasurementContext = null;

function getMeasurementContext() {
  if (typeof document === "undefined") return null;
  if (!sharedMeasurementContext) {
    try {
      const canvas = document.createElement("canvas");
      sharedMeasurementContext = canvas.getContext("2d");
    } catch {
      sharedMeasurementContext = null;
    }
  }
  return sharedMeasurementContext;
}

/**
 * Calculates display metrics for the character grid.
 *
 * @param {object} options
 * @param {number} fontSize
 * @param {string} fontFamily
 * @returns {{ fontSize: number, cellAdvance: number, lineHeight: number, letterSpacing: string, width?: number, height?: number }}
 */
export function calculateMetrics(options = {}, columns = 0, rows = 0) {
  const fontSize = typeof options.fontSize === "number"
    ? options.fontSize
    : (options.fontSize ? parseFloat(options.fontSize) : 16) || 16;

  const fontFamily = options.fontFamily || "monospace";

  // Aspect ratio of standard terminal monospace fonts is typically ~0.5 to 0.6
  const aspectRatio = options.aspectRatio ?? 0.55;
  const rawCellAdvance = options.cellAdvance ?? (fontSize * aspectRatio);
  const rawLineHeight = options.lineHeight ?? (fontSize * 1.0);

  let letterSpacing = options.letterSpacing;

  if (letterSpacing === undefined && options.autoMeasure !== false) {
    const ctx = getMeasurementContext();
    if (ctx) {
      ctx.font = `400 ${fontSize}px "${fontFamily.replaceAll('"', '\\"')}", monospace`;
      const naturalAdvance = ctx.measureText("M").width;
      if (naturalAdvance > 0) {
        letterSpacing = `${rawCellAdvance - naturalAdvance}px`;
      }
    }
  }

  if (letterSpacing === undefined) {
    letterSpacing = "0px";
  } else if (typeof letterSpacing === "number") {
    letterSpacing = `${letterSpacing}px`;
  }

  return {
    fontSize,
    fontFamily,
    cellAdvance: rawCellAdvance,
    lineHeight: rawLineHeight,
    letterSpacing,
    width: columns > 0 ? columns * rawCellAdvance : undefined,
    height: rows > 0 ? rows * rawLineHeight : undefined,
  };
}

/**
 * Applies computed metrics to an output container element.
 *
 * @param {HTMLElement} element
 * @param {object} metrics
 * @param {number} [columns]
 * @param {number} [rows]
 */
export function applyMetricsToElement(element, metrics, columns = 0, rows = 0) {
  if (!element || !element.style) return;

  element.style.fontSize = `${metrics.fontSize}px`;
  element.style.fontFamily = `"${metrics.fontFamily.replaceAll('"', '\\"')}", monospace`;
  element.style.lineHeight = `${metrics.lineHeight}px`;
  element.style.letterSpacing = metrics.letterSpacing;
  element.style.setProperty("--irc2html-font-size", `${metrics.fontSize}px`);
  element.style.setProperty("--irc2html-font-family", `"${metrics.fontFamily.replaceAll('"', '\\"')}", monospace`);
  element.style.setProperty("--irc2html-line-height", `${metrics.lineHeight}px`);
  element.style.setProperty("--irc2html-letter-spacing", metrics.letterSpacing);

  if (columns > 0 && metrics.cellAdvance > 0) {
    element.style.width = `${columns * metrics.cellAdvance}px`;
  }
  if (rows > 0 && metrics.lineHeight > 0) {
    element.style.height = `${rows * metrics.lineHeight}px`;
  }
}

/**
 * Converts parsed character cells into a DocumentFragment of rows and spans.
 *
 * @param {Array<Array<object>>} cellRows
 * @param {object} [options={}]
 * @returns {DocumentFragment}
 */
export function buildDOMRows(cellRows, options = {}) {
  if (typeof document === "undefined") {
    throw new Error("buildDOMRows requires a DOM environment with document support.");
  }

  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground ?? [0, 0, 0];
  const rowClassName = options.rowClassName ?? "irc2html-row";
  const runClassName = options.runClassName ?? "irc2html-run";

  const fragment = document.createDocumentFragment();

  for (const cells of cellRows) {
    const rowEl = document.createElement("div");
    rowEl.className = rowClassName;

    let currentRun = null;
    let currentStyle = null;
    let accumulatedText = "";

    const flushRun = () => {
      if (currentRun && accumulatedText.length > 0) {
        currentRun.append(document.createTextNode(accumulatedText));
        accumulatedText = "";
      }
    };

    for (const cell of cells) {
      const style = displayStyle(cell, defaultForeground, defaultBackground);

      if (!currentRun || !sameStyle(style, currentStyle)) {
        flushRun();

        currentRun = document.createElement("span");
        currentRun.className = runClassName;
        currentRun.style.color = rgbToString(style.foreground, defaultForeground);
        currentRun.style.backgroundColor = rgbToString(style.background, defaultBackground);

        if (style.bold) currentRun.style.fontWeight = "700";
        if (style.italic) currentRun.style.fontStyle = "italic";
        if (style.underline) currentRun.style.textDecoration = "underline";
        if (style.strikethrough) {
          currentRun.style.textDecoration = (currentRun.style.textDecoration ? currentRun.style.textDecoration + " " : "") + "line-through";
        }
        if (style.hidden) currentRun.style.visibility = "hidden";

        rowEl.append(currentRun);
        currentStyle = style;
      }

      accumulatedText += cell.character;
    }

    flushRun();
    fragment.append(rowEl);
  }

  return fragment;
}

/**
 * Creates and returns a complete rendered DOM element for IRC / ANSI art.
 *
 * @param {string | Array<Array<object>> | object} input
 * @param {object} [options={}]
 * @returns {HTMLDivElement}
 */
export function toDOM(input, options = {}) {
  if (typeof document === "undefined") {
    throw new Error("toDOM requires a DOM environment.");
  }

  if (options.injectStyles !== false) {
    injectDefaultStyles();
  }

  const parsed = parse(input, options);
  const container = document.createElement("div");
  container.className = options.className ?? "irc2html-output";
  container.setAttribute("role", "img");
  container.setAttribute("aria-label", options.ariaLabel ?? "Rendered terminal art");

  if (options.theme === "light") {
    container.style.setProperty("--irc2html-bg", "#ffffff");
    container.style.setProperty("--irc2html-fg", "#000000");
  } else if (options.theme === "transparent") {
    container.style.setProperty("--irc2html-bg", "transparent");
  }

  const metrics = calculateMetrics(options, parsed.columns, parsed.rows);
  applyMetricsToElement(container, metrics, parsed.columns, parsed.rows);

  const domRows = buildDOMRows(parsed.cells, options);
  container.append(domRows);

  return container;
}

/**
 * Renders IRC / ANSI art directly into a target DOM element.
 *
 * @param {string | Array<Array<object>> | object} input - Raw text or parsed grid.
 * @param {HTMLElement} targetElement - DOM element to render into.
 * @param {object} [options={}] - Render options.
 * @returns {{ columns: number, rows: number, cells: Array<Array<object>>, container: HTMLDivElement }}
 */
export function renderTo(input, targetElement, options = {}) {
  if (!targetElement) {
    throw new Error("renderTo requires a valid target DOM element.");
  }

  const domContainer = toDOM(input, options);
  targetElement.replaceChildren(domContainer);

  const parsed = parse(input, options);
  return {
    columns: parsed.columns,
    rows: parsed.rows,
    cells: parsed.cells,
    container: domContainer,
  };
}

// --- html-renderer.js ---





/**
 * Converts IRC / ANSI art into an HTML snippet string.
 *
 * @param {string | Array<Array<object>> | object} input - Raw text or parsed grid.
 * @param {object} [options={}] - Render options.
 * @param {boolean} [options.inlineStyles=true] - Whether to include inline CSS styles on spans.
 * @param {boolean} [options.includeCss=false] - Whether to prepend a <style> block.
 * @param {string} [options.className='irc2html-output'] - Class name for outer container.
 * @param {string} [options.rowClassName='irc2html-row'] - Class name for row containers.
 * @param {string} [options.runClassName='irc2html-run'] - Class name for character runs.
 * @returns {string}
 */
export function toHtml(input, options = {}) {
  const parsed = parse(input, options);
  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground ?? [0, 0, 0];

  const className = options.className ?? "irc2html-output";
  const rowClassName = options.rowClassName ?? "irc2html-row";
  const runClassName = options.runClassName ?? "irc2html-run";

  const metrics = calculateMetrics(options, parsed.columns, parsed.rows);

  const containerStyles = [
    `--irc2html-font-size: ${metrics.fontSize}px;`,
    `--irc2html-font-family: "${metrics.fontFamily.replaceAll('"', '\\"')}", monospace;`,
    `--irc2html-line-height: ${metrics.lineHeight}px;`,
    `--irc2html-letter-spacing: ${metrics.letterSpacing};`,
    `font-size: ${metrics.fontSize}px;`,
    `font-family: "${metrics.fontFamily.replaceAll('"', '\\"')}", monospace;`,
    `line-height: ${metrics.lineHeight}px;`,
    `letter-spacing: ${metrics.letterSpacing};`,
  ];

  if (metrics.width) {
    containerStyles.push(`width: ${metrics.width}px;`);
  }
  if (metrics.height) {
    containerStyles.push(`height: ${metrics.height}px;`);
  }
  if (options.theme === "light") {
    containerStyles.push("--irc2html-bg: #ffffff; --irc2html-fg: #000000;");
  } else if (options.theme === "transparent") {
    containerStyles.push("--irc2html-bg: transparent;");
  }

  const rowsHtml = [];

  for (const cells of parsed.cells) {
    let currentRunText = "";
    let currentStyle = null;
    let runsHtml = [];

    const flushRun = () => {
      if (currentStyle && currentRunText.length > 0) {
        const styleDeclarations = [
          `color: ${rgbToString(currentStyle.foreground, defaultForeground)};`,
          `background-color: ${rgbToString(currentStyle.background, defaultBackground)};`,
        ];

        if (currentStyle.bold) styleDeclarations.push("font-weight: 700;");
        if (currentStyle.italic) styleDeclarations.push("font-style: italic;");
        if (currentStyle.underline) styleDeclarations.push("text-decoration: underline;");
        if (currentStyle.strikethrough) styleDeclarations.push("text-decoration: line-through;");
        if (currentStyle.hidden) styleDeclarations.push("visibility: hidden;");

        const styleAttr = options.inlineStyles !== false
          ? ` style="${styleDeclarations.join(" ")}"`
          : "";

        runsHtml.push(
          `<span class="${escapeHtml(runClassName)}"${styleAttr}>${escapeHtml(currentRunText)}</span>`
        );
        currentRunText = "";
      }
    };

    for (const cell of cells) {
      const style = displayStyle(cell, defaultForeground, defaultBackground);

      if (!currentStyle || !sameStyle(style, currentStyle)) {
        flushRun();
        currentStyle = style;
      }

      currentRunText += cell.character;
    }

    flushRun();

    rowsHtml.push(
      `  <div class="${escapeHtml(rowClassName)}">${runsHtml.join("")}</div>`
    );
  }

  const containerStyleAttr = options.inlineStyles !== false
    ? ` style="${containerStyles.join(" ")}"`
    : "";

  let output = `<div class="${escapeHtml(className)}"${containerStyleAttr} role="img" aria-label="${escapeHtml(options.ariaLabel ?? "Rendered terminal art")}">\n${rowsHtml.join("\n")}\n</div>`;

  if (options.includeCss) {
    output = `<style>\n${DEFAULT_CSS}\n</style>\n` + output;
  }

  return output;
}

/**
 * Converts IRC / ANSI art into a standalone HTML5 document.
 *
 * @param {string | Array<Array<object>> | object} input
 * @param {object} [options={}]
 * @param {string} [options.title='IRC Art']
 * @returns {string}
 */
export function toHtmlDocument(input, options = {}) {
  const title = options.title ?? "Terminal Art";
  const bodyContent = toHtml(input, { ...options, includeCss: false });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #111;
      color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
${DEFAULT_CSS}
  </style>
</head>
<body>
${bodyContent}
</body>
</html>
`;
}

// --- viewer.js ---




/**
 * Interactive viewer component for displaying and manipulating IRC/ANSI art.
 */
export class IrcViewer {
  #targetElement;
  #containerElement;
  #currentInput = null;
  #parsedResult = { columns: 0, rows: 0, cells: [] };
  #options = {};
  #metrics = null;

  /**
   * @param {HTMLElement} targetElement - DOM element container.
   * @param {object} [options={}] - Initial viewer options.
   */
  constructor(targetElement, options = {}) {
    if (!targetElement) {
      throw new Error("IrcViewer requires a valid target DOM element.");
    }
    this.#targetElement = targetElement;
    this.#options = {
      fontSize: 16,
      fontFamily: "monospace",
      autoMeasure: true,
      injectStyles: true,
      ...options,
    };

    if (this.#options.injectStyles !== false) {
      injectDefaultStyles();
    }

    this.#containerElement = document.createElement("div");
    this.#containerElement.className = this.#options.className ?? "irc2html-output";
    this.#containerElement.setAttribute("role", "img");
    this.#containerElement.setAttribute("aria-label", this.#options.ariaLabel ?? "Rendered terminal art");

    this.#targetElement.replaceChildren(this.#containerElement);

    if (options.art) {
      this.setArt(options.art);
    }
  }

  /**
   * Updates the art being displayed.
   * @param {string | Array<Array<object>> | object} input
   * @param {object} [options]
   */
  setArt(input, options = {}) {
    this.#currentInput = input;
    if (options) {
      this.#options = { ...this.#options, ...options };
    }

    this.#parsedResult = parse(input, this.#options);
    this.#updateTheme();
    this.#updateDisplay();
  }

  /**
   * Updates the display font size in px.
   * @param {number | string} size
   */
  setFontSize(size) {
    const next = typeof size === "number" ? size : parseFloat(size);
    if (!Number.isFinite(next) || next <= 0) return;
    this.#options.fontSize = next;
    this.#updateMetricsOnly();
  }

  /**
   * Updates the font family.
   * @param {string} family
   */
  setFontFamily(family) {
    this.#options.fontFamily = family || "monospace";
    this.#updateMetricsOnly();
  }

  /**
   * Sets color theme ('dark' | 'light' | 'transparent').
   * @param {'dark' | 'light' | 'transparent'} theme
   */
  setTheme(theme) {
    this.#options.theme = theme;
    this.#updateTheme();
  }

  /**
   * Updates multiple options at once.
   * @param {object} options
   */
  setOptions(options) {
    this.#options = { ...this.#options, ...options };
    if (options.format || options.palette || options.tabWidth || options.defaultForeground || options.defaultBackground) {
      this.setArt(this.#currentInput);
    } else {
      this.#updateTheme();
      this.#updateMetricsOnly();
    }
  }

  /**
   * Converts viewport client coordinates (from mouse/touch event) into cell (x, y) coordinates.
   * @param {number} clientX
   * @param {number} clientY
   * @returns {{ x: number, y: number, cell?: object } | undefined}
   */
  clientPointToCell(clientX, clientY) {
    const bounds = this.#containerElement.getBoundingClientRect();
    const columns = this.#parsedResult.columns;
    const rows = this.#parsedResult.rows;

    if (bounds.width <= 0 || bounds.height <= 0 || columns <= 0 || rows <= 0) {
      return undefined;
    }

    if (
      clientX < bounds.left ||
      clientX > bounds.right ||
      clientY < bounds.top ||
      clientY > bounds.bottom
    ) {
      return undefined;
    }

    const x = Math.max(0, Math.min(columns - 1, Math.floor(((clientX - bounds.left) * columns) / bounds.width)));
    const y = Math.max(0, Math.min(rows - 1, Math.floor(((clientY - bounds.top) * rows) / bounds.height)));

    const cell = this.getCell(x, y);
    return { x, y, cell };
  }

  /**
   * Retrieves the cell object at column x, row y.
   * @param {number} x
   * @param {number} y
   * @returns {object | undefined}
   */
  getCell(x, y) {
    const row = this.#parsedResult.cells[y];
    return row ? row[x] : undefined;
  }

  /**
   * Returns current grid dimensions and bounding size.
   * @returns {{ columns: number, rows: number, width?: number, height?: number }}
   */
  getDimensions() {
    return {
      columns: this.#parsedResult.columns,
      rows: this.#parsedResult.rows,
      width: this.#metrics?.width,
      height: this.#metrics?.height,
    };
  }

  /**
   * Returns the parsed character cell grid.
   * @returns {Array<Array<object>>}
   */
  getCells() {
    return this.#parsedResult.cells;
  }

  /**
   * Copies the rendered HTML string to the clipboard.
   * @returns {Promise<boolean>}
   */
  async copyHtml() {
    const html = toHtml(this.#parsedResult.cells, this.#options);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(html);
      return true;
    }
    return false;
  }

  /**
   * Copies raw text characters (stripped of control codes) to the clipboard.
   * @returns {Promise<string>}
   */
  async copyText() {
    const rawText = this.#parsedResult.cells
      .map((row) => row.map((c) => c.character).join(""))
      .join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(rawText);
    }
    return rawText;
  }

  /**
   * Clears the viewer.
   * @param {string} [placeholderMessage]
   */
  clear(placeholderMessage) {
    this.#parsedResult = { columns: 0, rows: 0, cells: [] };
    this.#currentInput = null;
    this.#containerElement.replaceChildren();
    if (placeholderMessage) {
      const msgEl = document.createElement("div");
      msgEl.style.padding = "20px";
      msgEl.style.opacity = "0.6";
      msgEl.textContent = placeholderMessage;
      this.#containerElement.append(msgEl);
    }
  }

  /**
   * Destroys the viewer and removes elements.
   */
  destroy() {
    this.#containerElement.remove();
    this.#targetElement.replaceChildren();
  }

  #updateTheme() {
    if (this.#options.theme === "light") {
      this.#containerElement.style.setProperty("--irc2html-bg", "#ffffff");
      this.#containerElement.style.setProperty("--irc2html-fg", "#000000");
    } else if (this.#options.theme === "transparent") {
      this.#containerElement.style.setProperty("--irc2html-bg", "transparent");
      this.#containerElement.style.removeProperty("--irc2html-fg");
    } else {
      this.#containerElement.style.removeProperty("--irc2html-bg");
      this.#containerElement.style.removeProperty("--irc2html-fg");
    }
  }

  #updateMetricsOnly() {
    this.#metrics = calculateMetrics(this.#options, this.#parsedResult.columns, this.#parsedResult.rows);
    applyMetricsToElement(this.#containerElement, this.#metrics, this.#parsedResult.columns, this.#parsedResult.rows);
  }

  #updateDisplay() {
    this.#metrics = calculateMetrics(this.#options, this.#parsedResult.columns, this.#parsedResult.rows);
    applyMetricsToElement(this.#containerElement, this.#metrics, this.#parsedResult.columns, this.#parsedResult.rows);

    const rowsFragment = buildDOMRows(this.#parsedResult.cells, this.#options);
    this.#containerElement.replaceChildren(rowsFragment);
  }
}
