import assert from "node:assert";
import { parseIrc } from "../src/parser-irc.js";
import { IRC99_PALETTE } from "../src/palettes.js";

export function testIrcParser() {
  console.log("Testing IRC Parser...");

  // 1. Plain text
  const plain = parseIrc("Hello\nWorld");
  assert.strictEqual(plain.rows, 2);
  assert.strictEqual(plain.columns, 5);
  assert.strictEqual(plain.cells[0][0].character, "H");
  assert.strictEqual(plain.cells[1][4].character, "d");

  // 2. Foreground color \x0304
  const colored = parseIrc("\x0304Red\x0303Green");
  assert.strictEqual(colored.cells[0].length, 8);
  assert.deepStrictEqual(colored.cells[0][0].foreground, IRC99_PALETTE[4]); // Red
  assert.deepStrictEqual(colored.cells[0][3].foreground, IRC99_PALETTE[3]); // Green

  // 3. Foreground and Background color \x0304,01
  const fgBg = parseIrc("\x0304,01Text");
  assert.deepStrictEqual(fgBg.cells[0][0].foreground, IRC99_PALETTE[4]);
  assert.deepStrictEqual(fgBg.cells[0][0].background, IRC99_PALETTE[1]);

  // 4. Reset color with standalone \x03
  const resetColor = parseIrc("\x0304Red\x03Default", {
    defaultForeground: [200, 200, 200],
  });
  assert.deepStrictEqual(resetColor.cells[0][0].foreground, IRC99_PALETTE[4]);
  assert.deepStrictEqual(resetColor.cells[0][3].foreground, [200, 200, 200]);

  // 5. Formatting styles: Bold (\x02), Italic (\x1D), Underline (\x1F), Invert (\x16)
  const styles = parseIrc("\x02Bold\x02 \x1DItalic\x1D \x1FUnder\x1F \x16Invert\x16");
  assert.strictEqual(styles.cells[0][0].bold, true);
  assert.strictEqual(styles.cells[0][5].bold, false);
  assert.strictEqual(styles.cells[0][6].italic, true);
  assert.strictEqual(styles.cells[0][13].underline, true);
  assert.strictEqual(styles.cells[0][20].inverted, true);

  // 6. Reset all formatting \x0F
  const resetAll = parseIrc("\x02\x1D\x0304Fancy\x0FPlain");
  assert.strictEqual(resetAll.cells[0][0].bold, true);
  assert.strictEqual(resetAll.cells[0][0].italic, true);
  assert.deepStrictEqual(resetAll.cells[0][0].foreground, IRC99_PALETTE[4]);

  assert.strictEqual(resetAll.cells[0][5].bold, false);
  assert.strictEqual(resetAll.cells[0][5].italic, false);
  assert.deepStrictEqual(resetAll.cells[0][5].foreground, [255, 255, 255]);

  // 7. Hex color extension \x04RRGGBB
  const hexArt = parseIrc("\x04ff8800,001122Hex");
  assert.deepStrictEqual(hexArt.cells[0][0].foreground, [255, 136, 0]);
  assert.deepStrictEqual(hexArt.cells[0][0].background, [0, 17, 34]);

  // 8. Tabs expansion
  const tabbed = parseIrc("A\tB", { tabWidth: 4 });
  assert.strictEqual(tabbed.cells[0].length, 5); // 'A', ' ', ' ', ' ', 'B'
  assert.strictEqual(tabbed.cells[0][4].character, "B");

  // 9. Multiline and Unicode Astral characters
  const unicodeArt = parseIrc("🭞 16,89▁\n🭊 28🬽");
  assert.strictEqual(unicodeArt.rows, 2);
  assert.strictEqual(unicodeArt.cells[0][0].character, "🭞");

  console.log("✓ IRC Parser tests passed!");
}
