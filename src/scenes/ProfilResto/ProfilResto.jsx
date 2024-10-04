import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const ProfilResto = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({
    name: '',
    email: '',
    address: '',
    telephone: '',
  });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const restoId = localStorage.getItem('restoId');
        if (restoId) {
          const response = await axios.get(`http://localhost:3004/users/${restoId}`);
          const data = response.data;
          setEditedProfileData({
            name: data.name,
            email: data.email,
            address: data.adresse, // Match 'adresse' with back-end
            telephone: data.telephone,
          });
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const restoId = localStorage.getItem('restoId');
      if (restoId) {
        const updatedData = {
          name: editedProfileData.name,
          email: editedProfileData.email,
          adresse: editedProfileData.address, // Match 'adresse' with back-end
          telephone: editedProfileData.telephone,
        };
        await axios.put(`http://localhost:3004/users/${restoId}`, updatedData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating restaurant data:', error);
    }
  };

  const handleCancel = async () => {
    try {
      const restoId = localStorage.getItem('restoId');
      if (restoId) {
        const response = await axios.get(`http://localhost:3004/users/${restoId}`);
        const data = response.data;
        setEditedProfileData({
          name: data.name,
          email: data.email,
          region: data.region, // This will be included for demonstration but remove if not part of back-end
          address: data.adresse, // Match 'adresse' with back-end
          telephone: data.telephone,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = () => {
    navigate('/PageResto');
  };

  const handleModifierMotDePasse = () => {
    navigate('/ResetPassword');
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
                alt="resto"
                width="400px"
                height="400px"
                src={`../../assets/resto.png`}
                sx={{ width: 160, height: 160, margin: '0 auto' }}
              />
              {isEditing ? (
                <>
                  <TextField
                    label="Name"
                    name="name"
                    value={editedProfileData.name}
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
                    label="Address"
                    name="address"
                    value={editedProfileData.address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Telephone"
                    name="telephone"
                    value={editedProfileData.telephone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" my={2}>
                    Name: {editedProfileData.name}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Email: {editedProfileData.email}
                  </Typography>
                  <Typography variant="h5" my={2}>
                    Address: {editedProfileData.address}
                  </Typography>
                  <Divider />
                  <Typography variant="h5" my={2}>
                    Telephone: {editedProfileData.telephone}
                  </Typography>
                </>
              )}

              {isEditing ? (
                <>
                  <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outlined">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEdit} variant="contained" sx={{ mt: 2, mr: 3 }}>
                    Edit Profile
                  </Button>
                  <Button onClick={handleModifierMotDePasse} variant="contained" sx={{ mt: 2 }}>
                    Change Password
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilResto;
