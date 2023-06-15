import React from 'react';


import host from '../api';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    card: {
        maxWidth: 180,
        display: "flex",
        minWidth: 150,
        borderRadius: 12
    },
    media: {
        height: 140,
    },
});

export default function ContentCard({ data, handleOpen, idx }) {
    const classes = useStyles();
  


    return (
        <Card className={classes.card} onClick={()=>handleOpen(data, idx)}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={host + "/thumb?uri=" + data.uri}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="label" component="p">
                        {data.fileName}
                    </Typography>
                </CardContent>
            </CardActionArea>
           
        </Card>
    );
}
