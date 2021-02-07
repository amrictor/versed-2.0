export const setTheme = (theme) => ({ type: 'SET_THEME', theme });
export const setPlayOnLoad = (playOnLoad) => ({ type: 'SET_PLAY_ON_LOAD', playOnLoad });
export const setSeed = (seed) => ({ type: 'SET_SEED', seed });
export const setSpotifyToken = (token) => ({ type: 'SET_SPOTIFY_TOKEN', token });
export const refreshSpotifyToken = () => ({ type: 'REFRESH_SPOTIFY_TOKEN' })