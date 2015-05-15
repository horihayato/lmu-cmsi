//a solution best suited for larger files, using stream as a "throttle" for large chunks of data
//modified from: https://coderwall.com/p/ohjerg

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var file = process.argv[2];
var count = 0;

var instream = fs.createReadStream(file);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

//for each line
rl.on('line', function(line) {
	line = line.trim();

	if (line.length > 0 && line.search("//") != 0) {
		count++;
	}
});

rl.on('close', function() {
  	console.log(count);
});
