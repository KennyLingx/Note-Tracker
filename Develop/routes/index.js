const express = require('express');
const app = express();
const noteRouter = require('./notes');

app.use('/notes', noteRouter);


module.exports = app;
