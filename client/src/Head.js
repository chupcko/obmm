import { useContext, useState } from 'react';

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ApiContext } from './Api';

let Head = () => {

  const { authorized, username, logOut } = useContext(ApiContext);

  const [ anchorElement, setAnchorElement ] = useState(null);

  const doLogOut = () => {
    logOut();
    setAnchorElement(null);
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <Typography variant="h6" component="div" sx={ { flexGrow: 1 } } >
          OBMM - Online BookMarks Manager (by <a href="http://www.chupcko.org/">CHUPCKO</a>)
        </Typography>
        {
          authorized && (
            <div>
              { username }
              <IconButton
                size="large"
                onClick={ (event) => { setAnchorElement(event.currentTarget); } }
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={ anchorElement }
                anchorOrigin={
                  {
                    vertical: 'top',
                    horizontal: 'right',
                  }
                }
                keepMounted
                transformOrigin={
                  {
                    vertical: 'top',
                    horizontal: 'right',
                  }
                }
                open={ anchorElement !== null }
                onClose={ () => { setAnchorElement(null); } }
              >
                <MenuItem onClick={ () => { console.log('p'); } } >Profile</MenuItem>
                <MenuItem onClick={ doLogOut } >Log out</MenuItem>
              </Menu>
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  );

}

export default Head;
