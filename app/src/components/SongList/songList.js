import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { addSong, deleteSong } from '../../containers/CustomPlaylist/actions';
import { useDispatch } from 'react-redux';
import { getSpotifySong } from '../../containers/ControlPanel/actions';
import { useStyles } from './styles';


const ContextMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const options = [
    {
      name: "Play",
      action: () => dispatch(getSpotifySong(props.track.id, history.push))
    },
    props.customPlaylist
      ? {
        name: "Delete",
        action: () => dispatch(deleteSong(props.track))
      } 
      : {
        name: "Add to Custom Playlist",
        action: () => dispatch(addSong(props.track))
      }  ,
    {
      name: "View Album",
      action: () => history.push(`/album/${props.track.album.id}`)
    },
    // {
    //   name: "View Artist",
    //   action: () => history.push(`/artist/${props.track.artists[0].id}`)
    // },
  ]
  return (
    <div>
      <IconButton size="small" onClick={(event)=>setAnchorEl(event.currentTarget)}><MoreVert/></IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} onClick={() => { option.action(); setAnchorEl(null); }}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
    
  );
}

const SongList = (props) => {
  const {
    tracks,
    customPlaylist
  } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    tracks && tracks.map(track => 
      <div className={classes.songBlock} key={track.id} onClick={() => dispatch(getSpotifySong(track.id, history.push))}>
        <div className={classes.song}>
          <img className={classes.albumCover} src={track.album.images && track.album.images.length === 3 && track.album.images[2].url}/>
          <div className={classes.trackInfo}>
            <div className={classes.trackTitle}>
              {track.name}
            </div>
            <div className={classes.trackAlbum}>
              {track.album.name}
            </div>
            <div className={classes.trackArtists}>
              {track.artists.map(artist => artist.name).join(', ')}
            </div>
          </div>
        </div>
        <ContextMenu track={track} customPlaylist={customPlaylist}/>
      </div>
    )
  )
}

SongList.propTypes = {
  tracks: PropTypes.array.isRequired,
}

export default SongList;