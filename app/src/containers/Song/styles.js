import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    background: grey[700],
    color: 'white',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // margin: 'auto',
    // maxWidth: 800,
  }, 
  game: {
    maxWidth: 800,
    height: '80%',
    // margin: 'auto',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    '& *': {
      margin: '0px 2vw'
    },
    minHeight: 25
  },
  button: {
    height: 25,
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
    marginBottom: 5,
    outline: 'none',
    borderRadius: 8,
    border: '0px',
    boxShadow: '0px 0px red',
    transition: 'box-shadow .2s',
    '&:focus': {
      border: '0px solid black',
      boxShadow: `3px 3px ${grey[900]}`
    },
  },
  lyrics: {
    overflowY: 'auto',
    paddingRight: '1vw',
    display: 'flex',
    flexWrap: 'wrap',
  },
  word: {
    margin: '3px 2px',
    padding: '0px 3px',
    fontSize: '2vh',
    backgroundColor: '#cacaca',
    borderRadius: 3,
    userSelect: 'none',
    color: 'black'
  },
  forfeit:  {
    color: 'red'
  },
  undiscovered: {
    color: 'transparent'
  },
  pauseOverlay: {
    position: 'absolute',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 35,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)'
  }



  
});

export default useStyles;