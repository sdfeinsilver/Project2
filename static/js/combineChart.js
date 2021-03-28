let data = {
    "years":['2016','2017','2018','2019','2020'],
    "data":[{'Year': 2016, 'Position': 'QB', 'Event':' Forty_yard', 'Mean': 20,'Min': 15, 'Max': 25,}, {'Year': 2016,
        'Position': 'RB',
        'Event':' Forty_yard',
        'Mean': 19,
        'Min': 16,
        'Max': 24},{
            Year: 2016,
            Position: 'WR',
            Event:' Shuttle',
            Mean: 65,
            Min: 48,
            Max: 89,},{
            Year: 2017,
            Position: 'QB',
            Event:' Forty_yard',
            Mean: 30,
            Min: 25,
            Max: 35,},{
            Year: 2018,
            Position: 'QB',
            Event:' Forty_yard',
            Mean: 32,
            Min: 27,
            Max: 35,
        }]
};
console.log(data)


// d3.json(/combine).then(data=> );

// dropDown button
let dropDownYear = d3.select('#selDatasetYears')
// dropDown.on('change', handleChange)
data.map(record => {
    console.log(record)
    dropDownYear.append('option').text(record.Year).property('value', record.Year)
});

// dropDown button
let dropDownEvent = d3.select('#selDatasetEvent')
// dropDown.on('change', handleChange)
data.map(record => {
    console.log(record)
    dropDownEvent.append('option').text(record.Event).property('value', record.Event)
});

function optionChanged(userChoice) {
    demographic(userChoice)
    BuildCharts(userChoice)
}

// // create the first series
// var series1 = chart.bar(seriesData_1);

// // create the second series
// var series2 = chart.bar(seriesData_2);

// // set the padding between bars
// chart.barsPadding(-0.5);

// // set the padding between bar groups
// chart.barGroupsPadding(2);





