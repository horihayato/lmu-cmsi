var home = require('./controllers/home'),
	goals = require('./controllers/goals'),
    metrics = require('./controllers/metrics'),
    posts = require('./controllers/posts');

module.exports.initialize = function(app) {
    app.get('/', home.index);

    app.get('/api/goals', goals.index);
    app.get('/api/goals/:id', goals.getById);
    app.post('/api/goals', goals.add);
    app.put('/api/goals/:id', goals.update);
    app.delete('/api/goals/:id', goals.delete);
    app.delete('/api/goals/', goals.wipeGoals);

    app.get('/api/posts', posts.index);
    app.get('/api/posts/:id', posts.getById);
    app.post('/api/posts', posts.add);
    app.put('/api/posts/:id', posts.update);
    app.delete('/api/posts/:id', posts.delete);
    app.delete('/api/posts/', posts.wipePosts);

    app.get('/api/metrics/difficultyRegression', metrics.difficultyRegression);
    app.get('/api/metrics/descriptionClassifier', metrics.descriptionClassifier);
};
