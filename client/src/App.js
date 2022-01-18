import { useContext, useEffect } from 'react';

import { CssBaseline, Box, LinearProgress, Button } from '@mui/material';

import { ApiContext } from './Api';

import Head from './Head';
import Content from './Content';
import LogIn from './LogIn';

let App = (props) => {

  const {
    ready,
    authorized,
    loadJwt,
    haveJwt,
    checkIn
  } = useContext(ApiContext);

  useEffect(
    () => {
      loadJwt();
    },
    []
  );

  useEffect(
    () => {
      if(haveJwt) {
        checkIn();
      }
    },
    [ haveJwt ]
  );

  return (
    <>
      {
        ready ? (
          <>
            <CssBaseline />
            <Head/>
            {
              authorized ? (
                <Content />
              ) : (
                <LogIn />
              )
            }
          </>
        ) : (
          <Box sx={ { width: '100%' } }>
            <LinearProgress />
          </Box>
        )
      }
    </>
  );

}

export default App;
