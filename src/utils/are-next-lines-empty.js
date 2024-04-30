import hasNewline from "./has-newline.js";
import { skipSpaces } from "./skip.js";
import skipNewline from "./skip-newline.js";
import { getNewlineIdx } from "./is-next-line-empty.js";

/**
 * Determin if a block ends with 2 or more empty lines
 * @param {string} text
 * @param {number} startIndex
 * @returns {boolean}
 */
function areNextLinesEmpty(text, startIndex) {
  let idx = getNewlineIdx(text, startIndex);
  idx = skipNewline(text, idx);
  idx = skipSpaces(text, idx);
  return idx !== false && hasNewline(text, idx);
}

export default areNextLinesEmpty;
