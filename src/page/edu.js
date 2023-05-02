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
const Edu = ({setPage}) => {
  React.useEffect(() => {
    setPage(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
    //const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const [Lang, setLang] = useState(th);
  
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
    
    React.useEffect(() => {
      syncpage();
    });
  
    return (
      <div className='pl-3 pr-3'>
        <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
          <Typography variant="h5">{Lang.title}</Typography>
        </Slide>
        <hr />
        <br/>
          <div>
           {Lang.list.map((item, i) => (
            <Accordion key={i+1} expanded={expanded === item.panel} onChange={handleChange(item.panel)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={item.panel + 'bh-content'}
                id={item.panel + 'bh-header'}
              >
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
                <Typography variant="h6">{item.title}</Typography>
              </Grow>
              </AccordionSummary>
              <AccordionDetails>
               <List>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar data-aos='fade-in' src={item.edulogo} />
                    </ListItemAvatar>
                    <ListItemText
                    data-aos='fade-right'
                    primary={item.locate}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            GPA: {item.gpa}
                            <br />
                        </Typography>
                            {item.desc}
                        </React.Fragment>
                    }
                    />
                </ListItem>
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