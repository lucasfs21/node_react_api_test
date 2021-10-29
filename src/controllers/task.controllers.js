const Task = require('../models/task.model');

module.exports = {
    async index(req, res) {
        try {
            const task = await Task.find({hide: false});
            res.json(task);
        } catch (e) {
            res.status(500).json({
                error: {
                    message: 'Failed to retrieve Tasks'
                }
            });
        };
    },

    async find(req, res) {
        try {
            const id = req.params.id
            const task = await Task.findOne({_id: id});
            res.json(task);
        } catch (e) {
            res.status(500).json({
                error: {
                    message: 'Failed to retrieve Task'
                }
            });
        };
    },

    async create(req, res) {
        try {
            const {description, duedate} = req.body;
            
            if (description === undefined || duedate === undefined) {
                return res.status(400).json({
                    error: {
                        message: "Description and duedate fields must be filled"
                    }
                });
            };

            let data = {description, duedate};
            if (await Task.findOne({description, duedate})) {
                return res.status(400).json({
                    error: {
                        message: 'Task already exists'
                    }
                });
            };

            let task = await Task.create(data);
            return res.status(200).json(task);
        } catch (e) {
            console.log(e.message)
            res.status(500).json({
                error: {
                    message: "Failed to create Task"
                }
            });
        };
    },

    async search(req, res) {
        try {
            const description = req.params.description;
            const task = await Task.find({hide: false, description: new RegExp(description, "i")});
            
            if (task.length < 1) {
                return res.status(400).json({
                    error: {
                        message: 'Tasks not found'
                    }
                });
            };

            res.json(task);
        } catch (e) {
            res.status(500).json({
                error: {
                    message: 'Failed to retrieve Tasks'
                }
            });
        };
    },

    async delete(req, res) {
        try {
            const id = req.params.id;

            const task = await Task.findByIdAndDelete({_id: id});

            return res.json(task);
        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: {
                    message: 'Failed to delete Task'
                }
            });
        };
    },

    async update(req, res) {
        try {
            const {id, description, duedate} = req.body;
            const data = {description, duedate};

            if (description === undefined || duedate === undefined) {
                return res.status(400).json({
                    error: {
                        message: "Description and duedate fields must be filled"
                    }
                });
            };

            const task = await Task.findByIdAndUpdate(id, data, {new: true});
            res.json(task)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: {
                    message: 'Failed to update Task'
                }
            });
        };
    },

    async toArchive(req, res) {
        try {
            const id = req.body.id;

            if (id === undefined) {
                return res.status(400).json({
                    error: {
                        message: "Task id was not informed"
                    }
                });
            };
            let task = await Task.findById(id)
            if (!task.done) {
                return res.status(400).json({
                    error: {
                        message: "Only done tasks can be archived"
                    }
                });
            }
            task = await Task.findByIdAndUpdate(id, {hide: true}, {new: true})
            res.json(task)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: {
                    message: 'Failed to update Task'
                }
            });
        };
    },
    async done(req, res) {
        try {
            const id = req.body.id;

            if (id === undefined) {
                return res.status(400).json({
                    error: {
                        message: "Task id was not informed"
                    }
                });
            };
            let task = await Task.findById(id)
            if (task.done) {
                return res.status(400).json({
                    error: {
                        message: "This task is already done"
                    }
                });
            }
            task = await Task.findByIdAndUpdate(id, {done: true}, {new: true})
            res.json(task)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: {
                    message: 'Failed to update Task'
                }
            });
        };
    }
}