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
  outerAlbumHeader: {
    background: grey[800],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 150,
    marginBottom: 50,
  },
  innerAlbumHeader: {
    position: 'absolute',
    bottom: '-40px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  albumArt: {
    borderRadius: 15,
    maxWidth: 150, 
    border: `10px solid ${grey[800]}`
  },
  albumInfo: {
    '& *': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    maxWidth: '25vw',
    marginLeft: 5,
    marginBottom: 40,
  }, 
  albumTitle: {
    fontSize: 25,
    fontWeight: 600,
  },
  albumArtists: {
    fontSize: 20,
    fontWeight: 400,
    fontStyle: 'italic'
  },
  search: {
    background: grey[700],
    position: 'sticky',
    top: 0,
    padding: '5px 5px 0px 5px'
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