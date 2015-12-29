var data_for_cities = function(data_set) {
  return data_set.filter(function(datum) {
    return datum.reporting_area.indexOf(",") !== -1 &&
      datum.location_1 &&
      datum.location_1.longitude &&
      datum.location_1.latitude
  });
};

var filter_by_week = function(data_set, week_number) {
  return data_set.filter(function(datum) {
    return (Number(datum.mmwr_week) === Number(week_number)) &&
      !datum.all_causes_by_age_years_lt_1_flag;
  });
};
