import React from 'react';
import ContentCard from './ContentCard';

import Viewer from './Viewer';
import { Grid, Toolbar } from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
});

export default function FileCard({ files, setFolders, path, setPath }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({})
    const [folder, setFolder] = React.useState([])
    const [fileList, setFileList] = React.useState([])
    

    React.useEffect(() => {
        console.log("path--", path, files)
        if (Object.keys(files).length !== 0) {
            const path = Object.keys(files)[0]
            setPath(path)
            const folders = Object.keys(files[path])
            console.log("keys", path, folders)
            console.log(files[path])
            setFileList(files[path][path])
            const mp = folders?.map((t) => ({ filename: t, size: Object.keys(files[path][t]).length }))
            console.log("folder", mp)
            setFolders(mp)
        }

    }, [])
    const handleOpen = (data) => {
        setData(data)
        setOpen(true)

    }
    const handleClose = () => {

        setOpen(!open)

        console.log("close")
    }

    return (
        <>
            <Toolbar />
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {fileList.map((data) => (
                        <Grid item xs>
                            <ContentCard data={data} handleOpen={handleOpen} />
                        </Grid>
                    ))}
                </Grid>
                <Viewer data={data} open={open} handleClose={handleClose} />
            </div>

        </>
    );
}
