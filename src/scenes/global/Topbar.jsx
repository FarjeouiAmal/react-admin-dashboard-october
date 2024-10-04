import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IoMdLogOut } from "react-icons/io";
import { MenuItem } from "react-pro-sidebar";
import { useNavigate } from 'react-router-dom'; // Importez useNavigate depuis react-router-dom
import { logout } from '../../components/api/auth'; // Importez logout depuis l'endroit où vous avez défini votre fonction de logout




const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
       
      <MenuItem onClick={handleLogout} style={{ display: 'flex' }}>
          <IoMdLogOut style={{ color: 'orange', fontSize: '24px' }} />
        </MenuItem>
        </IconButton>
      </Box>
      
    </Box>
  );
};

export default Topbar;