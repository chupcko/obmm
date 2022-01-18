import { useContext, useState } from 'react';

import { TextField, Button } from '@mui/material';

import { ApiContext } from './Api';

let LogIn = (props) => {

  const { logIn } = useContext(ApiContext);

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <>
      <TextField
        onChange={ (event) => { setUsername(event.target.value); } }
        value={ username }
        variant="outlined"
      />
      <TextField
        onChange={ (event) => { setPassword(event.target.value); } }
        type="password"
        value={ password }
        variant="outlined"
      />
      <Button onClick={ () => { logIn(username, password); } } >
        Log In
      </Button>
    </>
  );

};

export default LogIn;
