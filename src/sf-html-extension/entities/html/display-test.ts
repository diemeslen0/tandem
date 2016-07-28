import {
  htmlElementFragments,
  htmlTextFragment,
  htmlCommentFragment,
  htmlTemplateEntityFragment,
  HTMLElementEntity
} from "./index";

import { BoundingRect } from 'sf-core/geom';
import * as sift from "sift";
import { EntityEngine, IVisibleEntity } from "sf-core/entities";
import { parse as parseHTML } from "../../parsers/html";
import { FragmentDictionary } from "sf-core/fragments";
import { expect } from "chai";

describe(__filename + "#", function() {
  let fragments;
  beforeEach(function() {
    fragments = new FragmentDictionary(
      ...htmlElementFragments,
      htmlTextFragment,
      htmlCommentFragment,
      htmlTemplateEntityFragment
    );
  });

  async function calculateBounds(source) {
    const engine = new EntityEngine(fragments);
    const entity = await engine.load(parseHTML(source as string))as HTMLElementEntity;
    const div = document.createElement("div");
    document.body.appendChild(div);
    Object.assign(div.style, { position: "fixed", top: "0px", left: "0px" });
    div.appendChild(entity.section.toFragment());
    const target = <IVisibleEntity>(entity.flatten().find(sift({ "attributes.name": "id", "attributes.value": "target" })) as any);
    const bounds = target.display.bounds;
    return [bounds.left, bounds.top, bounds.width, bounds.height];
  }

  describe("bounds ", function() {
    it("are correct for a simple div", async function() {
      expect(await calculateBounds(`<div id="target" style="width:100px;height:100px;">
        </div>`)).to.eql([0, 0, 100, 100]);
    });

    it("returns the correct bounds of a DIV if it's isolated within an iframe", async function() {
      expect(await calculateBounds(`<template style="position:absolute;top:100px;left:100px">
        <div id="target" style="width:100px;height:100px;">
        </div>
      </template>`)).to.eql([100, 100, 100, 100]);
    });

    it("returns the correct bounds of a DIV in a doubly nested iframe", async function() {
      expect(await calculateBounds(`<template style="position:absolute;top:100px;left:100px">
        <template style="position:absolute;top:100px;left:100px">
          <div id="target" style="width:100px;height:100px;">
          </div>
        </template>
      </template>`)).to.eql([200, 200, 100, 100]);
    });

    it("returns the correct bounds of a DIV in a DIV", async function() {
      expect(await calculateBounds(`<div style="top:100px;left:50px;width:100px;height:100px;position:absolute;">
        <div id="target" style="width:100px;height:100px;position:absolute;top:10px;left:10px;" />
      </div>`)).to.eql([60, 110, 100, 100]);
    });
  });
});