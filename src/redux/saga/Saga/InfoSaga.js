import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
// import {getAllRecruit} from "./getAllRecruit.js";

import * as types from '../Types/InfoType'
import * as actions from '../actions/InfoAction'

import axios from "axios";
function* getAllInfo() {
  try {
    const result = yield call(async () => {
      return await axios.get("http://localhost:8000/info")
    });
    console.log("result", result)

    if (result ) {
      yield put({ type: "GET_ALL_INFO_SUCCESS", payload: result.data });
    } else {
      yield put({ type: "GET_ALL_INFO_FAILURE" });
    }
  } catch (error) {
    yield put({
      type: "GET_ALL_INFO_FAILURE",
      payload: error.response.message,
    });
  }
}

function* addInfo({ data }) {
  try {
      const task = yield call(async () => {
        return await axios.post("http://localhost:8000/info", data)
      })
      console.log('info', task)
      yield put(actions.InfoAddedAction(task.data))
  } catch (e) {
      yield put(
        console.log('err', e)
      )
  }
}

// function* editCargo({ id, data }) {
//   try {
//       const task = yield call(async () => {
//         return await axios.put(`http://localhost:8000/cargoes/${id}`, data)
//       })
//       yield put(actions.taskEditedAction(task))
//   } catch (e) {
//       yield put(
//         console.log('err', e)
//       )
//   }
// }

function* deleteInfo({ id }) {
  try {
      yield call(async () => {
        return await axios.delete(`http://localhost:8000/info/${id}`)
      })
      yield put(actions.InfoDeletedAction(id))
      // yield put(actions.loadTasksAction())
  } catch (e) {
      yield put(
        console.log('err', e)
      )
  }
}

function* watchAddTask() {
  yield takeEvery(types.ADD_INFO, addInfo)
}

function* watchDeleteTask() {
  yield takeEvery(types.DELETE_INFO, deleteInfo)
}


function* InfoSaga() {
  yield all([
    takeLatest("GET_ALL_INFO", getAllInfo),
    watchAddTask(),
    watchDeleteTask()
  ])
}

export default InfoSaga;