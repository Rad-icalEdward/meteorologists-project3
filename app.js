//Humidity,UV,Temperature Indicator

let api_key = "";

let cities = [
  "Aberdeen",
  "Armagh",
  "Bangor",
  "Bath",
  "Belfast",
  "Birmingham",
  "Bradford",
  "Brighton & Hove",
  "Bristol",
  "Cambridge",
  "Canterbury",
  "Cardiff",
  "Carlisle",
  "Chelmsford",
  "Chester",
  "Chichester",
  "Coventry",
  "Derby",
  "Derry",
  "Dundee",
  "Durham",
  "Edinburgh",
  "Ely",
  "Exeter",
  "Glasgow",
  "Gloucester",
  "Hereford",
  "Inverness",
  "Kingston upon Hull",
  "Lancaster",
  "Leeds",
  "Leicester",
  "Lichfield",
  "Lincoln",
  "Lisburn",
  "Liverpool",
  "London",
  "Manchester",
  "Newcastle upon Tyne",
  "Newport",
  "Newry",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Perth",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Ripon",
  "St Albans",
  "St Asaph",
  "St Davids",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "Stirling",
  "Stoke-on-Trent",
  "Sunderland",
  "Swansea",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "York",
];

function optionChanged(city) {
  console.log(city);
  getData(city).then((data) => {
    console.log(data);
    updateCharts(data);
  });
}

function getData(city) {
  const base = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;
  return fetch(base).then((response) => {
    return response.json();
  });
}

function dropDown() {
  let selection = d3.select("#selDataset");

  cities.forEach((sample) => {
    selection.append("option").text(sample).property("value", sample);
  });
}

function updateCharts(data) {
  // humidity
  let chart_data_humidity = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: data.current.humidity,
      title: { text: "Humidity" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 50 },
      gauge: { axis: { range: [null, 100] } },
    },
  ];

  let layout_humidity = { width: 250, height: 250 };
  Plotly.newPlot("gaugeHumidity", chart_data_humidity, layout_humidity);

  // uv
  let chart_data_uv = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: data.current.uv,
      title: { text: "UV" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 6 },
      gauge: { axis: { range: [null, 12] } },
    },
  ];

  let layout_uv = { width: 250, height: 250 };
  Plotly.newPlot("gaugeUV", chart_data_uv, layout_uv);

  // temperature
  let chart_data_temperature = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: data.current.temp_c,
      title: { text: "Temperature" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 50 },
      gauge: { axis: { range: [null, 100] } },
    },
  ];

  let layout_temperature = { width: 250, height: 250 };
  Plotly.newPlot("gaugeTemperature", chart_data_temperature, layout_temperature);
}

dropDown();
