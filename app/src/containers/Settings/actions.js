export const authorizeSpotify = () => ({ type: 'AUTHORIZE_SPOTIFY' });
export const getSpotifyToken = (code) => ({ type: 'GET_SPOTIFY_TOKEN', code });