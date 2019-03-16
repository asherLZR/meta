const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

// Host static files (Front-end files)
app.use(express.static(path.join(__dirname,'client','build')));

/* ENDPOINTS */
app.get('/', (req, res) => {
    let frontPagePath = path.join(__dirname, 'client', 'build', 'index.html');
    res.send(frontPagePath);
});

app.get('/', (req, res) => {
    let frontPagePath = path.join(__dirname, 'client', 'build', 'index.html');
    res.send(frontPagePath);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));