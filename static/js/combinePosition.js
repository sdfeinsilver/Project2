var positions = ["TE", "K", "CB", "OT", "QB", "WR", "S", "DT", "DE", "C", "OLB", "RB", "ILB", "P", "OG", "FB", "LS", "EDGE", "LB", "OL", "DL"]
positions.forEach(position => {
    var dropdown1 = d3.select("#selDataset1");
    dropdown1.append("option").text(position)
});

var years = [2016, 2017, 2018, 2019, 2020]
years.forEach(year => {
    var dropdown1 = d3.select("#selDatasetYears");
    dropdown1.append("option").text(year)
});

d3.select('#selDatasetYears').on('change', function () {
    let year = this.value;
    let position = document.getElementById('selDataset1').value;

    buildChart(year, position);
});

d3.select('#selDataset1').on('change', function () {
    let position = this.value;
    let year = document.getElementById('selDatasetYears').value;
    buildChart(year, position);
});
function buildChart(year, position) {
    chartHTML = d3.select("#chart")
    chartHTML.html("")
    d3.json('/stats/').then(function (data) {
        let filteredData = []
        let yearData = data[year]
        // let scale = {} if (date) { filteredData = filteredData.filter(row => row.datetime === date); }
        yearData.forEach(positionEntry => {
            if( (positionEntry.Position === position)&& (positionEntry.Statistic !== "broad_jump")) {
                filteredData.push({
                    "x": positionEntry.Statistic,
                    "value": positionEntry.Avg
                })
            }
        })
        console.log(filteredData)
        // Object.entries(yearData).forEach(([key, value]) => {
        //     console.log(key, value)
        // })
        anychart.onDocumentReady(function () {

            // create data
            var data = filteredData
        
            // create a chart
            var chart = anychart.radar();
        
            // create an area series and set the data
            var series = chart.area(data);
        
            // set the chart title
            chart.title("Radar Area Chart");
        
            // set the container id
            chart.container("chart");
        
            // initiate drawing the chart
            chart.draw();
        });
        
    });

}
buildChart('2017', 'TE');


