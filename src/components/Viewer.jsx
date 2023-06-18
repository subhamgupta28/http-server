import React from 'react';
import ReactPlayer from "react-player";
import { makeStyles } from '@mui/styles';
import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material';
import host from "../api";
import PDFViewer from 'pdf-viewer-reactjs'
import { Close } from '@mui/icons-material';
import theme from '../theme';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const useStyles = makeStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: "grid",
        gridTemplateRows: "100% 1fr"
    },
    di: {
        backgroundColor: 'rgba(0, 0, 0)',
        backdropFilter: 'blur(7px)',
        display: "flex",
        justifyContent: "center",
    },
    ro: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
    },
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
    actButton: {
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        paddingTop: "40%",
        width: "100%"
    }
});

export default function Viewer({ open, handleClose, fileList, idx, setIdx }) {
    const classes = useStyles();
    const vidUrl = host + "/stream?uri=" + fileList[idx]?.uri
    const imgUrl = host + "/thumb?fs=f&uri=" + fileList[idx]?.uri
    const pdfUrl = host + "/file?uri=" + fileList[idx]?.uri
    console.log(host)
    const handleNext = () => {
        setIdx(prev => prev + 1)
        if (idx === fileList.length - 1)
            setIdx(0)

    }
    const handleBefore = () => {
        setIdx(prev => prev - 1)
        if (idx === 0)
            setIdx(fileList.length - 1)

    }

    return (
        <div >
            <Dialog fullScreen open={open} className={{ paper: classes.di, root: classes.ro }}>

                <AppBar className={classes.appBar} color="transparent">
                    <Toolbar variant={'dense'}>
                        <IconButton edge="start" color="inherit" aria-label="close" onClick={handleClose}>
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {fileList[idx]?.fileName}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className={classes.di}>

                    {fileList[idx]?.contentType === "Video" ?
                        (<ReactPlayer url={vidUrl} playing height="100%" width="100%" controls />)
                        :
                        (<img src={imgUrl} height="100%" alt={fileList[idx]?.fileName} />)
                    }

                    {fileList[idx]?.contentType === "pdf" ? (
                        <PDFViewer
                            document={{
                                url: pdfUrl,
                            }}
                        />
                    ) : null}


                    <div className={classes.actButton}>
                        <IconButton autoFocus color="primary" onClick={handleBefore}>
                            <NavigateBeforeIcon />
                        </IconButton>
                        <IconButton autoFocus color="primary" onClick={handleNext}>
                            <NavigateNextIcon />
                        </IconButton>
                    </div>
                    {/* <video className={classes.video} src={host + data.uri} controls /> */}
                </DialogContent>


            </Dialog>
        </div>
    );
}
