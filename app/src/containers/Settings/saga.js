import { setSpotifyToken } from "containers/App/actions";
import { put, takeLatest, all } from 'redux-saga/effects';
import { request, getRequestOptions } from "utils/request";
import { getSpotifyPlaylists } from 'containers/ControlPanel/actions'

export function* makeAuthorizeSpotifyRequest() {
  try {
    const result =  yield request(`/api/public/authorize`, getRequestOptions('get'));
    window.location.href = result;
    put(getSpotifyPlaylists())
  } catch(err) {
    alert("Unable to authenticate with spotify")
  }
}

export function* makeGetSpotifyTokenRequest(action) {
  try {
    const payload =  {
      code: action.code
    }
    const result = yield request(`/api/public/get-access-token`, getRequestOptions('post', payload));
    yield put(setSpotifyToken({ access: result.accessToken, refresh : result.refreshToken }))
  } catch(err) {
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('AUTHORIZE_SPOTIFY', makeAuthorizeSpotifyRequest),
    takeLatest('GET_SPOTIFY_TOKEN', makeGetSpotifyTokenRequest),
  ]);
}