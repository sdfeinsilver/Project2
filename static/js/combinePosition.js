var positions = ["TE", "K", "CB", "OT", "QB", "WR", "S", "DT", "DE", "C", "OLB", "RB", "ILB", "P", "OG", "FB", "LS", "EDGE", "LB", "OL", "DL"]
positions.forEach(position => {
    var dropdown1 = d3.select("#selDataset1");
    dropdown1.append("option").text(position)
});

d3.json('/stats/').then(function (json) {
    let years = Object.keys(json)
    // console.log(years)
    years.forEach(year => {
        var dropdown1 = d3.select("#selDatasetYears");
        dropdown1.append("option").text(year)
    })
});  //[2016, 2017, 2018, 2019, 2020]

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
    d3.json('/stats/').then(function (json) {
        
        let verticalRef = 0.0
        let fyRef = 100.0
        let bRef = 0.0
        let bjRef = 0.0
        let tcRef = 100.0
        let sRef = 100.0
        // console.log(Object.entries(json))
        let dataData = Object.entries(json)
        dataData.forEach(key => {
            // console.log(key)
            keyFilter = key[1]
            keyFilter.forEach(value=>{
                
                // console.log(value)
                if (value.Position === position) {
                    // console.log(value.Statistic)
                    // console.log(value.Max)
                    // console.log(value.Min)
                    if (value.Statistic === 'vertical'){
                        if (value.Max > verticalRef ){
                            verticalRef = value.Max
                        } 
                    }
                    else if (value.Statistic === 'forty_yard'){
                        if (value.Min < fyRef ){
                            fyRef = value.Min // && fy !==0
                        } 
                    }
                    else if (value.Statistic === 'bench'){
                        if (value.Max > bRef ){
                            bRef = value.Max // && fy !==0
                        } 
                    }
                    else if (value.Statistic === 'broad_jump'){
                        if (value.Max > bjRef ){
                            bjRef = value.Max // && fy !==0
                        } 
                    }
                    else if (value.Statistic === 'three_cone'){
                        if (value.Min < tcRef ){
                            tcRef = value.Min // && fy !==0
                        } 
                    }
                    else if (value.Statistic === 'shuttle'){
                        if (value.Min < sRef ){
                            sRef = value.Min // && fy !==0
                        } 
                    }
                    // console.log(verticalRef)
                    console.log(sRef)
                }
            })
        })
        

        let filteredData = []
        let yearData = json[year]
        // let scale = {} if (date) { filteredData = filteredData.filter(row => row.datetime === date); }
        yearData.forEach(positionEntry => {
            if (positionEntry.Position === position) {
                if (positionEntry.Statistic === 'vertical'){
                    let v = (positionEntry.Avg*100/verticalRef)
                    console.log(v)
                    filteredData.push({
                        "x": positionEntry.Statistic,
                        "value": v
                    })

                }
                else if (positionEntry.Statistic === 'forty_yard'){
                    let v2 = (fyRef*100/positionEntry.Avg)
                    console.log(v2)
                    filteredData.push({
                        "x": positionEntry.Statistic,
                        "value": v2
                    })
                }
                else if (positionEntry.Statistic === 'bench'){
                    let v = (positionEntry.Avg*100/bRef)
                    console.log(v)
                    filteredData.push({
                        "x": positionEntry.Statistic,
                        "value": v
                    })

                }
                else if (positionEntry.Statistic === 'broad_jump'){
                    let v = (positionEntry.Avg*100/bjRef)
                    console.log(v)
                    filteredData.push({
                        "x": positionEntry.Statistic,
                        "value": v
                    })

                }
                else if (positionEntry.Statistic === 'three_cone'){
                    let v2 = (tcRef*100/positionEntry.Avg)
                    console.log(v2)
                    filteredData.push({
                        "x": positionEntry.Statistic,
                        "value": v2
                    })
                }
                else if (positionEntry.Statistic === 'shuttle'){
                    let v2 = (sRef*100/positionEntry.Avg)
                    console.log(v2)
                    filteredData.push({
                        "x": positionEntry.Statistic,
                        "value": v2
                    })
                }

                // filteredData.push({
                //     "x": positionEntry.Statistic,
                //     "value": value
                // })
            }
        })
        // console.log(filteredData)
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
            chart.title(`Position: ${position}
                Combine Events mark for the year ${year}`);
            
            // create a logarithmic scale
            var logScale = anychart.scales.log();

            // set the minimum and maximum values of the scale
            logScale.minimum(50);
            logScale.maximum(100);

            // set the logarithmic scale as the y-scale
            chart.yScale(logScale);
        
            // set the container id
            chart.container("chart");
        
            // initiate drawing the chart
            chart.draw();
        });
        
    });

}
buildChart('2017', 'TE');


