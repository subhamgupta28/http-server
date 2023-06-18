import { Redirect } from "react-router-dom";
import FileManager from "./FileManager";
import React, { useState } from 'react';
import PrimaryAppBar from './AppBar';
import host, { token, wsHost, downloadFiles, login } from "../api";

import Sidebar from "./Sidebar";
import { Alert, CssBaseline, Paper, Snackbar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import theme from "../theme";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const useStyles = makeStyles({
    rootHome: {
        width: "100%",
        display: 'flex',
        minHeight: "100vh"
    },
    content: {
        flexGrow: 1,
        overflow: "auto",
        padding: theme.spacing(3),
    },
    main: {
        display: "grid",
        width: "100%",
        gridTemplateColumns: "85% 15%"
    }
});



function Home() {
    const classes = useStyles();

    const [user, setUser] = useState({})
    const [msg, setMsg] = useState("")
    const [open, setOpen] = useState(false)
    const [path, setPath] = React.useState("")

    const sessionStart = () => {
        const socket = new WebSocket("ws://" + wsHost + "/session?token=" + token);

        socket.addEventListener('open', function (event) {
            socket.send("JSON.stringify()");
            console.log("open")
            notify("Session started")
        });

        socket.addEventListener('message', function (event) {

            console.log('Received message from server:', event.data);
            let json = JSON.parse(event.data)
            if (json.notify) {
                const msg = "Notification\n" + json.notifyObj.package + "\nText: " + json.notifyObj.text
                notify(msg)
            }
            if (json.files) {
                downloadFiles(json.files)
                // downloadFileAtURL(json.files[0])
            }

        });

        socket.addEventListener('close', function (event) {
            console.log('Connection closed:', event);
            notify("Connection closed")

        });
    }
    const notify = (text) => {

        setMsg(text)
        setOpen(true)
    }

    React.useEffect(() => {


        sessionStart()
    }, [])


    // login().then((data) => {
    //     console.log("login", data)
    //     if (!data.auth)
    //         return <Redirect to="/login" />;
    // })

    // Retrieve token from local storage

    const savedToken = sessionStorage.getItem('token');
    if (!savedToken) {
        return <Redirect to="/login" />;
    } else {
        // getRefreshToken()
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Paper className={classes.rootHome}>

            <CssBaseline />
            <PrimaryAppBar />
            <div className={classes.main}>
                <FileManager path={path} setPath={setPath} />
                <Sidebar />
            </div>




            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {msg}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default Home;