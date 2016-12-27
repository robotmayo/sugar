const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcryptjs');
const joi = require('joi');
const nconf = require('nconf');
const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;

const db = require('./db');
const patch = require('./patch-pgSession');
const User = require('./models/user');
const {serializeUser, deserializeUser, localStrategyHandler} = require('./passport');



const registerSchema = joi.object({
  password: joi.string().min(8).max(64).required(),
  email: joi.string().required().max(256).email()
});

function postRegister(req, res) {
  const body = req.body;
  const {email, password} = body;
  const userData = {password: password, email: email };
  
  const result = registerSchema.validate(userData);
  if (result.error) {
    return res.json(result.error);
  }
  User.addUser({email, password})
  .then(idArr => {
    const id = idArr[0];
    return new Promise(function(resolve, reject){
      req.login({id}, err => {
        if(err) return reject(err);
        resolve();
      });
    });
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    if(err.detail && (/already exists/).test(err.detail)){
      res.status(400);
      return res.json({error: 'Email already in use'});
    }
    res.status(500);
    return res.json({error: 'Server Error'});
  });
}
module.exports.postRegister = postRegister;


function init(app) {
  app.use(session({
    store: patch(db.pool, new pgSession({ pg: db.pool, tableName: 'app_sessions' })),
    secret: nconf.get('cookie:secret'),
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email' }, localStrategyHandler));

  passport.serializeUser(serializeUser);

  passport.deserializeUser(deserializeUser);
  app.get('/login', function login(req, res) {
    res.render('login');
  });
  app.get('/register', function register(req, res){
    res.render('register');
  });
  app.post('/register', postRegister);
  app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

}
module.exports.init = init;
