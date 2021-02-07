const express = require('express');
const app = express();

const spotify = require('./spotify');

app.get('/authorize' , (req, res) => {
  spotify.authorize().then((result) => { res.status(200).json(result)});
});

app.post('/refresh-access-token' , (req, res) => {
  spotify.refreshAccessToken(req.body.refreshToken).then((result) => res.status(200).json(result));
});

app.post('/get-access-token' , (req, res) => {
  spotify.getAccessToken(req.body.code).then((result) => { res.status(200).json(result)});
});

app.post('/search' , (req, res) => {
  spotify.search(req.body).then((result) => res.status(200).json(result));
});

app.post('/album' , (req, res) => {
  spotify.getAlbumTracks(req.body).then((result) => res.status(200).json(result));
});

app.post('/song' , (req, res) => {
  spotify.getSong(req.body).then((result) => res.status(200).json(result));
});

app.post('/artist' , (req, res) => {
  spotify.getArtist(req.body).then((result) => res.status(200).json(result));
});

app.post('/playlists' , (req, res) => {
  spotify.getPlaylists(req.body).then((result) => res.status(200).json(result));
});

app.post('/playlist' , (req, res) => {
  spotify.getPlaylist(req.body).catch(err => console.log(err)).then((result) => res.status(200).json(result));
});

module.exports = app;