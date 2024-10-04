import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";
import axios from 'axios';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [consommateurUsers, setConsommateurUsers] = useState([]);

  // Fetch consommateur users when the component mounts
  useEffect(() => {
    const fetchConsommateurUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3004/users?role=consommateur');
        // Add id property to each user object using _id
        const usersWithIds = response.data.map(user => ({ ...user, id: user._id }));
        setConsommateurUsers(usersWithIds);
      } catch (error) {
        console.error('Error fetching consommateur users:', error);
      }
    };
  
    fetchConsommateurUsers();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Rôle",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (

    
    <Box m="20px">
      <Header title="Consommateurs" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={consommateurUsers} // Use consommateurUsers state here
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;