import React from 'react';
import './App.css'
import { GlobalStyles } from './Global';
import Router from './routes/Router'

function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
