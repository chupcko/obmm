import { createContext, useState } from 'react';

const ApiContext = createContext(
  {
    ready: false,
    authorized: false,
    username: undefined,
    loadJwt: () => {},
    haveJwt: false,
    apiPost: () => {},
    checkIn: () => {},
    logIn: () => {},
    logOut: () => {}
  }
);
ApiContext.displayName = 'ApiContext';

const URL = 'http://test.chupcko.org:8080/api/';
const JWT = 'JWT';

const ApiProvider = (props) => {

  const [ ready, setReady ] = useState(false);
  const [ authorized, setAuthorized ] = useState(false);
  const [ username, setUsername ] = useState(undefined);
  const [ jwt, setJwt ] = useState(undefined);
  const [ haveJwt, setHaveJwt ] = useState(false);

  const apiPost = (path, data, doNotSendJwt) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    if(doNotSendJwt !== true) {
      headers['Authorization'] = 'Baerer '+jwt;
    }
    return new Promise(
      (resolve, reject) => {
        fetch(
          URL+path,
          {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
          }
        ).then(
          (response) => {
            if(response.status !== 200) {
              reject(response.status);
              return;
            }
            return response.json();
          }
        ).then(
          (result) => {
            if(result.status !== 'OK') {
              reject(result.status);
              return;
            }
            return resolve(result);
          }
        ).catch(
          (error) => reject(error)
        );
      }
    );
  };

  const loadJwt = () => {
    let token = localStorage.getItem(JWT);
    setJwt(token);
    setHaveJwt(true);
  };

  const storeJwt = (token) => {
    localStorage.setItem(JWT, token);
    setJwt(token);
  };

  const removeJwt = () => {
    localStorage.removeItem(JWT);
    setJwt(null);
  };

  const checkIn = () => {
    if(jwt === null){
      setReady(true);
      setAuthorized(false);
      return;
    }
    apiPost('auth/check_in', {}).then(
      (result) => {
        setUsername(result.username);
        storeJwt(result.jwt)
        setReady(true);
        setAuthorized(true);
      }
    ).catch(
      (error) => {
        setReady(true);
        setAuthorized(false);
      }
    );
  };

  const logIn = (username, password) => {
    apiPost('auth/log_in', { username: username, password: password }).then(
      (result) => {
        setUsername(result.username);
        storeJwt(result.jwt);
        setAuthorized(true);
      }
    ).catch(
      (error) => {
        setAuthorized(false);
      }
    );
  };

  const logOut = () => {
    setUsername(null);
    removeJwt();
    setAuthorized(false);
  };

  return (
    <ApiContext.Provider value={
      {
        ready: ready,
        authorized: authorized,
        username: username,
        loadJwt: loadJwt,
        haveJwt: haveJwt,
        apiPost: apiPost,
        checkIn: checkIn,
        logIn: logIn,
        logOut: logOut
      }
    } >
      { props.children }
    </ApiContext.Provider>
  );

};

export { ApiContext, ApiProvider };
