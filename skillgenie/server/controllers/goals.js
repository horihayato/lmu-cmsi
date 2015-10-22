var models = require('../storage/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Goal.find({}, function(err, data) {
            res.json(data);
        });
    },
    getById: function(req, res) {
        models.Goal.find({ _id: req.params.id }, function(err, goal) {
            if (err) {
                res.json({error: 'Goal not found.'});
            } else {
                res.json(goal);
            }
        });
    },
    add: function(req, res) {
        var newGoal = new models.Goal(req.body);
        newGoal.gravatar = md5(newGoal.email);
        newGoal.save(function(err, goal) {
            if (err) {
                res.json({error: 'Error adding goal.'});
            } else {
                res.json(goal);
            }
        });
    },
    update: function(req, res) {
        console.log(req.body);
        models.Goal.update({ _id: req.body._id }, req.body, function(err, updated) {
            if (err) {
                res.json({error: 'Goal not found.'});
            } else {
                res.json(updated);
            }
        })
    },
    delete: function(req, res) {
        models.Goal.findOne({ _id: req.params.id }, function(err, goal) {
            if (err) {
                res.json({error: 'Goal not found.'});
            } else {
                goal.remove(function(err, goal){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    },
    wipeGoals: function(req, res) {
        models.Goal.remove({}, function(err, goals) {
            if (err) {
                res.json({error: 'No goals found.'});
            } else {
                res.json(200, {status: 'All goals deleted.'});
            }
        });
    }
};
