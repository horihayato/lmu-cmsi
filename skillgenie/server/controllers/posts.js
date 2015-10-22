var models = require('../storage/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Post.find({}, function(err, data) {
            res.json(data);
        });
    },
    getById: function(req, res) {
        models.Post.find({ _id: req.params.id }, function(err, post) {
            if (err) {
                res.json({error: 'Post not found.'});
            } else {
                res.json(post);
            }
        });
    },
    add: function(req, res) {
        var newPost = new models.Post(req.body);
        newPost.gravatar = md5(newPost.email);
        newPost.save(function(err, post) {
            if (err) {
                res.json({error: 'Error adding post.'});
            } else {
                res.json(post);
            }
        });
    },
    update: function(req, res) {
        console.log(req.body);
        models.Post.update({ _id: req.body._id }, req.body, function(err, updated) {
            if (err) {
                res.json({error: 'Post not found.'});
            } else {
                res.json(updated);
            }
        })
    },
    delete: function(req, res) {
        models.Post.findOne({ _id: req.params.id }, function(err, post) {
            if (err) {
                res.json({error: 'Post not found.'});
            } else {
                post.remove(function(err, post){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    },
    wipePosts: function(req, res) {
        models.Post.remove({}, function(err, posts) {
            if (err) {
                res.json({error: 'No posts found.'});
            } else {
                res.json(200, {status: 'All posts deleted.'});
            }
        });
    }
};
