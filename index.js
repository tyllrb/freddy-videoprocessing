const video = require('./routes/file');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// server setup
app.use(express.json());
app.use(express.urlencoded());

// initialize routes
app.use('/video', video);

// https://cloud.mongodb.com/v2/5d9f8d52553855931f1309b7#clusters/detail/sandbox/connect?clusterId=sandbox
// mongoose.connect(`mongodb+srv://tyler:x9tvlpw@sandbox-5b8ag.mongodb.net/test?retryWrites=true&w=majority`);
// const db = mongoose.connection;

console.log(db ? 'established connection to database' : 'could not establish connection to database');

// listen baby
app.listen(9999, () => console.log('video processing server started'));