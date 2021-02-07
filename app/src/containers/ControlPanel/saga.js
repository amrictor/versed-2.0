import cheerio from 'cheerio';
import { takeLatest, all, select, put } from 'redux-saga/effects';

import makeSelectApp from "containers/App/selectors";
import { getRequestOptions, request } from "utils/request";

import { getGeniusSongSuccess, getSpotifyPlaylistsSuccess } from "./actions";

export function* makeGetSpotifyPlaylistsRequest(action) {
  const { spotifyToken } = yield select(makeSelectApp());
  try {
    const payload = {
      accessToken: spotifyToken.access,
      offset: action.offset
    }
    const response = yield request(`/api/public/playlists`, getRequestOptions('post', payload));
    yield put(getSpotifyPlaylistsSuccess(response.items, response.offset, response.total))
  } catch(err) {
    // yield put(searchTracksFailure())
  }
}

export function* makeGetSpotifySongRequest(action) {
  try {
    const payload = {
      id: action.id
    }
    const response = yield request(`/api/public/song`, getRequestOptions('post', payload));
    action.push(`/songs/${response.genius}`);

  } catch(err) {
    // yield put(searchTracksFailure())
  }
}

export function* makeGetGeniusSongRequest(action) {
  try {
    const token = "4qtBMiQeR5pD1zFm-vGmFV6j5khGAiRQskTCLXyuGbxeYGbnXrTnXIyA5n2iXjdg";
    const { response } = yield request(`http://api.genius.com/songs/${action.id}?access_token=${token}`, getRequestOptions('get'));
    const webpage = yield request(`https://server.amrictor.com:8888/${response.song.url}`)
    const $ = cheerio.load(webpage)
    let song = {}
    song.title = response.song.title ? response.song.title : "N/A";
    song.album = response.song.album ? response.song.album.name : "N/A";
    song.artist = response.song.primary_artist ? response.song.primary_artist.name : "N/A";
    song.url = response.song.url;
    song.lyrics = $('.lyrics').text().replace(/\[.*\]/g, "").trim().replace(/[’‘]/g, '\'').split((/[\u200B\r\n\s,?!:;().…"“”—\-–_]+/)).filter((word) => !word.match(/^[\s']+$/) && word);
    yield put(getGeniusSongSuccess(song));
  } catch(err) {
  }
}

  

export default function* rootSaga() {
  yield all([
    takeLatest('GET_SPOTIFY_PLAYLISTS', makeGetSpotifyPlaylistsRequest),
    takeLatest('GET_SPOTIFY_SONG', makeGetSpotifySongRequest),
    takeLatest('GET_GENIUS_SONG', makeGetGeniusSongRequest),
  ]);
}