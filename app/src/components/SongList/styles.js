import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  song: {
    flexShrink: 1,
    padding: '3px 0px',
    display: 'flex',
    fontSize: 12,
  },
  songBlock: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 5,
    justifyContent: 'space-between',
    '& *': {
      flex: '0 1 1',
      minWidth: 0,
    },
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
    }
  },
  albumCover: {
    marginRight: 5,
    height: 45,
    width: 45,
    flexShrink: 0,
  },
  trackInfo: {
    flexShrink: 1,
    minWidth: 40,
    '& *': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  },
  trackTitle: {
    fontWeight: 600,
  },
  trackAlbum: {
    fontStyle: 'italic'
  },
  trackArtists: {
    fontStyle: 'italic'
  },
})