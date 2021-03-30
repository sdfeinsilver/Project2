d3.json("https://nfl-flask.herokuapp.com/id/Mehdi%20Abdesmad").then(function(data) {
console.log(data);


});

function genChart(position) {
    d3.json('/byYear/').then(function(data) {
        let years = [2016, 2017, 2018, 2019, 2020];
        let y = []
        years.forEach(function(year) {
            let total = 0;
            data[year].forEach(function(element) {
                if(element.Position == position) {
                    total += element.Count;
                
                }
            })
            y.push(total)
        })
        let line_layout = {      
            title: "Draft Position Trend",
            yaxis: {
                    tickmode: "linear"}, 
        
        };
        let line_data = [{
            type: 'line',
            x: years,
            y: y,
            text: "test",
            orientation: 'h'
        }];

        Plotly.newPlot("line", line_data, line_layout);
    })
}
// line_data = [{
//     type: 'line',
//     x: [2016,2017,2018,2019,2020],
//     y: [22, 45, 32, 34, 23],
//     text: "test",
//     orientation: 'h'
// }];

// line_layout = {      
//     title: "Draft Position Trend",
//     yaxis: {
//             tickmode: "linear"}, 
// };

var positions = ["TE", "K", "CB", "OT", "QB", "WR", "S", "DT", "DE", "C", "OLB", "RB", "ILB", "P", "OG", "FB", "LS", "EDGE", "LB", "OL", "DL"]
positions.forEach(position => {
    var dropdown1 = d3.select("#selDataset1");
    dropdown1.append("option").text(position)
});

d3.select('#selDataset1').on("change", function() {
    let position = this.value;
    genChart(position);
});


// Plotly.newPlot("line", line_data, line_layout);

// var dropdown1.on("change", function() {
//     var selected_data = years.filter(x => x == this.value);

//     var bar_update = {
//         x: selected_data,
//         y: 10,
//         text: sdsd
//     };

//     Plotly.restyle("bar", bar_update);
// });
