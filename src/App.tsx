import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainTemplate from './components/MainTemplate';
import { UserProvider } from './context/UserContext';
import { GlobalStyles } from './Global';
import { GlobalAntStyles } from './GlobalAntStyles';
import Router from './routes/Router'

function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalAntStyles />
      <BrowserRouter>
      <UserProvider>
        <MainTemplate/>
      </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
