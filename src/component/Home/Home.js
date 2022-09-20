import React, { useEffect, useState } from "react";
import './home.css'
import { ReactSession } from 'react-client-session';
import { 
  useParams
} from "react-router-dom";
import Grid from '@mui/material/Grid'; 
import Post from "../Post/Post"; 
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";
var axios = require('axios'); 

function Home() {

  let { post_id } = useParams();

  ReactSession.setStoreType("localStorage");
  let [post, setPost] = useState([]); 
  useEffect(() => { 
    var config = {
      method: 'get',
      url: ReactSession.get("user")?.role == undefined ? `https://backend.agriweb.site/post/postList/${post_id != undefined ? post_id : ""}` : ReactSession.get("user")?.role == 'admin' ? `https://backend.agriweb.site/post/postListApproval/${post_id != undefined ? post_id : ""}`:`https://backend.agriweb.site/post/postList/${post_id != undefined ? post_id : ""}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      setPost(response.data.meta); 
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);
 
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={ ReactSession.get("user") ? 8: 12}>
      <div style={{ padding: "10px", margin: "10px", paddingBottom: "30px" }}>
        {post.length > 0 ? (post.map((item, key) => {
          return <Post data={item} key={key} />;
        })) : (<div>No post available!</div>)}
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
