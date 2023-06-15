import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Folder, InsertDriveFile } from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import theme from '../theme';


const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const FileBrowser = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  
    useEffect(() => {
        axios.get('http://192.168.29.92:8001/files', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdWRpZW5jZSIsImlzcyI6ImVudmlyb25tZW50LmNvbmZpZy5wcm9wZXJ0eSgpLmdldFN0cmluZygpIiwiZXhwIjoxNzE0NzU5NzUwLCJ1c2VySWQiOiJzdWJoYW0xIn0.V5mQ21GXhyp6YzKPmG1FrC1bpjhOJ491eNgChGz2q_I',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.data)
          .then(data => setFiles(data))
          .catch(error => console.log(error));
      }, []);
  

  const handleClick = (file) => {
    // handle click on file here
  };

  return (
    <div className={classes.root}>
      <List>
        {files.map(file => (
          <ListItem button key={file.name} onClick={() => handleClick(file)}>
            <ListItemIcon>
              {file.type === 'directory' ? <Folder /> : <InsertDriveFile />}
            </ListItemIcon>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FileBrowser;