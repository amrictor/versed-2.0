import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    position: 'relative',
    background: grey[800],
    height: '100%',
    width: 50,
    transition: '.3s',
    '&$sidebarOpen': {
      width: 300
    },
    overflowY: 'hidden',
  },
  toggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    zIndex: 1
  },
  navButton: {
    '& svg': {
      marginRight: 10
    },
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    textTransform: 'none !important',
    fontWeight: '500 !important',
    fontSize: '16px !important',
    borderBottom: '1px solid white',
    borderRadius: '0px !important',
    '&:last-child': {
      borderBottom: '0px !important',
    }
  },
  content: {
    padding: 10,
    paddingTop: 40,
    color: 'white',
    zIndex: 1,
    height: '100%',
    width: '100%',
    transition: '.3s',
    transform: 'translateX(-300px)',
    '&$sidebarOpen': {
      transform: 'translateX(0px) !important'
    },
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    '& > *': {
      minHeight: '100px',
      overflow: 'hidden',
    }
  },
  sidebar: {
    height: '100%'
  },
  sidebarOpen: {},
});

export default useStyles;