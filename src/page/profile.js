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
const Profile = ({setPage}) => {
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
        <Typography gutterBottom variant="h5" component="h2">
        {Lang.title}
        </Typography>
    </Grid>
    </Slide>
    <hr />
    <Card>
    <CardActionArea>
      <CardContent>
        <Grid container spacing={3}>
          {window.innerWidth > 600 ? (
            <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 500 : 0}>
            <Grid item sm md={3} className='d-flex justify-content-center align-items-center'>
                <Avatar sx={{width: '60%', height: '90%'}} alt="" src="https://ik.imagekit.io/cpxstorage/fanspaceprofile/prof" />
            </Grid>
        </Slide>
          ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1200 : 0}>
              <Grid item sm md className='d-flex justify-content-center align-items-center'>
                  <Avatar sx={{width: '100%', height: '100%'}} alt="" src="https://ik.imagekit.io/cpxstorage/fanspaceprofile/prof" />
              </Grid>
          </Grow>
          )}
           {window.innerWidth > 600 ? (
             <Slide direction="left" in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
             <Grid item sm md={9}>
               <div className='row'>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[0].title} secondary={Lang.desc[0].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                  <ListItemText primary={Lang.desc[1].title} secondary={getAge(Lang.desc[1].desc)} />
               </ListItem>
               <ListItem className='col-md-5'>
                <ListItemText primary={Lang.desc[2].title} secondary={new Date(Lang.desc[2].desc).toDateString() + (localStorage.getItem('langconfig') === 'th' ? ' (' + (new Date(Lang.desc[2].desc).getFullYear() + 543) + ')' : '')} />
               </ListItem>
               <ListItem className='col-md-5'>
                <ListItemText primary={Lang.desc[3].title} secondary={Lang.desc[3].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[4].title} secondary={Lang.desc[4].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[5].title} secondary={Lang.desc[5].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[6].title} secondary={Lang.desc[6].desc} />
               </ListItem>
               </div>
             </Grid>
         </Slide>
           ) : (
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
           <Grid item sm md={9}>
               <div className='row ml-1'>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[0].title} secondary={Lang.desc[0].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[1].title} secondary={getAge(Lang.desc[1].desc)} />
               </ListItem>
               <ListItem className='col-md-5'>
                  <ListItemText primary={Lang.desc[2].title} secondary={new Date(Lang.desc[2].desc).toDateString() + (localStorage.getItem('langconfig') === 'th' ? ' (' + (new Date(Lang.desc[2].desc).getFullYear() + 543) + ')' : '')} />
               </ListItem>
               <ListItem className='col-md-5'>
                    <ListItemText primary={Lang.desc[3].title} secondary={Lang.desc[3].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[4].title} secondary={Lang.desc[4].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[5].title} secondary={Lang.desc[5].desc} />
               </ListItem>
               <ListItem className='col-md-5'>
                 <ListItemText primary={Lang.desc[6].title} secondary={Lang.desc[6].desc} />
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
