$( document ).ready(function() {
    console.log(dataObtained);
console.log(d3plus);

var data = [
    {"value": 100, "name": "alpha"},
    {"value": 70, "name": "beta"},
    {"value": 40, "name": "gamma"},
    {"value": 15, "name": "delta"},
    {"value": 5, "name": "epsilon"},
    {"value": 1, "name": "zeta"}
  ]
  d3plus.viz()
    .container("#chart-container")
    .data(dataObtained)
    .type("pie")
    .id("Name")
    .size("AnnualRevenue")
    .draw()

});
