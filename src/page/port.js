import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import en from '../lang/en/port.json';
import th from '../lang/th/port.json';

import Child from '../component/portChild'
import Slide from '@mui/material/Slide';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';


// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     loader: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }));

const Skill = ({setPage, dark, CurrentLang}) => {
  React.useEffect(() => {
    setPage(CurrentLang == 'th' ? th.title : en.title)
  }, [])
    const [Lang, setLang] = useState(th);

    React.useEffect(() => {
      if (CurrentLang === 'th') {
        setLang(th);
      } else {
        setLang(en);
      }
    }, [CurrentLang]);

    //const classes = useStyles();
    return (
        <div className='pl-3 pr-3'>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography variant="h5" className={dark ? 'text-light' : ''}>{Lang.title}</Typography>
          </Slide>
            <hr className={dark ? 'border-light' : ''}/>
            <Grid container spacing={3}>
                {Lang.list.map((item, i) => (
                    <Child key={i + 1} item={item} i={i} Lang={Lang} dark={dark} />
                ))}
            </Grid>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Skill);