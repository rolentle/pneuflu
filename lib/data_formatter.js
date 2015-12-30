function fluData(dataSet) {
  this.dataSet = dataSet;

  this.isCity = function(datum) {
    return datum.reporting_area.indexOf(",") !== -1 &&
      datum.location_1 &&
      datum.location_1.longitude &&
      datum.location_1.latitude;
  };

  this.by_city = function() {
    var _this = this;
    return dataSet.filter(function(datum) {
      return _this.isCity(datum);
    });
  };

  this.by_city_and_week_of = function(week_number) {
    return this.by_city().filter(function(datum) {
      return (Number(datum.mmwr_week) === Number(week_number)) &&
        !datum.all_causes_by_age_years_lt_1_flag;
    });
  };

  this.weeks_extent = function() {
    return d3.extent(this.dataSet.map(function(datum) {
      return Number(datum.mmwr_week);
    }));
  };

  this.death_extent_of_cities = function() {
    return d3.extent(this.by_city(), function(datum) {
          return datum.all_causes_by_age_years_all_ages;
    });
  };

  this.allDeathsWeekOf = function(week_number) {
    var weekly_death = this.by_city_and_week_of(week_number).map(function(datum) {
      return Number(datum.all_causes_by_age_years_all_ages);
    });
    return weekly_death.reduce(function(prev, cur, i, arry) {
      return prev + cur;
    });
  };
};

