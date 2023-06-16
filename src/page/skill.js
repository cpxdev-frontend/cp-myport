import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import en from '../lang/en/skill.json';
import th from '../lang/th/skill.json';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import Grow from '@mui/material/Grow';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "react-sweet-progress/lib/style.css";

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
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
            <hr className={dark ? 'border-light' : ''} />
            <Grid container spacing={3}>
                {Lang.list.map((item, i) => (
                    <Grid item xs={12} sm={6} key={i + 1}>
                        <Paper>
                            <Card>
                                <CardContent sx={{backgroundColor: dark ? '#011345' : ''}}>
                                  <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
                                    <Typography className={dark ? 'text-light' : ''} variant="h6">
                                      {item.title} - {item.group}
                                    </Typography>
                                  </Grow>
                                    <hr className={dark ? 'border-light' : ''} />
                                  <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1100 : 0}>
                                    <Typography variant="body2">
                                        {item.learnrate.map((star, i2) => {
                                            if (star === 2) {
                                                return (<StarIcon className={dark ? 'text-light' : ''} color="gold" fontSize="small" key={'key' + i2} />)
                                            } else if (star === 1) {
                                                return (<StarHalfIcon className={dark ? 'text-light' : ''} fontSize="small" key={'key' + i2} />)
                                            } else {
                                                return (<StarOutlineIcon className={dark ? 'text-dark-secondary' : 'text-secondary'} fontSize="small" key={'key' + i2} />)
                                            }
                                        })}
                                    </Typography>
                                  </Grow>
                                    <br />
                                  <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1300 : 0}>
                                    <Typography className={dark ? 'text-light' : ''} variant="body1" component="p">
                                        {item.desc}
                                    <br />
                                    </Typography>
                                  </Grow>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
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