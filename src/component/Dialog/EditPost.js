import React, { useState } from "react";
import { ReactSession } from 'react-client-session';
import { Container, TextField, makeStyles, IconButton, Button } from "@material-ui/core";
import { Add, Remove, PostAdd, Delete } from '@mui/icons-material';  
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': { 
      margin: theme.spacing(2), 
    },
    background: "whitesmoke",
    borderRadius: "5px 10px 5px 10px",
    width: "100%"
  }, 
  button: {
    margin: theme.spacing(1)
  },
  h1: {
    margin: theme.spacing(2),
    textAlign: "center",
    color: "lightgreen",
    marginTop: "20px"
  }
}))

export default function CreatePost({data}) {
 
  console.log("sample",data)

  ReactSession.setStoreType("localStorage");
  let navigate = useNavigate();
  const classes = useStyle();
  const [inputField, setInputField] = useState(data.images);

  const [title, setTitle] = useState(data.postHeaderText);
  const [details, setDetails] = useState(data.postDetails);

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
    var params = JSON.stringify({
      "title": title,
      "details": details,
      "id": data.id,
      "image": inputField
    }); 

    var config = {
      method: 'post',
      url: "https://rbandoy.site/post/updatePost",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : params
    };

    axios(config)
    .then(function (response) {
      toast(response.data.message); 
      setTimeout(()=> {  
        window.location.reload();
      }, 2000)
      setInputField("");
      setTitle("");
      setDetails("");
    })
    .catch(function (error) {
      console.log(error);
    });

  }


  return (
    <Container> 
      <form style={{maxHeight: 700, overflow: 'auto'}} className={classes.root} onSubmit={submitPost}>
        <h1 className={classes.h1}>POST</h1>
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
          Update
        </Button>
        <Button 
          className={classes.button}
          variant="contained" 
          color="secondary" 
          type="submit" 
          endIcon={<Delete />}
          onSubmit={submitPost}
          >
          Delete
        </Button>
      </form>
    </Container>
  )
}