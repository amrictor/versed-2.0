const SpotifyWebApi = require('spotify-web-api-node');
const fetch = require('node-fetch');
const { formatSongTitle } = require('./utils');

const connectionData = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}
const redirectUri = 'https://localhost:3000/settings';
const scopes = ['user-top-read', 'user-library-modify', 'playlist-read-private', 'playlist-modify-public', 'playlist-modify-private', 'playlist-read-collaborative'];

const publicSpotifyApi = new SpotifyWebApi({ ...connectionData, redirectUri });
const getNewClientToken = () => {
  publicSpotifyApi.clientCredentialsGrant().then( (response) => {
    publicSpotifyApi.setAccessToken(response.body.access_token);
  });
}
getNewClientToken();

tokenRefreshInterval = setInterval(getNewClientToken, 1000 * 60 * 60);

module.exports = {
  authorize: async () => {
    try {
      const authorizeURL = await publicSpotifyApi.createAuthorizeURL(scopes, null, true);
      return authorizeURL;
    } catch(err) {
      console.error(`An error occured in 'authorize': \n${err}\n`);
    }
  },
  getAccessToken: async (code) => {
    try {
      const response = await publicSpotifyApi.authorizationCodeGrant(code);
      return {
        accessToken: response.body.access_token,
        refreshToken: response.body.refresh_token
      };
    } catch(err) {
      console.error(`An error occured in 'getAccessToken': \n${err}\n`);
    }
  },
  refreshAccessToken: async (refreshToken) => {
    try {
      const spotifyApi = new SpotifyWebApi(connectionData);
      spotifyApi.setRefreshToken(refreshToken);
      const response = await spotifyApi.refreshAccessToken();
      return response.body.access_token;
    } catch(err) {
      console.error(`An error occured in 'refreshAccessToken': \n${err}\n`);
    }
    
  },
  search: async (options) => {
    try {
      const { query, offset, limit } = options;
      const result = await publicSpotifyApi.searchTracks(query, { offset, limit });
      return {
        items: result.body.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => ({
            id: artist.id,
            name: artist.name
          })),
          album: {
            id: track.album.id,
            name: track.album.name,
            artists: track.album.artists.map((artist) => ({
              id: artist.id,
              name: artist.name
            })),
            images: track.album.images,
          }
        })),
        offset: result.body.tracks.offset,
        total: result.body.tracks.total
      };
    } catch(err) {
      console.error(`An error occured in 'search': \n${err}\n`);
    }
  },

  getAlbumTracks: async (options) => {
    try {
      const { id, offset, limit } = options;
      const album = await publicSpotifyApi.getAlbum(id, { limit, offset });
      const result = await publicSpotifyApi.getAlbumTracks(id, { limit, offset });
      return {
        items: result.body.items.map((track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => ({
            id: artist.id,
            name: artist.name
          })),
          album: {
            id: album.body.id,
            name: album.body.name,
            artists: album.body.artists.map((artist) => ({
              id: artist.id,
              name: artist.name
            })),
            images: album.body.images,
          }
        })),
        offset: result.body.offset,
        total: result.body.total
      };
    } catch(err) {
      console.error(`An error occured in 'getAlbumTracks': \n${err}\n`);
    }
  },
  getArtist: async (options) => {
    try {
      const { id, offset } = options;
      const result = await publicSpotifyApi.getArtist(id);
      const albums_result = await publicSpotifyApi.getArtistAlbums(id);
      return {
        id: result.body.id,
        name: result.body.name,
        numAlbums: albums_result.body.total,
        albums: albums_result.body.items.map(album => ({
          id: album.id,
          name: album.name,
          artists: album.artists.map((artist) => ({
            id: artist.id,
            name: artist.name
          })),
          images: album.images,
        }))
      };
    } catch(err) {
      console.error(`An error occured in 'getArtist': \n${err}\n`);
    }
  },
  getSong: async (options) => {
    try {
      const { id } = options;
      const result = await publicSpotifyApi.getTrack(id);
      const genius = await fetch(`https://api.genius.com/search?per_page=35&q=${encodeURI(`${formatSongTitle(result.body.name)} ${result.body.artists[0].name}`)}&access_token=4qtBMiQeR5pD1zFm-vGmFV6j5khGAiRQskTCLXyuGbxeYGbnXrTnXIyA5n2iXjdg`, { method: 'get' });
      const json = await genius.json();
      return {
        id: result.body.id,
        genius: json.response.hits.length > 0 
          ? json.response.hits[0].result.id 
          : null,
        name: result.body.name,
        artists: result.body.artists.map((artist) => ({
          id: artist.id,
          name: artist.name
        })),
        album: {
          id: result.body.album.id,
          name: result.body.album.name,
          artists: result.body.album.artists.map((artist) => ({
            id: artist.id,
            name: artist.name
          })),
          images: result.body.album.images,
        }
      };
    } catch(err) {
      console.error(`An error occured in 'getSong': \n${err}\n`);
    }
  },
  getPlaylists: async (options) => {
    try {
      const { accessToken, offset, limit } = options;
      const spotifyApi = new SpotifyWebApi(connectionData);
      spotifyApi.setAccessToken(accessToken);
      const result = await spotifyApi.getUserPlaylists({ limit, offset });
      return {
        items: result.body.items.map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          images: playlist.images,
          numTracks: playlist.tracks.total,
        })),
        offset: result.body.offset,
        total: result.body.total
      };
    } catch(err) {
      console.error(`An error occured in 'getPlaylists': \n${err}\n`);
    }
  },
  getPlaylist: async (options) => {
    try {
      const { accessToken, id, offset, limit } = options;
      const spotifyApi = new SpotifyWebApi(connectionData);
      spotifyApi.setAccessToken(accessToken);
      const result = await spotifyApi.getPlaylistTracks(id, { limit, offset });
      return {
        items: result.body.items.map((playlistTrack) => ({
          id: playlistTrack.track.id,
          name: playlistTrack.track.name,
          artists: playlistTrack.track.artists.map((artist) => ({
            id: artist.id,
            name: artist.name
          })),
          album: {
            id: playlistTrack.track.album.id,
            name: playlistTrack.track.album.name,
            artists: playlistTrack.track.album.artists.map((artist) => ({
              id: artist.id,
              name: artist.name
            })),
            images: playlistTrack.track.album.images,
          }
        })),
        offset: result.body.offset,
        total: result.body.total
      };
    } catch(err) {
      console.error(`An error occured in 'getPlaylist': \n${err}\n`);
    }
  },
  
 
}