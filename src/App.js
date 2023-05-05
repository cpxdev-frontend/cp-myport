import * as React from 'react';
import './App.css'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Avatar, Collapse, Dialog, Grow, DialogContent, DialogContentText, DialogActions, DialogTitle, TextField, Grid, Tooltip
, FormControlLabel, Switch, Slide} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import "aos/dist/aos.css";

import AOS from 'aos'
import { connect } from 'react-redux';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {
  useHistory,
  Route,
  Link,
  useLocation,
  Switch as BasicSwitch,
} from "react-router-dom";

import {
  setLoad, setLang, setDarkMode, setPage
} from './redux/action';

import Home from './page/home';
import Profile from './page/profile';
import Education from './page/edu';
import Job from './page/job';
import Skill from './page/skill';
import Portfolio from './page/port';
import Hobby from './page/hobby';
import Contact from './page/contact';
// import Vac from './page/vaccined';
import Doc from './page/document';
import ApiDoc from './page/apidoc';
import ErrorPage from './page/404';

import en from '../src/lang/en/menulist.json';
import th from '../src/lang/th/menulist.json';

const drawerWidth = 240;

const textinput = {style: {
  color: 'white'
}}

const mainColor = {
  '& .MuiSvgIcon-root': {
    color: 'white',
 },
  "& .MuiGrid-container": {
    color: 'white',
},
  "& label": {
    color: "white"
  },
  "& label.Mui-focused": {
    color: "#00c4f5"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "#0072f5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00c4f5"
    }
  }
}

const langlist = [
  {
    value: 'th',
    label: 'ภาษาไทย',
    flag: 'https://disease.sh/assets/img/flags/th.png',
  },
  {
    value: 'en',
    label: 'English',
    flag: 'https://disease.sh/assets/img/flags/us.png',
  },
];

function DrawerAppBar(props) {
  const {window,setDark, setLang, setPage, CurrentLang, currentPage, dark} = props
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [MenuSession, setMenuSession] = React.useState(null);
  const [Lang, setLangMenu] = React.useState(CurrentLang == 'th' ? th : en);
  const [MenuSessionMobile, setMenuSessionMobile] = React.useState(null);
  const [formopen, setFormOpen] = React.useState({contact: false, api: false});

  const [open, setOpen] = React.useState(false);
  const [savedLat, setLat] = React.useState(0);
  const [apiopen, setApiOpen] = React.useState(false);
  const [setting, setSetting] = React.useState(false);
  const [graph, setGraph] = React.useState(false);


  const [mainMenu, setMainMenu] = React.useState(null);

  const history = useHistory()
const location = useLocation()

  const graphicFunc = () => {
    if (localStorage.getItem('graphic') !== null) {
      localStorage.removeItem('graphic');
      setGraph(false)
    } else {
      localStorage.setItem('graphic', 't');
      setGraph(true)
    }
  }
  const setupLang = (language) => {
    localStorage.setItem('langconfig', language);
    if (language === 'th') {
      setLangMenu(th);
      setLang('th')
    } else {
      setLangMenu(en);
      setLang('en')
    }
  };

  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, [])


  React.useEffect(() => {
    if (dark == true) {
      localStorage.setItem('dark', '');
    } else {
      localStorage.removeItem('dark');
    }
    if (dark) {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#333333'
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#e8e8e8'
    }
  }, [dark])


  React.useEffect(() => {
    document.title = currentPage + ' | MyPort Site Official'
    let tabindex = Lang.menu.findIndex((item) => item.path == location.pathname);
    if (tabindex == -1) {
      for(let menuIndex = 0; menuIndex < Lang.menu.length;  menuIndex++){
        if (Lang.menu[menuIndex].list != null) {
          const tempIndex = Lang.menu[menuIndex].list.findIndex((itm) => itm.path === location.pathname);
          if (tempIndex != -1) {
            tabindex = menuIndex;
            break;
          }
        }
      }
      if (tabindex != -1) {
        setMainMenu(tabindex)
      } else {
        setMainMenu(null)
      }
    } else {
      setMainMenu(tabindex)
    }
  }, [currentPage])

  const ActionNotPath = (act) => {
    const action = act.replace('_', '');
    if (action == 'setting') {
      setSetting(true)
    }
    if (action == 'about') {
      setApiOpen(true)
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={() => history.push('/')} className='point'>
        MyPort Site
      </Typography>
      <Divider />
      <List>
        {Lang.menu.map((item, i) => (
          <>
          <ListItem key={'menuhead-' + i} disablePadding>
            <ListItemButton onClick={() => {
              item.list != null ? setMenuSessionMobile(item.list != null && MenuSessionMobile != i ? i : item.list != null && MenuSessionMobile == i ? null : null) : setMenuSessionMobile(null);
              item.list == null && history.push(item.path);
              item.list == null && handleDrawerToggle()
            }} sx={{ paddingLeft: 4 }} className={mainMenu == i ? 'border-left selectedborder border-dark':''}>
              <ListItemText primary={item.name} secondary={null} />
              {item.list != null && (
                <>
                  {MenuSessionMobile == i ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </ListItem>
          
        {MenuSessionMobile == i && (
            <Collapse in={MenuSessionMobile != null} className='border rounded' timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Lang.menu[MenuSessionMobile].list.map((itm) => (
                <ListItemButton onClick={() => {
                  itm.path.includes('_') ? ActionNotPath(itm.path) : history.push(itm.path);
                  handleDrawerToggle()
                }} data-aos="fade-right" sx={{ pl: 5 }}>
                  <ListItemText primary={itm.name} />
                </ListItemButton>
                ))}
              </List>
            </Collapse>
            )}
          </>
        ))}
      </List>
    </Box>
  );

    const renderMenu = (item, i) => {
      return (
        <Menu
          anchorEl={MenuSession.e.target}
          open={i == MenuSession.index ? true : false}
          onClose={() => setMenuSession(null)}
        >
          {item.map((itm) => (
            <MenuItem onClick={() => {
              (itm.path.includes('_') ? ActionNotPath(itm.path) : history.push(itm.path))
              setMenuSession(null)
            }}>{itm.name}</MenuItem>
          ))}
        </Menu>
      )
    }

    

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
     <Slide direction='down' in={true} timeout={localStorage.getItem('graphic') === null ? 900 : 0}>
     <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src='https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/myport/avatar.webp' />
          <Typography
            variant="h6"
            component="div"
            className='point'
            sx={{ flexGrow: 1, marginLeft: 2, display: { xs: 'none', sm: 'block' } }}
            onClick={() => history.push('/')}
          >
            MyPort Site
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {Lang.menu.map((item, i) => (
              <>
              <Button key={'menuhead-' + i} onClick={(e) => item.list != null ? setMenuSession({
                index: i,
                e: e
              }) : (item.path.includes('_') ? ActionNotPath(item.path) : history.push(item.path))} sx={{ color: '#fff' }} className={mainMenu == i ? 'border-top':''}>
                {item.name}
              </Button>
              {item.list != null && MenuSession != null && renderMenu(item.list,i)}
              </>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
     </Slide>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <div style={{ marginTop: 20, paddingBottom: 100 }}>
        <Toolbar />
        <BasicSwitch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/profile" render={() => <Profile />} />
                <Route path="/education" render={() => <Education />} />
                <Route path="/job" render={() => <Job />} />
                <Route path="/skill" render={() => <Skill />} />
                <Route path="/portfolio" render={() => <Portfolio />} />
                <Route path="/hobby" render={() => <Hobby />} />
                <Route path="/contact" render={() => <Contact col={formopen} setCol={(val) => setFormOpen({...formopen, contact: val})} />} />
                {/* <Route path="/vaccinated" render={() => <Vac />} /> */}
                <Route path="/docfiles" render={() => <Doc />} />
                <Route path="/api" render={() => <ApiDoc col={formopen} setCol={(val) => setFormOpen({...formopen, api: val})} />} />
                <Route render={() => <ErrorPage />} />
              </BasicSwitch>
      </div>
      <footer class={"fixed-bottom text-center p-3" + (dark ? '' : ' bg-light')} style={{backgroundColor: dark ? '#7d7d7d' : ''}}>
        Copyright 2023 CPXDev Studio, Allright Reserved
      </footer>






      <Dialog
          TransitionComponent={Grow}
          transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
          open={apiopen}
          onClose={() => setApiOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          <DialogContent style={{backgroundColor: dark ? '#011345' : ''}} >
            <DialogContentText id="alert-dialog-description">
            <Typography variant="h5" className={dark ? 'text-light' : ''}>
                {Lang.about.head}
              </Typography>
            <Divider className={dark ? 'border-light' : ''} />
              <Typography className={dark ? 'text-light' : ''}>
                {Lang.about.developName}
              </Typography>
            <br />
              <Typography className={dark ? 'text-light' : ''}>
                {Lang.about.desc}
              </Typography>
            <br />
              <Typography className={dark ? 'text-light' : ''}>
                {Lang.about.uptLog}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{backgroundColor: dark ? '#011345' : ''}} >
            <Button onClick={() => setApiOpen(false)} sx={{color: dark ? '#44ad67' : '#648cfa'}}>
              {Lang.btnOK}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          TransitionComponent={Grow}
          transitionDuration={localStorage.getItem('graphic') === null ? 500 : 200}
          open={setting}
          onClose={() => setSetting(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description2"
          maxWidth="lg"
        >
          <DialogTitle id="alert-dialog-title" style={{backgroundColor: dark ? '#011345' : ''}} className={dark ? 'text-light' : ''}>{Lang.setting.title}</DialogTitle>
          <DialogContent className='pt-3' style={{backgroundColor: dark ? '#011345' : ''}}>
            <DialogContentText id="alert-dialog-description2">
              <TextField
            select
            label={Lang.setting.changeL}
            sx={dark ? mainColor : null}
            onChange={(e) => setupLang(e.target.value)}
            value={CurrentLang}
            inputProps={dark ? textinput : null} 
          >
            {langlist.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Grid container spacing={3}>
                  <Grid item md={4}>
                    <Avatar src={option.flag} sx={{ width: 25, height: 25 }} />
                  </Grid>
                  <Grid item md style={{ marginTop: 2 }}>
                    {option.label}
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </TextField>
          <br />
          <Tooltip enterDelay={1000} title={Lang.settingGuide.perfor}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={graph}
                  color="primary"
                  onChange={graphicFunc}
                />
              }
              className={dark ? 'text-light' : ''}
              label={Lang.reducemode.label + (graph ? Lang.reducemode.on : Lang.reducemode.off)}
            />
          </Tooltip>
          <br />
          <FormControlLabel
              control={
                <Switch
                  defaultChecked={dark}
                  color="primary"
                  onChange={() => setDark(!dark)}
                />
              }
              className={dark ? 'text-light' : ''}
              label={Lang.setting.dark}
            />
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{backgroundColor: dark ? '#011345' : ''}}>
            <Button onClick={() => setSetting(false)} sx={{color: dark ? '#44ad67' : '#648cfa'}}>
              {Lang.btnOK}
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(DrawerAppBar);
