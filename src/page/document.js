import React, { useState } from 'react';
//import { makeStyles } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogTitle from '@mui/material/DialogTitle';
import en from '../lang/en/doc.json';
import th from '../lang/th/doc.json';
import Iframe from 'react-iframe'
import { Button, Card, DialogContent, DialogActions, CardActions, CardActionArea, CardHeader, CardContent, CardMedia } from '@mui/material';
import Fav from '../component/fav'
import axios from 'axios';
// import Fet from '../fetch'
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Swal from 'sweetalert2'
import { data } from 'jquery';

import { connect } from 'react-redux';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';

let pm = new Audio();
let time;
// const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//     },
//     cardroot: {
//       width: '100%',
//       display: 'flex',
//     },
//     loader: {
//       paddingTop: theme.spacing(2),
//       textAlign: 'center',
//       alignContent: 'center',
//       justifyContent: "center"
//     },
//     details: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     content: {
//       marginTop: 20,
//       flex: '1 0',
//     },
//     cover: {
//       width: 151,
//     }, 
//     imgstar: {
//       textAlign: 'center',
//     },
//     controls: {
//       display: 'flex',
//       alignItems: 'center',
//       paddingLeft: theme.spacing(1),
//       paddingBottom: theme.spacing(1),
//     },
//     playIcon: {
//       height: 38,
//       width: 38,
//     },
//     headingst: {
//         fontSize: theme.typography.pxToRem(17),
//         fontWeight: theme.typography.fontWeightRegular,
//       }
//   }));
const Doc = ({setPage, endpoint, dark, CurrentLang}) => {
  React.useEffect(() => {
    setPage(CurrentLang == 'th' ? th.title : en.title)
  }, [])
    const [Lang, setLang] = useState(th);
    const [arr, setArr] = React.useState(null);
    
   
    //const classes = useStyles();
    React.useEffect(() => {
      if (CurrentLang === 'th') {
        setLang(th);
      } else {
        setLang(en);
      }
    }, [CurrentLang]);


    React.useEffect(() => {
      axios({
        method: 'post',
        url: endpoint.web + '/myport/getmyportrefdoc',
      }).then(function (response) {
        if (response.data.length == 0) {
          setArr([])
        } else {
          setArr(response.data.items)
        }
    })
    .catch(function () {
       setArr([])
    });
    
    return () => {
      setArr([])
    }
    }, [])

  
    if (arr == null) {
      return (
        <div style={{top: '45%', left: window.innerWidth > 900 ? '50%' : '45%', position: 'absolute'}}>
        <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
      </div>
      )
    }

    if (arr.length == 0) {
      return (
        <div style={{top: '45%', left: window.innerWidth > 900 ? '50%' : '45%', position: 'absolute'}}>
        <h5>{Lang.nofile}</h5>
      </div>
      )
    }


    return (
        <div className='pl-3 pr-3'>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <div>
            <CardHeader title={(<Typography variant="h5" className={dark ? 'text-light' : ''}>{Lang.title}</Typography>)} subheader={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.provider}</p>} />
            </div>
          </Slide>
          <hr className={dark ? 'border-light' : ''} />
          <br/>
            <div className='row'>
             {arr.length > 0 && arr.map((item, i) => (
              <Card className='col-md-6 mb-2' key={item.id} sx={{backgroundColor: dark ? '#011345' : ''}}>
              <CardHeader className='d-block mt-3' title={(<h5 style={{wordWrap: 'break-word'}} className={dark ? 'text-light' : ''}>{item.title}</h5>)} subheader={<p className={dark ? 'text-dark-secondary' : ''}>{Lang.objupt + moment.utc(item.modifiedDate).local().format('DD MMMM YYYY HH:mm')}</p>}/>
                <CardActionArea>
                  <CardContent className='col-md-12'>
                    <div className='row'>
                  <div className='col-md-6 text-center'>
                    <img src={item.thumbnailLink.replace('s220','s600')} width={(item.imageMediaMetadata != undefined && item.imageMediaMetadata.width > item.imageMediaMetadata.height) || item.imageMediaMetadata == undefined ? '100%' : null} height={item.imageMediaMetadata != undefined && item.imageMediaMetadata.width < item.imageMediaMetadata.height ? 300 : null} />
                    </div>
                    <div className='col-md ml-3'>
                    <Typography className={dark ? 'text-dark-secondary' : 'text-muted'} variant="body1">{Lang.objsize + (parseInt(item.fileSize) > 1048576 ? (parseInt(item.fileSize) / 1048576).toFixed(2)  + " MB" : (parseInt(item.fileSize) / 1000).toFixed(2) + ' KB')}</Typography>
                      <Typography className={dark ? 'text-dark-secondary' : 'text-muted'} variant="body1">{Lang.objtype + item.mimeType}</Typography>
                    </div>
                    </div> 
                    <hr />
                    <CardActions>
                      <Button size="small" sx={{color: dark ? '#fff' : '#000'}} onClick={() => window.open(item.alternateLink, '_blank')}>
                        View
                      </Button>
                      <Button size="small" sx={{color: dark ? '#44ad67' : '#648cfa'}} onClick={() => window.open(item.webContentLink, '_blank')}>
                        Download
                      </Button>
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </div>
        </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(Doc);
