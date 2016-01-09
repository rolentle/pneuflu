import d3 from 'd3';

import Title from './title';
import Bubbles from './bubbles';

class Selector {
  render(dataSet, dataMap, scale) {
    let _this = this;
    let rangeSelect = d3.select("#range_selector").append("input")
    .attr("type", "range")
    .attr("id", "week_number");
    let weeks = dataSet.weeksExtent();

    rangeSelect.attr("min", weeks[0])
    .attr("max", weeks[1])
    .attr("value", weeks[0]);

    rangeSelect.on("change", () => {
      _this.updateElements(dataSet, dataMap, scale, Number(this.value));
    });
  }

  updateElements(dataSet, dataMap, scale, weekNumber) {
    new Title(weekNumber, dataSet).render();
    let weeklyData = dataSet.byCityAndWeekOf(weekNumber);
    new Bubbles().set(dataMap, weeklyData, scale);
  }
}

export default Selector;
