import assert from "node:assert";
import { parseAnsi } from "../src/parser-ansi.js";
import { ANSI256_PALETTE } from "../src/palettes.js";

export function testAnsiParser() {
  console.log("Testing ANSI Parser...");

  // 1. Standard 8 colors & bright colors
  const ansiBasic = parseAnsi("\x1b[31mRed\x1b[32mGreen\x1b[94mBrightBlue\x1b[0m");
  assert.deepStrictEqual(ansiBasic.cells[0][0].foreground, ANSI256_PALETTE[1]); // Red
  assert.deepStrictEqual(ansiBasic.cells[0][3].foreground, ANSI256_PALETTE[2]); // Green
  assert.deepStrictEqual(ansiBasic.cells[0][8].foreground, ANSI256_PALETTE[12]); // Bright blue (94 -> 12)

  // 2. Background colors
  const ansiBg = parseAnsi("\x1b[41mRedBg\x1b[102mBrightGreenBg");
  assert.deepStrictEqual(ansiBg.cells[0][0].background, ANSI256_PALETTE[1]);
  assert.deepStrictEqual(ansiBg.cells[0][5].background, ANSI256_PALETTE[10]);

  // 3. 256-color extended mode \x1b[38;5;n and \x1b[48;5;n
  const ansi256 = parseAnsi("\x1b[38;5;214;48;5;61mArt");
  assert.deepStrictEqual(ansi256.cells[0][0].foreground, ANSI256_PALETTE[214]);
  assert.deepStrictEqual(ansi256.cells[0][0].background, ANSI256_PALETTE[61]);

  // 4. 24-bit Truecolor RGB mode \x1b[38;2;r;g;b
  const truecolor = parseAnsi("\x1b[38;2;250;120;50;48;2;10;20;30mRGB");
  assert.deepStrictEqual(truecolor.cells[0][0].foreground, [250, 120, 50]);
  assert.deepStrictEqual(truecolor.cells[0][0].background, [10, 20, 30]);

  // 5. Styles: Bold, Italic, Underline, Invert
  const styles = parseAnsi("\x1b[1mBold\x1b[22m \x1b[3mItalic\x1b[23m \x1b[4mUnder\x1b[24m \x1b[7mInvert\x1b[27m");
  assert.strictEqual(styles.cells[0][0].bold, true);
  assert.strictEqual(styles.cells[0][5].bold, false);
  assert.strictEqual(styles.cells[0][6].italic, true);
  assert.strictEqual(styles.cells[0][13].underline, true);
  assert.strictEqual(styles.cells[0][20].inverted, true);

  // 6. Non-SGR sequence filtering (e.g. cursor moves, clear screen)
  const nonSgr = parseAnsi("\x1b[2J\x1b[HCleanText");
  assert.strictEqual(nonSgr.cells[0].map((c) => c.character).join(""), "CleanText");

  console.log("✓ ANSI Parser tests passed!");
}
