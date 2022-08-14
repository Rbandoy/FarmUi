import React, { useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';  
import Modal from '@mui/material/Modal';
import "./gallery.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper', 
  boxShadow: 24, 
};

export default function Gallery({images}) {

  const [modalOpen, setModalOpen] = useState(false);
  const [tmpImg, setTmpImg] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (image) => {
    setTmpImg(image);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const viewImage = (image) => {
    setTmpImg(image);
    setModalOpen(true)
    alert(modalOpen)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
          <img style={style} src={tmpImg}/> 
      </Modal>
      <ImageList sx={{ width: 500, height: 342 }} cols={images.length > 1 ? 2:1} rowHeight={164}>
        {
          images.map((item, index) =>
            {                    
              return <ImageListItem key={item.image}> 
                <img className="pics"
                  onClick={() => handleOpen(item.image)}
                  src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                /> 
              </ImageListItem>  
            }
          )
        }
      </ImageList>   
    </>
  )
}