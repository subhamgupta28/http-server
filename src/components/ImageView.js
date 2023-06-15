import React from 'react';
import ReactPlayer from "react-player";
import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import host from "../api";
import {makeStyles} from '@mui/styles';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles({
    di: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        display: "flex",
        justifyContent: "center",
        "& .MuiDialog-paperFullScreen":{
            backgroundColor: 'rgba(255, 255, 255, 0.01)'
        }
    },
    ro:{},
    
});

function ImageView({data, open, handleClose}){
    const classes = useStyles();
    const url = host + "/thumb?fs=f&uri=" + data.uri

    return (
        <div>
            <Dialog fullScreen open={open} className={{paper: classes.di, root:classes.ro}} color="transparent">
                <AppBar className={classes.appBar} color="transparent">
                    <Toolbar variant={'dense'}>
                        <IconButton edge="start" color="inherit" aria-label="close" onClick={handleClose}>
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {data.fileName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.di}>
                    <img src={url} height="100%"  alt={data.fileName}/>
                    {/* <video className={classes.video} src={host + data.uri} controls /> */}
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default ImageView;