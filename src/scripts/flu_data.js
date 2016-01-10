import d3 from 'd3';
import WeeklyFluRecord from './models/weekly_flu_record';

class fluData {
  constructor(dataSet) {
    this.dataSet = dataSet
    .map((record) => new WeeklyFluRecord(record))
    .filter((record) => record.type() == "city");
  }

  byCityAndWeekOf(weekNumber) {
    let week = Number(weekNumber);
    return this.dataSet.filter( (record) => record.week === week);
  }

  weeksExtent() {
    return d3.extent(this.dataSet.map((record) => record.week));
  }

  deathExtentOfCities() {
    return d3.extent(this.dataSet.map((record) => record.deaths.total));
  }

  allDeathsWeekOf(weekNumber) {
    return this.byCityAndWeekOf(weekNumber)
    .map( (record) => record.deaths.total )
    .reduce( (prev, cur) => prev + cur );
  }
}

export default fluData;
