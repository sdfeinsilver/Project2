d3.json("https://nfl-flask.herokuapp.com/id/Mehdi%20Abdesmad").then(function(data) {
console.log(data);


});

bar_data = [{
    type: 'bar',
    x: [1,2],
    y: [2,4],
    text: "test",
    orientation: 'h'
}];

bar_layout = {      
    title: "bar chart",
    yaxis: {
            tickmode: "linear"}, 

};
Plotly.newPlot("bar", bar_data, bar_layout);