var models = require('../storage/models'),
    path = require('path'),
    md5 = require('MD5'),
    parser = require('../parser'),
    PythonShell = require('python-shell');

module.exports = {
    difficultyRegression: function(req, res) {
        models.Post.find({}, function(err, posts) {
            if (err) {
                res.json({error: 'Metric not enumerated.'});
            } else {

                var data = parser.difficultyRegressionParse(posts);

                var options = {
                      mode: 'text',
                      scriptPath: path.join(__dirname, '../learning'),
                      args: [data]
                    };
                 
                PythonShell.run('difficultyRegression.py', options, function (err, results) {
                  if (err) throw err;
                  data = parser.difficultyRegressionFormat(results);
                  printResults(data, "Difficulty Regression - Metric 1");
                  res.json(data);
                });
            }
        });
    },

    descriptionClassifier: function(req, res) {
        models.Post.find({}, function(err, posts) {
            if (err) {
                res.json({error: 'Metric not enumerated.'});
            } else {
                var input = req.query.data;
                var postData = parser.descriptionClassifierParse(posts, input);

                var options = {
                      mode: 'text',
                      scriptPath: path.join(__dirname, '../learning'),
                      args: [postData["Positive"], postData["Negative"], postData["Input"]]
                    };
                 
                PythonShell.run('descriptionClassifier.py', options, function (err, results) {
                  if (err) throw err;
                  data = parser.descriptionClassifierFormat(results);
                  printResults(data, "Description Classifier - Metric 2"); //needs to take in data var, once we get something meaningful from the classifier
                  res.json(data); //needs to take in data var
                });
            }
        });
    },
};


function printResults(data, type) {
  console.log("\n" + "\n" + "____________________________________")
  console.log("RESULTS FROM PYTHON SHELL: " + type )
  console.log("____________________________________"+ "\n" + "\n")

  console.log(data)
}