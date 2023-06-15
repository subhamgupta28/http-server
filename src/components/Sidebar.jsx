import { Button, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import Upload from './Upload';
import { deviceInfo } from '../api';
import theme from '../theme';

const useStyles = makeStyles({
    sidebarRoot: {
        width: "100%",
        display: 'flex',
        minHeight: "100vh"
    },
    sidebarContent: {
        flexGrow: 1,
        overflow: "auto",
        padding: theme.spacing(3),
    },
    sidebarPaper: {
        paddingTop: "100px",
        display: "grid",
        width: "100%",
        gridTemplateColumns: "80% 20%"
    }
});

function Sidebar() {
    const classes = useStyles()
    const [info, setInfo] = React.useState({})

    React.useEffect(() => {
        deviceInfo().then((res) => {
            console.log("info", res.data)
            setInfo(res.data)
        })

    }, [])

    return (
        <div className={classes.sidebarRoot}>

            <Paper elevation={3} variant="outlined" className={classes.sidebarPaper} >

                <List>


                    <ListItem >

                        <ListItemText primary={"Battery " + info.battery} />
                    </ListItem>
                    <ListItem>
                        <Upload />
                    </ListItem>


                </List>
            </Paper>
        </div>
    )
}

export default Sidebar