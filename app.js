const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // <== needs middleware, see below
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const ip = require('ip');

const app = express();

require('./models/User'); // <== load models

require('./config/passport')(passport); // <== passport configuration 

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}) // <v== connects to database
  .then(() => console.log('DB Live...')).catch(err => console.log(err));

const index = require('./routes/index'); // <v== loads routes
const auth = require('./routes/auth');

app.engine('handlebars', exphbs({ defaultLayout: 'main', })); // <v== handlebars middleware
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'))); // <== joins public dir for use 

app.use(cookieParser());
app.use(session({
  secret: 'smellsOfRye',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', index); // <v== uses routes
app.use('/auth', auth);

const port = process.env.PORT || 5000; // <== chooses active port for app

// v== sets active port
app.listen(port, () => {console.log(`Get to work at http://${ip.address()}:${port} or http://localhost:${port}`);});
