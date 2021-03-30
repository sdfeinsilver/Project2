

function genChart(stat, year, Event) {
    d3.json('/stats/').then(function(data) {
        let x = [];
        let y = [];
        let positions = ["TE", "K", "CB", "OT", "QB", "WR", "S", "DT", "DE", "C", "OLB", "RB", "ILB", "P", "OG", "FB", "LS", "EDGE", "LB", "OL", "DL"]
        data[year].forEach(function(element) {
	    if(element["Statistic"] == Event.toLowerCase()) {
            x.push(element["Position"]);
            y.push(element[stat]);
	    }
          }

        )
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
};

d3.select('#selDatasetYears').on('change', function() {
    let year = this.value;
    let Event = document.getElementById('selDatasetEvent').value;
    let stat = document.getElementById('selDatasetMetric').value;
    genChart(stat, year, Event);
});

d3.select('#selDatasetEvent').on('change', function() {
    let Event = this.value;
    let year = document.getElementById('selDatasetYears').value;
    let stat = document.getElementById('selDatasetMetric').value;
    genChart(stat, year, Event);
});

d3.select('#selDatasetMetric').on('change', function() {
    let stat = this.value;
    let year = document.getElementById('selDatasetYears').value;
    let Event = document.getElementById('selDatasetEvent').value;
    genChart(stat, year, Event);
});
