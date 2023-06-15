import React, { useCallback, useContext, useState } from "react";


import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import { Redirect } from "react-router-dom";
import {makeStyles} from '@mui/styles';
import { Alert } from "@mui/material";

import {
    login,
    wsHost
} from "../api";
import theme from "../theme";


const useStyles = makeStyles({
    app: {
        width: "100%",
        height: "100vh",
        flexDirection: 'column',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    },
    paper: {
        paddingTop: theme.spacing(2),
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        // backgroundColor: 'rgba(180, 180, 255, 0.01)',
        // backdropFilter: 'blur(7px)',
        // boxShadow:
        //     "0px 0px 30px 1px rgba(70,70,70,0.8)",
        borderRadius: 20,
        // borderLeft: 'solid 1px rgba(255, 255, 255, 0.3)',
        // borderTop: 'solid 1px rgba(255, 255, 255, 0.3)',
    },
    avatar: {
        margin: theme.spacing(1),

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: "contents"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    item: {
        borderRadius: 10,
        margin: 10,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        paddingTop: 100,
        padding: theme.spacing(14),
    }
});
function encrypt(message, shift) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (char.match(/[a-z]/i)) {
            let baseChar = char === char.toUpperCase() ? 'A' : 'a';
            let shiftedChar = String.fromCharCode(((char.charCodeAt() - baseChar.charCodeAt() + shift) % 26) + baseChar.charCodeAt());
            encryptedMessage += shiftedChar;
        } else {
            encryptedMessage += char;
        }
    }
    return encryptedMessage;
}

export default function Login() {

    const classes = useStyles();
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState(undefined);
    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState("")
    const [qrcode, setQrcode] = useState("")


    const handleLogin = async () => {

        setHide(true);
        if (password) {

            const params = {
                "password": encrypt(password, 10),
                "browserName": window.navigator.appName,
                "browserVersion": window.navigator.appVersion,
                "osName": window.navigator.platform,
                "osVersion": window.navigator.userAgent,
                "isMobile": false,
                "token": ""
            }

            console.log(wsHost)
            const socket = new WebSocket("ws://" + wsHost + "/auth?auth=1");

            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify(params));
                console.log("open")
                setMsg("Accept in the app to login")
                setOpen(true)
            });

            socket.addEventListener('message', function (event) {

                console.log('Received message from server:', event.data);
                const data = JSON.parse(event.data)
                if (data.status === "AUTHENTICATED") {
                    sessionStorage.setItem('token', data.token);
                    setUser(data)
                    setMsg("AUTHENTICATED")
                    login(encrypt(password, 10)).then((data) => {
                        console.log("login", data)
                    })
                    setOpen(true)
                }
            });

            socket.addEventListener('close', function (event) {
                console.log('Connection closed:', event);
                if (event.reason === "rejected") {
                    setHide(false);
                    setMsg("You rejected")
                    setOpen(true)
                }
                if (event.reason === "invalid_password") {
                    setHide(false);
                    setMsg("Wrong credentials")
                    setOpen(true)
                }

            });
        }
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    if (user) {
        return <Redirect to="/" />;
    }
    return (
        <div className={classes.app}>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.container}>

                <Paper className={classes.paper} elevation={6} variant="outlined">
                    <Typography>
                        Login
                    </Typography>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            size="small"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            className={classes.submit}
                        >
                            LogIn

                        </Button>

                        {/* <QRCode
                            title="GeeksForGeeks"
                            value={qrcode}
                            style={{
                                height: "auto",
                                maxWidth: "200px",
                                width: "200px",
                                paddingTop: "20px"
                            }}
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            level='Q'
                            viewBox={`0 0 256 256`}
                        /> */}
                    </div>
                </Paper>

                <Backdrop className={classes.backdrop} open={hide}>
                    <CircularProgress color="secondary" />
                </Backdrop>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {msg}
                    </Alert>
                </Snackbar>

            </Container>
        </div>
    );
}