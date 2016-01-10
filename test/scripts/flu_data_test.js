import assert from 'assert';
import fluData from './../../src/scripts/flu_data';
import fluDataFixture from './../fixtures/flu_data_fixture';

describe("FluData", () => {
  let flu = new fluData(fluDataFixture);
  describe("#dataSet", () => {
    it("returns only data pertaining to cities", () => {
      assert.equal(2, flu.dataSet.length);
    });
  });
  describe("#byCityAndWeekOf", () => {
    it("returns records with the week given for 1", () => {
      let week1Records = flu.byCityAndWeekOf("1");
      assert.equal(1, week1Records.length);
      assert.equal(1, week1Records[0].week);
    });

    it("returns records with the week given for 2", () => {
      let week2Records = flu.byCityAndWeekOf("2");
      assert.equal(1, week2Records.length);
      assert.equal(2, week2Records[0].week);
    });
  });
  describe("#weeksExtent", () => {
    it("returns max and mins", () => {
      let weeksExtent = flu.weeksExtent();
      assert.equal(1, weeksExtent[0]);
      assert.equal(2, weeksExtent[1]);
    });
  });
  describe("#deathExtentOfCities", () => {
    it("returns max and mins", () => {
      let deathExtentOfCities = flu.deathExtentOfCities();
      assert.equal(42, deathExtentOfCities[0]);
      assert.equal(108, deathExtentOfCities[1]);
    });
  });
  describe("#allDeathsWeekOf", () => {
    it("returns max and mins", () => {
      let allWeeklyDeaths = flu.allDeathsWeekOf("1");
      assert.equal(108, allWeeklyDeaths);
    });
  });
});
