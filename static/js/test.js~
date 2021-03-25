// API calls with d3:

// So we actually do need to use flask to deploy the html, because browsers don't let you bring in data from a foreign source. This means that the data must come from the same place as the html itself (ie, the heroku server).
//This isn't a prolem. All you guys have to do is make sure all your html files are in the "templates" directory, and that all your javascript is in the "static/js" directory. Then, when you put your scripts into your html, the format will be like this:
//<script src=/static/js/SCRIPT_NAME></script>. Similarly, when you call the API routes, you will not specify a url, but only a path. Index.html combined with this javascript file (test.js) serve as an example of this

// For example, if I go to 'https://nfl-flask.herokuapp.com/id/Mehdi Abdesmad' in my browser, I will get a json object response. 
// However, if I want to get that same json object response WITHIN the app, I will just do: d3.json('/id/Mehdi Abdesmad')


// Some examples:
//(to see the results, go to the home-page of the flask app - https://nfl-flask.herokuapp.com/)

// Aggregate data by year:
// Format - /year/<desired-year>/stat1&stat2&stat3...

// Aggregate data by position:
// Format - /position/<desired-position>/stat1&stat2&stat3...
d3.json('/stats/TE/2016/height&weight').then(function(data) {
	console.log('Height and Weight statistics of tight ends:');
	console.log(data)
})

// Player-specific data:
// Format - /id/<player-name>

d3.json('/id/Mehdi Abdesmad').then(function(data) {
	console.log('Mehdi Abdesmad statistics:');
	console.log(data)
})
