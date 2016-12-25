module.exports = function (pool, pgSessionInstance) {
  pgSessionInstance.query = (query, params = [], callback) => {
    if (!callback && typeof params === 'function') {
      callback = params
      params = []
    }
    pool.connect((err, client, done) => {
      if(err){
        callback(err);
      }
      client.query(query, params, (queryErr, result) => {
        done();
        if (queryErr) {
          return callback(queryErr)
        } else {
          const res = result.rows[0] ? result.rows[0] : false;
          return callback(null, res);
        }
      })
    });
  }
  return pgSessionInstance;
}
