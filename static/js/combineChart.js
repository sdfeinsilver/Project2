

function genChart(stat, year, event) {
    d3.json('/stats/').then(function(data) {
        let x = [];
        let y = [];
        let positions = ["TE", "K", "CB", "OT", "QB", "WR", "S", "DT", "DE", "C", "OLB", "RB", "ILB", "P", "OG", "FB", "LS", "EDGE", "LB", "OL", "DL"]
        positions.forEach(function(pos) {
        data[year].forEach(function(element) {
            if(element.Position == pos) {
            x.push(element.Position);
            y.push(element[stat]);
            }

        })
        let bar_data = [{
            type: 'bar',
            x: x,
            y: y,
            text: "test",
            orientation: 'v'
        }];
        let bar_layout = {      
            title: "bar chart",
            yaxis: {
                    tickmode: "linear"}, 
        
        };
        Plotly.newPlot("container", bar_data, bar_layout);

    })
    })
}

d3.select('#selDatasetYears').on('change', function() {
    let year = this.value;
    let event = d3.select('#selDatasetEvent').value;
    let stat = d3.select('#selDatasetMetric').value;
    genChart(stat, year, event);
})

d3.select('#selDatasetEvent').on('change', function() {
    let event = this.value;
    let year = d3.select('#selDatasetYear').value;
    let stat = d3.select('#selDatasetMetric').value;
    genChart(stat, year, event);
})

d3.select('#selDatasetMetric').on('change', function() {
    let stat = this.value;
    let event = d3.select('#selDatasetEvent').value;
    let year = d3.select('#selDatasetYear').value;
    genChart(stat, year, event);
})