import React, { useEffect, useState } from "react";

import { ReactSession } from 'react-client-session';
// import { toast } from "react-toastify";
import Post from "../Post/Post";
var axios = require('axios'); 

function Home() {
  ReactSession.setStoreType("localStorage");
  let [post, setPost] = useState([]); 
  useEffect(() => { 
    var config = {
      method: 'get',
      url: ReactSession.get("user")?.role == 'admin' ? `http://67.205.180.60:5000/post/postListApproval`:`http://67.205.180.60:5000/post/postList`,
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
    <div style={{padding: "10px", margin: "10px", paddingBottom: "30px"}}>  
        { 
          post.length > 0 ? ( post.map((item, key) => {  
            return <Post data={item} key={key}/>
          }) ) : ( <div>No post available!</div>) 
        }  
    </div>
  )
}

export default Home;