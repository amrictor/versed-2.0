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