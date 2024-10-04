import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import Header from "../../components/Header";

const Suivre = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3004/api/orders'); // Adjust the URL if needed
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (order, newStatus) => {
    try {
      await axios.put(`http://localhost:3004/api/orders/${order._id}`, { status: newStatus });
      setOrders(orders.map((o) => (o._id === order._id ? { ...o, status: newStatus } : o)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleTrackClick = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Suivre Commande" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro de Commande</TableCell>
              <TableCell>Nom Plat</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              order.items.map((item, index) => (
                <TableRow key={`${order._id}-${index}`}>
                  {index === 0 && (
                    <TableCell rowSpan={order.items.length}>{order._id}</TableCell>
                  )}
                  {index === 0 && (
                    <TableCell rowSpan={order.items.length}>
                      <FormControl>
                        <Select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order, e.target.value)}
                        >
                          <MenuItem value="En cours">En cours</MenuItem>
                          <MenuItem value="Prêt à être livré">Prêt à être livré</MenuItem>
                          <MenuItem value="En cours de livraison">En cours de livraison</MenuItem>
                          <MenuItem value="Livré">Livré</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  )}
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  {index === 0 && (
                    <TableCell rowSpan={order.items.length}>${order.total.toFixed(2)}</TableCell>
                  )}
                  {index === 0 && (
                    <TableCell rowSpan={order.items.length}>
                      <Button onClick={() => handleTrackClick(order)} style={{ color: 'yellow' }}>
                        Détails
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for tracking details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Suivi de la Commande #{selectedOrder?._id}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Status: {selectedOrder?.status}</Typography>
          <Typography variant="subtitle1">Articles:</Typography>
          <ul>
            {selectedOrder?.items.map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} x ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Suivre;
