import React from 'react';
import { Typography, CardContent, Card, CardActionArea } from '@mui/material';
import Grow from '@mui/material/Grow';

const BillCom = ({item, dark, classes, i, slideInc}) => {
    const [loaded, setLoaded] = React.useState(false)
    const handleImageLoad = () => {
        setLoaded(true);
    }

    return ( 
     
         <Card key={i}>
            <CardActionArea>
            <img src={item.src} alt={item.title} className="slide" onLoad={handleImageLoad} width="100%" />
                {!loaded && (
                    <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
                )}
                <br />
                <CardContent sx={{backgroundColor: dark ? '#7d7d7d' : ''}}>
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1000 : 0}>
                        <Typography variant="h5">{item.title}</Typography>
                      </Grow>
                        <br />
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
                        <Typography variant="subtitle2">{item.desc}</Typography>
                      </Grow>
                </CardContent>
        </CardActionArea>
        
    </Card>
       
    );
}
 
export default BillCom;