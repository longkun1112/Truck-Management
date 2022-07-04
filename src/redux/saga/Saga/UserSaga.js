import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
// import {getAllRecruit} from "./getAllRecruit.js";

import * as types from '../Types/UserType'
import * as actions from '../actions/UserAction'

import axios from "axios";
function* getAllUser() {
  try {
    const result = yield call(async () => {
      return await axios.get("http://localhost:8000/users")
    });
    console.log("result", result)

    if (result ) {
      yield put({ type: "GET_ALL_USERS_SUCCESS", payload: result.data });
    } else {
      yield put({ type: "GET_ALL_USERS_FAILURE" });
    }
  } catch (error) {
    yield put({
      type: "GET_ALL_USERS_FAILURE",
      payload: error.response.message,
    });
  }
}

function* addUser({ data }) {
  try {
      const task = yield call(async () => {
        return await axios.post("http://localhost:8000/users", data)
      })
      yield put(actions.UserAddedAction(task.data))
  } catch (e) {
      yield put(
        console.log('err', e)
      )
  }
}

// function* editCargo({ id, data }) {
//   try {
//       const task = yield call(async () => {
//         return await axios.put(`http://localhost:8000/users/${id}`, data)
//       })
//       yield put(actions.taskEditedAction(task))
//   } catch (e) {
//       yield put(
//         console.log('err', e)
//       )
//   }
// }

function* deleteCargo({ id }) {
  try {
      yield call(async () => {
        return await axios.delete(`http://localhost:8000/users/${id}`)
      })
      yield put(actions.UserDeletedAction(id))
      // yield put(actions.loadTasksAction())
  } catch (e) {
      yield put(
        console.log('err', e)
      )
  }
}

function* watchAddTask() {
  yield takeEvery(types.ADD_USER, addUser)
}

function* watchDeleteTask() {
  yield takeEvery(types.DELETE_USER, deleteCargo)
}


function* UserSaga() {
  yield all([
    takeLatest("GET_ALL_USER", getAllUser),
    watchAddTask(),
    watchDeleteTask()
  ])
}

export default UserSaga;