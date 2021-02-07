# versed-2.0

### About
This is a game designed to be played in a web browser on a computer (not super mobile friendly just yet). At its simplest level, it asks the user to recite lyrics from memory, but the way I like to play is to compile playlists of songs and shuffle them. This way, the game becomes less focussed on getting the lyrics all right, and more on guessing the song at all. It's based on a trend on [Sporcle](http://sporcle.com) where users create lyrics quizzes without providing a song title - instead, they'll usually tell you an artist, album, or franchise.

### Local Development
#### In the `server` directory:
* You will need an environment file (.env) with the values `CLIENT_ID` and `CLIENT_SECRET` set to the values from your Spotify developer account. You can set one up [here](https://developer.spotify.com/) if you don't have one already.
* You will need a valid SSL key and certificate `ssl.key` and `ssl.crt`. You can a generate self-signed certificate by running `openssl req -nodes -new -x509 -keyout ssl.key -out ssl.crt` in this directory, but you may need to change settings in your browser for it to allow you to use untrusted certificates on localhost.
* Run the following commands to install relevant packages and start the server. The server will run on port 8080 by default.
  * `npm install`
  * `npm start`

#### In the `app` directory
* Run the following commands to install relevant packages and start the client. The client will run on port 3000 by default.
  * `npm install`
  * `npm start`

### Production Build
* A build of this repository is hosted at [https://jackbox-demo.amrictor.com/](https://jackbox-demo.amrictor.com/). The client is hosted here on Github Pages and the server is hosted on a linux machine in my living room (exposed at [https://server.amrictor.com/](https://server.amrictor.com/)).

### Some notes about developing this project
* This is a rewrite and redesign of a previous project, which you can find hosted [here](https://jackbox-demo.amrictor.com/) or look at the code [here](https://github.com/amrictor/versed).
  * Much of the game logic code is borrowed from that project (predominantly what can be found in the `Song` component). 
* Similarly, a lot of the server code is just an upgrade from a proof-of-concept spotify api server I wrote a couple of months back. 
* The structure of the client code is a product of a makeshift boilerplate I've used in a couple of projects, mostly made up of the things I like about [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) with the considerable bloat stripped away.
  * The bulk of the borrowed code and design is from their redux-saga infrastructure, particularly with regard to how they handle code splitting. Beyond any optimization reason, I like the design pattern of keeping reducers and sagas topical and having multiple stores that can be used elsewhere as needed. 
    * This code can mostly be found in `app/src/utils/redux`
* Most of what I worked longest on during this time (probably in the area of 10-12 hours after I misestimated the time I needed for deployment and subsequent bug-squashing) can be found in the `containers` and `components` directories under `app/src`
