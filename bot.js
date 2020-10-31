// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var downtonAbbeySearch = {q: "#downtonabbey", count: 10, result_type: "mixed", lang: "en"}; 
var robinpatbatinbat = {q: "Robert Pattinson", count: 10, result_type: "mixed", lang: "en" };

// This function randomly determines a hashtag from the above list, and retweets it.
function retweetLatest() {
	var num = Math.floor(Math.random() * 2);
	var keyword;
	console.log(num);
	if (num > 0){
		keyword = downtonAbbeySearch;
	} else {
		keyword = robinpatbatinbat;
	}
	T.get('search/tweets', keyword, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[Math.floor(Math.random() * 10)].id_str;
		if(retweetId != undefined){
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
		}
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}
function loveRobPat(){
	T.get('search/tweets', robinpatbatinbat, function(error, data){
		console.log(error,data);
		if(!error) {
			var tweetId = data.id_str;
			var name = 'charIottewunder';
			T.post('statuses/update', {in_reply_to_status_id: tweetId, status: 'Oh bless his heart... '
		+ '@' + name + ' Will you keep sending me more tweets about my favorite man Robert Pattinson?'}, function(error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
		}
	  })
}

function tweet(){
	T.post('statuses/update', tweetRand(), function (error, response) {
		if (response) {
			console.log('Success! Check your bot, it should have tweeted something.')
		}
		// If there was an error with our Twitter call, we print it out here.
		if (error) {
			console.log('There was an error with Twitter:', error);
		}
	})
}

function tweetRand() {
	var tweet0 = {
		status: ""
	}
	var tweet1 = {
		status: "Where's the beef?"
	}
	var tweet2 = {
		status: "Who can tell me what the heck a retweet is??"
	}
	var tweet3 = {
		status: "These kids are crazy town!"
	}
	var tweet = [tweet0, tweet1, tweet2,tweet3];
	var num = Math.floor(Math.random() * (tweet.length + 1));
	var used = [0];
	used.sort();
	for (var i = 0; i < used.length; i++){
		while(num == used[i]) {
			num = 0
		}
	}
	
	used.push(num);

	return tweet[num];


}


// Try to retweet something as soon as we run the program...
//retweetLatest();
//tweet();
loveRobPat();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);
setInterval(tweet, 1000 * 60 * 60);
setInterval(loveRobPat, 1000 * 60 * 60);

