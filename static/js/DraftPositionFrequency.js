
// Check that you can read in data
// d3.json('/byYear/').then(function(data) {
//     console.log(data);
// });

// Create function to build chart
function buildChart(year) {
    barHTML = d3.select("#bar")
    barHTML.html("")
    d3.json('/byYear/').then(function(obj) {
        // instantiate x and y value containers
        let x = [];
        let y = [];
        (obj[year]).forEach(function (element) {
            element.Position;
            element.Count;
            // add to collection of x and y values
            x.push(element.Position);
            y.push(element.Count);
            
        })
        console.log(x);
        console.log(y);
        // put x and y data into plotly plot object
        let bar_data = [{
            type: 'bar',
            x: x,
            y: y,
            text: `Players drafted`, // Access the position
            orientation: 'v'
        }];
        let bar_layout = {      
            title: `Players drafted by position for the year ${year}`,
            yaxis: {
                    tickmode: "linear"}, 
        
        };
        Plotly.newPlot("bar", bar_data, bar_layout);

    })
};

d3.select('#selDataset1').on("change", function() {
    let year = this.value;
    buildChart(year);
})

buildChart(2016)



var years = [2016,2017,2018,2019,2020]
years.forEach(year => {
    var dropdown1 = d3.select("#selDataset1");
    dropdown1.append("option").text(year)
});


// // Plotly.newPlot("bar", bar_data, bar_layout);

// // var dropdown1.on("change", function() {
// //     var selected_data = years.filter(x => x == this.value);

// //     var bar_update = {
// //         x: selected_data,
// //         y: 10,
// //         text: sdsd
// //     };

// //     Plotly.restyle("bar", bar_update);
// // });
