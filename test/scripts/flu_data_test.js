import assert from 'assert';
import fluData from './../../src/scripts/flu_data';

describe("FluData", () => {
  describe("#dataSet", () => {
    it("returns the value passed in the constructor", () => {
      let flu = new fluData(4);
      assert.equal(4, flu.dataSet);
    })
  })
})
