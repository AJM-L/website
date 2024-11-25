import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

const ImageModal = ({ open, image, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!image) return null;

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={{ ...style, width: isFullScreen ? '100%' : 'auto', height: isFullScreen ? '100%' : 'auto' }}>
        <IconButton
          onClick={toggleFullScreen}
          style={{ position: 'absolute', margin: 'auto', zIndex: 1000 }}
        >
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <img
          src={image.image1}
          alt={image.title}
          style={{
            maxWidth: '100%',
            maxHeight: '100vh',
            objectFit: 'contain',
            margin: 'auto'
          }}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal; 