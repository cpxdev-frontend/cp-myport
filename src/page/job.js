import React, { useState } from 'react';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import 'react-vertical-timeline-component/style.min.css';
import '../TimelineBorder.css';
import en from '../lang/en/jobex.json';
import th from '../lang/th/jobex.json';

import Grow from '@mui/material/Grow';
import { connect } from 'react-redux';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';

const Job = ({setPage}) => {
  React.useEffect(() => {
    setPage(localStorage.getItem('langconfig') !== null && localStorage.getItem('langconfig') == 'th' ? th.title : en.title)
  }, [])
    const [Lang, setLang] = useState(th);

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
            <hr/>
          <Timeline>
          {Lang.list.map((item, i) => (
            <div data-aos='fade-right'>
            <TimelineEvent
              key={'job-' + i}
              title={item.title}
              subtitle={item.locate}
              createdAt={(<Typography variant="subtitle1">{item.start + ' - ' + item.end}</Typography>)}
              bubbleStyle={item.presentjob ? { background: "rgb(0, 224, 56)", color: '#fff' } :{ background: item.color, color: '#fff' }}
              icon={item.presentjob ? <StarsOutlinedIcon /> : <WorkOutlineIcon />}
            >
              <Typography variant="body1">{item.desc}</Typography>
            </TimelineEvent>
            </div>
            ))}
    </Timeline>
        </div>
     );
}
 
const mapStateToProps = (state) => ({
  dark: state.dark,
  CurrentLang: state.CurrentLang,
  currentPage: state.currentPage,
  endpoint: state.endpoint
});
const mapDispatchToProps = (dispatch) => ({
  setDark: (val) => dispatch(setDarkMode(val)),
  setLang: (val) => dispatch(setLang(val)),
  setPage: (val) => dispatch(setPage(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(Job);