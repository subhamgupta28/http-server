import React, { useEffect } from 'react';
import { Breadcrumbs, Button, Drawer, Grid, Link, List, ListItem, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import host, { getFiles, getFolderContent, getFolderList } from "../api";
import ContentCard from './ContentCard';
import Viewer from './Viewer';
import { Folder } from '@mui/icons-material';
import theme from '../theme';

const drawerWidth = 300;

const useStyles = makeStyles({
  rootFileManager: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    paddingTop: theme.spacing(6),
    overflow: 'auto',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
    padding: theme.spacing(3),

  },
  breadcrum: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  }
});

function FileManager({ path, setPath }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({})
  const [fileList, setFileList] = React.useState([])
  const [folders, setFolders] = React.useState([]);
  const [breadCrum, setBreadCrum] = React.useState([])
  const [currentTab, setCurrentTab] = React.useState("")
  const [disabled, setDisabled] = React.useState(false)
  const [idx, setIdx] = React.useState(0)
  let count = 0;



  const get = () => {
    getFolderList()
      .then(response => response.data)
      .then(data => setFolders(data))
      .catch(error => {
        if (count < 5) {
          get()
          count++;
        }
        // get()

        console.log(error)
      });
  }

  useEffect(() => {
    get()
  }, []);
  const getData = (files) => {
    if (Object.keys(files).length !== 0) {
      const root = files.root
      const path = Object.keys(files)[0]
      // setPath(path)
      const folders = Object.keys(files[path])
      setFileList(files[path][root])
      const mp = folders?.filter((it) => it !== root).map((t) => ({ filename: t, size: Object.keys(files[path][t]).length }))
      setFolders(mp)
    }

  };
  const fetchFolder = (path) => {
    getFolderContent(path)
      .then(response => response.data)
      .then(data => {
        getData(data)
      })
      .catch(error => console.log(error));
  }
  React.useEffect(() => {
    if (path) {
      fetchFolder(path)
      setBreadCrum(["Root", ...path.split(".")])
      if (breadCrum.length > 0)
        setDisabled(currentTab === breadCrum[breadCrum.length - 1])
    }

  }, [path])


  const handleFolder = (e) => {
    console.log("e", e)
    setCurrentTab(e)

    if (e) {
      console.log("path", path)
      if (path) {
        setPath(prev => prev + "." + e)
      } else {
        setPath(e)
      }
    }
  }

  const handlePath = (p) => {
    console.log("p", p)
    if (p === "Root") {
      setPath("")
      setFileList([])
      get()
    } else
      setPath(p)

  }

  const handleOpen = (data, idx) => {
    setData(data)
    setIdx(idx);
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(!open)
    console.log("close")
  }

  return (
    <div className={classes.rootFileManager}>
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {/* <Toolbar /> */}
          <div className={classes.drawerContainer}>

            <List>
              {folders.map((text, index) => (

                <ListItem button key={text.filename} onClick={() => handleFolder(text.filename)}>
                  <ListItemIcon> <Folder /></ListItemIcon>
                  <ListItemText primary={text.filename + " (" + text.size + ")"} />
                </ListItem>

              ))}
            </List>
          </div>
        </Drawer>
      </div>

      <>
        <main className={classes.content}>

          <Breadcrumbs className={classes.breadcrum}>
            {breadCrum.map((it) => (
              <Link color="textPrimary" onClick={() => handlePath(it)}>{it}</Link >
            ))}

          </Breadcrumbs>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {fileList?.map((data, idx) => (
                <Grid item xs>
                  <ContentCard data={data} handleOpen={handleOpen} idx={idx} />
                </Grid>
              ))}
            </Grid>
            <Viewer open={open} handleClose={handleClose} fileList={fileList} idx={idx} setIdx={setIdx} />
          </div>
        </main>
      </>

    </div>
  );
}

export default FileManager;