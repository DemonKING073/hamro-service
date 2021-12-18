import React from 'react';
import { UserProvider } from './context/UserContext';
import { GlobalStyles } from './Global';
import { GlobalAntStyles } from './GlobalAntStyles';
import Router from './routes/Router'

function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalAntStyles />
      <UserProvider>
      <Router />
      </UserProvider>
    </>
  );
}

export default App;
