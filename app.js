const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // <== needs middleware, see below
const mongoose = require('mongoose');
const ip = require('ip');

const app = express();

const index = require('./routes/index');

app.engine('handlebars', exphbs({ // <== handlebars middleware
defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Get to work at http://${ip.address()}:${port} or http://localhost:${port}`);
});