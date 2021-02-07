import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    flexShrink: 0
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
});

export default useStyles;