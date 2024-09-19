import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { CarritoProvider } from './context/CarritoContext';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
    <CarritoProvider>
      <App />
    </CarritoProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
