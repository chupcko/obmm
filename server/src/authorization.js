const configuration = require('./configuration');

const bad_auth = (response) => {
  response.send({ status: 'BAD_AUTH' });
};

const ok = (response, additional) => {
  response.send({ status: 'OK', ...additional });
};

const jwt = require('jsonwebtoken');

const new_jwt = (username) => {
  return jwt.sign(
    { username: username },
    configuration.jwt_private_pem,
    {
      algorithm: 'RS512',
      expiresIn: configuration.jwt_age,
      audience: configuration.jwt_audience,
      issuer: configuration.jwt_issuer
    }
  );
};

const check = (request, response, next) => {
  const authorization = request.headers['authorization'];
  if(authorization === undefined) {
    bad_auth(response);
    return;
  }

  const bearer = authorization.split(' ');
  if(bearer.length !== 2 && bearer[0] !== 'Bearer') {
    bad_auth(response);
    return;
  }

  jwt.verify(
    bearer[1],
    configuration.jwt_public_pem,
    (error, decoded) => {
      if(error !== null) {
        bad_auth(response);
        return;
      }
      request.local_authorization_data = { username: decoded.username };
      next();
    }
  );
};

const mongo = require('./mongo');
const crypto = require('crypto');

const login = async (username, password) => {
  if(username === undefined || password === undefined) {
    return false;
  }

  return await mongo.data.database.collection('users').findOne(
    {
      '$and': [
        { username: username },
        { password: crypto.createHash('md5').update(password).digest('hex') }
      ]
    }
  ) !== null;
};

exports.bad_auth = bad_auth;
exports.ok = ok;
exports.new_jwt = new_jwt;
exports.check = check;
exports.login = login;
