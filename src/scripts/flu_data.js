import d3 from 'd3';

class fluData {
  constructor(dataSet) {
    this.dataSet = dataSet;
  };

  isCity(datum) {
    return datum.reporting_area.indexOf(",") !== -1 &&
      datum.location_1 &&
      datum.location_1.longitude &&
      datum.location_1.latitude;
  };

  byCity() {
    let _this = this;
    return this.dataSet.filter( (datum) => {
      return _this.isCity(datum);
    });
  };

  byCityAndWeekOf(weekNumber) {
    return this.byCity().filter( (datum) => {
      return (Number(datum.mmwr_week) === Number(weekNumber)) &&
        !datum.all_causes_by_age_years_lt_1_flag;
    });
  };

  weeksExtent() {
    return d3.extent(this.dataSet.map((datum) => {
      return Number(datum.mmwr_week);
    }));
  };

  deathExtentOfCities() {
    return d3.extent(this.byCity(), (datum) => {
          return Number(datum.all_causes_by_age_years_all_ages);
    });
  };

  allDeathsWeekOf(weekNumber) {
    let weeklyDeath = this.byCityAndWeekOf(weekNumber).map( (datum) => {
      return Number(datum.all_causes_by_age_years_all_ages);
    });
    return weeklyDeath.reduce((prev, cur, i, arry) => {
      return prev + cur;
    });
  };
};

export default fluData;
