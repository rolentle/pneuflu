var hoverTemplate = function(datum) {
  return ['<div class="hoverinfo">' +  datum.reporting_area,
    '<br/>Deaths under 1 years old: ' +  datum.all_causes_by_age_years_lt_1,
    '<br/>Deaths between 1 and 24: ' +  datum.all_causes_by_age_years_1_24,
    '<br/>Deaths between 25 and 44: ' +  datum.all_causes_by_age_years_25_44,
    '<br/>Deaths between 45 and 64: ' +  datum.all_causes_by_age_years_45_64,
    '<br/>Deaths over 65 years old: ' +  datum.all_causes_by_age_years_65,
    '<br/>Total deaths: ' +  datum.all_causes_by_age_years_all_ages,
    '</div>'].join('');
}

var buildBubbleData = function(data, scale) {
  return data.map(function(datum) {
    var bubble = {
      longitude: datum.location_1.longitude,
      latitude: datum.location_1.latitude,
      reporting_area: datum.reporting_area,
      radius: 10,
      all_causes_by_age_years_lt_1 : datum.all_causes_by_age_years_lt_1,
      all_causes_by_age_years_1_24 : datum.all_causes_by_age_years_1_24,
      all_causes_by_age_years_25_44 : datum.all_causes_by_age_years_25_44,
      all_causes_by_age_years_45_64 : datum.all_causes_by_age_years_45_64,
      all_causes_by_age_years_65 : datum.all_causes_by_age_years_65,
      all_causes_by_age_years_all_ages : datum.all_causes_by_age_years_all_ages,
      fill: scale(datum.all_causes_by_age_years_all_ages)
    }
    return bubble;
  });

};

var setBubbles = function(datamap, data, scale) {
  var bubble_data = buildBubbleData(data, scale)
    datamap.bubbles(bubble_data,{
    popupTemplate: function (geo, datum) {
      return hoverTemplate(datum);
    }
  });
  d3.selectAll("circle.datamaps-bubble")
  .style({fill: ''})
  .attr("fill", function(datum) {
    return datum.fill;
  });
};

