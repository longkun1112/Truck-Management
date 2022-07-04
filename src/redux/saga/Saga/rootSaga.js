import { all } from "redux-saga/effects";
import CargoSaga from "./CargoSaga";
import UserSaga from "./UserSaga";
import InfoSaga from "./InfoSaga";

function* rootSaga() {
  yield all([
    CargoSaga(),
    UserSaga(),
    InfoSaga()
  ]);
}

export default rootSaga;