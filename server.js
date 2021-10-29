const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes.js');

mongoose.connect('mongodb://localhost:27017/robbyson', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connection success')
    }
});

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(routes)

app.listen(port, function() {
    console.log(`Server is runing on port ${port}`)
});