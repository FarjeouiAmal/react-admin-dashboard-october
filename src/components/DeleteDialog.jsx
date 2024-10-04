import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Button, Typography } from '@mui/material';

const DeleteDialog = ({ open, onClose }) => {
  // Logique spécifique à votre dialogue de suppression

  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={3}>
        <Typography variant="h5">Supprimer l'élément</Typography>
        
        <Button onClick={onClose}>Fermer</Button>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
