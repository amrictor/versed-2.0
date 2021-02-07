import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    height: 'calc(100% - 75px)',
    display: 'flex'
  },
  sidebarOpen: {},
  content: {
    overflow: 'auto',
    width: 'calc(100% - 50px) !important',
    '&$sidebarOpen': {
      width: 'calc(100% - 300px)',
    }
  },
  placeholder: {
    height: '100%',
    width: 50,
    background: grey[800],
  }
}));

export default useStyles;