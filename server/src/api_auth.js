const configuration = require('./configuration');
const server = require('./server');
const authorization = require('./authorization');

const router = server.data.express.Router();

router.post(
  '/check_in',
  authorization.check,
  (request, response) => {
    const username = request.local_authorization_data.username;
    authorization.ok(response, { username: username, jwt: authorization.new_jwt(username) });
  }
);

router.post(
  '/log_in',
  (request, response) => {
    const username = request.body.username;
    authorization.login(
      username,
      request.body.password
    ).then(
      (result) => {
        if(result === false) {
          authorization.bad_auth(response);
          return;
        }
        authorization.ok(response, { username: username, jwt: authorization.new_jwt(username) });
      }
    );
  }
);

exports.router = router;
