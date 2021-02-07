import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    background: grey[900],
    color: 'white',
    height: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    margin: 5,
  }
}));

export default useStyles;