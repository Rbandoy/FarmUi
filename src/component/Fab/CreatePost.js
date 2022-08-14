import React, { useState } from "react";
import { ReactSession } from 'react-client-session';
import { Container, TextField, makeStyles, IconButton, Button } from "@material-ui/core";
import { Add, Remove, PostAdd } from '@mui/icons-material';  
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': { 
      margin: theme.spacing(1), 
    },
    background: "whitesmoke",
    borderRadius: "5px 10px 5px 10px",
    width: "100%"
  }, 
  button: {
    margin: theme.spacing(1)
  },
  h1: {
    margin: theme.spacing(1)
  }
}))

export default function CreatePost() {
  ReactSession.setStoreType("localStorage");
  let navigate = useNavigate();
  const classes = useStyle();
  const [inputField, setInputField] = useState([
    { 
      image: ""
    }, 
  ]);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleInputChange = (index, e) => {
    const value = [...inputField];
    value[index][e.target.name] = e.target.value;
    setInputField(value); 
  }

  const handleAddField = () => {
    if (inputField.length < 5) {
      setInputField([...inputField, { image: "" }])
    } 
  }

  const handleRemoveField = (index) => {
    if (index != 0) {
      const value = [...inputField];
      value.splice(index, 1);
      setInputField(value)
    }
  }

  const submitPost = async (e) => {
    e.preventDefault();
    var axios = require('axios');
    var data = JSON.stringify({
      "title": title,
      "details": details,
      "userId": ReactSession.get("user").id,
      "image": inputField
    });
    console.log(data)
    var config = {
      method: 'post',
      url: 'http://localhost:5000/post/createPost',
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


  return (
    <Container> 
      <form className={classes.root} onSubmit={submitPost}>
        <h1 className={classes.h1}>Create Post</h1>
        {
          inputField.map((field, index) => {
            return <div key={index}>
              <TextField  
                name="image" 
                label="Input Image"  
                variant="filled"
                value={field.image}
                onChange={e => handleInputChange(index, e)}
                />     
               <IconButton
                  onClick={() => handleRemoveField(index)}
                >
                  <Remove />
               </IconButton>
               <IconButton 
                  onClick={() => handleAddField()}
                >
                  <Add />
               </IconButton>
            </div>
          })
        }
        <div> 
        <TextField  name="Input Post Details" label="Title"  variant="filled" value={title} onChange={e => setTitle(e.target.value)}/> 
        <TextField
          label="Post Details" 
          style={{textAlign: 'left'}}
          hintText="Post Details" 
          multiline
          rows={8}
          variant="filled"
          value={details}
          onChange={e => setDetails(e.target.value)}
        /> 
        </div>
        <Button 
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<PostAdd />}
          onSubmit={submitPost}
          >
          Post
        </Button>
      </form>
    </Container>
  )
}