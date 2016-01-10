import d3 from 'd3';

class fluData {
  constructor(dataSet) {
    this.dataSet = this.cityOnly(dataSet);
  }

  isCity(datum) {
    return datum.reporting_area.indexOf(",") !== -1 &&
      datum.location_1 &&
      datum.location_1.longitude &&
      datum.location_1.latitude;
  }

  cityOnly(dataSet) {
    let _this = this;
    return dataSet.filter( datum => _this.isCity(datum));
  }

  byCityAndWeekOf(weekNumber) {
    return this.dataSet.filter( (datum) => {
      return (Number(datum.mmwr_week) === Number(weekNumber)) &&
        !datum.all_causes_by_age_years_lt_1_flag;
    });
  }

  weeksExtent() {
    return d3.extent(this.dataSet.map((datum) => {
      return Number(datum.mmwr_week);
    }));
  }

  deathExtentOfCities() {
    return d3.extent(this.dataSet, (datum) => {
          return Number(datum.all_causes_by_age_years_all_ages);
    });
  }

  allDeathsWeekOf(weekNumber) {
    let weeklyDeath = this.byCityAndWeekOf(weekNumber).map( (datum) => {
      return Number(datum.all_causes_by_age_years_all_ages);
    });
    return weeklyDeath.reduce((prev, cur) => prev + cur );
  }
}

export default fluData;
