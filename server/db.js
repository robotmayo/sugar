const nconf = require('nconf');

const conf = nconf.get('db');
const pg = require('pg');
const knex = require('knex');

const pool = new pg.Pool(conf);
module.exports.pool = pool;
module.exports.knex = knex({
  client: 'pg',
  connection: nconf.get('connectionString')
});

