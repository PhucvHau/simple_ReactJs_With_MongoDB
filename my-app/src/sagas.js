import { takeLatest,takeEvery, call, put,all } from "redux-saga/effects";
import axios from "axios";
import {config} from "../src/config/config";

 // watcher saga: watches for actions dispatched to the store, starts worker saga
function* getAllUserSaga() {
   yield takeLatest("API_CALL_REQUEST", getAllUserWatcher);
 }
function* getUserSaga(){
  yield takeEvery("GET_USER", userActionWatcher);
} 

 // function that makes the api request and returns a Promise for response
 function fetchUsers() {
   return axios({
     method: "GET",
     url: config.mongo.hostlocal
   });
 }

 function getUser(idCode){
  console.log(idCode)
  return axios({
    method: "GET",
    url: `${config.mongo.hostlocal}/${idCode}`
  });
 }

 // worker saga: makes the api call when watcher saga sees the action
 function* getAllUserWatcher() {
   try {
     const response = yield call(fetchUsers);
     const data = response.data.content;
     yield put({ type: "API_CALL_SUCCESS", data });

   } catch (error) {
     // dispatch a failure action to the store with the error
     yield put({ type: "API_CALL_FAILURE", error });
   }
 }
 // worker saga: makes the api call when watcher saga sees the action
 function* userActionWatcher(action) {
  try { 
    const response = yield call(getUser, action.idCode);
    const data = response.data.content;
    yield put({ type: "API_CALL_REQUEST_USER", data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

export default function* rootSaga() {
  yield all([
    getAllUserSaga(),
    getUserSaga()
  ]);
}