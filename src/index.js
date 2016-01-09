import d3 from 'd3';
import Datamap from 'datamaps';
import fluData from './scripts/flu_data';
import Title from './scripts/title';
import Bubbles from './scripts/bubbles';
import Selector from './scripts/selector';


d3.requestJson('./data_2014.json',function(data){
  let fluData2014 = new fluData(data);
  let deathsExtent = fluData2014.deathExtentOfCities();

  var bubbleScale = d3.scaleLinear()
    .domain(deathsExtent)
    .range(["white", "red"]);

  var deathMin = deathsExtent[0];
  var deathMax = deathsExtent[1];
  var deathMid = Math.round((deathMin + deathMax)/2);

  var fillsProperties = {};
  fillsProperties[deathMin] = bubbleScale(deathMin);
  fillsProperties[deathMid] = bubbleScale(deathMid);
  fillsProperties[deathMax] = bubbleScale(deathMax);

  var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
    fills: fillsProperties
  });

  var legendProperties = {};
  legendProperties[deathMin] = deathMin;
  legendProperties[deathMid] = deathMid;
  legendProperties[deathMax] = deathMax;
  map.legend({
    legendTitle: "Deaths Per City",
    labels: legendProperties
  });

  var defaultWeekNumber = 1;
  var week1Data = fluData2014.byCityAndWeekOf(defaultWeekNumber);
  new Title(defaultWeekNumber, fluData2014).render();
  new Bubbles().set(map, week1Data, bubbleScale);
  new Selector().render(fluData2014, map, bubbleScale);
});
