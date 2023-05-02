import React, { useState, useEffect } from 'react';
//import { makeStyles } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import en from '../lang/en/contact.json';
import th from '../lang/th/contact.json';
import Slide from '@mui/material/Slide';

import Grow from '@mui/material/Grow';
import DirectContact from '../component/contactform'

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//     },
//     headingst: {
//         fontSize: theme.typography.pxToRem(17),
//         fontWeight: theme.typography.fontWeightRegular,
//       }
//   }));

const Hob = ({col, setCol,setPage}) => {
  React.useEffect(() => {
    setPage(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
  const Refreshdetect = (e) => {
    if (col.contact === true) {
      e.preventDefault();
      e.returnValue = "";
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', Refreshdetect);
    return () => {
      window.removeEventListener("beforeunload", Refreshdetect);
    };
  });

    const [Lang, setLang] = useState(th);
      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
          setLang(th);
        } else {
          setLang(en);
        }
      }
    };
    //const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      if (sessionStorage.getItem('directload') === 'ok') {
        sessionStorage.removeItem('directload')
      }
      setOpen(true);
    };
  
    // const handleClose = () => {
    //   if (col.contact === false) {
    //     setOpen(false);
    //   } else {
    //     setBusy(true);
    //   }
    // };

    setInterval(function(){ 
      if (sessionStorage.getItem('directsuccess') === 'ok') {
        setOpen(false);
        sessionStorage.removeItem('directsuccess')
      }
     }, 100);
    React.useEffect(() => {
      syncpage();
    });
    return (
      <div className='pl-3 pr-3'>
        <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
          <Typography gutterBottom variant="h5" component="h2">
            {Lang.title}
          </Typography>
        </Slide>
        <hr />
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
            <Typography variant="h6">{Lang.tel.title}</Typography>
          </Grow>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <b>{Lang.tel.title}</b>: <a className="remove-ude" target="_blank" href={'tel:' + Lang.tel.hy} rel="noopener noreferrer">{Lang.tel.desc}</a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
            <Typography variant="h6">{Lang.mail.title}</Typography>
          </Grow>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <b>{Lang.mail.title}</b>: <a className="remove-ude" target="_blank" rel="noopener noreferrer" href={'mailto:' + Lang.mail.hy + '?subject'}>{Lang.mail.desc}</a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
            <Typography variant="h6">{Lang.social.title}</Typography>
          </Grow>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <b>{Lang.social.title}</b>: {Lang.social.desc.map((item) => (
                <img src={item.icon} width={30} style={{cursor: 'pointer'}} onClick={() => window.open(item.link, '_target')} />
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={false} onClick={handleClickOpen}>
          <AccordionSummary
            aria-controls="panel3a-content"
          >
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
            <Typography variant="h6">{Lang.otherdesc}</Typography>
          </Grow>
          </AccordionSummary>
        </Accordion>
        <DirectContact ditlt={Lang.other} setOpen={setOpen} open={open} col={col} setCol={(val) => setCol(val)} Transition={Transition} />
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