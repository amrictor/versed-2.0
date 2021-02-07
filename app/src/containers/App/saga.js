import { setSpotifyToken } from "containers/App/actions";
import makeSelectApp from 'containers/App/selectors';
import { put, takeLatest, all, select } from 'redux-saga/effects';
import { request, getRequestOptions } from "../../utils/request";

export function* makeRefreshSpotifyTokenRequest() {
  try {
    const { spotifyToken } = yield select(makeSelectApp());
    if(!spotifyToken) return;
    const payload = {
      refreshToken: spotifyToken.refresh
    }
    const result = yield request(`/api/public/refresh-access-token`, getRequestOptions('post', payload));
    yield put(setSpotifyToken({ access: result, refresh : spotifyToken.refresh }))
  } catch(err) {
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('REFRESH_SPOTIFY_TOKEN', makeRefreshSpotifyTokenRequest),
  ]);
}