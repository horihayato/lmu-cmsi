import sys, requests, json

p = {'sort': 'group', 'apikey': 'CyrAZ7iUDOweTEqiMYgqI8ByZUDBtfiL'}
r = requests.get('http://worldcup.kimonolabs.com/api/teams', params=p)
group = sys.argv[1]
data = json.loads(r.content)

print "{0:<16} {1:^2} {2:^2} {3:^2}".format("Name", "W", "D", "L")

for item in data:
	if item["group"] == group:
		print "{0:16} {1:^2} {2:^2} {3:^2} ".format(item["name"], item["wins"], item["draws"], item["losses"])







