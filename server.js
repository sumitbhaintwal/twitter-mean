var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Twitter = require('twitter');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://sumitbhaintwal:sumit1294@ds013926.mlab.com:13926/vinci')

var tweetData = new Schema({
	name : String,
	screen_name : String,
	tweets : [{tweet: String, created_at: String}]
})

var port  = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


var client = new Twitter({
  consumer_key: 'UAXJGvtqvhxtNS2b7iWPkg7ht',
  consumer_secret: 'AqWl1LwG6QSNWNG5ZQZ9ROL3MkHGZou9BLHT0NIdlnDm8O0W9r',
  access_token_key: '1008880028-PU6ki8kCMOZkbtb8wEHPMycH5tHnVfEw7hTOMpb',
  access_token_secret: 'kN1oCktLs1h2Q80vnzsUtyZqvC4B9VoL5OkKsP34GgHQq'
});

// app.post('/api/newUser', function(req,res){

// 	user = req.body.username;
// 	res.send({status: 1, message: "success"});
// 	console.log(user);
// });

var params = {screen_name: "kamaalrkhan"};
app.get('/api/tweets', function(req, res){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    res.send({status: 1, data: tweets});
	  }
	});
});

app.post('/api/save', function(req,res){
	var tweets = mongoose.model('tweets', tweetData);
	data = new tweets(req.body);

	data.save(function(err, result){
		if(err) throw err;
		res.send({status: 1, message: "success"});
	});
});


app.listen(port, function () {
  console.log('App listening on port '+port);
});