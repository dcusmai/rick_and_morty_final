import React from 'react';
//import ReactDOM from 'react-dom'; // Esto no va más, está desactualizado
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

//ReactDOM.render( // Así lo hizo Dai, pero está desactualizado y ya no me lo acepta react.
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <App />  
  //   </BrowserRouter>,
  //   document.getElementById('root')
  // </Provider>
  // );

const container = document.getElementById('root') // Esta es la forma que me propone la documentación de React y funciona OK
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />  
    </BrowserRouter>,
  </Provider>
)