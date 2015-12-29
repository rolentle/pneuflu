  var setTitle = function(week_number) {
    d3.select("#week_title").text("Week " + week_number);
  };

  var buildSelector = function(data_set, datamap, scale) {
    var range_select = d3.select("#container").append("input")
                                              .attr("type", "range")
                                              .attr("id", "week_number");
    var weeks = d3.extent(data_set.map(function(datum) {
      return Number(datum.mmwr_week);
    }));

    range_select.attr("min", weeks[0])
                .attr("max", weeks[1])
                .attr("value", weeks[0]);

    range_select.on("change", function() {
      var week_number = Number(this.value);
      var weekly_data = data_set.filter(function(datum) {
        return (Number(datum.mmwr_week) === week_number) &&
          !datum.all_causes_by_age_years_lt_1_flag;
      });
      setTitle(week_number);
      setBubbles(datamap, weekly_data, scale);
     });
  };

