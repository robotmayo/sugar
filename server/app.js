const {resolve} = require('path');

const express = require('express');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const auth = require('./auth');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('hbs', hbs.express4({
  partialsDir: resolve(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', resolve(__dirname, 'views'));

app.get('*', function(req, res){
  console.log(req.user);
  res.render('index');
});

auth.init(app);
app.listen(8000);
console.log('App listening at 8000');
