exports.mongo_url = 'mongodb://127.0.0.1:27017/';
exports.mongo_database = 'obmm';

exports.server_port = 8080;
exports.server_cors = true;

const jwt_private_pem_file_name = './private.pem';
const jwt_public_pem_file_name = './public.pem';

exports.jwt_age = 366*24*60*60;
exports.jwt_audience = 'obmm';
exports.jwt_issuer = 'obmm';

const fs = require('fs');
exports.jwt_private_pem = fs.readFileSync(jwt_private_pem_file_name);
exports.jwt_public_pem = fs.readFileSync(jwt_public_pem_file_name);
