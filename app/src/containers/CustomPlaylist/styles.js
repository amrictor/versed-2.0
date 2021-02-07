import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 300,
  },
  playlist: {
    flexShrink: 1,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'auto',
  },
  header: {
    flexShrink: 0,
    color: 'white',
    fontSize: 16,
    padding: '10px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& div': {
      marginRight: 10
    }
  },
  song: {
    flexShrink: 1,
    padding: '3px 0px',
    display: 'flex',
    fontSize: 12,
  },
  songBlock: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'grab',
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
  dragHandle: {
    marginRight: 5,
    alignSelf: 'center',
    flexShrink: 0
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
}));

export default useStyles;