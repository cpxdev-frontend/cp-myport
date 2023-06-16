import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import { Grid, Typography, CardContent, Card, CardActionArea, Slide, Grow, Backdrop, CardHeader } from '@mui/material';
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

const Home = ({setPage, dark, CurrentLang}) => {
  React.useEffect(() => {
    setPage(CurrentLang == 'th' ? 'หน้าหลัก' : 'Homepage')
  }, [])

    //const classes = useStyles();
    const [Lang, setLang] = useState(th);
    
    const [Ready, setReady] = useState(false);
    
    React.useEffect(() => {
      if (CurrentLang === 'th') {
        setLang(th);
      } else {
        setLang(en);
      }
    }, [CurrentLang]);


    React.useEffect(() => {
      setReady(true)
    });
    return ( 
    <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
    <div>
    <div className='container'>
     {
             Lang.slide.map((item, i) => (
                <BillCom key={i} dark={dark} item={item} i={i} />
             ))
         }
    </div>
    <div className='container mt-5'>
      <CardHeader className={dark ? 'text-light' : ''} title={CurrentLang == 'th' ? 'ฟีเจอร์ใน MyPort Site' : 'Feature of MyPort Site'} />
      <hr className={dark ? 'border-light' : ''} />
      {
             Lang.newfeature.map((item, i) => (
                <Card className='mb-3' key={i} data-aos='fade-right'>
                  <CardContent sx={{backgroundColor: dark ? '#011345' : ''}}>
                    <CardHeader className={dark ? 'text-light' : ''} title={item.title} />
                    <Typography className={'ml-3' + (dark ? ' text-dark-secondary' : 'text-muted')} variant="body2">{item.desc}</Typography>
                  </CardContent>
                </Card>
             ))
         }
    </div>
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