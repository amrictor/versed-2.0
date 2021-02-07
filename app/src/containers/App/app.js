import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { Switch, Route } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
import clsx from 'clsx';

import { ThemeProvider } from '@material-ui/core';

import ControlPanel from 'containers/ControlPanel';
import Home from 'containers/Home';
import Search from 'containers/Search';
import Song from 'containers/Song';
import Playlist from 'containers/Playlist';
import Album from 'containers/Album';

import Sidebar from 'containers/Sidebar';
import Settings from 'containers/Settings';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import theme from 'utils/theme/dark';

import useStyles from './styles'
import reducer from './reducer';
import saga from './saga';

import { useDispatch } from 'react-redux';
import { refreshSpotifyToken } from './actions';


function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(refreshSpotifyToken())
    setInterval(() => {
      dispatch(refreshSpotifyToken())
    }, 3600*1000)
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.body}>
          <Sidebar 
            open={sidebarOpen}
            toggleOpen={() => setSidebarOpen(!sidebarOpen)}
          />
          <div className={clsx(classes.content, sidebarOpen && classes.sidebarOpen)}>
            <Switch>
              <Route
                  exact
                  path="/"
                  render={(props) => <Home {...props}/>}
              />
              <Route
                  path="/search"
                  render={(props) => <Search {...props}/>}
              />
              <Route
                  path="/settings"
                  render={(props) => <Settings {...props}/>}
              />
              <Route
                  path="/songs/:id"
                  render={(props) => {
                    return <Song {...props} />
                  }}
              />
              <Route
                  path="/playlist/:id"
                  render={(props) => {
                    return <Playlist {...props} />
                  }}
              />
              <Route
                  path="/album/:id"
                  render={(props) => {
                    return <Album {...props} />
                  }}
              />
            </Switch> 
          </div>
        </div>
        <ControlPanel/>
      </div>    
    </ThemeProvider>
  );
}

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(withReducer, withSaga)(App);