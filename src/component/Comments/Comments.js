import * as React from 'react';

import Box from '@mui/material/Box';  
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ReactSession } from 'react-client-session';
import "./comment.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Comments({data}) {
 
  ReactSession.setStoreType("localStorage");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="comment_container">
       
      <List sx={{ width: '100%', maxWidth: "100%", margin: "5px", bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={data.image} />
              </ListItemAvatar>
              
              <ListItemText
             
                primary={
                  <div>
                    <strong >{data.fname}</strong><small style={{"textTransform": "UPPERCASE", "fontSize": "12px"}}> {data.createdAt}</small>
                  </div> 
                 }
                secondary={
                  <React.Fragment>
                    {ReactSession.get("user")?.id == data.userId ? (
                      <div>
                        <label style={{ marginRight: "4px" }}>edit</label>
                        <label style={{ marginRight: "4px" }}>delete</label>
                    </div> 
                    ):""} 
                     <br></br>
                     { 
                      showMore ? data.commentDetails : data.commentDetails.substring(0, 100)
                     }
                     <br></br>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    > 
                      {
                        data.commentDetails.length > 100 ?
                        <label onClick={() => setShowMore(!showMore)} className="showMore">
                          {
                            showMore ?  "Hide":"Show More"
                          } 
                        </label>
                        :""
                      } 
                    </Typography>
                   
                  </React.Fragment>
                }
              />
              
            </ListItem>  
            <Divider variant="inset" component="li" /> 
          </List>
      
   
    </div>
   
  )
}