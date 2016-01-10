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
    return data.map( (record) => {
      let bubble = {
        longitude: record.location.longitude,
        latitude: record.location.latitude,
        reporting_area: record.reporting_area,
        radius: 10,
        deaths_ages_0_1: record.deaths.ages_0_1,
        deaths_ages_1_24: record.deaths.ages_1_24,
        deaths_ages_25_44: record.deaths.ages_25_44,
        deaths_ages_45_64: record.deaths.ages_45_64,
        deaths_ages_65_999: record.deaths.ages_65_999,
        deaths_total: record.deaths.total,
        fill: scale(record.deaths.total)
      };
      return bubble;
    });
  }

  hoverTemplate(datum) {
    return ['<div class="hoverinfo">' +  datum.reporting_area,
      '<br/>Deaths under 1 years old: ' +  datum.deaths_ages_0_1,
      '<br/>Deaths between 1 and 24: ' +  datum.deaths_ages_1_24,
      '<br/>Deaths between 25 and 44: ' +  datum.deaths_ages_25_44,
      '<br/>Deaths between 45 and 64: ' +  datum.deaths_ages_45_64,
      '<br/>Deaths over 65 years old: ' +  datum.deaths_ages_65_999,
      '<br/>Total deaths: ' +  datum.deaths_total,
      '</div>'].join('');
  }
}

export default Bubbles;
