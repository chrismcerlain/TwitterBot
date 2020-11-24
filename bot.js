// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#downtonabbey' hashtag.
var downtonAbbeySearch = { q: '#downtonabbey', count: 10, result_type: 'mixed', lang: 'en' };
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
			}else {
				console.log('There was an error with your hashtag search:', error);
			}
		});
	}
	}
});

}

		
//Function replies to a tweet that mentions "Robert Patinson" with a preset message.
function loveRobPat() {
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
	});
}

function tweet() {
	//Tweets out tweet to feed.
	T.post('statuses/update', tweetRand(), function(error, response) {
		if (response) {
			console.log('Success! Check your bot, it should have tweeted something.');
		}
		// If there was an error with our Twitter call, we print it out here.
		if (error) {
			console.log('There was an error with Twitter:', error);
		}
	});
}
// Function that stores and returns tweets to the tweet method.
function tweetRand() {
	var tweet0 = {
		status: '',
	};
	var tweet1 = {
		status: "Where's the beef?",
	};
	var tweet2 = {
		status: 'Who can tell me what the heck a retweet is??',
	};
	var tweet3 = {
		status: 'These kids are crazy town!',
	};
	var tweet4 = {
		status: 'Is there such a thing as a Rob Pat Fan club?',
	};
	var tweet5 = {
		status: 'Kanye 2020!!',
	};
	var tweet6 = {
		status: 'Jeez I miss Frankie :(',
	};
	var tweet7 = {
		status:
			'I was watching that dredful charlie rose about 10 years ago, now I miss his show. I hate being 85!',
	};
	var tweet8 = {
		status: "Seriously, where's the beef??? #replytweet",
	};
	var tweet9 = {
		status: 'My grandaughter Sofie just said I was an uglier Betty White...',
	};
	var tweet10 = {
		status: "Read this wonderful book called the Bible, ya'll should go check it out...",
	};
	var tweet11 = {
		status:
			'My son called telling me if I wanna be in with the kids I gotta listen to Travis Scott... I said, "Who?"',
	};
	var tweet12 = {
		status: 'Sicko mode?? Is that code for a dirty word or something?',
	};
	var tweet13 = {
		status: 'TRAVIS SCOTT IS THE KING OF RAGE!!!!!!',
	};
	//Array that contains all of the tweet objects.
	var tweet = [
		tweet0,
		tweet1,
		tweet2,
		tweet3,
		tweet4,
		tweet5,
		tweet6,
		tweet7,
		tweet8,
		tweet9,
		tweet10,
		tweet11,
		tweet12,
		tweet13,
	];
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

// Controller for first-time / non-first-time runs
if (true) {
	// Try to retweet something as soon as we run the program...
	retweetLatest();
	tweet();
	loveRobPat();
	// ...and then every hour after that. Time here is in milliseconds, so
	// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
	setInterval(retweetLatest, 1000 * 60 * 2);
	setInterval(tweet, 1000 * 60);
	setInterval(loveRobPat, 1000 * 60 * 60);
}

// JAY
// I wanted the bot to feel more alive. Right now it seems to have a mind of its own,
// but I wanted to be able to have a real conversation.. or seem like there's a real conversation going on.

const replyPossibilities = [
	'! haha! now that was funny!',
	' my dear, what does that read? My eyes are going bad!',
	'..what? I am a bit old, can you explain this to me?',
];

if (true) {
	// SEARCH FOR RECENT TWEETS @MARGIEBUNS
	T.get('search/tweets', { q: `@margiebuns since:2020-10-31`, count: 1 }).then(function(response) {
		// FETCHES RECENT TWEET AT @MARGIEBUNS
		const targetUser = response.data.statuses[0].user.screen_name;
		const tweetId = response.data.statuses[0].id_str;

		// THIS PART PROCESSES THE GIVEN TWEET, TRUNCATES AND ADDS ... TO MAKE IT SOUND
		// LIKE GRANNY WAS READING IT
		let precedingText = response.data.statuses[0].text;
		if (precedingText) {
			precedingText = precedingText.toLowerCase().replace('@margiebuns ', '');
		}
		precedingText = precedingText.slice(0, Math.floor((precedingText.length * 3) / 4));

		// RANDOMIZE RESPONSE
		let pChoice = Math.floor(Math.random() * 3);
		let tweetText = `${precedingText}.. @${targetUser}${replyPossibilities[pChoice]}`;
		// console.log('pChoice', pChoice);

		console.log('@MargieBuns:', tweetText);

		// REPLY TO THE TWEET WITH ABOVE CONTENT
		T.post(
			'statuses/update',
			{
				in_reply_to_status_id: tweetId,
				status: tweetText,
			},
			function(error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have tweeted something.');
				}
				// If there was an error with our Twitter call, we print it out here.
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			}
		);
	});
}

if (true) {
	// SCAN DM
	T.get('direct_messages/events/list').then(function(response) {
		// console.log(response.data.events);
		// console.log(response.data.events[0].message_create.target);
		// console.log(response.data.events[0].message_create.message_data.text);

		// GET SENDERNAME
		let senderId = response.data.events[0].message_create.sender_id;
		let senderName = '@';

		T.get('users/show', { user_id: senderId }).then(function(res) {
			console.log(res.data.screen_name);
			senderName += res.data.screen_name;

			// TWEET HI PUBLICLY BECAUSE THAT'S WHAT GRANDMAS DO
			// WHEN THEY DON'T KNOW HOW TO USER TWITTER
			T.post(
				'statuses/update',
				{
					status: `Oh I think I got something called a DM.. let me see.. oh hey it's from ${senderName}! Hi!! How are you?`,
				},
				function(error, response) {
					if (response) {
						console.log('Success! Check your bot, it should have tweeted something.');
					}
					// If there was an error with our Twitter call, we print it out here.
					if (error) {
						console.log('There was an error with Twitter:', error);
					}
				}
			);
		});
	});
}


