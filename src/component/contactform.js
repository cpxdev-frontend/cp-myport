import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
// import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import en from '../lang/en/direct.json';
import th from '../lang/th/direct.json';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import {
  setLang, setDarkMode, setPage
} from '../redux/action';
//demo
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       padding: theme.spacing(2),
//       paddingTop: 100,
//     },
//     title: {
//       marginLeft: theme.spacing(2),
//       flex: 1,
//     },
//     loader: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//     btn: {
//         justifyContent: 'center'
//     },
//     input: {
//       display: 'none',
//     },
//   }));
const DirectForm = ({ setCol, open, Transition, ditlt, setOpen, endpoint}) => {
    //const classes = useStyles();
    const [state, setState] = React.useState({
      vertical: '',
      horizontal: '',
    });
    const [load, setload] = React.useState(false)
    const [busy, setBusy] = React.useState(false);

    const [successalt, setsuccess] = React.useState(false);
    const [failalt, setfail] = React.useState(false);
    const [warnalt, setwarn] = React.useState(false);
    const [upwarnalt, setUpwarn] = React.useState(false);
    const [filename, setFile] = React.useState('');

    const [Lang, setLang] = React.useState(th);
    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
          setLang(th);
        } else {
          setLang(en);
        }
      }
    };

    const getinput = (id) => {
        return document.getElementById(id).value;
    }
    const { vertical, horizontal } = state;
    const SenddataAPI = () => {
        setState({ open: true, ...{ vertical: 'top', horizontal: 'center' } });
        const mailpat = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        const telpat = /^\+(?:[\d]{1,2})[0-9]{8,12}$/i;
        const url = endpoint.web + '/myport/sendMessage';
        if (getinput('name') !== '' && getinput('company') !== '' && getinput('mail') !== '' && getinput('tel') !== '' && getinput('head') !== '' && getinput('desc') !== '' && mailpat.test(getinput('mail')) && telpat.test(getinput('tel'))) {
            setload(true);

            var Obj = {
              Name: getinput('name'),
              Company: getinput('company'),
              Email: getinput('mail'),
              Tel: getinput('tel'),
              Subject: getinput('head'),
              Message: getinput('desc'),
              lang: localStorage.getItem('langconfig'),
              img: document.getElementById('img').src == window.location.href ? '' : document.getElementById('img').src
            }

            setCol(true)
            axios({
              method: 'post',
              url: url,
              data: Obj
            }).then(function (response) {
              setCol(false)
              // handle success
              if (response.data.errorcode === 0) {
                  setload(false);
                  setsuccess(true);
                  setFile('')
              } else {
                  setload(false);
                  setfail(true);
                  setFile('')
              }
          })
          .catch(function () {
              // handle error
              setCol(false)
              setfail(true);
              setload(false);
              setFile('')
          });
                
        } else {
            setwarn(true);
        }
    };

    const setImg = (e) => {
        const input = e
        const file = input.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              if ((file.type.includes('jpeg') || file.type.includes('png') || file.type.includes('pdf') || file.type.includes('word')) && file.size < 3145728) {
                document.getElementById('img').src = e.target.result
                setFile('Your file "' + file.name + '" is ready to upload')
              } else {
                setUpwarn(true);
                setFile('')
                e.target.value = ''
              }
            }
            reader.readAsDataURL(file); // convert to base64 string
        }
    }

    const CloseD = () => {
      if (!load) {
        setOpen(false)
      } else {
        setBusy(true)
      }
    }

    const handleClose = () => {
        setfail(false);
        setsuccess(false);
        setwarn(false);
        setUpwarn(false);
    };

    const onSuccess = () => {
      setfail(false);
      setsuccess(false);
      setwarn(false);
      setUpwarn(false);
      setOpen(false)
    }

    React.useEffect(() => {
      syncpage();
    });
    const color = "secondary";
    return (
      <Dialog fullScreen open={open} onClose={CloseD} TransitionComponent={Transition}>
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={CloseD}
                aria-label="close"
                size="large">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
                {ditlt}
              </Typography>
              <Button variant="inhert" color="primary" onClick={SenddataAPI} disabled={load ? true : false}>
                  {Lang.btn}
              </Button>
            </Toolbar>
          </AppBar>
          <div>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={successalt} autoHideDuration={3500} onClose={onSuccess}>
            <Alert onClose={onSuccess} severity={Lang.success.icon}>
                {Lang.success.desc}
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={failalt} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={Lang.error.icon}>
                {Lang.error.desc}
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={warnalt} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={Lang.warning.icon}>
                {Lang.warning.desc}
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={upwarnalt} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={Lang.uploadwarning.icon}>
                {Lang.uploadwarning.desc}
            </Alert>
        </Snackbar>
          <Snackbar open={busy} autoHideDuration={4000} onClose={() => setBusy(false)}>
            <Alert onClose={() => setBusy(false)} severity="info">
              Direct Contact is processing. You cannot stop it right now.
            </Alert>
          </Snackbar>
            {load === true ? (
            <Grow in={load} timeout={800}>
              <div className='text-center' style={{top: '45%', left: window.innerWidth > 900 ? '50%' : '45%', position: 'absolute'}}>
                  <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
              </div>
            </Grow>
            ):(
              <div className='pl-3 pr-3'>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={5}>
                    <TextField id="name" color={color} fullWidth={true} label={Lang.name} />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextField id="company" color={color} fullWidth={true} label={Lang.company} />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextField id="mail" color={color} placeholder="info@cpxdev.tk" fullWidth={true} label={Lang.email} />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField id="tel" color={color} placeholder="+66812345678" type="tel" fullWidth={true} label={Lang.tel} />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField id="head" color={color} fullWidth={true} label={Lang.sub} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                        id="desc"
                        color={color}
                        fullWidth={true}
                        label={Lang.desc}
                        multiline
                        rows={3}
                      />
                  </Grid>
                  
                  <Grid item md="auto" xs={12}>
                  <input
                  style={{display: 'none'}}
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => setImg(e)}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      {Lang.up}
                    </Button>
                  </label>
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <Box mt={1}>
                    <Typography varriant="subtitle1">{filename !== '' ? filename : 'Please click to upload'}</Typography>
                  </Box>
                  </Grid>
                  <img src="" alt="" id="img" width="500" title="Preview" hidden />
                </Grid>
              </div>
            )}
        </div>
        </Dialog>
    );
}
 
const mapStateToProps = (state) => ({
  dark: state.dark,
  CurrentLang: state.CurrentLang,
  currentPage: state.currentPage
});
const mapDispatchToProps = (dispatch) => ({
  setDark: (val) => dispatch(setDarkMode(val)),
  setLang: (val) => dispatch(setLang(val)),
  setPage: (val) => dispatch(setPage(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(DirectForm);
