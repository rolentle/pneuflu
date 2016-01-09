import d3 from 'd3';

class Title {
  constructor(weekNumber, dataSet) {
    this.weekNumber = weekNumber;
    this.dataSet = dataSet;
  }

  render() {
    d3.select("#week_title").text(
      [
        "Week",
        this.weekNumber,
        "Total Deaths:",
        this.dataSet.allDeathsWeekOf(this.weekNumber)
      ].join(" "));
  }
}

export default Title;
