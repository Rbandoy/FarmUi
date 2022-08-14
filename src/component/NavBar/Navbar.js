import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {FaBars, FaTimes} from "react-icons/fa"
import "./navbar.css";
import { ReactSession } from 'react-client-session';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import Fabutton from '../Fab/Fabutton';

export default function Navbar() {
  ReactSession.setStoreType("localStorage");
  let navigate = useNavigate();
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

  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

  const logout = () => {
    ReactSession.remove('user');
    navigate("/Login");
    window.location.reload(false);
  }
 
  return (
    <nav> 
      <label className="logoNav">
        {
          ReactSession.get("user")?.image ? (
            <><NavLink to="/">
              <Avatar className="" src={ReactSession.get("user")?.image}></Avatar>
            </NavLink>
            <Fabutton /></>  
          ) : <NavLink to="/">FARM </NavLink>    
        }
      </label>
      <label className="userName">{ReactSession.get("user") ? ReactSession.get("user").fname: ""}</label>
      <div className="bars">
        {isOpen ? <FaTimes onClick={toggle}/>: <FaBars onClick={toggle}/>}
      </div> 
      <div className="menu" style={{left: !isOpen ? "-100%": "0"}}> 
        {/* <label>{ReactSession.get("user") ? ReactSession.get("user").email: ""}</label> */}
        <Stack spacing={2} direction="row">  
        {
          ReactSession.get("user") ? (
            <NavLink onClick={logout} to={"Login"}>
              <div className="list_item"><Button variant="text">Logout</Button></div>
            </NavLink> 
          ): navMenu.map((item)=>{ 
            return (
              <NavLink onClick={toggle} to={item.path} key={item.name}>
                <div className="list_item"><Button variant="text">{item.name}</Button></div>
              </NavLink>
            )
          }) 
        }
        </Stack>
     
      </div>
    </nav>
  )
}