const server = require('./server');
const authorization = require('./authorization');

const router = server.data.express.Router();

router.post(
  '/public',
  (request, response) => {
    authorization.ok(response, { test: 'public' });
  }
);

router.post(
  '/secret',
  authorization.check,
  (request, response) => {
    authorization.ok(response, { test: 'secret' });
  }
);

exports.router = router;
