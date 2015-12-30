var setTitle = function(week_number, dataSet) {
  d3.select("#week_title").text(
    [
      "Week",
      week_number,
      "Total Deaths:",
      dataSet.allDeathsWeekOf(week_number)
    ].join(" "));
};

var buildSelector = function(data_set, datamap, scale) {
  var range_select = d3.select("#range_selector").append("input")
                                            .attr("type", "range")
                                            .attr("id", "week_number");
  var weeks = data_set.weeks_extent();

  range_select.attr("min", weeks[0])
              .attr("max", weeks[1])
              .attr("value", weeks[0]);

  range_select.on("change", function() {
    updateElements(data_set, datamap, scale, Number(this.value));
   });
};

var updateElements = function(data_set, datamap, scale, week_number) {
  setTitle(week_number, data_set);
  var weekly_data = data_set.by_city_and_week_of(week_number);
  setBubbles(datamap, weekly_data, scale);
};

var buildSideChart = function() {
  d3.select("body").append("svg")
                   .classed('side-chart', true)
                   .attr('width', 800)
                   .attr('height', 600);
};
