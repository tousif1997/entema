import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { startgetUser } from "./Actions/userActions"
const store = configureStore()


store.subscribe(()=>{
  // console.log("updated store:", store.getState())
})

if(localStorage.getItem('token')){
  store.dispatch(startgetUser())
 
 }
ReactDOM.render(
  <Provider store = {store}><BrowserRouter>
  <App />
</BrowserRouter>
</Provider>,
  document.getElementById('root'),
);
