
import { toast } from "react-toastify";
import React from "react"; 
import { ReactSession } from 'react-client-session';
import PasswordStrengthBar from 'react-password-strength-bar';
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import welcome from '../wel.jpg'
import Footer from '../Footer/Footer';
var axios = require('axios');

function Register(){
  ReactSession.setStoreType("localStorage");
  let [submit, setSubmit] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [fname, setFname] = useState("");
  let [mname, setMname] = useState("");
  let [lname, setLname] = useState("");
  let [email, setEmail] = useState("");
  let [contact, setContact] = useState(""); 
  let [profile, setProfile] = useState(""); 

  let navigate = useNavigate();

  if (ReactSession.get("user")) { 
    navigate("/");
  }
 

  const toggle = () => setSubmit(!submit);

  

  let handleSubmit = async (event) => {
    event.preventDefault();  
 
    var data = JSON.stringify({
      "fname": fname,
      "lname": lname,
      "mname": mname,
      "email": email,
      "contactNo": contact,
      "username": username,
      "password": password,
      "image": profile,
      "role": "farmer"
    });
    
    var config = {
      method: 'post',
      url: 'https://backend.agriweb.site/user/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    try {
      let api = await axios(config) 
      if (!api) toast("Unable to connect!"); 
      console.log(JSON.stringify(api))
      if (api.status == "200") { 
        toast(api.data); 
        setTimeout(()=> { 
          navigate("/Login");
        }, 5000)
      } else {
        toast(api.message); 
        setTimeout(()=> { 
          navigate("/Register"); 
        }, 5000) 
      } 
    } catch (error) {
      toast(error.response.data);  
      setTimeout(()=> { 
        navigate("/Register"); 
      }, 5000) 
    }
   
  } 


  return (
    <div className="main-register"> 
    <div className="register-container">   
      <div className="right-side">
         <div className="welcomeNote">
            {/* <h3>Welcome Back,</h3> */}
         </div>
         <div className="welcomeImg">
            <img src={welcome} id="welcome" alt="" />
         </div>
      </div> 
      <div className="left-side">  
        <div className="register-logo">
          <h1>REGISTER ACCOUNT</h1>
          {/* <img src={logo} alt="" id="logo" srcset=""/> */}
        </div>
        <form onSubmit={handleSubmit}>
            <label for="fname">Profile Picture:</label>
            <input placeholder="Paste Image Link" required value={profile} onChange={(e) => setProfile(e.target.value)}  className="registerInput" id="profile" type="text"/>
            <label for="fname">First Name:</label>
            <input placeholder="Enter First Name" required value={fname} onChange={(e) => setFname(e.target.value)}  className="registerInput" id="fname" type="text"/>
            <label for="mname">Middle Name:</label>
            <input placeholder="Enter Middle Name" required value={mname} onChange={(e) => setMname(e.target.value)}  className="registerInput" id="mname" type="text"/>
            <label for="lname">Last Name:</label>
            <input placeholder="Enter Last Name"  value={lname} onChange={(e) => setLname(e.target.value)}  className="registerInput" id="lname" type="text"/>
            <label for="email">Email:</label>
            <input placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)}  className="registerInput" id="email" type="email"/>
            <label for="contact">Contact No:</label>
            <input placeholder="Enter Contact No." required value={contact} onChange={(e) => setContact(e.target.value)}  className="registerInput" id="contact" type="number"/>
            <label for="username">Username:</label>
            <input placeholder="Enter Username" required value={username} onChange={(e) => setUsername(e.target.value)} className="registerInput" id="username" type="text"/>
            <label for="password">Password:</label>
            <input placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password"/>
            <PasswordStrengthBar password={password} />
            <button id="register" disabled={submit}  style={{background: submit ? "red": ""}} >REGISTER</button>
        </form> 
        <div className="footer">
          <h4> Already have an account? <Link to="/Login">Login Here!</Link></h4>
        </div>
      </div> 
    </div>  
  <Footer />
  </div> 
  )
}

export default Register;
