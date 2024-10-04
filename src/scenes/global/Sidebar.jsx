// Sidebar.jsx

import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PlaylistAddCheckSharpIcon from '@mui/icons-material/PlaylistAddCheckSharp';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { useUser } from '../../context/UserContext'; // Import the UserContext
import { logout } from "../../components/api/auth";
 import './Sidebar.css';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("dashbord"); // Default selection
  const { user } = useUser(); // Use the user context to determine the role

  const navigate = useNavigate();

  const handleImageClick = () => {
    // Check if user is defined before accessing its properties
    if (user && user.role) {
      // Navigate to the user's profile based on the role
      user.role === 'admin' ? navigate('/Profile') : navigate('/ProfilResto');
    }
  };

  // const handleLogout = () => {
  //   logout(); // Call the logout function
  //   navigate('/login'); // Redirect to the login page after logout
  // };

  const adminItems = [
    { title: "Tableau de bord", to: "/", icon: <HomeOutlinedIcon /> },
    { title: "Liste Consommateurs", to: "/contacts", icon: <SupervisorAccountIcon /> },
    { title: "Gérer Restaurants", to: "/listeResto", icon: <RestaurantIcon /> },
    { title: "Liste livreurs", to: "/listeLivreur", icon: <DeliveryDiningIcon /> },
  ];
  const restoItems = [
    { title: "Tableau de bord", to: "/PageResto", icon: <HomeOutlinedIcon /> },
    { title: "Gérer Menu", to: "/MenuPage", icon: <RestaurantMenuOutlinedIcon /> },
    { title: "Suivre les Commandes", to: "/SuivreCde", icon: <PlaylistAddCheckSharpIcon /> },
    { title: "Gérer Livreur", to: "/listeLivreur", icon: <DeliveryDiningIcon /> },
  ];

  const items = user && user.role === 'admin' ? adminItems : restoItems;

  return (

      <div

        className="sidebar-wrapper h-full " // Add your custom CSS class here
      >

        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "30px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >                                                                  
                  <Typography variant="h3" color={colors.grey[100]}>
                    {user && user.role === 'admin' ? "ADMINISTRATEUR" : "RESTAURANT"}
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {user && user.role === 'admin' ? (
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`../../assets/USER.PNG`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                      onClick={handleImageClick}
                    />
                  ) : (
                    <>
                      <img
                        alt="restaurant"
                        width="100px"
                        height="100px"
                        src={`../../assets/resto.png`}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        onClick={handleImageClick}
                      />
                      <Box textAlign="center">
                        <Typography
                          variant="h2"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          sx={{ m: "50px 0 0 0" }}
                        >
                          {/* Display restaurant name or other details */}
                          {user && user.name}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            )}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {items.map((item, index) => (
                <Item
                  key={index}
                  title={item.title}
                  to={item.to}
                  icon={item.icon}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </Box>
          </Menu>

        </ProSidebar>
      </div>

  );
};

export default Sidebar;