const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // <=< needs middleware, see below
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session); // <=< allows mongo access to sessions
const cookieParser = require('cookie-parser');
const passport = require('passport');
const ip = require('ip');

const app = express();

require('./models/User'); // <=< load models

require('./config/passport')(passport); // <=< passport configuration 

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}) // <=<|2 connects to database
  .then(() => console.log('DB Live...')).catch(err => console.log(err));

const index = require('./routes/index'); // <=< loads routes
const auth = require('./routes/auth');
const stories = require('./routes/stories');

app.engine('handlebars', exphbs({ defaultLayout: 'main', })); // <=<|2 handlebars middleware
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'))); // <=< joins public dir for use 

app.use(cookieParser());

const sess = {
  secret: 'smellsOfRye',
  name: 'biblioPteraSaur',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection, }), // <=< Set Session store
  cookie: { path: '/', httpOnly: true, secure: 'auto', maxAge: 60000 * 60 * 24 },
};
app.use(session(sess)); // <=< uses session just created

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => { // <=< sets local user variable
  res.locals.user = req.user || null;
  next();
});

app.use('/', index); // <=< uses routes
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5000; // <=< chooses active port for app

// v== sets active port
app.listen(port, () => {console.log(`Get to work at http://${ip.address()}:${port} or http://localhost:${port}`);});
