import assert from "node:assert";
import {
  IRC99_PALETTE,
  MIRC16_PALETTE,
  ANSI256_PALETTE,
  ANSI16_PALETTE,
  getIrcColor,
  getAnsiColor,
  rgbToString,
  rgbToHex,
  hexNumberToRgb,
  parseHexString,
} from "../src/palettes.js";

export function testPalettes() {
  console.log("Testing Palettes & Color Utils...");

  // Palette sizes
  assert.strictEqual(IRC99_PALETTE.length, 99, "IRC99 should have 99 colors");
  assert.strictEqual(MIRC16_PALETTE.length, 16, "MIRC16 should have 16 colors");
  assert.strictEqual(ANSI256_PALETTE.length, 256, "ANSI256 should have 256 colors");
  assert.strictEqual(ANSI16_PALETTE.length, 16, "ANSI16 should have 16 colors");

  // IRC key colors
  assert.deepStrictEqual(IRC99_PALETTE[0], [255, 255, 255], "IRC 0 is White");
  assert.deepStrictEqual(IRC99_PALETTE[1], [0, 0, 0], "IRC 1 is Black");
  assert.deepStrictEqual(IRC99_PALETTE[4], [255, 0, 0], "IRC 4 is Red");

  // ANSI key colors
  assert.deepStrictEqual(ANSI256_PALETTE[0], [0, 0, 0], "ANSI 0 is Black");
  assert.deepStrictEqual(ANSI256_PALETTE[15], [255, 255, 255], "ANSI 15 is White");

  // Helper conversions
  assert.deepStrictEqual(hexNumberToRgb(0xff0000), [255, 0, 0]);
  assert.deepStrictEqual(hexNumberToRgb(0x00ff00), [0, 255, 0]);
  assert.deepStrictEqual(hexNumberToRgb(0x0000ff), [0, 0, 255]);

  assert.deepStrictEqual(parseHexString("#ff8800"), [255, 136, 0]);
  assert.deepStrictEqual(parseHexString("ff8800"), [255, 136, 0]);
  assert.deepStrictEqual(parseHexString("#f80"), [255, 136, 0]);
  assert.strictEqual(parseHexString("invalid"), undefined);

  assert.strictEqual(rgbToString([255, 128, 0]), "rgb(255 128 0)");
  assert.strictEqual(rgbToHex([255, 128, 0]), "#ff8000");

  assert.deepStrictEqual(getIrcColor(4), [255, 0, 0]);
  assert.deepStrictEqual(getAnsiColor(1), [128, 0, 0]);

  console.log("✓ Palettes & Color Utils passed!");
}
