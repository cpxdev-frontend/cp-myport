import React from 'react';
import {
    DialogContent,
    DialogActions,
    Button,
    Slide,
    Grid,
    Zoom,
  } from '@mui/material';
  import Skeleton from '@mui/material/Skeleton';
  import DialogTitle from '@mui/material/DialogTitle';
  import Grow from '@mui/material/Grow';
  import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';

const FavCom = ({arr, setOpen, Lang}) => {
    const [loaded, setLoaded] = React.useState(false)
    const handleImageLoad = () => {
        setLoaded(true);
    }
    return ( 
        <div>
            <Slide direction='left' in={true} timeout={localStorage.getItem('graphic') === null ? 900 : 0}>
              {arr.link !== undefined && arr.link !== '' ? (
                <a href={arr.link} target="_blank" rel="noopener noreferrer">
                  <DialogTitle id="scroll-dialog-title">
                    {arr.title}
                  </DialogTitle>
                </a>
              ) : (
                <DialogTitle id="scroll-dialog-title">
                  {arr.title}
                </DialogTitle>
              )}
              </Slide>
            <DialogContent dividers>
              <br />
              <Grid container spacing={4}>
            <Grid item xl md={5}>
            <>
              {window.innerWidth > 600 ? (
                <Zoom in={loaded} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
                <img
                    src={arr.src}
                    alt={arr.title}
                    width={'100%'}
                    onLoad={handleImageLoad}
                />
              </Zoom>
              ) : (
              <Grow in={loaded} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
                <img
                    src={arr.src}
                    alt={arr.title}
                    width={'100%'}
                    onLoad={handleImageLoad}
                />
              </Grow>
              )}
              </>
              {
                !loaded && (
                  <div className={window.innerWidth < 600 ? 'ww2-1' : 'ww2'}>
             <Skeleton variant="rect" width={'100%'} height={200} />
              </div>
                )
              }
              
            </Grid>
            <Grid item sm md={7}>
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
               <Box mt={3}>
                 <Typography>
                   {arr.desc}
                 </Typography>
               </Box>
             </Grow>
            </Grid>
        </Grid>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="info">
                {Lang.ok}
              </Button>
            </DialogActions>
        </div>
     );
}
 
export default FavCom;