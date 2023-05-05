import React, {useState} from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid, Slide, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grow from '@mui/material/Grow';
import getAge from 'get-age'

import en from '../lang/en/profile.json';
import th from '../lang/th/profile.json';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         textAlign: 'center',
//         display: 'block'
//       },
//     large: {
//       width: theme.spacing(30),
//       height: theme.spacing(30),
//     }
//   }));
const Profile = ({setPage, dark}) => {
  React.useEffect(() => {
    setPage(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
    const [Lang, setLang] = useState(th);
    //const classes = useStyles();

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
    });

  return ( 
    <div className='pl-3 pr-3'>
    <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
    <Grid item xs={12}>
        <Typography gutterBottom variant="h5" component="h2" className={dark ? 'text-light' : ''}>
        {Lang.title}
        </Typography>
    </Grid>
    </Slide>
    <hr className={dark ? 'border-light' : ''} />
    <Card>
    <CardActionArea>
      <CardContent sx={{backgroundColor: dark ? '#011345' : ''}}>
        <Grid container spacing={3}>
        <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 500 : 0}>
            <Grid item sm md={3} className='d-flex justify-content-center align-items-center'>
                <Avatar sx={{width: '100%', height: '100%'}} alt="" src="https://ik.imagekit.io/cpxstorage/myport/prof" />
            </Grid>
        </Slide>
           {window.innerWidth > 600 ? (
             <Slide direction="left" in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
             <Grid item sm md={9}>
               <div className='row'>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[0].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[0].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                  <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[1].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{getAge(Lang.desc[1].desc)}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[2].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{new Date(Lang.desc[2].desc).toDateString() + (localStorage.getItem('langconfig') === 'th' ? ' (' + (new Date(Lang.desc[2].desc).getFullYear() + 543) + ')' : '')}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[3].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[3].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[4].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[4].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[5].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[5].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[6].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[6].desc}</p>} />
               </ListItem>
               </div>
             </Grid>
         </Slide>
           ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
           <Grid item sm md={9}>
               <div className='row ml-1'>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[0].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[0].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                  <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[1].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{getAge(Lang.desc[1].desc)}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[2].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{new Date(Lang.desc[2].desc).toDateString() + (localStorage.getItem('langconfig') === 'th' ? ' (' + (new Date(Lang.desc[2].desc).getFullYear() + 543) + ')' : '')}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[3].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[3].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[4].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[4].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[5].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[5].desc}</p>} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText className={dark ? 'text-light' : ''} primary={Lang.desc[6].title} secondary={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.desc[6].desc}</p>} />
               </ListItem>
               </div>
             </Grid>
        </Grow>
           )}
        </Grid>
        <br />
      </CardContent>
    </CardActionArea>
  </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
