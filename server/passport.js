const passport = require('passport');

const User = require('./models/user');



function serializeUser(user, done) {
  done(null, user.id);
}
module.exports.serializeUser = serializeUser;

function deserializeUser(user, done) {
  return User.getUser({id: user.id})
  .then(results => {
    if(results.length === 0) return done(null, false, {info: 'User not found'});
    done(null, results[0]);
  })
  .catch(done);
}
module.exports.deserializeUser = deserializeUser;

function localStrategyHandler(email, password, done) {
  return User.getUser({email})
  .then(results => {
    if(results.length === 0) return done(null, false, {info: 'User not found'});
    const {userID, hash} = results[0];
    const valid = User.verifyPassword(hash, password);
  })
  .catch(console.error);
  /*
  db.query('SELECT id AS userid, password AS hash FROM user_accounts WHERE email = $1', [email])
    .then(({rows}) => {
      if (rows.length === 0) return done(null, false, {msg: 'User not found'});
      const {userid, hash} = rows[0];
      const valid = bcrypt.compareSync(password, hash);
      if (!valid) return done(null, false, {msg: 'Invalid password'});
      done(null, { userID: userid, email });
    })
    .catch(done);
    */
}
module.exports.localStrategyHandler = localStrategyHandler;

