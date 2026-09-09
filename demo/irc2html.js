var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/palettes.js
var IRC99_HEX = [
  16777215,
  0,
  127,
  37632,
  16711680,
  8323072,
  10223772,
  16547584,
  16776960,
  64512,
  37779,
  65535,
  252,
  16711935,
  5592405,
  11184810,
  4653056,
  4661504,
  4671232,
  3294976,
  18176,
  18220,
  18247,
  10055,
  71,
  3014727,
  4653127,
  4653098,
  7602176,
  7617024,
  7631872,
  5338112,
  29696,
  29769,
  29812,
  16500,
  116,
  4915316,
  7602292,
  7602245,
  11862016,
  11887360,
  11908352,
  8238336,
  46336,
  46449,
  46517,
  25525,
  181,
  7667893,
  11862197,
  11862123,
  16711680,
  16747520,
  16776960,
  11730688,
  65280,
  65440,
  65535,
  36095,
  255,
  10813695,
  16711935,
  16711832,
  16734553,
  16757849,
  16777073,
  13631328,
  7339887,
  6684617,
  7208959,
  5879039,
  5855743,
  12868095,
  16738047,
  16734652,
  16751772,
  16765852,
  16777116,
  14876572,
  10289052,
  10289115,
  10289151,
  10277887,
  10263807,
  14458111,
  16751871,
  16749779,
  0,
  1250067,
  2631720,
  3552822,
  5066061,
  6645093,
  8487297,
  10461087,
  12369084,
  14869218,
  16777215
];
var ANSI256_HEX = [
  0,
  8388608,
  32768,
  8421376,
  128,
  8388736,
  32896,
  12632256,
  8421504,
  16711680,
  65280,
  16776960,
  255,
  16711935,
  65535,
  16777215,
  0,
  95,
  135,
  175,
  215,
  255,
  24320,
  24415,
  24455,
  24495,
  24535,
  24575,
  34560,
  34655,
  34695,
  34735,
  34775,
  34815,
  44800,
  44895,
  44935,
  44975,
  45015,
  45055,
  55040,
  55135,
  55175,
  55215,
  55255,
  55295,
  65280,
  65375,
  65415,
  65455,
  65495,
  65535,
  6225920,
  6226015,
  6226055,
  6226095,
  6226135,
  6226175,
  6250240,
  6250335,
  6250375,
  6250415,
  6250455,
  6250495,
  6260480,
  6260575,
  6260615,
  6260655,
  6260695,
  6260735,
  6270720,
  6270815,
  6270855,
  6270895,
  6270935,
  6270975,
  6280960,
  6281055,
  6281095,
  6281135,
  6281175,
  6281215,
  6291200,
  6291295,
  6291335,
  6291375,
  6291415,
  6291455,
  8847360,
  8847455,
  8847495,
  8847535,
  8847575,
  8847615,
  8871680,
  8871775,
  8871815,
  8871855,
  8871895,
  8871935,
  8881920,
  8882015,
  8882055,
  8882095,
  8882135,
  8882175,
  8892160,
  8892255,
  8892295,
  8892335,
  8892375,
  8892415,
  8902400,
  8902495,
  8902535,
  8902575,
  8902615,
  8902655,
  8912640,
  8912735,
  8912775,
  8912815,
  8912855,
  8912895,
  11468800,
  11468895,
  11468935,
  11468975,
  11469015,
  11469055,
  11493120,
  11493215,
  11493255,
  11493295,
  11493335,
  11493375,
  11503360,
  11503455,
  11503495,
  11503535,
  11503575,
  11503615,
  11513600,
  11513695,
  11513735,
  11513775,
  11513815,
  11513855,
  11523840,
  11523935,
  11523975,
  11524015,
  11524055,
  11524095,
  11534080,
  11534175,
  11534215,
  11534255,
  11534295,
  11534335,
  14090240,
  14090335,
  14090375,
  14090415,
  14090455,
  14090495,
  14114560,
  14114655,
  14114695,
  14114735,
  14114775,
  14114815,
  14124800,
  14124895,
  14124935,
  14124975,
  14125015,
  14125055,
  14135040,
  14135135,
  14135175,
  14135215,
  14135255,
  14135295,
  14145280,
  14145375,
  14145415,
  14145455,
  14145495,
  14145535,
  14155520,
  14155615,
  14155655,
  14155695,
  14155735,
  14155775,
  16711680,
  16711775,
  16711815,
  16711855,
  16711895,
  16711935,
  16736e3,
  16736095,
  16736135,
  16736175,
  16736215,
  16736255,
  16746240,
  16746335,
  16746375,
  16746415,
  16746455,
  16746495,
  16756480,
  16756575,
  16756615,
  16756655,
  16756695,
  16756735,
  16766720,
  16766815,
  16766855,
  16766895,
  16766935,
  16766975,
  16776960,
  16777055,
  16777095,
  16777135,
  16777175,
  16777215,
  526344,
  1184274,
  1842204,
  2500134,
  3158064,
  3815994,
  4473924,
  5131854,
  5789784,
  6447714,
  7105644,
  7763574,
  8421504,
  9079434,
  9737364,
  10395294,
  11053224,
  11711154,
  12369084,
  13027014,
  13684944,
  14342874,
  15000804,
  15658734
];
function hexNumberToRgb(hex) {
  return [
    hex >> 16 & 255,
    hex >> 8 & 255,
    hex & 255
  ];
}
function parseHexString(str) {
  if (!str) return void 0;
  let clean = str.startsWith("#") ? str.slice(1) : str;
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) return void 0;
  const num = parseInt(clean, 16);
  if (Number.isNaN(num)) return void 0;
  return hexNumberToRgb(num);
}
var IRC99_PALETTE = IRC99_HEX.map(hexNumberToRgb);
var MIRC16_PALETTE = IRC99_PALETTE.slice(0, 16);
var ANSI256_PALETTE = ANSI256_HEX.map(hexNumberToRgb);
var ANSI16_PALETTE = ANSI256_PALETTE.slice(0, 16);
function rgbToString(color, fallback = [0, 0, 0]) {
  const [r, g, b] = color ?? fallback;
  return `rgb(${r} ${g} ${b})`;
}
function rgbToHex(color, fallback = "#000000") {
  if (!color) return fallback;
  const [r, g, b] = color;
  return "#" + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
}
function getIrcColor(index, palette = IRC99_PALETTE) {
  if (index >= 0 && index < palette.length) {
    return palette[index];
  }
  if (palette.length > 0) {
    return palette[index % palette.length];
  }
  return void 0;
}
function getAnsiColor(index, palette = ANSI256_PALETTE) {
  if (index >= 0 && index < palette.length) {
    return palette[index];
  }
  if (palette.length > 0) {
    return palette[index % palette.length];
  }
  return void 0;
}

// src/parser-irc.js
function parseIrc(text, options = {}) {
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
    foreground: fg ? [...fg] : void 0,
    background: bg ? [...bg] : void 0,
    bold,
    italic,
    underline,
    inverted,
    strikethrough
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
    if (ch === "	") {
      const spacesToAdd = tabWidth - currentRow.length % tabWidth;
      for (let s = 0; s < spacesToAdd; s++) {
        currentRow.push(createCell(" "));
      }
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      resetStyles();
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      bold = !bold;
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      italic = !italic;
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      underline = !underline;
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      inverted = !inverted;
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      strikethrough = !strikethrough;
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
      i++;
      continue;
    }
    if (ch === "" || ch === "") {
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
        fg = defaultForeground;
        bg = defaultBackground;
      }
      continue;
    }
    if (ch === "" || ch === "") {
      i++;
      let fgStr = "";
      while (fgStr.length < 2 && i < len && /[0-9]/.test(chars[i])) {
        fgStr += chars[i];
        i++;
      }
      if (fgStr.length > 0) {
        const fgNum = parseInt(fgStr, 10);
        fg = getIrcColor(fgNum, palette) ?? defaultForeground;
        if (i < len && chars[i] === ",") {
          if (i + 1 < len && /[0-9]/.test(chars[i + 1])) {
            i++;
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
        if (i + 1 < len && /[0-9]/.test(chars[i + 1])) {
          i++;
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
        fg = defaultForeground;
        bg = defaultBackground;
      }
      continue;
    }
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
    cells: grid
  };
}

// src/parser-ansi.js
function parseAnsi(text, options = {}) {
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
    foreground: fg ? [...fg] : void 0,
    background: bg ? [...bg] : void 0,
    bold,
    dim,
    italic,
    underline,
    inverted,
    strikethrough,
    hidden
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
    if (ch === "\x1B" || ch === "\x1B") {
      i++;
      if (i >= len) break;
      if (chars[i] === "[") {
        i++;
        let paramStr = "";
        while (i < len) {
          const c = chars[i];
          const code = c.charCodeAt(0);
          if (code >= 64 && code <= 126) {
            const command = c;
            i++;
            if (command === "m") {
              const params = paramStr.length === 0 ? [0] : paramStr.split(/[:;]/).map((s) => s.trim() === "" ? 0 : parseInt(s, 10)).filter((n) => !Number.isNaN(n));
              if (params.length === 0) {
                resetStyles();
              } else {
                let p = 0;
                while (p < params.length) {
                  const code2 = params[p];
                  if (code2 === 0) {
                    resetStyles();
                  } else if (code2 === 1) {
                    bold = true;
                  } else if (code2 === 2) {
                    dim = true;
                  } else if (code2 === 3) {
                    italic = true;
                  } else if (code2 === 4) {
                    underline = true;
                  } else if (code2 === 7) {
                    inverted = true;
                  } else if (code2 === 8) {
                    hidden = true;
                  } else if (code2 === 9) {
                    strikethrough = true;
                  } else if (code2 === 21) {
                    bold = false;
                  } else if (code2 === 22) {
                    bold = false;
                    dim = false;
                  } else if (code2 === 23) {
                    italic = false;
                  } else if (code2 === 24) {
                    underline = false;
                  } else if (code2 === 27) {
                    inverted = false;
                  } else if (code2 === 28) {
                    hidden = false;
                  } else if (code2 === 29) {
                    strikethrough = false;
                  } else if (code2 >= 30 && code2 <= 37) {
                    fg = getAnsiColor(code2 - 30, palette) ?? defaultForeground;
                  } else if (code2 === 38) {
                    if (p + 1 < params.length) {
                      const type = params[p + 1];
                      if (type === 5 && p + 2 < params.length) {
                        const colorIdx = params[p + 2];
                        fg = getAnsiColor(colorIdx, palette) ?? defaultForeground;
                        p += 2;
                      } else if (type === 2 && p + 4 < params.length) {
                        const r = Math.max(0, Math.min(255, params[p + 2]));
                        const g = Math.max(0, Math.min(255, params[p + 3]));
                        const b = Math.max(0, Math.min(255, params[p + 4]));
                        fg = [r, g, b];
                        p += 4;
                      }
                    }
                  } else if (code2 === 39) {
                    fg = defaultForeground;
                  } else if (code2 >= 40 && code2 <= 47) {
                    bg = getAnsiColor(code2 - 40, palette);
                  } else if (code2 === 48) {
                    if (p + 1 < params.length) {
                      const type = params[p + 1];
                      if (type === 5 && p + 2 < params.length) {
                        const colorIdx = params[p + 2];
                        bg = getAnsiColor(colorIdx, palette);
                        p += 2;
                      } else if (type === 2 && p + 4 < params.length) {
                        const r = Math.max(0, Math.min(255, params[p + 2]));
                        const g = Math.max(0, Math.min(255, params[p + 3]));
                        const b = Math.max(0, Math.min(255, params[p + 4]));
                        bg = [r, g, b];
                        p += 4;
                      }
                    }
                  } else if (code2 === 49) {
                    bg = defaultBackground;
                  } else if (code2 >= 90 && code2 <= 97) {
                    fg = getAnsiColor(code2 - 90 + 8, palette) ?? defaultForeground;
                  } else if (code2 >= 100 && code2 <= 107) {
                    bg = getAnsiColor(code2 - 100 + 8, palette);
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
      if (chars[i] === "]") {
        i++;
        while (i < len) {
          if (chars[i] === "\x07") {
            i++;
            break;
          }
          if (chars[i] === "\x1B" && i + 1 < len && chars[i + 1] === "\\") {
            i += 2;
            break;
          }
          i++;
        }
        continue;
      }
      i++;
      continue;
    }
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
    if (ch === "	") {
      const spacesToAdd = tabWidth - currentRow.length % tabWidth;
      for (let s = 0; s < spacesToAdd; s++) {
        currentRow.push(createCell(" "));
      }
      i++;
      continue;
    }
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
    cells: grid
  };
}

// src/utils.js
function escapeHtml(str) {
  if (!str) return "";
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function displayStyle(cell, defaultFg = [255, 255, 255], defaultBg = [0, 0, 0]) {
  const rawFg = cell.foreground ?? defaultFg;
  const rawBg = cell.background ?? defaultBg;
  let foreground = cell.inverted ? rawBg : rawFg;
  let background = cell.inverted ? rawFg : cell.background ?? defaultBg;
  if (cell.dim) {
    foreground = [
      Math.round(foreground[0] * 0.7),
      Math.round(foreground[1] * 0.7),
      Math.round(foreground[2] * 0.7)
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
    hidden: Boolean(cell.hidden)
  };
}
function sameStyle(left, right) {
  if (!left || !right) return false;
  return left.bold === right.bold && left.dim === right.dim && left.italic === right.italic && left.underline === right.underline && left.strikethrough === right.strikethrough && left.hidden === right.hidden && left.foreground[0] === right.foreground[0] && left.foreground[1] === right.foreground[1] && left.foreground[2] === right.foreground[2] && left.background[0] === right.background[0] && left.background[1] === right.background[1] && left.background[2] === right.background[2];
}
function detectFormat(text) {
  if (!text || typeof text !== "string") return "plain";
  if (/\x1b\[|\u001b\[|\x1b\]|\u001b\]/.test(text)) {
    return "ansi";
  }
  if (/[\x02\x03\x04\x0F\x11\x16\x1D\x1E\x1F]/.test(text)) {
    return "irc";
  }
  return "plain";
}

// src/parser.js
function parse(input, options = {}) {
  if (!input) {
    return { columns: 0, rows: 0, cells: [] };
  }
  if (Array.isArray(input)) {
    const columns = input.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
    return {
      columns,
      rows: input.length,
      cells: input
    };
  }
  if (typeof input === "object") {
    const rawCells = input.cells ?? input.grid;
    if (Array.isArray(rawCells)) {
      const columns = input.columns ?? rawCells.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
      const rows = input.rows ?? rawCells.length;
      return {
        columns,
        rows,
        cells: rawCells
      };
    }
  }
  if (typeof input !== "string") {
    return { columns: 0, rows: 0, cells: [] };
  }
  const format = options.format && options.format !== "auto" ? options.format : detectFormat(input);
  if (format === "ansi") {
    return parseAnsi(input, options);
  }
  return parseIrc(input, options);
}

// src/styles.js
var DEFAULT_CSS = `
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

.output-text,
.irc2html-output {
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

.output-text-row,
.irc2html-row {
  display: flex;
  height: var(--output-line-height, var(--irc2html-line-height));
  line-height: var(--output-line-height, var(--irc2html-line-height));
  overflow: hidden;
  white-space: pre;
}

.output-text-run,
.irc2html-run {
  display: flex;
  flex: none;
  height: var(--output-line-height, var(--irc2html-line-height));
  line-height: var(--output-line-height, var(--irc2html-line-height));
  /* Close subpixel seams inside adjoining block-element glyphs. */
  text-shadow:
    -.1px 0 currentColor,
    .1px 0 currentColor,
    0 -.1px currentColor,
    0 .1px currentColor;
  white-space: pre;
}

.output-text-cell,
.irc2html-cell {
  box-sizing: border-box;
  display: block;
  flex: 0 0 var(--output-cell-advance, var(--irc2html-cell-advance));
  height: var(--output-line-height, var(--irc2html-line-height));
  line-height: var(--output-line-height, var(--irc2html-line-height));
  max-width: var(--output-cell-advance, var(--irc2html-cell-advance));
  min-width: 0;
  overflow: hidden;
  white-space: pre;
  width: var(--output-cell-advance, var(--irc2html-cell-advance));
}
`.trim();
function injectDefaultStyles(doc = typeof document !== "undefined" ? document : void 0) {
  if (!doc || !doc.head) return void 0;
  let styleEl = doc.getElementById("irc2html-styles");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.id = "irc2html-styles";
    styleEl.textContent = DEFAULT_CSS;
    doc.head.appendChild(styleEl);
  }
  return styleEl;
}

// src/output-preview.js
var DEFAULT_DISPLAY_FONT_SIZE = 16;
var DEFAULT_FONT_FAMILY = "Iosevka Fixed, monospace";
var DEFAULT_ASPECT_RATIO = 0.5;
var _stage, _canvas, _text, _placeholder, _mode, _displayFontSize, _fontFamily, _bitmapMetrics, _textMetrics, _hasText, _measurementContext, _OutputPreview_instances, drawBitmap_fn, applyBitmapDisplaySize_fn, drawText_fn, applyTextDisplayMetrics_fn, setStageSize_fn, updateVisibility_fn;
var OutputPreview = class {
  /**
   * Accepts either:
   *  - new OutputPreview(targetElement, options)
   *  - new OutputPreview(stageElement, canvasElement, textElement, placeholderElement)
   */
  constructor(stageOrTarget, canvasOrOptions, text, placeholder) {
    __privateAdd(this, _OutputPreview_instances);
    __privateAdd(this, _stage);
    __privateAdd(this, _canvas);
    __privateAdd(this, _text);
    __privateAdd(this, _placeholder);
    __privateAdd(this, _mode, "text");
    __privateAdd(this, _displayFontSize, DEFAULT_DISPLAY_FONT_SIZE);
    __privateAdd(this, _fontFamily, DEFAULT_FONT_FAMILY);
    __privateAdd(this, _bitmapMetrics);
    __privateAdd(this, _textMetrics);
    __privateAdd(this, _hasText, false);
    __privateAdd(this, _measurementContext, null);
    if (!stageOrTarget) {
      throw new Error("OutputPreview requires a target DOM element.");
    }
    if (typeof document !== "undefined") {
      try {
        __privateSet(this, _measurementContext, document.createElement("canvas").getContext("2d"));
      } catch {
        __privateSet(this, _measurementContext, null);
      }
      injectDefaultStyles();
    }
    if (canvasOrOptions instanceof HTMLElement && text instanceof HTMLElement) {
      __privateSet(this, _stage, stageOrTarget);
      __privateSet(this, _canvas, canvasOrOptions);
      __privateSet(this, _text, text);
      __privateSet(this, _placeholder, placeholder);
    } else {
      __privateSet(this, _stage, stageOrTarget);
      const options = canvasOrOptions || {};
      __privateSet(this, _mode, options.mode === "bitmap" ? "bitmap" : "text");
      __privateSet(this, _canvas, document.createElement("canvas"));
      __privateGet(this, _canvas).className = "output-canvas";
      __privateGet(this, _canvas).setAttribute("role", "img");
      __privateGet(this, _canvas).setAttribute("aria-label", "Rendered terminal art as bitmap canvas");
      __privateGet(this, _canvas).hidden = __privateGet(this, _mode) !== "bitmap";
      __privateSet(this, _text, document.createElement("div"));
      __privateGet(this, _text).className = "output-text";
      __privateGet(this, _text).setAttribute("role", "img");
      __privateGet(this, _text).setAttribute("aria-label", "Rendered terminal art as native browser text");
      __privateGet(this, _text).hidden = __privateGet(this, _mode) !== "text";
      __privateGet(this, _stage).replaceChildren(__privateGet(this, _canvas), __privateGet(this, _text));
      if (options.fontFamily) {
        this.setFontFamily(options.fontFamily);
      } else {
        __privateGet(this, _text).style.fontFamily = `"${__privateGet(this, _fontFamily).replaceAll('"', '\\"')}", monospace`;
      }
      if (options.fontSize) {
        this.setOutputFontSize(options.fontSize);
      }
    }
  }
  setMode(mode) {
    __privateSet(this, _mode, mode === "bitmap" ? "bitmap" : "text");
    __privateMethod(this, _OutputPreview_instances, updateVisibility_fn).call(this);
  }
  getMode() {
    return __privateGet(this, _mode);
  }
  setFontFamily(family) {
    __privateSet(this, _fontFamily, family || DEFAULT_FONT_FAMILY);
    __privateGet(this, _text).style.fontFamily = `"${__privateGet(this, _fontFamily).replaceAll('"', '\\"')}", monospace`;
    if (__privateGet(this, _textMetrics)) __privateMethod(this, _OutputPreview_instances, applyTextDisplayMetrics_fn).call(this, __privateGet(this, _textMetrics));
  }
  setOutputFontSize(value) {
    const next = Number(value);
    if (!Number.isFinite(next) || next <= 0) return;
    __privateSet(this, _displayFontSize, next);
    if (__privateGet(this, _bitmapMetrics)) __privateMethod(this, _OutputPreview_instances, applyBitmapDisplaySize_fn).call(this, __privateGet(this, _bitmapMetrics));
    if (__privateGet(this, _textMetrics)) __privateMethod(this, _OutputPreview_instances, applyTextDisplayMetrics_fn).call(this, __privateGet(this, _textMetrics));
  }
  /**
   * Draws raw art string or parsed result object.
   * @param {string | object} resultOrArt
   * @param {object} [options]
   */
  draw(resultOrArt, options = {}) {
    let result;
    if (typeof resultOrArt === "string") {
      const parsed = parse(resultOrArt, options);
      const fontSize = options.fontSize ?? __privateGet(this, _displayFontSize);
      let naturalAdvance = fontSize * (options.aspectRatio ?? DEFAULT_ASPECT_RATIO);
      if (__privateGet(this, _measurementContext)) {
        __privateGet(this, _measurementContext).font = `400 ${__privateGet(this, _displayFontSize)}px "${__privateGet(this, _fontFamily).replaceAll('"', '\\"')}", monospace`;
        const measured = __privateGet(this, _measurementContext).measureText("M").width;
        if (measured > 0) naturalAdvance = measured;
      }
      const cellAdvance = options.cellAdvance ?? (options.aspectRatio !== void 0 ? fontSize * options.aspectRatio : naturalAdvance);
      const lineHeight = options.lineHeight ?? fontSize;
      result = {
        columns: parsed.columns,
        rows: parsed.rows,
        renderFontSize: fontSize,
        fontSize,
        cellAdvance,
        lineHeight,
        cells: parsed.cells
      };
    } else {
      result = resultOrArt;
    }
    __privateMethod(this, _OutputPreview_instances, drawBitmap_fn).call(this, result);
    if (result && result.cells) {
      let naturalAdvance = __privateGet(this, _displayFontSize) * DEFAULT_ASPECT_RATIO;
      if (__privateGet(this, _measurementContext)) {
        __privateGet(this, _measurementContext).font = `400 ${__privateGet(this, _displayFontSize)}px "${__privateGet(this, _fontFamily).replaceAll('"', '\\"')}", monospace`;
        const measured = __privateGet(this, _measurementContext).measureText("M").width;
        if (measured > 0) naturalAdvance = measured;
      }
      __privateSet(this, _textMetrics, {
        columns: result.columns,
        rows: result.rows,
        renderFontSize: result.renderFontSize ?? result.fontSize ?? __privateGet(this, _displayFontSize),
        cellAdvance: result.cellAdvance ?? naturalAdvance,
        lineHeight: result.lineHeight ?? __privateGet(this, _displayFontSize)
      });
      __privateMethod(this, _OutputPreview_instances, applyTextDisplayMetrics_fn).call(this, __privateGet(this, _textMetrics));
      __privateMethod(this, _OutputPreview_instances, drawText_fn).call(this, result.cells);
    } else {
      __privateGet(this, _text).replaceChildren();
      __privateSet(this, _textMetrics, void 0);
      __privateSet(this, _hasText, false);
    }
    __privateMethod(this, _OutputPreview_instances, updateVisibility_fn).call(this);
  }
  /**
   * Alias for draw.
   */
  render(resultOrArt, options) {
    this.draw(resultOrArt, options);
  }
  hasText() {
    return __privateGet(this, _hasText);
  }
  clear(message = "Rendered output will appear here.") {
    __privateSet(this, _bitmapMetrics, void 0);
    __privateSet(this, _textMetrics, void 0);
    __privateSet(this, _hasText, false);
    if (__privateGet(this, _canvas)) {
      __privateGet(this, _canvas).width = 0;
      __privateGet(this, _canvas).height = 0;
      __privateGet(this, _canvas).hidden = true;
    }
    __privateGet(this, _text).replaceChildren();
    __privateGet(this, _text).hidden = true;
    __privateMethod(this, _OutputPreview_instances, setStageSize_fn).call(this, 0, 0);
    if (__privateGet(this, _placeholder)) {
      __privateGet(this, _placeholder).textContent = message;
      __privateGet(this, _placeholder).hidden = false;
    }
  }
  clientPointToCell(clientX, clientY, columns, rows) {
    const bounds = __privateGet(this, _stage).getBoundingClientRect();
    const cols = columns ?? (__privateGet(this, _mode) === "text" ? __privateGet(this, _textMetrics)?.columns : __privateGet(this, _bitmapMetrics)?.columns) ?? 0;
    const rws = rows ?? (__privateGet(this, _mode) === "text" ? __privateGet(this, _textMetrics)?.rows : __privateGet(this, _bitmapMetrics)?.rows) ?? 0;
    if (bounds.width <= 0 || bounds.height <= 0 || cols <= 0 || rws <= 0) return void 0;
    return {
      x: Math.max(0, Math.min(cols - 1, Math.floor((clientX - bounds.left) * cols / bounds.width))),
      y: Math.max(0, Math.min(rws - 1, Math.floor((clientY - bounds.top) * rws / bounds.height)))
    };
  }
};
_stage = new WeakMap();
_canvas = new WeakMap();
_text = new WeakMap();
_placeholder = new WeakMap();
_mode = new WeakMap();
_displayFontSize = new WeakMap();
_fontFamily = new WeakMap();
_bitmapMetrics = new WeakMap();
_textMetrics = new WeakMap();
_hasText = new WeakMap();
_measurementContext = new WeakMap();
_OutputPreview_instances = new WeakSet();
drawBitmap_fn = function(result) {
  if (!__privateGet(this, _canvas) || !result) {
    if (__privateGet(this, _canvas)) {
      __privateGet(this, _canvas).width = 0;
      __privateGet(this, _canvas).height = 0;
    }
    __privateSet(this, _bitmapMetrics, void 0);
    return;
  }
  if (result.previewRgba?.length && result.previewWidth && result.previewHeight) {
    const expectedBytes = result.previewWidth * result.previewHeight * 4;
    if (result.previewRgba.byteLength === expectedBytes) {
      __privateGet(this, _canvas).width = result.previewWidth;
      __privateGet(this, _canvas).height = result.previewHeight;
      const context = __privateGet(this, _canvas).getContext("2d", { alpha: false });
      context.imageSmoothingEnabled = false;
      const pixels = new Uint8ClampedArray(
        result.previewRgba.buffer,
        result.previewRgba.byteOffset,
        result.previewRgba.byteLength
      );
      context.putImageData(new ImageData(pixels, result.previewWidth, result.previewHeight), 0, 0);
      __privateSet(this, _bitmapMetrics, {
        previewWidth: result.previewWidth,
        previewHeight: result.previewHeight,
        columns: result.columns,
        rows: result.rows,
        renderFontSize: result.fontSize,
        cellAdvance: result.cellAdvance,
        lineHeight: result.lineHeight
      });
      __privateMethod(this, _OutputPreview_instances, applyBitmapDisplaySize_fn).call(this, __privateGet(this, _bitmapMetrics));
      return;
    }
  }
  if (result.cells && result.cells.length > 0) {
    const columns = result.columns;
    const rows = result.rows;
    const fontSize = result.fontSize ?? __privateGet(this, _displayFontSize);
    const cellAdvance = result.cellAdvance ?? fontSize * DEFAULT_ASPECT_RATIO;
    const lineHeight = result.lineHeight ?? fontSize;
    const cellWidth = Math.max(1, Math.round(cellAdvance));
    const cellHeight = Math.max(1, Math.round(lineHeight));
    const totalWidth = columns * cellWidth;
    const totalHeight = rows * cellHeight;
    if (totalWidth <= 0 || totalHeight <= 0) {
      __privateGet(this, _canvas).width = 0;
      __privateGet(this, _canvas).height = 0;
      __privateSet(this, _bitmapMetrics, void 0);
      return;
    }
    __privateGet(this, _canvas).width = totalWidth;
    __privateGet(this, _canvas).height = totalHeight;
    const ctx = __privateGet(this, _canvas).getContext("2d", { alpha: false });
    ctx.imageSmoothingEnabled = false;
    ctx.textBaseline = "top";
    const defaultFg = [255, 255, 255];
    const defaultBg = [0, 0, 0];
    for (let r = 0; r < result.cells.length; r++) {
      const row = result.cells[r];
      const y = r * cellHeight;
      for (let c = 0; c < row.length; c++) {
        const cell = row[c];
        const x = c * cellWidth;
        const style = displayStyle(cell, defaultFg, defaultBg);
        ctx.fillStyle = rgbToString(style.background, defaultBg);
        ctx.fillRect(x, y, cellWidth, cellHeight);
        if (cell.character && cell.character !== " ") {
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, y, cellWidth, cellHeight);
          ctx.clip();
          ctx.fillStyle = rgbToString(style.foreground, defaultFg);
          ctx.font = `${style.bold ? "700 " : "400 "}${style.italic ? "italic " : ""}${fontSize}px "${__privateGet(this, _fontFamily).replaceAll('"', '\\"')}", monospace`;
          ctx.fillText(cell.character, x, y);
          ctx.restore();
        }
      }
    }
    __privateSet(this, _bitmapMetrics, {
      previewWidth: totalWidth,
      previewHeight: totalHeight,
      columns,
      rows,
      renderFontSize: fontSize,
      cellAdvance,
      lineHeight
    });
    __privateMethod(this, _OutputPreview_instances, applyBitmapDisplaySize_fn).call(this, __privateGet(this, _bitmapMetrics));
    return;
  }
  __privateGet(this, _canvas).width = 0;
  __privateGet(this, _canvas).height = 0;
  __privateSet(this, _bitmapMetrics, void 0);
};
applyBitmapDisplaySize_fn = function(result) {
  if (!__privateGet(this, _canvas)) return;
  const scale = result.renderFontSize > 0 ? __privateGet(this, _displayFontSize) / result.renderFontSize : 1;
  const width = result.columns * result.cellAdvance * scale;
  const height = result.rows * result.lineHeight * scale;
  __privateGet(this, _canvas).style.width = `${width}px`;
  __privateGet(this, _canvas).style.height = `${height}px`;
  if (__privateGet(this, _mode) === "bitmap") __privateMethod(this, _OutputPreview_instances, setStageSize_fn).call(this, width, height);
};
drawText_fn = function(rows) {
  const documentFragment = document.createDocumentFragment();
  for (const cells of rows) {
    const row = document.createElement("div");
    row.className = "output-text-row";
    let run;
    let runStyle;
    for (const cell of cells) {
      const style = displayStyle(cell);
      if (!run || !sameStyle(style, runStyle)) {
        run = document.createElement("span");
        run.className = "output-text-run";
        run.style.color = rgbToString(style.foreground, [255, 255, 255]);
        run.style.backgroundColor = rgbToString(style.background, [0, 0, 0]);
        run.style.fontWeight = style.bold ? "700" : "400";
        run.style.fontStyle = style.italic ? "italic" : "normal";
        run.style.textDecoration = style.underline ? "underline" : "none";
        row.append(run);
        runStyle = style;
      }
      const cellElement = document.createElement("span");
      cellElement.className = "output-text-cell";
      cellElement.append(document.createTextNode(cell.character ?? ""));
      run.append(cellElement);
    }
    documentFragment.append(row);
  }
  __privateGet(this, _text).replaceChildren(documentFragment);
  __privateSet(this, _hasText, rows.length > 0);
};
applyTextDisplayMetrics_fn = function(result) {
  const scale = result.renderFontSize > 0 ? __privateGet(this, _displayFontSize) / result.renderFontSize : 1;
  const cellAdvance = result.cellAdvance * scale;
  const lineHeight = result.lineHeight * scale;
  let naturalAdvance = cellAdvance;
  if (__privateGet(this, _measurementContext)) {
    __privateGet(this, _measurementContext).font = `400 ${__privateGet(this, _displayFontSize)}px "${__privateGet(this, _fontFamily).replaceAll('"', '\\"')}"`;
    naturalAdvance = __privateGet(this, _measurementContext).measureText("M").width;
  }
  __privateGet(this, _text).style.fontSize = `${__privateGet(this, _displayFontSize)}px`;
  __privateGet(this, _text).style.letterSpacing = `${cellAdvance - naturalAdvance}px`;
  __privateGet(this, _text).style.lineHeight = `${lineHeight}px`;
  __privateGet(this, _text).style.width = `${result.columns * cellAdvance}px`;
  __privateGet(this, _text).style.height = `${result.rows * lineHeight}px`;
  __privateGet(this, _text).style.setProperty("--output-line-height", `${lineHeight}px`);
  __privateGet(this, _text).style.setProperty("--output-cell-advance", `${cellAdvance}px`);
  if (__privateGet(this, _mode) === "text") {
    __privateMethod(this, _OutputPreview_instances, setStageSize_fn).call(this, result.columns * cellAdvance, result.rows * lineHeight);
  }
};
setStageSize_fn = function(width, height) {
  if (__privateGet(this, _stage)) {
    __privateGet(this, _stage).style.width = `${width}px`;
    __privateGet(this, _stage).style.height = `${height}px`;
  }
};
updateVisibility_fn = function() {
  const showText = __privateGet(this, _mode) === "text" && __privateGet(this, _hasText);
  const showBitmap = __privateGet(this, _mode) === "bitmap" && Boolean(__privateGet(this, _bitmapMetrics));
  __privateGet(this, _text).hidden = !showText;
  if (__privateGet(this, _canvas)) __privateGet(this, _canvas).hidden = !showBitmap;
  if (showText && __privateGet(this, _textMetrics)) {
    __privateMethod(this, _OutputPreview_instances, applyTextDisplayMetrics_fn).call(this, __privateGet(this, _textMetrics));
  } else if (showBitmap && __privateGet(this, _bitmapMetrics)) {
    __privateMethod(this, _OutputPreview_instances, applyBitmapDisplaySize_fn).call(this, __privateGet(this, _bitmapMetrics));
  } else {
    __privateMethod(this, _OutputPreview_instances, setStageSize_fn).call(this, 0, 0);
  }
  if (__privateGet(this, _placeholder)) {
    __privateGet(this, _placeholder).textContent = __privateGet(this, _mode) === "text" ? "Render once to create the native-text preview." : "Rendered output will appear here.";
    __privateGet(this, _placeholder).hidden = showText || showBitmap;
  }
};
function render(rawArtOrResult, targetElement, options = {}) {
  const preview = new OutputPreview(targetElement, options);
  preview.draw(rawArtOrResult, options);
  return preview;
}

// src/html-renderer.js
function toHtml(input, options = {}) {
  const parsed = parse(input, options);
  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground ?? [0, 0, 0];
  const className = options.className ?? "output-text";
  const rowClassName = options.rowClassName ?? "output-text-row";
  const runClassName = options.runClassName ?? "output-text-run";
  const cellClassName = options.cellClassName ?? "output-text-cell";
  const fontSize = typeof options.fontSize === "number" ? options.fontSize : 16;
  const fontFamily = options.fontFamily || "Iosevka Fixed, monospace";
  const cellAdvance = options.cellAdvance ?? fontSize * (options.aspectRatio ?? 0.5);
  const lineHeight = options.lineHeight ?? fontSize;
  const containerStyles = [
    `font-size: ${fontSize}px;`,
    `font-family: "${fontFamily.replaceAll('"', '\\"')}", monospace;`,
    `line-height: ${lineHeight}px;`,
    `--output-line-height: ${lineHeight}px;`,
    `--output-cell-advance: ${cellAdvance}px;`,
    `width: ${parsed.columns * cellAdvance}px;`,
    `height: ${parsed.rows * lineHeight}px;`
  ];
  const rowsHtml = [];
  for (const cells of parsed.cells) {
    let currentRunCells = [];
    let currentStyle = null;
    let runsHtml = [];
    const flushRun = () => {
      if (currentStyle && currentRunCells.length > 0) {
        const styleDeclarations = [
          `color: ${rgbToString(currentStyle.foreground, defaultForeground)};`,
          `background-color: ${rgbToString(currentStyle.background, defaultBackground)};`
        ];
        if (currentStyle.bold) styleDeclarations.push("font-weight: 700;");
        if (currentStyle.italic) styleDeclarations.push("font-style: italic;");
        if (currentStyle.underline) styleDeclarations.push("text-decoration: underline;");
        const styleAttr = options.inlineStyles !== false ? ` style="${styleDeclarations.join(" ")}"` : "";
        runsHtml.push(
          `<span class="${escapeHtml(runClassName)}"${styleAttr}>${currentRunCells.join("")}</span>`
        );
        currentRunCells = [];
      }
    };
    for (const cell of cells) {
      const style = displayStyle(cell, defaultForeground, defaultBackground);
      if (!currentStyle || !sameStyle(style, currentStyle)) {
        flushRun();
        currentStyle = style;
      }
      currentRunCells.push(
        `<span class="${escapeHtml(cellClassName)}">${escapeHtml(cell.character ?? "")}</span>`
      );
    }
    flushRun();
    rowsHtml.push(
      `  <div class="${escapeHtml(rowClassName)}">${runsHtml.join("")}</div>`
    );
  }
  const containerStyleAttr = options.inlineStyles !== false ? ` style="${containerStyles.join(" ")}"` : "";
  let output = `<div class="${escapeHtml(className)}"${containerStyleAttr} role="img" aria-label="${escapeHtml(options.ariaLabel ?? "Rendered terminal art as native browser text")}">
${rowsHtml.join("\n")}
</div>`;
  if (options.includeCss) {
    output = `<style>
${DEFAULT_CSS}
</style>
` + output;
  }
  return output;
}
function toHtmlDocument(input, options = {}) {
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
      background: #000;
      color: #fff;
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
export {
  ANSI16_PALETTE,
  ANSI256_HEX,
  ANSI256_PALETTE,
  DEFAULT_CSS,
  IRC99_HEX,
  IRC99_PALETTE,
  MIRC16_PALETTE,
  OutputPreview,
  detectFormat,
  displayStyle,
  escapeHtml,
  getAnsiColor,
  getIrcColor,
  hexNumberToRgb,
  injectDefaultStyles,
  parse,
  parseAnsi,
  parseHexString,
  parseIrc,
  render,
  render as renderTo,
  rgbToHex,
  rgbToString,
  sameStyle,
  toHtml,
  toHtmlDocument
};
