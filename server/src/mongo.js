const configuration = require('./configuration')

let data = {};

data.client = new (require('mongodb')).MongoClient(configuration.mongo_url);

const start = () => {
  return new Promise(
    (resolve, reject) => {
      data.client.connect().then(
        (result) => {
          console.log(`Connected to "${ data.client.s.url }"`);
          data.database = data.client.db(configuration.mongo_database);
          resolve();
        }
      ).catch(
        (error) => { reject(error); }
      );
    }
  );
};

exports.data = data;
exports.start = start;
