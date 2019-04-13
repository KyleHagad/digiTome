const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // <== needs middleware, see below
const mongoose = require('mongoose');
const passport = require('passport');
const ip = require('ip');

const app = express();

require('./config/passport')(passport); // passport configuration 

const index = require('./routes/index'); // <v== loads routes
const auth = require('./routes/auth');

app.engine('handlebars', exphbs({ defaultLayout: 'main', })); // <== handlebars middleware
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'))); // <== joins public dir for use 

app.use('/', index); // <v== uses routes
app.use('/auth', auth);

const port = process.env.PORT || 5000; // <== chooses active port for app

// v== sets active port
app.listen(port, () => {console.log(`Get to work at http://${ip.address()}:${port} or http://localhost:${port}`);});
