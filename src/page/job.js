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

const Job = ({setPage, dark, CurrentLang}) => {
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


    return ( 
        <div className='pl-3 pr-3'>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography className={dark ? 'text-light' : ''} variant="h5">{Lang.title}</Typography>
          </Slide>
            <hr className={dark ? 'border-light' : ''} />
          <Timeline>
          {Lang.list.map((item, i) => (
            <div data-aos='fade-right'>
            <TimelineEvent
              key={'job-' + i}
              titleStyle={{color: dark ?'#fff':''}}
              title={<h6>{item.title}</h6>}
              subtitle={<p className={dark ? 'text-dark-secondary' : ''}>{item.locate}</p>}
              createdAt={(<Typography variant="subtitle1" className={dark ? 'text-dark-secondary' : ''}>{item.start + ' - ' + item.end}</Typography>)}
              bubbleStyle={item.presentjob ? { background: "rgb(0, 224, 56)", color: '#fff' } :{ background: item.color, color: '#fff' }}
              icon={item.presentjob ? <StarsOutlinedIcon /> : <WorkOutlineIcon />}
              contentStyle={{borderRadius: '6px', background: dark ?'#011345' : '', color: dark ? '#fff' : ''}}
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