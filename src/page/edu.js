import React, { useState } from 'react';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import en from '../lang/en/edu.json';
import th from '../lang/th/edu.json';

import Grow from '@mui/material/Grow';
import { connect } from 'react-redux';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       flexBasis: '20.33%',
//       flexShrink: 0,
//     },
//     headingimg: {
//         fontSize: theme.typography.pxToRem(25),
//         flexBasis: '10.33%',
//         flexShrink: 0,
//       },
//     headingst: {
//         fontSize: theme.typography.pxToRem(17),
//         fontWeight: theme.typography.fontWeightRegular,
//       },
//     secondaryHeading: {
//       fontSize: theme.typography.pxToRem(15),
//       color: theme.palette.text.secondary,
//     },
//     large: {
//         width: theme.spacing(6),
//         height: theme.spacing(6),
//       },
//   }));
const Edu = ({setPage, dark, CurrentLang}) => {
  React.useEffect(() => {
    setPage(CurrentLang == 'th' ? th.title : en.title)
  }, [])
    //const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const [Lang, setLang] = useState(th);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    React.useEffect(() => {
      if (CurrentLang === 'th') {
        setLang(th);
      } else {
        setLang(en);
      }
    }, [CurrentLang]);
  
    return (
      <div className='pl-3 pr-3'>
        <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
          <Typography variant="h5" className={dark ? 'text-light' : ''}>{Lang.title}</Typography>
        </Slide>
        <hr className={dark ? 'border-light' : ''} />
        <br/>
          <div>
           {Lang.list.map((item, i) => (
            <Accordion key={i+1} expanded={expanded === item.panel} onChange={handleChange(item.panel)} sx={{backgroundColor: dark ? '#011345' : ''}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={dark ? 'text-light' : ''} />}
                aria-controls={item.panel + 'bh-content'}
                id={item.panel + 'bh-header'}
              >
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
                <Typography variant="h6" className={dark ? 'text-light' : ''}>{item.title}</Typography>
              </Grow>
              </AccordionSummary>
              <AccordionDetails>
               <List>
               <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
               <ListItem alignItems="flex-start">
                    <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 900 : 0}>
                    <ListItemAvatar>
                        <Avatar src={item.edulogo} />
                    </ListItemAvatar>
                    </Grow>
                    <ListItemText
                    primary={<h6 className={dark ? 'text-light' : ''}>{item.locate}</h6>}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={dark ? 'text-dark-secondary' : ''}
                        >
                            GPA: {item.gpa}
                            <br />
                        </Typography>
                        <p className={dark ? 'text-light' : ''}>
                            {item.desc}
                        </p>
                        </React.Fragment>
                    }
                    />
                </ListItem>
                </Grow>
               </List>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Edu);