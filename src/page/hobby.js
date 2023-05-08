import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogTitle from '@mui/material/DialogTitle';
import en from '../lang/en/hob.json';
import th from '../lang/th/hob.json';
import Iframe from 'react-iframe'
import { Button, Dialog, DialogContent, DialogActions, LinearProgress, CardActionArea } from '@mui/material';
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

const Hob = ({setPage, endpoint, dark, CurrentLang}) => {
  React.useEffect(() => {
    setPage(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
    const [thumbart, setArtThumb] = React.useState([]);
    const [Lang, setLang] = useState(CurrentLang == 'th' ? th : en);
    const [isOpen, setOpen] = React.useState(false);
     const [songPreview, setPreview] = React.useState(false);
     const [peekArt, setArt] = React.useState(false);
    const [music, setMusic] = React.useState([]);
    const [arr, setArr] = useState( {
      title: "",
      src: "",
      vdo: "",
      desc: ""
    })
    const [sam, setSample] = React.useState(null);
      const [expanded, setExpanded] = React.useState('panel1');

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') == 'th') {
          setLang(th);
          moment.locale('th')
        } else {
          setLang(en);
          moment.locale('en')
        }
      }
    };
    //const classes = useStyles();
    React.useEffect(() => {
      syncpage();
    });


    React.useEffect(() => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
            axios({
              method: 'post',
              url: endpoint.web + '/myport/spotsync?pid=' + th.playlist,
            }).then(function (response) {
              setMusic(response.data.res.items)
              let obj = []
              for (let i = 0 ; i< response.data.res.items.length ; i++){
                obj.push({id: response.data.res.items[i].track.id, url : ""})
              }
              setArtThumb(obj)
          })
          .catch(function () {
              // handle error
          });
        } else {
            axios({
              method: 'post',
              url: endpoint.web + '/myportsite/spotsync?pid=' + en.playlist,
            }).then(function (response) {
              setMusic(response.data.res.items)
              let obj = []
              for (let i = 0 ; i< response.data.res.items.length ; i++){
                  obj.push({id: response.data.res.items[i].track.id, url : ""})
              }
              setArtThumb(obj)
          })
          .catch(function () {
              // handle error
          });
        }
      }

    return () => {
      setMusic([])
    }
    }, [])

   

    React.useEffect(() => {
      if (endpoint.web !== '' && Lang != null) {
        setMusic([])
        axios({
          method: 'post',
          url: endpoint.web + '/myport/spotsync?pid=' + Lang.playlist,
        }).then(function (response) {
          setMusic(response.data.res.items)
          const obj = []
          for (let i = 0 ; i< response.data.res.items.length ; i++){
            obj.push({id: response.data.res.items[i].track.id, url : ""})
          }
          setArtThumb(obj)
      })
      .catch(function () {
          // handle error
      });
    }
    }, [Lang])

    const ConvertDate = (lang, date) => {
      if (lang == 'th') {
        return moment(date, 'YYYY-MM-DD').format('DD MMMM') + ' ' + (new Date(sam.track.album.release_date).getFullYear() + 543)
      } else {
        return moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    }

    const setPeek = (ind, artid) => {
      if (thumbart[ind].url == "") {
      //   axios({
      //     method: 'post',
      //     url: endpoint.web + '/myport/spotart?pid=' + artid,
      //   }).then(function (response) {
      //     let temp = thumbart
      //     temp[ind].url = response.data.res.images[0].url
      //    setArtThumb(temp)
      // })
      // .catch(function () {
      //     // handle error
      // });
      }
    }

    const Preview = (id, url) => {
      setSample(music.filter(x => x.track.id == id)[0])
      setPeek(thumbart.findIndex(x => x.id == id), music.filter(x => x.track.id == id)[0].track.artists[0].id)
     setPreview(true);
    }

      return (
        <div className='pl-3 pr-3'>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography gutterBottom variant="h5" component="h2" className={dark ? 'text-light' : ''}>
              {Lang.title}
            </Typography>
          </Slide>
            <hr className={dark ? 'border-light' : ''} />
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{backgroundColor: dark ? '#011345' : ''}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={dark ? 'text-light' : ''} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
              <Typography variant="h6" className={dark ? 'text-light' : ''}>{Lang.title1}</Typography>
            </Grow>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" className={dark ? 'text-dark-secondary' : ''}>
                {Lang.hoblist}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{backgroundColor: dark ? '#011345' : ''}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={dark ? 'text-light' : ''} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
              <Typography variant="h6" className={dark ? 'text-light' : ''}>{Lang.title2}</Typography>
            </Grow>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {Lang.favlist.map((fav, i) => i !== Lang.favlist.length - 1 ? (
                  <g key={i} className={"remove-ude point" + (dark ? ' text-dark-secondary' : '')} onClick={() => {
                    setArr(fav);
                    setOpen(true);
                  }}>
                    {fav.title},&nbsp;
                  </g>
                ) : (
                  <g className={"remove-ude point" + (dark ? ' text-dark-secondary' : '')} onClick={() => {
                    setArr(fav);
                    setOpen(true);
                  }}>
                    {fav.title}
                  </g>
                ))}
              </Typography> 
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{backgroundColor: dark ? '#011345' : ''}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={dark ? 'text-light' : ''} />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
              <Typography variant="h6" className={dark ? 'text-light' : ''}>{Lang.title3}</Typography>
            </Grow>
            </AccordionSummary>
            <AccordionDetails>
            <List className='row'>
              {music.length > 0 ? music.map((item, i) => (
                <ListItem className='col-md-4' key={item.track.id} button onClick={() => Preview(item.track.id, item.track.external_urls.spotify)}>
                  <ListItemAvatar>
                    <Avatar src={item.track.album.images[0].url} variant={'rounded'} style={{width: 90 , height: 90}} /> 
                  </ListItemAvatar>
                  <div className='ml-3'>
                  <ListItemText className={dark ? 'text-light' : ''} primary={item.track.name} secondary={(<p className={dark ? 'text-dark-secondary' : ''}>{(Lang.tag == 'th' ? 'ร้องโดย ' : 'Song by ') + (item.track.artists[0].name.length > 15 ? (item.track.artists[0].name).substring(0, 15) + '...' : item.track.artists[0].name)}</p>)} />
                  </div>
                </ListItem>
              )) : (
                <LinearProgress color="secondary" />
              )}
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Dialog
            TransitionComponent={Grow}
            transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
            open={isOpen}
            onClose={() => setOpen(false)}
            maxWidth="lg"
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <Fav
              arr={arr}
              setOpen={(param) => setOpen(param)}
              Lang={Lang}
              dark={dark}
            />
          </Dialog>
                    
          <Dialog
            TransitionComponent={Grow}
            transitionDuration={localStorage.getItem('graphic') === null ? 700 : 0}
            open={songPreview}
            onClose={() => {
                setPreview(false);
            }}
            maxWidth="xl"
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            {sam != null && (
                <div style={{backgroundColor: dark ? '#011345' : ''}}>
               <DialogContent>
               <div className='row'>
                <div className='col-md-5'>
                  <img src={sam.track.album.images[0].url} width='100%' data-aos='fade-in' data-aos-duration="1600" />
                </div>
                <div className='col-md-7 pt-3'>
                 <CardActionArea onClick={() => window.open(sam.track.external_urls.spotify, '_blank')}>
                        <Typography variant='h5' className={dark ? 'text-light' : ''}>
                           {Lang.musicguide.title + sam.track.name}
                         </Typography>
                </CardActionArea>
                  <CardActionArea onClick={() => window.open(sam.track.artists[0].external_urls.spotify, '_blank')}>
                         <Typography variant='subtitle1' className={'pointer' + (dark ? ' text-dark-secondary' : ' text-secondary')} onMouseEnter={() => setArt(true)} onMouseLeave={() => setArt(false)}>
                            {Lang.musicguide.art + sam.track.artists[0].name} 
                         </Typography>
                    </CardActionArea>
                 <hr className={dark ? 'border-light' : ''}/>
                 <Typography variant='body1' className={dark ? 'text-light' : ''}>
                 {Lang.musicguide.album}"{sam.track.album.name}"
                 </Typography>
                 <Typography variant='caption' className={dark ? 'text-light' : ''}>
                 {/* {Lang.musicguide.released + ConvertDate(Lang.tag,sam.track.album.release_date)}  */}
                 {Lang.musicguide.released + (Lang.tag == 'th' ?  moment(sam.track.album.release_date, 'YYYY-MM-DD').format('DD MMMM') + ' ' + (new Date(sam.track.album.release_date).getFullYear() + 543) :  moment(sam.track.album.release_date, 'YYYY-MM-DD').format('DD MMMM YYYY'))} 
                 </Typography>
                 <br />
                 <Button variant='outlined' className='mt-3 text-success' onClick={() => window.open(sam.track.external_urls.spotify,'blank').focus()}>{Lang.musicguide.spot}</Button>
                 <br />
                 <audio className='mt-5' width="100%" controls>
                    <source src={sam.track.preview_url} />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
                </div>
                 </DialogContent>
                 <hr className={dark ? 'border-light' : ''}/>
                 <DialogActions>
                    <Button onClick={() =>  setPreview(false)} sx={{color: dark ? '#44ad67' : '#648cfa'}}>
                      {Lang.ok}
                    </Button>
                  </DialogActions>
                </div>
            )}
          </Dialog>
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
export default connect(mapStateToProps, mapDispatchToProps)(Hob);
