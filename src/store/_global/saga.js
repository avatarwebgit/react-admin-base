import { put, takeEvery } from "redux-saga/effects";
import {
  CLOSE_DELETE_MODAL,
  INITIATE_DELETE_SEQUENCE,
  OPEN_DELETE_MODAL,
} from "./actionTypes";

function* openDeleteModal(action) {
}

function* handleDeleteSequence(action) {
  console.log(action)
  try {
      yield put({
        type: action.payload.actionType,
        payload: action.payload.id,
      });
 

    yield put({ type: CLOSE_DELETE_MODAL });
  } catch (error) {
    console.error("Delete failed:", error);
  }
}

function* closeDeleteModal(action) {
}

function* _globalSaga() {
  yield takeEvery(OPEN_DELETE_MODAL, openDeleteModal);
  yield takeEvery(CLOSE_DELETE_MODAL, closeDeleteModal);
  yield takeEvery(INITIATE_DELETE_SEQUENCE, handleDeleteSequence);
}

export default _globalSaga;
