const configuration = require('./configuration');
const mongo = require('./mongo');
const server = require('./server');

server.add('/api/auth', require('./api_auth').router);
server.add('/api/test', require('./api_test').router);

mongo.start().then(
  (result) => { return server.start(); }
).then(
  (result) => { console.log('Started'); }
).catch(
  (error) => {
    console.log('ERROR', error);
    process.exit(1);
  }
);
