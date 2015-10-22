var fs = require('fs')

module.exports = {
    textGen: function(req, res) { //req obj = {file:_, length:_}
    		var file = req["file"],
    			len = req["length"];

    		fs.readFile(file, function(err, data) {
    			if (err) throw err

    			var d = data.toString()
    			d.toLowerCase();
    			d.replace(/\W/g, '');
    			
    			var textArr = d.split(' '),
    				str = "";

    			for (i = 0; i < len; i++) {
    				var rand = Math.floor(Math.random() * textArr.length()) + 1
    				str = str + textArr[rand] + " ";
    			}

    			return str;
    		})
    },
}