import {  
  Routes,
  Route
 } from "react-router-dom"; 
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import { ReactSession } from 'react-client-session';
import Post_Edit from "./component/Post/Post_Edit";

function Routers(){
  ReactSession.setStoreType("localStorage");
  return (
    <div style={{height: "85vh"}}> 
      {
        ReactSession.get("user")? ( 
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/post/:post_id" element={<Home />}/>
            <Route path="/post_edit/" element={<Post_Edit />}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="*" element={<div>Page Not Found!</div>}/>
          </Routes> 
      ) : ( 
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/Register" element={<Register/>}/>
              <Route path="/Login" element={<Login/>}/>
              <Route path="*" element={<div>Page Not Found!</div>}/>
            </Routes> 
        )
      }
    </div>)
 }

 export default Routers;