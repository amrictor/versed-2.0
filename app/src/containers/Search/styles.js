import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    background: grey[700],
    color: 'white',
    height: '100%',
    width: '100%',
    overflow: 'auto',
  }, 
  search: {
    background: grey[700],
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '10px 0px',
    margin: '0px 10px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid white' 
  },
  button: {
    maxWidth: 100,
    height: 30,
    padding: 5,
    cursor: 'pointer',
    outline: 'none',
    borderRadius: 5,
    border: '0px',
    backgroundColor: grey[900],
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 600,
    transition: '.2s',
    '&:hover': {
      backgroundColor: 'white',
      color: grey[900]
    },
  },
  input: {
    height: 30,
    padding: 3,
    flexGrow: 1,
    outline: 'none',
    borderRadius: 8,
    border: '0px',
    boxShadow: '0px 0px red',
    transition: 'box-shadow .2s',
    '&:focus': {
      border: '0px solid black',
      boxShadow: `3px 3px ${grey[900]}`
    },
    marginRight: 10
  },
  trackCard: {
    display: 'flex',
    padding: 10,
    margin: 5,
    outline: '1px solid black'
  },
  albumCover: {
    marginRight: 10
  },
  trackTitle: {
    fontWeight: 600,
  },
  trackAlbum: {
    fontStyle: 'italics'
  },
  trackArtists: {
    fontStyle: 'italics'
  },
  noResults: {
    textAlign: 'center',
    padding: '40px 5px'
  }
});

export default useStyles;