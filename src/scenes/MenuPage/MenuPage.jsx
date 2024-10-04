import React, { useState, useEffect } from "react";
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
import Header from "../../components/Header";
import axios from 'axios';

const API_URL = 'http://localhost:3004'; 

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setMenu([]);
      }
    };
    fetchMenu();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const handleAddClick = () => {
    setDialogOpen(true);
    setSelectedItem({});
  };

  const handleEditClick = async (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleEditCategoryClick = (category) => {
    setSelectedItem(category);
    setDialogOpen(true);
  };

  const handleDeleteCategoryClick = async (categoryId) => {
    const confirmation = window.confirm(`Voulez-vous vraiment supprimer cette catégorie ?`);
    if (confirmation) {
      try {
        await axios.delete(`${API_URL}/categories/${categoryId}`);
        const updatedMenu = menu.filter((item) => item.id !== categoryId);
        setMenu(updatedMenu);
        setSelectedCategory(null);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_URL}/repas/${id}`);
      const updatedMenu = menu.map((item) => ({
        ...item,
        repas: item.repas.filter((repas) => repas.id !== id),
      }));
      setMenu(updatedMenu);
    } catch (error) {
      console.error('Error deleting repas:', error);
    }
  };

  const handleSave = async (newItem) => {
    console.log('Saving item:', newItem); // Inspect the newItem payload
    try {
      if (newItem.id) {
        // Update existing repas
        const response = await axios.patch(`${API_URL}/repas/${newItem.id}`, newItem);
        const updatedMenu = menu.map((item) => {
          if (item.id === newItem.categoryId) {
            return {
              ...item,
              repas: item.repas.map((repas) =>
                repas.id === newItem.id ? response.data : repas
              ),
            };
          }
          return item;
        });
        setMenu(updatedMenu);
      } else {
        // Create new repas
        const response = await axios.post(`${API_URL}/repas`, newItem);
        const updatedMenu = menu.map((item) => {
          if (item.id === newItem.categoryId) {
            return {
              ...item,
              repas: [...item.repas, response.data],
            };
          }
          return item;
        });
        setMenu(updatedMenu);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
 
    setDialogOpen(false);
  };

  const handleSearch = () => {
    // Add search logic here
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddRepas = (category) => {
    setDialogOpen(true);
    setSelectedItem({ category: category, repas: "", price: "", categoryId: category.id });
  };

  const handleAddCategoryClick = () => {
    setDialogOpen(true);
    setSelectedItem({ name: "" });
  };

  return (
    <Box m="20px">
      <Header title="Page Menu" subtitle="Gérer le Menu" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box mb={{ xs: 2, sm: 0 }}>
          <TextField
            label="Rechercher un repas"
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
            onClick={handleAddCategoryClick}
          >
            Ajouter une Catégorie
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Catégorie</TableCell>
              <TableCell>Repas</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.length > 0 && menu.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell>
                    <Button onClick={() => handleCategoryClick(item)}>
                      {item.name}
                    </Button>
                    {selectedCategory === item && (
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddRepas(item)}
                        >
                          Ajouter un Repas à {item.name}
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.repas && item.repas.map((repas, index) => (
                      <div key={index}>
                        <Typography>{repas.name}</Typography>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {item.repas && item.repas.map((repas, index) => (
                      <div key={index}>
                        <Typography>{repas.price} dt</Typography>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {item.repas && item.repas.map((repas, index) => (
                      <div key={index}>
                        <IconButton
                          color="success"
                          onClick={() => handleEditClick(repas)}
                          style={{ fontSize: "0.875rem" }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(repas.id)}
                          style={{ fontSize: "0.875rem" }}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    ))}
                    <IconButton
                      color="info"
                      onClick={() => handleEditCategoryClick(item)}
                      style={{ fontSize: "0.875rem" }}
                    >
                      Modifier Catégorie
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCategoryClick(item.id)}
                      style={{ fontSize: "0.875rem" }}
                    >
                      Supprimer Catégorie
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
  <DialogTitle>{selectedItem.id ? "Modifier Repas" : "Ajouter Repas"}</DialogTitle>
  <DialogContent>
    <TextField
      label="Nom"
      variant="outlined"
      fullWidth
      margin="normal"
      value={selectedItem.nom || ""}
      onChange={(e) => setSelectedItem({ ...selectedItem, nom: e.target.value })}
    />
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      margin="normal"
      value={selectedItem.description || ""}
      onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
    />
    <TextField
      label="Prix"
      variant="outlined"
      fullWidth
      margin="normal"
      type="number"
      value={selectedItem.prix || ""}
      onChange={(e) => setSelectedItem({ ...selectedItem, prix: parseFloat(e.target.value) })}
    />
    <TextField
      label="Supplements"
      variant="outlined"
      fullWidth
      margin="normal"
      value={selectedItem.supplements || ""}
      onChange={(e) => setSelectedItem({ ...selectedItem, supplements: e.target.value })}
    />
    <TextField
      label="Catégorie ID"
      variant="outlined"
      fullWidth
      margin="normal"
      value={selectedItem.categoryId || ""}
      onChange={(e) => setSelectedItem({ ...selectedItem, categoryId: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog}>Annuler</Button>
    <Button color="primary" onClick={() => handleSave(selectedItem)}>
      Sauvegarder
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default MenuPage;
