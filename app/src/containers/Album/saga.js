import { getAlbumSuccess } from "./actions";
import { put, takeLatest, all, select } from 'redux-saga/effects';
import { getRequestOptions, request } from "../../utils/request";
import makeSelectApp from "../App/selectors";

export function* makeGetAlbumRequest(action) {
  try {
    const { spotifyToken } = yield select(makeSelectApp());
    const payload = {
      accessToken: spotifyToken.access,
      id: action.id,
      query: action.query,
      offset: action.offset
    }
    const result = yield request(`/api/public/album`, getRequestOptions('post', payload));
    yield put(getAlbumSuccess(result.items, result.offset, result.total))
  } catch(err) {
    yield put(getAlbumSuccess([]))
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('GET_ALBUM', makeGetAlbumRequest),
  ]);
}