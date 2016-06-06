import * as React from "react";
import {assert} from "chai";
import {AlbumList} from "../../src/components/Album";
import {render} from "enzyme";

describe("Album", function() {
  describe("<AlbumList/>", function () {
    it("renders two albums", () => {
      let albums = [
        {_id: "foo", name: "Foo", artist: "Foo Fighters"},
        {_id: "bar", name: "Bar", artist: "Bar Fighters"},
      ];
      const wrapper = render(<AlbumList albums={albums} />);
      assert.lengthOf(wrapper.find("a"), 2);
    });
  });
});

