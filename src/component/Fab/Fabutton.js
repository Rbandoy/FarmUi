import React, { useState } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'; 
import Modal from '@mui/material/Modal';
import CreatePost from "./CreatePost";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper', 
  boxShadow: 24, 
};

export default function Fabutton(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tmpImg, setTmpImg] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);


  return (
    <><Box style={{
      position: 'fixed',
      bottom: 30,
      right: 60,
    }} sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" onClick={() => handleOpen()}>
        <AddIcon sx={{ mr: 1 }} />
        POST
      </Fab>
    </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description" 
        >
          <div style={style}> 
            <CreatePost />
          </div>
          {/* <img style={style} src={tmpImg} /> */}
        </Modal>
         
      </>
  )
}