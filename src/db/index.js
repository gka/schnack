const fs = require('fs');
const path = require('path');
const db = require('sqlite');

// returns promise that passes db obj
function init(config) {
  const conf = config.get('database');
  const dbname = conf.comments || conf;
  const dbpath = path.resolve(process.cwd(), dbname);

  return Promise.resolve(db.open(dbpath, { Promise }))
  .then(db => db.migrate({
    // force: process.env.NODE_ENV === 'development' ? 'last' : false
    force: false
  }))
  .then(db => db.driver) // @FIXME
  .catch(err => console.error(err));
}

module.exports = {
  init
};

