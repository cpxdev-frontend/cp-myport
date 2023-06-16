import React from 'react';
//import { makeStyles } from '@mui/material/styles';
import {
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import Fade from '@mui/material/Fade';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';


const ErrorPage = ({setPage, CurrentLang}) => {
  React.useEffect(() => {
    setPage(CurrentLang == 'th' ? 'ไม่พบเพจ' : 'Page not found')
  }, [])

    return ( 
      <Fade in={true}>
        <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Not found this page
        </Typography>
        <Typography variant="h2" component="h2">
          Error 404
        </Typography>
        <Typography color="textSecondary">
          Please check correct URL path to continue
        </Typography>
        <Typography variant="body2" component="p">
          ไม่พบหน้าเพจที่ระบุไว้
        </Typography>
      </CardContent>
    </Card>
    </Fade>
    );
}
 
const mapStateToProps = (state) => ({
  dark: state.dark,
  CurrentLang: state.CurrentLang,
  currentPage: state.currentPage,
  endpoint: state.endpoint,
});
const mapDispatchToProps = (dispatch) => ({
  setDark: (val) => dispatch(setDarkMode(val)),
  setLang: (val) => dispatch(setLang(val)),
  setPage: (val) => dispatch(setPage(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);