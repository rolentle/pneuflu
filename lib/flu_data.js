function fluData(dataSet) {
  this.dataSet = dataSet;

  this.isCity = function(datum) {
    return datum.reporting_area.indexOf(",") !== -1 &&
      datum.location_1 &&
      datum.location_1.longitude &&
      datum.location_1.latitude;
  };

  this.byCity = function() {
    var _this = this;
    return dataSet.filter(function(datum) {
      return _this.isCity(datum);
    });
  };

  this.byCityAndWeekOf = function(weekNumber) {
    return this.byCity().filter(function(datum) {
      return (Number(datum.mmwr_week) === Number(weekNumber)) &&
        !datum.all_causes_by_age_years_lt_1_flag;
    });
  };

  this.weeksExtent = function() {
    return d3.extent(this.dataSet.map(function(datum) {
      return Number(datum.mmwr_week);
    }));
  };

  this.deathExtentOfCities = function() {
    return d3.extent(this.byCity(), function(datum) {
          return Number(datum.all_causes_by_age_years_all_ages);
    });
  };

  this.allDeathsWeekOf = function(weekNumber) {
    var weeklyDeath = this.byCityAndWeekOf(weekNumber).map(function(datum) {
      return Number(datum.all_causes_by_age_years_all_ages);
    });
    return weeklyDeath.reduce(function(prev, cur, i, arry) {
      return prev + cur;
    });
  };
};

