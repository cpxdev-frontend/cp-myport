import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel'
import { Grid, Typography, CardContent, Card, CardActionArea, Slide, Grow, Backdrop } from '@mui/material';
import Covid from '../component/covidcom';
import en from '../lang/en/home.json';
import th from '../lang/th/home.json';
import BillCom from '../component/billboard';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//     loader: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       backgroundColor: '#fff'
//     },
//   }));

const Home = ({setPage}) => {
  React.useEffect(() => {
    setPage(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? 'หน้าหลัก' : 'Homepage')
  }, [])

    //const classes = useStyles();
    const [Lang, setLang] = useState(th);
    
    const [Ready, setReady] = useState(false);
    
    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
          setLang(th);
        } else {
          setLang(en);
        }
      }
    };

    React.useEffect(() => {
      syncpage();
      setReady(true)
    });
    return ( 
    <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
    <div className='container'>
     {
             Lang.slide.map((item, i) => (
                <BillCom key={i} item={item} i={i} />
             ))
         }
    </div>
    </Grow>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);