// Example of converting raw IRC / ANSI art to an HTML string in Node.js / SSR
import { toHtml, toHtmlDocument } from "../dist/index.js";

const rawIrcArt = "\x0304,01Hello \x0309World!\x0F";

// Generate standalone HTML document with embedded CSS
const htmlDoc = toHtmlDocument(rawIrcArt, {
  fontSize: 16,
  title: "My Terminal Art",
});

console.log("Generated HTML Document:");
console.log(htmlDoc);
