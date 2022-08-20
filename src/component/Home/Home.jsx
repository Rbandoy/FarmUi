import React, { useEffect, useState } from "react";

import { ReactSession } from 'react-client-session';
import { 
  useParams
} from "react-router-dom";
import Post from "../Post/Post";
var axios = require('axios'); 

function Home() {

  let { post_id } = useParams();

  ReactSession.setStoreType("localStorage");
  let [post, setPost] = useState([]); 
  useEffect(() => { 
    var config = {
      method: 'get',
      url: ReactSession.get("user")?.role == undefined ? `https://rbandoy.site/post/postList/${post_id != undefined ? post_id : ""}` : ReactSession.get("user")?.role == 'admin' ? `https://rbandoy.site/post/postListApproval/${post_id != undefined ? post_id : ""}`:`https://rbandoy.site/post/postList/${post_id != undefined ? post_id : ""}`,
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