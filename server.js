const fs = require('fs');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const session = require('express-session');
const mongoose = require("mongoose");
const spawn = require('child_process').spawn;
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/meta"
const TEXTRAZOR_KEY = process.env.TEXTRAZOR_KEY
const app = express();

const User = require('./server/models/User');
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Host static files (Front-end files)
app.use(express.static(path.join(__dirname,'client','build')));

/* MIDDLEWARE */
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true }));

// Setting up user session
app.use(session({
    secret: 'UNIHACK-META', // FIXME: This ain't safe but YOLO
    store: new MongoStore({ url: MONGODB_URI }),
    resave: false, //required
    saveUninitialized: false //required
  }));

app.use( (req, res, next) => {
    console.log('req.session', req.session);
    return next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, (err, user) => {
            if (err) { return done(err); }
            
            if (!user) {
                return done(null, false, { message: 'Incorrect username'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password'});
            }
            return done(null, user);
        });
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

function loggedIn(req, res, next) {
    console.log("Check if logged in")
    if (req.user) {
        console.log("signed in");
        next();
    } else {
        console.log("not signed in");
        res.redirect('/login');
    }
}
/* ENDPOINTS */
app.get('/', loggedIn, (req, res) => {
    console.log(req.user)
    let frontPagePath = path.join(__dirname, 'client', 'build', 'index.html');
    res.send(frontPagePath);
});

app.post('/api/v1/upload', function (req, res) {
    // TODO: Insert into MongoDB database
    // console.log(req.body.user);
    console.log(req.body);
    const p = spawn('python3', [path.join(__dirname, 'py_scripts', 'process_url.py'), '--username', req.body.user, '--url',req.body.url, '--db-uri', MONGODB_URI, '--tr-key', TEXTRAZOR_KEY]);
    p.stdout.on('data', (data) => console.log('added url:' + req.body.url, ' for user:', req.body.user))
    p.stderr.on('data', (data) => {
        fs.writeFile(Date.now().toString(), data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    })
    res.end()
    // console.log(req.user);
    // console.log(req.url);
  });

app.get('/api/v1/stats/progress', function (req, res) {
    const p = spawn('python3', [path.join(__dirname, 'py_scripts', 'aggregator.py'), '--username', req.query.user]);
    p.stdout.on('data', (data)=>res.send(data));
    res.end();
    // res.sendFile(path.join(__dirname, 'dummy_data', 'progress.json'))
});

app.get('/api/v1/stats/goals', function (req, res) {
    res.sendFile(path.join(__dirname, 'dummy_data', 'goals.json'))
});

app.post('/api/v1/account/signup', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    if (!username) {
        return res.send({
          success: false,
          message: 'Error: Username cannot be blank.'
            });
    }
    if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
    }

    User.find({
        username: username
      }, (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Account already exist.'
          });
        }
        // Save the new user
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Signed up'
          });
        });
    });
});

app.post('/api/v1/login', passport.authenticate('local'), function(req, res) {
    console.log(req.user)
    let userInfo = {
        username: req.user.username,
    }
    res.redirect('/');
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));