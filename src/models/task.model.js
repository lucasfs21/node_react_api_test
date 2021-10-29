const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    description: {type: String, required: true},
    duedate: {type: String, required: true},
    done: Boolean,
    hide: Boolean
}, {
    timestamps: true
}).pre("save", function(next) {
    this.done = false;
    this.hide = false;
    next()
});

const task = mongoose.model('tasks', DataSchema);
module.exports = task;