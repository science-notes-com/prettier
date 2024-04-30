import { hardline } from "../../document/builders.js";
import { isNextLineEmpty, areNextLinesEmpty } from "../utils/index.js";

/**
 * @typedef {import("../../document/builders.js").Doc} Doc
 * @typedef {import("../../common/ast-path.js")} AstPath
 */

/*
- `Program` ("directives" and "body")
- `BlockStatement`
- `StaticBlock`
- `SwitchCase` ("consequent")
- `TSModuleBlock` (TypeScript)
*/
function printStatementSequence(path, options, print, property) {
  const { node } = path;
  const parts = [];
  const lastStatement = node[property].findLast(
    (statement) => statement.type !== "EmptyStatement",
  );

  path.each(({ node }) => {
    // Skip printing EmptyStatement nodes to avoid leaving stray
    // semicolons lying around.
    if (node.type === "EmptyStatement") {
      return;
    }

    parts.push(print());

    if (node !== lastStatement) {
      parts.push(hardline);

      // Multiple empty lines are turned into 1 or 2 empty lines
      if (isNextLineEmpty(node, options)) {
        // console.log('next line is empty')
        parts.push(hardline);
        if (areNextLinesEmpty(node, options)) {
          // console.log('more than one line is empty')
          parts.push(hardline);
        }
      }
    }
  }, property);

  return parts;
}

export { printStatementSequence };
