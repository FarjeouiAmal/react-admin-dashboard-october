import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const initialFormData = {
  id: "",
  nom: "",
  email: "",
  contact: "",
  city:"",
  adress:"",
};

const EditDialog = (props) => {
  const { open, handleClose } = props;
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Logique pour sauvegarder les modifications
    console.log('Données du formulaire:', formData);

    // Réinitialiser le formulaire
    setFormData(initialFormData);

    // Fermer le dialogue
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">Modifier les éléments </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nom Resto"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Téléphone"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
           <TextField
          label="Région"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address "
          name="adress"
          value={formData.adress}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
     
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
        Sauvegarder
        </Button>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
