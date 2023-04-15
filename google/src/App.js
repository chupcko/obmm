// global google;

import { useState, useEffect } from 'react';

import { unpack_jwt } from './utils';

const App = () => {

  const [ user, setUser ] = useState(null);

  const init = () => {
    google.accounts.id.initialize(
      {
        client_id: '842503475467-fa8h2lrp2jrhhehkspvt7fo3p7c9f1d3.apps.googleusercontent.com',
        cancel_on_tap_outside: false,
        auto_select: true,
        callback: (response) => {
          console.log('SIGN', response);
          setUser(unpack_jwt(response.credential).email);
        }
      }
    );
    google.accounts.id.prompt(
      (notification) => {
        console.log('PROMPT', notification);
      }
    );
  };

  useEffect(
    () => {
      const script_element = document.createElement('script');
      script_element.setAttribute('src', 'https://accounts.google.com/gsi/client');
      script_element.onload = init;
      document.querySelector('body').appendChild(script_element);
    },
    []
  );

  const logout = () => {
    console.log('LOGOUT');
    google.accounts.id.disableAutoSelect();
    setUser(null);
    google.accounts.id.prompt(
      (notification) => {
        console.log('PROMPT', notification);
      }
    );
  };

  return(
    user !== null && <>
      { user } <button onClick = { logout } >Logout</button>
    </>
  );

}

export default App;
