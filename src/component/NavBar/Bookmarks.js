import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles'; 
import { toast } from "react-toastify";
import { MenuItem } from "@material-ui/core";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import View from '@mui/icons-material/Details'; 

var axios = require('axios');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Bookmarks({data}) {
  console.log("bookmark",data);

  let [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {  

    var config = {
      method: 'get',
      url: 'https://rbandoy.site/bookmark/bookmarkList/1',
      headers: { },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setBookmarks(response.data.meta);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);
  
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="bookmarks"> 
       <Stack style={{padding: "10px"}} direction="column" spacing={2}>
        { bookmarks.length > 0 ? 
          bookmarks.map((item, key) => { 
            // return <Item>{item.postId}</Item>
            return <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >  
              <Typography>{item.postHeaderText}</Typography>
            
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {item?.postDetails.substring(0, 100)}...  
                <small  className="viewDetails"> 
                Show More <View/>
              </small>
              </Typography>
             
            </AccordionDetails> 
          </Accordion>
          }) : <div>No Bookmarks</div>
        }  
        </Stack>
    </div>
  )
}