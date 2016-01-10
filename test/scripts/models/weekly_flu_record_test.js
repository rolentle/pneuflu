import assert from 'assert';

import WeeklyFluRecord from './../../../src/scripts/models/weekly_flu_record';
import fluDataFixture from './../../fixtures/flu_data_fixture';

describe("WeeklyFluRecord", () => {
  describe("for a city record", () => {
    let bostonRecord = fluDataFixture[1];
    let record = new WeeklyFluRecord(bostonRecord);
    describe("#constructor", () => {

      it("sets the year", () => {
        assert.equal(2014, record.year);
      });

      it("sets the week", () => {
        assert.equal(1, record.week);
      });

      it("set deaths", () => {
        assert.equal(108, record.deaths.total);
        assert.equal(4, record.deaths.ages_0_1);
        assert.equal(2, record.deaths.ages_1_24);
        assert.equal(7, record.deaths.ages_25_44);
        assert.equal(18, record.deaths.ages_45_64);
        assert.equal(77, record.deaths.ages_65_999);
      });

      it("sets reporting area", () => {
        assert.equal("Boston, MA",record.reporting_area);
      });

      it("sets location", () => {
        assert.equal("-71.05673887699965",record.location.longitude);
        assert.equal("42.35866170200046",record.location.latitude);
      });
    });
    describe("#isCity", () => {
      it("is true", () => {
        assert.equal(true, record.isCity());
      });
    });
    describe("#type", () => {
      it("is true", () => {
        assert.equal("city", record.type());
      });
    });
  });

  describe("for a region record", () => {
    let newEnglandRecord = fluDataFixture[0];
    let record = new WeeklyFluRecord(newEnglandRecord);
    describe("#isCity", () => {
      it("is false", () => {
        assert.equal(false, record.isCity());
      });
    });
    describe("#type", () => {
      it("is true", () => {
        assert.equal("region", record.type());
      });
    });
  });
});
