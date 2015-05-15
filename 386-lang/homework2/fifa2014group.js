var request = require("request");
var groupArg = process.argv[2];

request("http://worldcup.kimonolabs.com/api/teams?apikey=CyrAZ7iUDOweTEqiMYgqI8ByZUDBtfiL&sort=group", 
function(err, response, body) {
	var req = JSON.parse(body)

	console.log("Name             " + "W  " + "D  " + "L");

	for (item in req) {
		if (req[item].group == groupArg) {
			var nameSpacing = (16 - req[item].name.length);
			var name = req[item].name;

			while (nameSpacing >= 0){
				name += " "
				nameSpacing--;
			}

			console.log(name + req[item].wins + "  " + req[item].draws + "  " + req[item].losses);
		}
	}
});