export const getSpotifySong = (id, push) => ({ type:'GET_SPOTIFY_SONG', id, push });
export const setSource = (source) => ({ type: 'SET_SOURCE', source });

export const loadNextSong = () => ({ type: 'LOAD_NEXT_SONG' });
export const loadPreviousSong = () => ({ type: 'LOAD_PREV_SONG' });

export const getSpotifyPlaylists = (offset) => ({ type: 'GET_SPOTIFY_PLAYLISTS', offset});
export const getSpotifyPlaylistsSuccess = (playlists, offset, total) => ({ type: 'GET_SPOTIFY_PLAYLISTS_SUCCESS', playlists, offset, total });

export const getGeniusSong = (id) => ({ type: 'GET_GENIUS_SONG', id });
export const getGeniusSongSuccess = (song) => ({ type: 'GET_GENIUS_SONG_SUCCESS', song });

export const toggleShuffle = () => ({ type: 'TOGGLE_SHUFFLE' });

export const togglePause = () => ({ type: 'TOGGLE_PAUSE' });

export const forfeit = () => ({ type: 'FORFEIT' });

export const win = () => ({ type: 'WIN' });
