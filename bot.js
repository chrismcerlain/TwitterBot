// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#downtonabbey' hashtag.
var downtonAbbeySearch = {q: "#downtonabbey", count: 10, result_type: "mixed", lang: "en"}; 
// This is the URL of a search for the latest tweets containing "Robert Patinson."
var robinpatbatinbat = {q: "Robert Pattinson", count: 10, result_type: "mixed", lang: "en", include_entities: "false"};

// This function randomly determines a parametered search from the above list, and retweets it.
function retweetLatest() {
	var num = Math.floor(Math.random() * 2);
	var keyword;
	console.log(num);
	//Randomly determines whether or not bot is retweeting from downtonabbey or Robert Pattinson
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
//Function replies to a tweet that mentions "Robert Patinson" with a preset message.
function loveRobPat(){
	//Selects tweet pool to reply to
	T.get('search/tweets', robinpatbatinbat, function(error, data){
		console.log(error, data);
		if(!error) {
			//All the documentation for the reply
			var rand = Math.floor(Math.random() * 10);
			var tweetId = data.statuses[rand].id_str;
			//Checks to make sure tweet isn't a retweet
			console.log(tweetId.retweet)
			while (tweetId.retweet) {
				rand = rand +1
				if (rand == 10){
					return "Error from search..."
				}
			}
			var tweetname = data.statuses[rand].user.screen_name;
			//Reply object 
			var reply = {
				status: '@' + tweetname + " Oh bless his heart. We should make a Rob Pat fan club!",
				in_reply_to_status_id: '' + tweetId
			}
			//Tweet method
			T.post('statuses/update', reply, function(error, data, response) {
				console.log(data);
				console.log(tweetId.retweet);
			if (response) {
				console.log('Success! Check your bot, it should have tweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
		} else {
			console.log('There was an error with your loving of Rob Pat',error)
		}
	  })
}

function tweet(){
	//Tweets out tweet to feed.
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
// Function that stores and returns tweets to the tweet method.
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
	var tweet4 = {
		status: "Is there such a thing as a Rob Pat Fan club?"
	}
	var tweet5 = {
		status: "Kanye 2020!!"
	}
	var tweet6 = {
		status: "Jeez I miss Frankie :("
	}
	var tweet7 = {
		status: "I was watching that dredful charlie rose about 10 years ago, now I miss his show. I hate being 85!"
	}
	var tweet8 = {
		status: "Seriously, where's the beef??? #replytweet"
	}
	var tweet9 = {
		status: "My grandaughter Sofie just said I was an uglier Betty White..."
	}
	var tweet10 = {
		status: "Read this wonderful book called the Bible, ya'll should go check it out..."
	}
	var tweet11 = {
		status: 'My son called telling me if I wanna be in with the kids I gotta listen to Travis Scott... I said, "Who?"'
	}
	var tweet12 = {
		status: "Sicko mode?? Is that code for a dirty word or something?"
	}
	var tweet13 = {
		status: "TRAVIS SCOTT IS THE KING OF RAGE!!!!!!"
	}
	//Array that contains all of the tweet objects.
	var tweet = [tweet0, tweet1, tweet2,tweet3,tweet4,tweet5,tweet6,tweet7,tweet8,tweet9,tweet10,tweet11,tweet12,tweet13];
	//Randomly picks a tweet to return.
	var num = Math.floor(Math.random() * (tweet.length + 1));
	//Initializes array for used tweets.
	var used = [0];
	used.sort();
	//Loop checks if tweet has already been tweeted. If the tweet has already been used it throws a tweet without a string and 
	//then it passes without a tweet being sent.
	for (var i = 0; i < used.length; i++){
		while(num == used[i]) {
			num = 0
		}
	}
	//Prints the num to the console for debugging reasons.
	console.log(num);
	//Puts the num random num passed into the array of used tweets.
	used.push(num);
	//Tweet is sent to the tweet method
	return tweet[num];


}


// Try to retweet something as soon as we run the program...
retweetLatest();
tweet();
loveRobPat();

// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);
setInterval(tweet, 1000 * 60 * 60)
setInterval(loveRobPat, 1000 * 60 * 60);

