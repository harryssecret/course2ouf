import React from "react";
import renderer from "react-test-renderer";

import { ScannedTagList } from "./ScannedTagHistory";

describe("<ScannedTagList/> renders correctly", () => {
  it("has 3 childs", () => {
    const tagList = [{}];
    const tree = renderer.create(<ScannedTagList tagList={tagList} />);
  });
});
