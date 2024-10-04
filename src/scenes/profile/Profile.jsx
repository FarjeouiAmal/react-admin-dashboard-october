import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Button,
  TextField,
  IconButton, // Assurez-vous d'importer IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material'; // Assurez-vous d'importer Close depuis les icônes MUI

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({
    
    firstName: 'Foulen',
    lastName: 'Ben Foulen',
    email: 'foulen.benfoulen@example.com',
    region: 'Sousse',
    address: '4060, Kalaa Kébira',
    phoneNumber: '+216 5352 6482',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Handle save logic, e.g., update user profile in the database
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the edited profile data and exit edit mode
    setEditedProfileData({
      firstName: 'Foulen',
      lastName: 'Ben Foulen',
      email: 'foulen.benfoulen@example.com',
      region: 'Sousse',
      address: '4060, Kalaa Kébira',
      phoneNumber: '+216 5352 6482',
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <Box mt={5}>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={10} sm={5}>
        <Paper elevation={3} sx={{ backgroundColor: '#2c3e50', padding: 4, position: 'relative' }}>
            <IconButton
              aria-label="Fermer"
              onClick={handleClose}
              sx={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
            >
              <Close />
            </IconButton>
            <Box p={4}>
              <Avatar
                alt="profile-user"
                width="400px"
                height="400px"
                src={`../../assets/USER.PNG`}
                sx={{ width: 160, height: 160, margin: '0 auto' }}
              />
              {isEditing ? (
                // Editing mode
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={editedProfileData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={editedProfileData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={editedProfileData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                   <TextField
                    label="Région"
                    name="Région"
                    value={editedProfileData.region}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                   <TextField
                    label="Adresse"
                    name="Adresse"
                    value={editedProfileData.address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                   <TextField
                    label="Téléphone"
                    name="Téléphone"
                    value={editedProfileData.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  {/* Add more fields as needed */}
                </>
              ) : (
                // Display mode
                <>
                  <Typography variant="h5" my={2}>
                    Nom: {editedProfileData.firstName}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Prénom: {editedProfileData.lastName}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Email: {editedProfileData.email}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Région: {editedProfileData.region}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Address: {editedProfileData.address}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Numéro Téléphone: {editedProfileData.phoneNumber}
                  </Typography>
                </>
              )}

              {isEditing ? (
                // Editing mode buttons
                <>
                  <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
                    Sauvegarder
                  </Button>
                  <Button onClick={handleCancel} variant="outlined">
                    Annuler
                  </Button>
                </>
              ) : (
                // Display mode button
                <Button onClick={handleEdit} variant="contained" sx={{ mt: 2 }}>
                  Éditer le profil
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
