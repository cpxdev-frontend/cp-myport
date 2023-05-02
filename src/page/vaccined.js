import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import en from '../lang/en/vac.json';
import th from '../lang/th/vac.json';
import Grid from '@mui/material/Grid';
import {
  Button, ButtonGroup,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

import {
  setLang, setDarkMode, setPage
} from '../redux/action';

const Hob = ({setPage}) => {
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
    const getvac = {
        set: true,
        url1: "http://bit.ly/3r35M80",
    }

    return (
        <div>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography gutterBottom variant="h5" component="h2">
              {Lang.title}
            </Typography>
          </Slide>
            <hr/>
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1300 : 0}>
            <Typography gutterBottom variant="body2">
              {Lang.desc}
            </Typography>
          </Grow>
            <br />
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="body1">
                    {Lang.listhead.allstat}: {Lang.allstat}&nbsp;
                    </Typography>
                    {getvac.set === true && (
                      <ButtonGroup>
                        <Button color="primary" variant="contained" target="_blank" href={getvac.url1}>{Lang.done.btndigital}</Button>
                      </ButtonGroup>
                    )}
                </CardContent>
            </Card>
          </Grow>
            <br />
            <Grid container spacing={3}>
            {Lang.list.map((vact, i) => window.innerWidth > 600 ? (
                <Grid item xs={12} sm={6} key={i + 1}>
                <Slide direction={i % 2 ? 'left' : 'right'} in={true} timeout={localStorage.getItem('graphic') === null ? 1000: 0}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                {Lang.head}{i+1} - {vact.date}
                            </Typography>
                        <hr />
                        <List>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.name} secondary={vact.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.date} secondary={vact.date} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.type} secondary={vact.type} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.place} secondary={vact.place} />
                            </ListItem>
                            <ListItem>
                                <ListItemText inset={true} primary={Lang.listhead.stat} secondary={vact.stat} />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                    </Slide>
                </Grid>
            ) : (
              <Grid item xs={12} sm={6} key={i + 1}>
              <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 + i * 2: 0}>
                  <Card>
                      <CardContent>
                          <Typography variant="h6" component="h6">
                              {Lang.head}{i+1} - {vact.date}
                          </Typography>
                      <hr />
                      <List>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.name} secondary={vact.name} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.date} secondary={vact.date} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.type} secondary={vact.type} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.place} secondary={vact.place} />
                          </ListItem>
                          <ListItem>
                              <ListItemText inset={true} primary={Lang.listhead.stat} secondary={vact.stat} />
                          </ListItem>
                      </List>
                      </CardContent>
                  </Card>
                  </Grow>
              </Grid>
            ))}
            </Grid>
            <br />
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 2000 : 0}>
            <Typography gutterBottom variant="subtitle2">
              {Lang.credit}
            </Typography>
          </Grow>
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