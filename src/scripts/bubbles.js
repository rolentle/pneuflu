import d3 from 'd3';

class Bubbles {
  set(datamap, data, scale) {
    let bubble_data = this.buildBubbleData(data, scale);

    datamap.bubbles(bubble_data,{
      popupTemplate: (geo, datum) => {
        return this.hoverTemplate(datum);
      }
    });
    d3.selectAll("circle.datamaps-bubble")
    .attr("fill", datum => datum.fill );
  }

  buildBubbleData(data, scale) {
    return data.map( (datum) => {
      let bubble = {
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
      };
      return bubble;
    });
  }

  hoverTemplate(datum) {
    return ['<div class="hoverinfo">' +  datum.reporting_area,
      '<br/>Deaths under 1 years old: ' +  datum.all_causes_by_age_years_lt_1,
      '<br/>Deaths between 1 and 24: ' +  datum.all_causes_by_age_years_1_24,
      '<br/>Deaths between 25 and 44: ' +  datum.all_causes_by_age_years_25_44,
      '<br/>Deaths between 45 and 64: ' +  datum.all_causes_by_age_years_45_64,
      '<br/>Deaths over 65 years old: ' +  datum.all_causes_by_age_years_65,
      '<br/>Total deaths: ' +  datum.all_causes_by_age_years_all_ages,
      '</div>'].join('');
  }
}

export default Bubbles;
