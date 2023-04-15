const unpack_jwt = (jwt) => {
  return(JSON.parse(atob(jwt.split('.')[1])));
};

export {
  unpack_jwt
};
