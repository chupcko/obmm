import { createContext, useState } from 'react';

const StoreContext = createContext(
  {
    a: false
  }
);
StoreContext.displayName = 'StoreContext';

const StoreProvider = (props) => {

  const [ a, setA ] = useState(false);

  return (
    <StoreContext.Provider value={
      {
        a: a
      }
    } >
      { props.children }
    </StoreContext.Provider>
  );

};

export { StoreContext, StoreProvider };
