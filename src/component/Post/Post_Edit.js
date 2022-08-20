import { Avatar, ListItem, ListItemText, ListItemAvatar, TextField, Button } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from "react";
import "./post.css"
import Comments from "../Comments/Comments"; 
import { ReactSession } from 'react-client-session';
import Divider from '@mui/material/Divider';
import { toast } from "react-toastify";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'; 
import Approve from '@mui/icons-material/Approval'; 
import Remove from '@mui/icons-material/Delete'; 
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Gallery from "../Gallery/Gallery"; 

export default function Post_Edit({data}) {  
  ReactSession.setStoreType("localStorage");

  let [comments, setComments] = useState([]); 
  let [images, setImages] = useState([]); 
  let [comment, setComment] = useState(""); 
  const [showMore, setShowMore] = React.useState(false);

  // useEffect(() => { 
  //   var axios = require('axios'); 
  //   var config = {
  //     method: 'get',
  //     url: `http://67.205.180.60:5000/fetchComment/commentList/${data.id}`,
  //     headers: { }
  //   };
    
  //   axios(config)
  //   .then(function (response) { 
  //     setComments(response.data.meta); 
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   var config2 = {
  //     method: 'get',
  //     url: `http://67.205.180.60:5000/images/postImage/${data.id}`,
  //     headers: { }
  //   };
    
  //   axios(config2)
  //   .then(function (response) { 
  //     setImages(response.data.meta);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
    
  // }, []);

  let handleSubmit = (e, postId) => { 
    e.preventDefault();
    var axios = require('axios');
    var data = JSON.stringify({
      "postId": postId,
      "commentDetails": comment,
      "userId": ReactSession.get("user")?.id
    });

    var config = {
      method: 'post',
      url: 'https://rbandoy.site/fetchComment/addComment',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      toast(response.data.message); 
      setTimeout(()=> {  
        window.location.reload();
      }, 2000)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const approvePost = (e, data) => {
    e.preventDefault();
    var axios = require('axios');
    var data = JSON.stringify({
      "postId": data,
    });

    var config = {
      method: 'post',
      url: 'https://rbandoy.site/post/approvePost',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) { 
      toast(response.data.message); 
      setTimeout(()=> {  
        window.location.reload();
      }, 2000)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const rejectPost = (e, data) => {
    e.preventDefault();
    var axios = require('axios');
    var data = JSON.stringify({
      "postId": data,
    });

    var config = {
      method: 'post',
      url: 'https://rbandoy.site/post/rejectPost',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) { 
      toast(response.data.message); 
      setTimeout(()=> {  
        window.location.reload();
      }, 2000)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  let x = 0;
  let commentSubmit = comment.length === 0; 

  return (
    <><div className="post_container">
      <div className="post">
        <div className="post_header">
          <ListItem>
            <ListItemAvatar>
              <Avatar className="post_avatar" src={data?.image}></Avatar>
            </ListItemAvatar>
            {/* <ListItemText primary={<strong><a style={{ textDecoration: "underline", color: "lightgreen", cursor: "pointer" }}>{data.fname.toUpperCase()}</a></strong>} secondary={data?.role + " - " + data?.createdAt} /> */}
            {/* {ReactSession.get("user")?.id == data.userId ? (
              <div>
                <label style={{ marginRight: "4px" }}><small style={{ "textTransform": "UPPERCASE", "fontSize": "12px" }}> edit </small></label>
                <label style={{ marginRight: "4px" }}><small style={{ "textTransform": "UPPERCASE", "fontSize": "12px" }}> delete </small></label>
              </div>
            ) : ""}

            {
              ReactSession.get("user")?.role != undefined ?
              ReactSession.get("user")?.role == 'admin' ? ( 
                  <><Button
                  style={{margin: "2px"}}
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<Approve />}
                  onClick={e => approvePost(e, data.id)}
                >
                  Approve
                </Button><Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<Remove />}
                  onClick={e => rejectPost(e, data.id)}
                >
                    Reject
                  </Button></>  ) : "" : ""
            } */}
          </ListItem>
          <Divider />
          {/* <ListItem>
            <ListItemText
              primary={<div>
                <strong>{data.postHeaderText}</strong>
              </div>}
              secondary={<React.Fragment>
                <br></br>
                {showMore ? data?.postDetails : data?.postDetails.substring(0, 100)}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  contentEditable={true}
                >
                  {data?.postDetails.length > 100 ?
                    <label onClick={() => setShowMore(!showMore)} className="showMore">
                      {showMore ? " hide" : " show more"}
                    </label>
                    : ""}
                </Typography>

              </React.Fragment>} />
          </ListItem> */}
          <Divider />
          <div className="post-image-container">
            <Gallery images={images} />
          </div>

          <Divider />
          {
            ReactSession.get("user")?.role !== undefined ? 
            ReactSession.get("user")?.role === 'admin' ? "" : 
            <div className="post_comment">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItemText secondary={"comments: " + comments.length} />

                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography>
                    <ImageList sx={{ width: 500, height: 342 }} cols={1} rowHeight={164}>
                      <ImageListItem>
                        {comments.map((item) => {
                          return <Comments data={item} />;
                        })}
                      </ImageListItem>
                    </ImageList>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div> : <div className="post_comment">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItemText secondary={"comments: " + comments.length} />

                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography>
                    <ImageList sx={{ width: 500, height: 342 }} cols={1} rowHeight={164}>
                      <ImageListItem>
                        {comments.map((item) => {
                          return <Comments data={item} />;
                        })}
                      </ImageListItem>
                    </ImageList>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          }
          {/* {
          
          ReactSession.get("user")?.role != undefined ?
          ReactSession.get("user").role === 'admin' ? "":
          ReactSession.get("user") ?
            <form className="form_comment" onSubmit={(e) => handleSubmit(e, data.id)}>
              <Avatar className="" src={ReactSession.get("user")?.image}></Avatar>
              <TextField
                label="add comment"
                size="small"
                variant="outlined"
                className="post_input"
                onChange={(e) => setComment(e.target.value)}
                placeholder="add comment" />
              <Button
                style={{ "marginLeft": "10px" }}
                variant="contained"
                size="medium"
                disabled={commentSubmit}
                endIcon={<SendIcon />}
                type="submit"
              >SEND</Button>
            </form> : "" : ""
          } */}
        </div>
      </div>
    </div></> 
  )
}