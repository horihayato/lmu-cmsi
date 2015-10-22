var mongoose = require('mongoose'),
models = require('./models'),
moment = require('moment'),
fs = require('fs'),
md5 = require('MD5');

module.exports = {
    check: function() {

        models.Goal.find({}, function(err, goals) {
            if (goals.length === 0) {
                console.log('no goals found, seeding...');

                var seedGoals = [
                  {
                    "difficulty": 6,
                    "priority": "Minor",
                    "fop": "Low",
                    "date": "1",
                    "slug": "eboard",
                    "timestamp": "01-30-2015",
                    "headline": "Learn to Wakeboard",
                    "description": "efrwefwefewfwfedf",
                    "success": false,
                  },
                  {
                    "difficulty": 41,
                    "priority": "Minor",
                    "fop": "High",
                    "date": "1",
                    "slug": "uitar",
                    "timestamp": "02-24-2015",
                    "headline": "Play Guitar",
                    "description": "efrwefwefewfwfedf",
                    "success": false,
                  },
           
                ]

                for (i in seedGoals) {
                    var newGoal = new models.Goal(seedGoals[i]);
                    newGoal.save(function(err, goal) {
                        console.log('successfully inserted goal: ' + goal._id);
                    });
                };
                
            } else {
                console.log('found ' + goals.length + ' existing goals!');
            }
        });





        models.Post.find({}, function(err, posts) {
            if (posts.length === 0) {
                console.log('no posts found, seeding...');

                var file = __dirname + "/de-luce.txt",
                    textArr = [];

                fs.readFile(file, function(err, data) {
                    if (err) throw err

                    var d = data.toString()
                    d = d.toLowerCase();
                    d = d.replace(/[\/\-\/#!$%\^&"'\*;:{}=\-_`~()]/g,"");
                    d = d.replace(/[\.,\|\n]/g," ");

                    textArr = d.split(" ");

                    var postOptions1 = {
                        "parent": "Learn to Wakeboard",
                        "baseDate": "01-30-2015",
                        "amount":40,
                        "headline": "Lorem Ipsum",
                        "success": [true, false],
                        "priority": ["Minor", "Major", "Critical"],
                        "baseText": textArr
                    };

                    var postOptions2 = {
                        "parent": "Play Guitar",
                        "baseDate": "02-24-2015",
                        "amount":40,
                        "headline": "Lorem Ipsum",
                        "success": [true, false],
                        "priority": ["Minor", "Major", "Critical"],
                        "baseText": textArr
                    };
            
                    var seedPosts = []

                    seedPosts.push(randomPostsForGoal(postOptions1))
                    seedPosts.push(randomPostsForGoal(postOptions2))

                    for (var i=0; i<seedPosts.length; i++) {
                        var postsArray = seedPosts[i];
                        for (j in postsArray) {
                            var newPost = new models.Post(postsArray[j]);

                            newPost.save(function(err, post) {
                                console.log('successfully inserted post: ' + post._id);
                            });
                        }
                    };
                })                
            } else {
                console.log('found ' + posts.length + ' existing posts!');
            }
        });
}
};



function randomPost (start, options) {

    var s = moment(start, "MM-DD-YYYY"),
        rand = Math.floor(Math.random() * (99 - 2) + 2),
        parent = options["parent"],
        headline = options["headline"],
        baseText = options["baseText"];

    s = s.add(rand, 'd'); //random addition between 2 & 99 days to completion

    var descripLen = 150, //words not characters
        str = "";

    for (var i = 0; i < descripLen; i++) {
        var rand = Math.floor(Math.random() * baseText.length) + 1
        str = str + baseText[rand] + " ";
    }

    var post = {
                    "goalAssoc": parent,
                    "doc": s.format("MM-DD-YYYY"), 
                    "timestamp": start,
                    "headline": headline,
                    "description": str,
                    "difficulty": Math.floor(Math.random() * 50),
                    "success": options["success"][Math.floor(Math.random() * 2)],
                    "priority": options["priority"][Math.floor(Math.random() * 3)],
               };


    return post;
}


function randomPostsForGoal (options) {

    var posts = [],
        parent = options["parent"],
        baseDate = options["baseDate"],
        amount = options["amount"],
        headline = options["headline"];
 
    for (var i=0; i < amount; i++){
        var rand = Math.floor(Math.random() * (81 - 2) + 2),
            s = moment(baseDate, "MM-DD-YYYY");

        s.add(rand, 'd'); //random addition between 2 & 80 days to vary start dates

        posts.push(randomPost(s.format("MM-DD-YYYY"), options))
    }
    
    return posts;
}





