import { HTMLExpressionLoader } from "tandem-html-extension";
import { parse } from "./parser.peg";

export class PCExpressionLoader extends HTMLExpressionLoader {
  async parseContent(content: string) {
    return parse(content);
  }
}