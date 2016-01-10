import assert from 'assert';
import fluData from './../../src/scripts/flu_data';
import fluDataFixture from './../fixtures/flu_data_fixture';

describe("FluData", () => {
  describe("#dataSet", () => {
    it("returns only data pertaining to cities", () => {
      let flu = new fluData(fluDataFixture);
      assert.equal(2, flu.dataSet.length);
    });
  });
});
