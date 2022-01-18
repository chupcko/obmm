const configuration = require('./configuration');

let data = {};

data.express = require('express');
data.app = data.express();

data.app.use(data.express.static('public'));

if(configuration.server_cors === true) {
  data.app.use(require('cors')());
}

data.app.disable('etag');
data.app.disable('x-powered-by');
data.app.use(
  (request, response, next) => {
    response.set('Cache-Control', 'no-store');
    next();
  }
);

data.app.use(require('body-parser').json());

const add = (path, router) => {
  data.app.use(path, router);
};

const start = () => {
  data.app.use(
    (request, response, next) => {
      response.status(404);
      response.send('404');
    }
  );
  return new Promise(
    (resolve, reject) => {
      data.server = require('http').createServer(data.app);
      data.server.on(
        'error',
        (error) => { reject(error); }
      );
      data.server.listen(
        configuration.server_port,
        () => {
          console.log(`Started http server on host "${ data.server.address().address }" port ${ data.server.address().port }`);
          resolve();
        }
      );
    }
  );
};

exports.data = data;
exports.add = add;
exports.start = start;
