

function genChart(stat, year, Event) {
    d3.json('/stats/').then(function (data) {
        barHTML = d3.select("#bar")
        barHTML.html("")
        let x = [];
        let y = [];
        let positions = ["TE", "K", "CB", "OT", "QB", "WR", "S", "DT", "DE", "C", "OLB", "RB", "ILB", "P", "OG", "FB", "LS", "EDGE", "LB", "OL", "DL"]
        data[year].forEach(function (element) {
            if (element["Statistic"] == Event.toLowerCase()) {
                x.push(element["Position"]);
                y.push(element[stat]);
            }
        }

        )
        let bar_data = [{
            type: 'bar',
            x: x,
            y: y,
            text: `${Event}<br> ${stat}`,
            orientation: 'v'
        }];
        let bar_layout = {
            title: `${Event} ${stat} for the year ${year} in the Combine Scouting`,
            yaxis: {
                tickmode: "linear"
            },
            

        };
        Plotly.newPlot("bar", bar_data, bar_layout);

    })
};

genChart("Min", "2016", "Forty_Yard");

d3.select('#selDatasetYears').on('change', function () {
    let year = this.value;
    let Event = document.getElementById('selDatasetEvent').value;
    let stat = document.getElementById('selDatasetMetric').value;
    genChart(stat, year, Event);
});

d3.select('#selDatasetEvent').on('change', function () {
    let Event = this.value;
    let year = document.getElementById('selDatasetYears').value;
    let stat = document.getElementById('selDatasetMetric').value;
    genChart(stat, year, Event);
});

d3.select('#selDatasetMetric').on('change', function () {
    let stat = this.value;
    let year = document.getElementById('selDatasetYears').value;
    let Event = document.getElementById('selDatasetEvent').value;
    genChart(stat, year, Event);
});
