import { parseIrc } from "./parser-irc.js";
import { parseAnsi } from "./parser-ansi.js";
import { detectFormat } from "./utils.js";

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
