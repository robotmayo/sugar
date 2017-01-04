const passport = require('passport');

const User = require('./models/user');



function serializeUser(user, done) {
  done(null, user.userID);
}
module.exports.serializeUser = serializeUser;

function deserializeUser(id, done) {
  return User.getUser({id})
    .then(results => {
      if(results.length === 0) return done(null, false, {info: 'User not found'});
      const {email} = results[0];
      done(null, {userID: id, email});
    })
    .catch(done);
}
module.exports.deserializeUser = deserializeUser;

function localStrategyHandler(email, plainPassword, done) {
  return User.getUser({email})
    .then(results => {
      if(results.length === 0) return done(null, false, {info: 'User not found'});
      const {id, password, email} = results[0];
      const valid = User.verifyPassword(password, plainPassword);
      console.log(valid);
      if(!valid) return done(null, false, {msg: 'Invalid password'});
      console.log('HMMM?');
      done(null, {userID: id, email});
    })
    .catch(done);
}
module.exports.localStrategyHandler = localStrategyHandler;

