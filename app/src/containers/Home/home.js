import React from 'react';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <div className={classes.header}>Welcome to Versed</div>
      <div>Versed is a lyric quiz platform developed independently using the Spotify and Genius APIs.</div>
      <br/>
      <div>Visit the settings page to integrate with your personal Spotify account.</div>
    </div>
  );
}

export default Home;
