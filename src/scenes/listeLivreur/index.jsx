import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { AddCircleOutline, Delete, Edit, Search } from "@mui/icons-material";
import Header from '../../components/Header';
import axios from 'axios';

const Liste = () => {
  const [listeLivreur, setListeLivreur] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [nameError, setNameError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [adresseError, setAdresseError] = useState(false);
  const [dateInscriptionError, setDateInscriptionError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    fetchLivreurs();
  }, []); 

  const fetchLivreurs = async () => {
    try {
      const response = await axios.get('http://localhost:3004/users?role=livreur');
      setListeLivreur(response.data);
    } catch (error) {
      console.error('Error fetching Livreur:', error);
    }
  };

  const handleAddClick = () => {
    setDialogOpen(true);
    setSelectedItem({}); // Clear selected item
  };

  const handleEditClick = (item) => {
    setDialogOpen(true);
    // Utiliser la date de création comme date d'inscription par défaut
    const defaultDateInscription = new Date(item.createdAt).toLocaleDateString();
    setSelectedItem({ ...item, dateInscription: defaultDateInscription });
  };

  const handleDeleteClick = async (id) => {
    try {
      // Instead of making a DELETE request, simply filter out the livreur from the list
      setListeLivreur(listeLivreur.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting livreur:', error);
    }
  };

  const updateLivreur = async (newItem) => {
    try {
      await axios.put(`http://localhost:3004/users/${newItem._id}`, newItem);
      setListeLivreur(listeLivreur.map(item => item._id === newItem._id ? newItem : item));
    } catch (error) {
      console.error('Error updating livreur:', error);
    }
  };

  const createLivreur = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:3004/users/create-Livreur', newItem);
      setListeLivreur([...listeLivreur, response.data]);
    } catch (error) {
      console.error('Error creating livreur:', error);
    }
  };

  const handleSave = async (newItem) => {
    try {
      if (!validateFields(newItem)) return;

      if (selectedItem._id) {
        // Update existing livreur
        await updateLivreur(newItem);
      } else {
        // Create new livreur
        await createLivreur(newItem);
      }
    } catch (error) {
      console.error('Error saving livreur:', error);
    }
    // Close the dialog after saving
    setDialogOpen(false);
  };

  const validateFields = (item) => {
    let isValid = true;

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(item.name)) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    const telephoneRegex = /^\d{8}$/;
    if (!telephoneRegex.test(item.telephone)) {
      setTelephoneError(true);
      isValid = false;
    } else {
      setTelephoneError(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(item.email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!item.adresse) {
      setAdresseError(true);
      isValid = false;
    } else {
      setAdresseError(false);
    }

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(item.dateInscription)) {
      setDateInscriptionError(true);
      isValid = false;
    } else {
      setDateInscriptionError(false);
    }

    if (!item.password) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (item.role !== "livreur") {
      setRoleError(true);
      isValid = false;
    } else {
      setRoleError(false);
    }

    return isValid;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/users/name/${searchTerm}`);
      const searchData = Array.isArray(response.data) ? response.data : [response.data];
      setListeLivreur(searchData);
    } catch (error) {
      console.error('Error searching Livreur:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    // Clear errors when dialog is closed
    setNameError(false);
    setTelephoneError(false);
    setEmailError(false);
    setAdresseError(false);
    setDateInscriptionError(false);
    setPasswordError(false);
    setRoleError(false);
    // Clear delete item ID
    setDeleteItemId(null);
  };

  const handleDeleteConfirmationClose = (confirmed) => {
    if (confirmed) {
      // Filter out the livreur from the list
      setListeLivreur(listeLivreur.filter(item => item._id !== deleteItemId));
    }
    // Reset the livreur ID to delete and close the confirmation dialog
    setDeleteItemId(null);
    setDialogOpen(false);
  };
  

  return (
    <Box m="20px">
      <Header title="Liste " subtitle="Liste des Livreurs" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box mb={{ xs: 2, sm: 0 }}>
          <TextField
            label="Rechercher un Livreur"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={{ xs: 2, sm: 0 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleAddClick}
          >
            Ajouter un Livreur
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Date d'inscription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listeLivreur.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.telephone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.adresse}</TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => setDeleteItemId(item._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem._id ? "Modifier Livreur" : "Ajouter Livreur"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom Livreur"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.name || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
            error={nameError}
            helperText={nameError && "Nom est obligatoire et n'inclut pas des nombres"}
          />
          <TextField
            label="Téléphone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.telephone || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, telephone: e.target.value })}
            error={telephoneError}
            helperText={telephoneError && "Téléphone est obligatoire et composé de 8 nombres"}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.email || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
            error={emailError}
            helperText={emailError && "Email est obligatoire (x@gmail.com)"}
          />
          <TextField
            label="Adresse"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.adresse || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, adresse: e.target.value })}
            error={adresseError}
            helperText={adresseError && "Adresse est obligatoire"}
          />
          <TextField
            label="Date d'inscription"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.dateInscription || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, dateInscription: e.target.value })}
            error={dateInscriptionError}
            helperText={dateInscriptionError && "Date d'inscription est obligatoire et ssuivre cette forme jour/mois/année"}
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.role || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, role: e.target.value })}
            error={roleError}
            helperText={roleError && "Role est obligatoire(livreur)"}
          />
          <TextField
            label="Mot de passe"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.password || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, password: e.target.value })}
            error={passwordError}
            helperText={passwordError && "Mot de passe est obligatoire"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button color="primary" onClick={() => handleSave(selectedItem)}>
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for delete confirmation */}
      <Dialog open={deleteItemId !== null} onClose={() => setDeleteItemId(null)}>
        <DialogTitle>{`Confirmer la suppression de ${listeLivreur.find(item => item._id === deleteItemId)?.name || "ce livreur"}`}</DialogTitle>
        <DialogContent>
          <Typography>Vous êtes sur le point de supprimer Ce livreur. Êtes-vous sûr de vouloir continuer ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteItemId(null)}>Annuler</Button>
          <Button color="error" onClick={() => handleDeleteConfirmationClose(true)}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Liste;



