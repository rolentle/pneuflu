class WeeklyFluRecord {
  constructor(record) {
    this.year = Number(record.mmwr_year);
    this.week = Number(record.mmwr_week);
    this.deaths = this.setDeaths(record);
    this.reporting_area = record.reporting_area;
    if(record.location_1) {
      this.location = {
        longitude: record.location_1.longitude,
        latitude: record.location_1.latitude
      };
    }
    else {
      this.location = {};
    }
  }

  setDeaths(record){
    return {
      total: Number(record.all_causes_by_age_years_all_ages) || 0,
      ages_0_1: Number(record.all_causes_by_age_years_lt_1) || 0,
      ages_1_24: Number(record.all_causes_by_age_years_1_24) || 0,
      ages_25_44: Number(record.all_causes_by_age_years_25_44) || 0,
      ages_45_64: Number(record.all_causes_by_age_years_45_64) || 0,
      ages_65_999: Number(record.all_causes_by_age_years_65) || 0
    };
  }

  type() {
    if(this.isCity()) {
      return "city";
    }
    else {
      return "region";
    }
  }

  isCity() {
    return !!(this.reporting_area.indexOf(",") !== -1 &&
              this.location.longitude &&
              this.location.latitude);
  }
}

export default WeeklyFluRecord;
