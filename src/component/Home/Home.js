import React, { useEffect, useState } from "react";
import './home.css'
import { ReactSession } from 'react-client-session';
import { 
  useParams
} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; 
import Post from "../Post/Post"; 
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";
import Box from '@mui/material/Box';
var axios = require('axios'); 

function Home() {
  let [searchText, setSearch] = useState("");
  console.log(searchText)

   
  let { post_id } = useParams();

  ReactSession.setStoreType("localStorage");
  let [post, setPost] = useState([]); 
  useEffect(() => { 
    getPost()
  }, []);
  console.log("home")
  let getPost = (e) => {
    setSearch(e); 
    console.log(e)
    var config = {
      method: 'get',
      url: ReactSession.get("user")?.role == undefined ? `http://localhost:5000/post/postList/${e != undefined ? e : ""}` : ReactSession.get("user")?.role == 'admin' ? `http://localhost:5000/post/postListApproval/${e != undefined ? e : ""}`:`http://localhost:5000/post/postList/${e != undefined ? e : ""}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      setPost(response.data.meta); 
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
  return (
    <>
    <Grid container spacing={2}>
   
      <Grid item xs={ ReactSession.get("user") ? 8: 12}>
 
      <div style={{ padding: "10px", marginLeft: "5rem", paddingBottom: "30px" }}> 
        {post.length > 0 ? (post.map((item, key) => {
          return <><Post data={item} key={key} /></>;
        })) : (<div>No post available!</div>)}
        <Box style={{
          position: 'fixed', 
          top: 70,
          width: "25rem"
        }} sx={{ '& > :not(style)': { m: 1 } }}>
         <TextField 
          id="outlined-textarea"
          label="Search Here!"
          placeholder="Search" 
          onChange={(e) => getPost(e.target.value)}
          value={searchText}
        />
            <br></br>Result/s:<label>{post.length}</label>
        </Box>
      </div>
      </Grid>
      
      {  
        ReactSession.get("user") ? 
        <Grid item xs={4}>
          
          <div className="profile">
             <Profile data={post}/>
          </div>
        </Grid> 
        : ''
      }
     
    </Grid>
   
    <Footer />   
    </>
  )
}

export default Home;
