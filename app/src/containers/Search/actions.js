export const searchTracks = (query, offset) => ({ type: 'SEARCH_TRACKS', query, offset });
export const searchTracksSuccess = (tracks, offset, total) => ({ type: 'SEARCH_TRACKS_SUCCESS', tracks, offset, total });
export const searchTracksFailure = () =>({ type: 'SEARCH_TRACKS_FAILURE' });