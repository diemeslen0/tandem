import { SyntheticDocument, SyntheticElement, SyntheticString } from "tandem-runtime";
import { expect } from "chai";

describe(__filename + "#", () => {

  const doc = new SyntheticDocument()

  it("can be created", () => {
    const element = new SyntheticElement(new SyntheticString("div"), doc);
  });
  it("can set the innerHTML", () => {
    const element = new SyntheticElement(new SyntheticString("div"), doc);
    element.innerHTML = "<span>hello</span>";
    expect(element.childNodes.value.length).to.equal(1);
  });
});