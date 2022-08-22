 
import React, { useEffect, useState } from "react";
import {Settings, Bookmark, Update} from '@mui/icons-material/';  
import Modal from '@mui/material/Modal';
import EditPost from '../Dialog/EditPost';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactSession } from 'react-client-session';
import "./post.css";
import { toast } from "react-toastify";
var axios = require('axios');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper', 
  boxShadow: 24, 
};
export default function PostMenu({data}) {  
  console.log(data)
  ReactSession.setStoreType("localStorage");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    handleCloseMenu();
    setOpen(true);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => setOpen(false);

  const bookmarkSubmit = () => { 
    handleCloseMenu();

    var params = JSON.stringify({
      "postId": data.id,
      "userid": ReactSession.get("user")?.id
    });

    var config = {
      method: 'post',
      url: 'https://rbandoy.site/bookmark/createBookmark',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : params
    };

    axios(config)
    .then(function (response) {
      toast(response.data.message);
    })
    .catch(function (error) {
      toast(error.response.data);
      console.log(error.response.data);
    }); 
  }

  return (
    <> <Settings
    id="demo-positioned-button"
    aria-controls={open ? 'demo-positioned-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={openMenu ? 'true' : undefined}
    onClick={handleClick}
    className="postMenu"
    /> 
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {ReactSession.get("user")?.id == data.userId ? ( 
                 <MenuItem onClick={handleOpen}><Update /> Update</MenuItem>
        ) : ""} 
        <MenuItem onClick={bookmarkSubmit}><Bookmark />Bookmark this</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Close</MenuItem>
    </Menu>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style}>
        <EditPost data={data} />
      </div>
      {/* <img style={style} src={tmpImg} /> */}
    </Modal></> 
  )
}