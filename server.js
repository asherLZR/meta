const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;
const app = express();

// Host static files (Front-end files)
app.use(express.static(path.join(__dirname,'client','build')));

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true }));


/* ENDPOINTS */
app.get('/', (req, res) => {
    let frontPagePath = path.join(__dirname, 'client', 'build', 'index.html');
    res.send(frontPagePath);
});

app.post('/api/v1/upload', function (req, res) {
    // TODO: Insert into MongoDB database
    console.log(req.body.user);
    console.log(req.body.url);
    // TODO: call python scripts
    res.end()
    // console.log(req.user);
    // console.log(req.url);
  });

app.get('/api/v1/stats/progress', function (req, res) {
    res.sendFile(path.join(__dirname, 'dummy_data', 'progress.json'))
});

app.get('/api/v1/stats/goals', function (req, res) {
    res.sendFile(path.join(__dirname, 'dummy_data', 'goals.json'))
});

app.post('/api/v1/login', function (req, res) {
    res.status(200);
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));