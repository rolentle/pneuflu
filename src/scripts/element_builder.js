var setTitle = function(weekNumber, dataSet) {
  d3.select("#week_title").text(
    [
      "Week",
      weekNumber,
      "Total Deaths:",
      dataSet.allDeathsWeekOf(weekNumber)
    ].join(" "));
};

var buildSelector = function(dataSet, dataMap, scale) {
  var rangeSelect = d3.select("#range_selector").append("input")
                                            .attr("type", "range")
                                            .attr("id", "week_number");
  var weeks = dataSet.weeksExtent();

  rangeSelect.attr("min", weeks[0])
              .attr("max", weeks[1])
              .attr("value", weeks[0]);

  rangeSelect.on("change", function() {
    updateElements(dataSet, dataMap, scale, Number(this.value));
   });
};

var updateElements = function(dataSet, dataMap, scale, weekNumber) {
  setTitle(weekNumber, dataSet);
  var weeklyData = dataSet.byCityAndWeekOf(weekNumber);
  setBubbles(dataMap, weeklyData, scale);
};
