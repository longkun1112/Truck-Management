import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import rootReducer from "./Reducers/CargoReducer";
import rootSaga from "./Saga/rootSaga.js";
import { composeWithDevTools } from "redux-devtools-extension"; 

const sagaMiddle = createSagaMiddle();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddle)
  )
);

sagaMiddle.run(rootSaga);

export default store;