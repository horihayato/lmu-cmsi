//regex from: http://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex

var readline = require('readline');
var stream = require('stream');

var story = "";
var words = [];
var dummyOut = new stream;
var rl = readline.createInterface(process.stdin, dummyOut);

//for each line
rl.on('line', function(line) {

	line = line.toLowerCase();

	//replaces all non-ascii and punctuation
	line = line.replace(/[^\w\s]|_/gm, "")
	story += line + " "


});

rl.on('close', function() {
	words = story.split(" ");
	var unique = [];
	

	//Filtering out unique elements & straggling spaces
	for (var i = 0; i < words.length; i++) {
		if (unique.indexOf(words[i]) == -1 && words[i] != "") {
			unique.push(words[i]);
		}
	}

	unique.sort();

	//Printing occurances
	for (var i = 0; i < unique.length; i++) {
		var count = 0;
		for (var j = 0; j < words.length; j++) {
			if (unique[i] == words[j]){
				count++;
			}
		}
		console.log(unique[i] + " " + count);
	}

});