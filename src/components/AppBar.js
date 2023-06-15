import {
    AppBar, Autocomplete, IconButton, InputAdornment, Paper, Slide,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import theme from "../theme";

const appbarstyle = makeStyles({
    root: {
        // width: '100%',
        // flexGrow: 1,

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    grow: {
        flexGrow: 2,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: 6,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    sectionMobile: {
        display: 'flex',
        marginLeft: 10,
        marginRight: 1,

    },
    auto: {
        width: 300,
        position: "relative",
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        // marginTop:10,
        // marginRight:30,

    },
    active: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    di: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
    },
    ro: {

    },
    t: {
        backdropFilter: 'blur(7px)',
    }

});

export default function PrimaryAppBar() {
    const classes = appbarstyle();
    const [open, setOpen] = useState(false);
    const [op, setOp] = useState([]);
    const [search, setSearch] = useState(''); //search value

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div className={classes.root} >
            <AppBar position="fixed" className={classes.appBar} color="transparent" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar variant={'dense'} className={classes.t}>
    
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"

                        href={'/'}
                        aria-label="open drawer"
                    >
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                        <b>Http Server</b>
                    </Typography>
                    <div className={classes.grow}>
                    </div>
                    <div className={classes.search}>
                        <Autocomplete
                            freeSolo
                            id="combo-box-demo"
                            options={op}
                            onChange={(event, newValue) => {
                                console.log(newValue, "new")
                            }}
                            getOptionLabel={(option) => option.label}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    variant={"outlined"}
                                    color={"primary"}
                                    // label={'Search'}
                                    size={"small"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />}
                        />
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton
                            id={"menu_btn"}
                            aria-label="show more"
                            color="inherit"
                            onClick={handleOpen}
                        >
                            <AccountCircle />
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}
