import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Info';
import Farmer from '@mui/icons-material/Face';
import Post from '@mui/icons-material/Check';
import Email from '@mui/icons-material/Email'; 
import { ReactSession } from 'react-client-session';
import Divider from '@mui/material/Divider';

export default function Profile({data}) {
  ReactSession.setStoreType("localStorage");
  console.log(data)
  return (<>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem> 
        <ListItemText primary="Profile" secondary="" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Farmer />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ReactSession.get("user").role} secondary="Role" />
      </ListItem>
      <ListItem> 
        <ListItemAvatar>
          <Avatar className="" src={ReactSession.get("user")?.image}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={ReactSession.get("user").fname} secondary={ReactSession.get("user").createdAt} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Email />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ReactSession.get("user").email} secondary="Email" />
      </ListItem> 
      <Divider />
    </List> 

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <ListItem>  
      <ListItemText primary="Your Post" secondary="" />
    </ListItem>
    {
      data.map((item,key) => {
        return item.userId == ReactSession.get("user").id ? (<>
        <ListItem> 
          <ListItemAvatar>
            <Avatar>
              <Post />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.postHeaderText} secondary={item.createdAt} />
        </ListItem> 
        <Divider /></>
        ) : ""
      })
    }
    
    </List> </>
  );
}
