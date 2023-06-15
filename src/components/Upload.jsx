import { Backdrop, Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'
import { uploadFiles } from '../api';
import theme from '../theme';

const useStyles = makeStyles({
    dropzone: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        border: "4px dashed rgb(117, 112, 112)",
        padding: "20px",
        borderRadius: 12
    },
    media: {
        height: 140,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

function Upload(props) {
    const classes = useStyles()
    const [files, setFiles] = useState([])
    const [hide, setHide] = useState(false)
    const inputRef = useRef()

    const handleDrag = (event) => {
        event.preventDefault()

    }
    const handleDrop = (event) => {
        event.preventDefault()
        console.log(event.dataTransfer.files)
        setFiles(event.dataTransfer.files)
    }

    React.useEffect(() => {
        if (files.length > 0) {
            const fileList = []
            for (let i = 0; i < files.length; i++) {

                fileList.push(files[i])
            }
            console.log("fileList", fileList)
            setHide(true)
            uploadFiles(fileList).then((res) => {
                setHide(!res.data.success)
            })
        }
    }, [files])


    return (
        <>
            <div
                className={classes.dropzone}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type='file'
                    multiple
                    onChange={(event) => setFiles(event.target.files)}
                    hidden
                    ref={inputRef}
                />
                <Button onClick={() => inputRef.current.click()}>
                    Upload Files
                </Button>
                {hide ? <CircularProgress color="secondary" /> : ""}

            </div>



        </>

    )
}


export default Upload