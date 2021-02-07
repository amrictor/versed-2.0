import { searchTracksFailure, searchTracksSuccess } from "./actions";
import { put, takeLatest, all } from 'redux-saga/effects';
import { getRequestOptions, request } from "../../utils/request";

export function* searchTracks(action) {
  try {
    const payload = {
      query: action.query,
      offset: action.offset
    }
    const result = yield request(`/api/public/search`, getRequestOptions('post', payload));
    yield put(searchTracksSuccess(result.items, result.offset, result.total))
  } catch(err) {
    yield put(searchTracksFailure())
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('SEARCH_TRACKS', searchTracks),
  ]);
}