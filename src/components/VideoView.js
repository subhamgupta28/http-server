import React from 'react';
import ReactPlayer from "react-player";
import { makeStyles } from '@mui/styles';
import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import host from "../api";
import { Close } from '@mui/icons-material';
import theme from '../theme';

const useStyles = makeStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: "grid",
        gridTemplateRows: "100% 1fr"
    },
    di: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        display: "flex",
        justifyContent: "center",
        "& .MuiDialog-paperFullScreen": {
            backgroundColor: 'rgba(255, 255, 255, 0.01)'
        }
    },
    ro: {},
    video: {
        display: "flex",
        height: "100%",
        width: "100%"
    },
    dialog: {
        "& .MuiDialog-paper": {
            maxWidth: "90vw",
            width: "90vw",
            maxHeight: "90vh",
            height: "90vh",
            overflow: "hidden",
            borderRadius: 0,
            margin: 0,
        },
    },
    content: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    playerWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default function VideoView({ data, open, handleClose }) {
    const classes = useStyles();
    const url = host + "/stream?uri=" + data.uri


    console.log(host)

    return (
        <div>
            <Dialog fullScreen open={open} className={{ paper: classes.di, root: classes.ro }}>
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
                    <ReactPlayer url={url} playing height="100%" width="100%" controls />
                    {/* <video className={classes.video} src={host + data.uri} controls /> */}
                </DialogContent>

            </Dialog>
        </div>
    );
}
