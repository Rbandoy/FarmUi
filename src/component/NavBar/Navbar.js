import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {FaBars, FaTimes} from "react-icons/fa"
import "./navbar.css";
import { ReactSession } from 'react-client-session';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import Fabutton from '../Fab/Fabutton';
import Bookmark from "./Bookmarks";  
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper', 
  boxShadow: 24, 
};
export default function Navbar() {
  ReactSession.setStoreType("localStorage");
  let navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [open, setOpenModal] = React.useState(false);
  const handleOpen = () => { 
    setOpenModal(true);
  }

  const navMenu = [
    {
      path: "/",
      name: "Home"
    }, 
    {
      path: "Login",
      name: "Login"
    },
    {
      path: "Register",
      name: "Register"
    }, 
  ];

 
  const toggle = () => setOpen(!isOpen);

  const logout = () => {
    ReactSession.remove('user');
    navigate("/Login");
    window.location.reload(false);
  }


 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    toggle();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <><nav>
      <label className="logoNav">
        {ReactSession.get("user")?.image ? (
          <><NavLink to="/">
            <Avatar className="" src={ReactSession.get("user")?.image}></Avatar>
          </NavLink>
            <Fabutton /></>
        ) : <NavLink to="/">FARM </NavLink>}
      </label>
      <label className="userName">{ReactSession.get("user") ? ReactSession.get("user").fname : ""}</label>
      <div className="bars">
        {isOpen ? <FaTimes onClick={toggle} /> : <FaBars onClick={toggle} />}
      </div>
      <div className="menu" style={{ left: !isOpen ? "-100%" : "0" }}>
        {/* <label>{ReactSession.get("user") ? ReactSession.get("user").email: ""}</label> */}
        <Stack spacing={2} direction="row">
          {ReactSession.get("user") ? (
            <><NavLink 
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick} 
              to={"/"}>
              <div className="list_item"><Button variant="text">Bookmarks</Button></div>
            </NavLink>
              <NavLink onClick={logout} to={"Login"}>
                <div className="list_item"><Button variant="text">Logout</Button></div>
              </NavLink></>
          ) : navMenu.map((item) => {
            return (
              <NavLink onClick={toggle} to={item.path} key={item.name}>
                <div className="list_item"><Button variant="text">{item.name}</Button></div>
              </NavLink>
            );
          })}
        </Stack>

      </div>
    </nav> 
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        style={{
          width: "600px",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
      > 
        <MenuItem disabled>Bookmarks</MenuItem>
        <Bookmark data={ReactSession.get('user')?.id}/> 
       
      </Menu>
      </>
  )
}