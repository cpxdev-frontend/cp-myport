import React, {useEffect} from 'react';
//import { makeStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {
  Backdrop,
} from '@mui/material';

import Home from '../apiCom/home';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';
import { connect } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //     width: '100%',
  //     backgroundColor: theme.palette.background.paper,
  //   },
  //   backdrop: {
  //     zIndex: theme.zIndex.drawer + 1,
  //     color: '#fff',
  //   },
  // }));
  
  const ApiDoc = ({col, setCol,setPage, CurrentLang}) => {
    React.useEffect(() => {
      setPage(CurrentLang == 'th' ? 'บริการ API' : 'API Service')
    }, [])
    const Refreshdetect = (e) => {
      if (col.api === true) {
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

    //const classes = useStyles();
    const [ Load, setLoad] = React.useState(false);
  
    return (
      <div>
      <div className='pl-3 pr-3'>
        <Home col={col} setCol={(val) => setCol(val)} Load={Load} setLoadIco={(e) => setLoad(e)} />
      </div>
        
        <Backdrop
              open={Load}
            >
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
            </Backdrop>
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
  export default connect(mapStateToProps, mapDispatchToProps)(ApiDoc);