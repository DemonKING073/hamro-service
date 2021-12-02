import React from 'react';
import { GlobalStyles } from './Global';
import { GlobalAntStyles } from './GlobalAntStyles';
import Router from './routes/Router'

function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalAntStyles />
      <Router />
    </>
  );
}

export default App;
