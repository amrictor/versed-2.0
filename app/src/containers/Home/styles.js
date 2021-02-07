import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    background: grey[700],
    color: 'white',
    height: '100%',
    width: '100%',
    padding: 10
  }, 
  header: {
    fontSize: 22,
    fontWeight: 500,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1px solid white'
  }
});

export default useStyles;