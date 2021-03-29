d3.json("https://nfl-flask.herokuapp.com/id/Mehdi%20Abdesmad").then(function(data) {
console.log(data);


});

line_data = [{
    type: 'line',
    x: [2016,2017,2018,2019,2020],
    y: [22, 45, 32, 34, 23],
    text: "test",
    orientation: 'h'
}];

line_layout = {      
    title: "Draft Position Trend",
    yaxis: {
            tickmode: "linear"}, 

};
var positions = ["C","OG","OT","QB","RB","WR","TE"]
positions.forEach(position => {
    var dropdown1 = d3.select("#selDataset1");
    dropdown1.append("option").text(position)
});


Plotly.newPlot("line", line_data, line_layout);

// var dropdown1.on("change", function() {
//     var selected_data = years.filter(x => x == this.value);

//     var bar_update = {
//         x: selected_data,
//         y: 10,
//         text: sdsd
//     };

//     Plotly.restyle("bar", bar_update);
// });
