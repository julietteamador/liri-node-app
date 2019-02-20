require("dotenv").config();

var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});


var command = process.argv[2];
var input = process.argv.splice(3).join(' ');




if (command == 'spotify-this') {
  
   
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        
        var base = data.tracks.items[0];
        console.log("Song Name : " + base.name)
        console.log("Preview URL : " + base.preview_url)
        console.log("Artist : " + base.artists[0].name)
        console.log("Album : " + base.album.name)
    });

} else if (command == 'concert-this') {
   

var query = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
axios.get(query).then(function(results){
 
    console.log("Venue Name : " + results.data[0].venue.name);
    console.log("Location : " + results.data[0].venue.country + ", "+ results.data[0].venue.city);
    console.log("Date : " + moment(results.data[0].datetime).format('MMMM Do YYYY, h:mm:ss a'));
    
})

} else if (command == 'movie-this'){
    var query = "http://www.omdbapi.com/?t=" + input + "&apiKey=trilogy";
    axios.get(query).then(function(results){
        console.log("Title : " + results.data.Title);
        console.log("Year : " + results.data.Year);
        console.log("IMDBRating : " + results.data.imdbRating);
        console.log("Country : " + results.data.Country);
        console.log("Language : " + results.data.Language);
        console.log("Plot : " + results.data.Plot);
        console.log("Actors: " + results.data.Actors);
    })
}

