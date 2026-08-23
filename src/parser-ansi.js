import { ANSI256_PALETTE, getAnsiColor } from "./palettes.js";

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
