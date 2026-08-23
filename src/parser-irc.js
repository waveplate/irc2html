import { IRC99_PALETTE, getIrcColor, parseHexString } from "./palettes.js";

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

    // Newline handling: IRC resets style/color state on newlines
    if (ch === "\r") {
      if (i + 1 < len && chars[i + 1] === "\n") {
        i++;
      }
      finishRow();
      resetStyles();
      i++;
      continue;
    }
    if (ch === "\n") {
      finishRow();
      resetStyles();
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
