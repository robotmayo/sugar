const {hashSync, compareSync} = require('bcryptjs');

const {knex} = require('../db');

module.exports.getUser = function getUserByID(obj){
  return knex('user_accounts')
  .select('email','password')
};

module.exports.addUser = function addUser({email, password}){
  const hash = hashSync(password);
  return knex('user_accounts')
  .insert({email, password: hash}, 'id');
}


