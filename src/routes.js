const express = require('express');
const routes = express.Router();
const Task = require('./controllers/task.controllers');

routes.get('/api/task', Task.index);
routes.post('/api/task', Task.create);
routes.get('/api/task/find/:id', Task.find);
routes.get('/api/task/search/:description', Task.search);
routes.delete('/api/task/:id', Task.delete);
routes.put('/api/task', Task.update);
routes.put('/api/task/toarchive', Task.toArchive);
routes.put('/api/task/done', Task.done);

module.exports = routes;