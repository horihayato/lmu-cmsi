var moment = require('moment');

module.exports = {
    difficultyRegressionParse: function(req, res) { //parses history into algorithm
    		var posts = req,
    			points = []; 

    		// console.log("______________________Posts entering Difficulty Regression______________________")

		    for(var i=0;i<posts.length;i++){
		    	if (posts[i]['success']) {
			        var stamp = moment(posts[i]['timestamp'], 'MM-DD-YYYY'),
			        	doc = moment(posts[i]['doc'], 'MM-DD-YYYY'),
			        	difficulty = posts[i]['difficulty'];

					var ms = doc.diff(stamp);
					var d = moment.duration(ms);
					var duration = Math.floor(d.asDays());


					// console.log("______________________POST______________________")
					// console.log("STAMP")
					// console.log(stamp.format("dddd, MMMM Do YYYY"))
					// console.log("DOC")
					// console.log(doc.format("dddd, MMMM Do YYYY"))
					// console.log("DIFFICULTY")
					// console.log(difficulty)
					// console.log("DURATION")
					// console.log(duration)
					// console.log("SUCCESSFUL?")
					// console.log(posts[i]['success'])


			        points.push([difficulty, duration])
			        //CONSTANT x:difficulty (1-50)
			        //VARIABLE y:timestamp - doc (should represent total task time spent) 

				}
		    }

    		return points;
    },

    difficultyRegressionFormat: function(req, res) { //formats data from algorithm to be pushed up to view
    		var raw = req,
    			data = {}; 

    		//Returns (in order) THETA COEFFICIENTS, ORIGINAL X & Y DATA, ESTIMATED BEST FIT LINE

    		data["theta"] = raw[0].split(" ")
    		data["theta"] = [parseFloat(data["theta"][0]), parseFloat(data["theta"][1])]

    		oriX = raw[1].split(",")
    		oriY = raw[2].split(",")
    		originalpts = []

    		for(var i=0;i<(raw[1].length/4);i++){
    			var x = oriX[i].replace(/[\[\]]/,""),
    			    y = oriY[i].replace(/[\[\]]/,"");

		    	originalpts.push([parseFloat(x), parseFloat(y)])
		    }

    		bfX = raw[3].split(",")
    		bfY = raw[4].split(",")
    		bestfitpts = [];

    		var minX = 1,
    			minY = 1,
    			maxX = 1,
    			maxY = 1;

		    for(var i=0;i<(raw[3].length/4);i++){
		    	var x = bfX[i].replace(/[\[\]]/,""),
    			    y = bfY[i].replace(/[\[\]]/,"");

    			x = parseFloat(x)
    			y = parseFloat(y)

		    	bestfitpts.push([x, y])

		    	if (x > maxX)
		    		maxX = x

		    	if (x < minX)
		    		minX = x

		    	if (y > maxY)
		    		maxY = y

		    	if (y < minY)
		    		minY = y

		    }

		    data["original"] = originalpts
		    data["bestfit"] = bestfitpts
		    data["bfLine"] = [maxX, Math.floor(maxY), minX, minY]

    		return data;
    },

    descriptionClassifierParse: function(posts, input) { //parses history into algorithm
    		var posts = posts,
    			input = input,
    			neg = [],
    			pos = [],
    			res = {}; 

		    for(var i=0;i<posts.length;i++){
			        var stamp = moment(posts[i]['timestamp'], 'MM-DD-YYYY'),
			        	description = posts[i]['description'];

					if (posts[i]['success']) {
						pos.push(description)
					} else {
						neg.push(description)
					}

		    }

		    res["Positive"] = pos
		    res["Negative"] = neg
		    res["Input"] = input

    		return res;
    },

    descriptionClassifierFormat: function(req, res) { //formats data from algorithm to be pushed up to view
    		var raw = req,
    			data = {},
                posCounts = {},
                negCounts = {},
    			posWords = [],
    			negWords = [];

    		//Returns (in order) POSITIVE & NEGATIVE SUCCESS SCORES, POSITIVE WORDS, NEGATIVE WORDS

    		data["scores"] = [parseFloat(raw[0]), parseFloat(raw[1])]

    		//Transforming & santizing words to be interpreted by word cloud

    		raw[2] = raw[2].replace(/[\/']/g,"")
    		raw[3] = raw[3].replace(/[\/']/g,"")

    		raw[2] = raw[2].split(", ").slice(1)
    		raw[3] = raw[3].split(", ").slice(1)

            for (var i=0; i<raw[2].length; i++){
                var multiplier = parseInt(raw[2][i].replace(/[A-z:]+/g,"")),
                    word = raw[2][i].replace(/[\W\d]/g,"");

                multiplier = Math.floor(Math.log(multiplier)/ Math.log(1.5))

                posCounts[word] = multiplier;
                posWords.push(word)

                // for(var j=0; j<multiplier; j++){
                //     posWords.push(word)
                // }
            }


    		for (var i=0; i<raw[3].length; i++){
    			var multiplier = parseInt(raw[3][i].replace(/[A-z:]+/g,"")),
                    word = raw[3][i].replace(/[\W\d]/g,"");

                multiplier = Math.floor(Math.log(multiplier)/ Math.log(1.5))

                negCounts[word] = multiplier;
                negWords.push(word)

    			// for(var j=0; j<multiplier; j++){
    			// 	negWords.push(word)
    			// }
    		}

    		data["posWords"] = posWords
    		data["negWords"] = negWords
            data["posCounts"] = posCounts
            data["negCounts"] = negCounts

    		return data;
    },


};