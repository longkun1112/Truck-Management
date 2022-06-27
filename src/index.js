import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { combineReducers, createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { Reducer } from "./redux/reducers/Reducer";
import { UserReducer } from "./redux/reducers/UserReducer";
import { CargoReducer } from "./redux/reducers/CargoReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(UserReducer, composeWithDevTools());
const store = createStore(Reducer, composeWithDevTools());
// const store = createStore(CargoReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
