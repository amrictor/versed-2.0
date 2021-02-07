import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 300,
  },
  placeholder: {
    position: 'absolute',
    top:0,
    // height: '100%',
    width: 50,
    background: grey[800],
  },
  playlistsList: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'auto',
    fontSize: 12
  },
  header: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: '10px 0px',
  },
  playlist: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '5px 10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
    }
  },
  pagination: {
    flexShrink: 0
  }
});

export default useStyles;