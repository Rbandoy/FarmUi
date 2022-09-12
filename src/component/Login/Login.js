import React from "react";
import './login.css';
import { useState } from "react";
import { Link, useNavigate, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../r.jpg'
import welcome from '../wel.jpg'
import { ReactSession } from 'react-client-session';



function Login(){
  ReactSession.setStoreType("localStorage");
  
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let navigate = useNavigate();

  if (ReactSession.get("user")) {
    navigate("/");
  }

  let handleSubmit = async (event) => {
    event.preventDefault(); 
    var axios = require('axios');
    var data = JSON.stringify({
      "username": username,
      "password": password
    });

    var config = {
      method: 'post',
      url: 'https://backend.agriweb.site/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    try { 
      let api = await axios(config);
      if (api.status == "200") { 
        console.log(api)
        toast(api.data.message); 
        ReactSession.set("user", api.data.meta);
        setTimeout(()=> {   
          navigate("/");
          window.location.reload();
        }, 5000)
      } else {
        toast(api.data); 
        setTimeout(()=> { 
          navigate("/Login"); 
        }, 5000)
      }  
    } catch (error) {
      toast(error.response.data.message);  
    }
 
  } 

  return (
    <div className="main-login"> 
      <div className="login-container">   
        <div className="left-side">  
          <div className="logo">
            <h1 className="login">Login</h1>
            {/* <img src={logo} alt="" id="logo" srcset=""/> */}
          </div>
          <form onSubmit={handleSubmit}>
              <label for="username">Username:</label>
              <input placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text"/>
              <label for="password">Password:</label>
              <input placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password"/>
              <button id="login">Login</button>
          </form>
          <div className="footer">
            <h4>Don't Have an Account? <Link to="/Register">Register Here!</Link></h4>
          </div>
        </div> 
        <div className="right-side">
           <div className="welcomeNote">
              <h3>Welcome Back,</h3>
           </div>
           <div className="welcomeImg">
              <img src={welcome} id="welcome" alt="" />
           </div>
        </div> 
      </div> 
   
    </div>
  )
}

export default Login;
