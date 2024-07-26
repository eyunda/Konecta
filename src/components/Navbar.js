import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ background: '#169ab2' }}>
          <IconButton
            edge="start"
            style={{ color: 'white' }}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {isAuthenticated ? (
              <>
                <strong style={{ color: 'white' }}>Bienvenido <span style={{ color: 'white' }}>{user.name}</span> con el rol de: <span style={{ color: 'white' }}>{user.role}</span></strong>
              </>
            ) : (
              'Mi Aplicación'
            )}
          </Typography>
          {isAuthenticated && (
            <Button style={{ color: 'white' }} onClick={handleLogout}>
              <strong>Cerrar sesión</strong>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            background: '#169ab2',
            marginLeft: '8px',
            width: '22vw',
            height: 'calc(100% - 64px)',
            top: '64px'
          },
        }}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'fixed',
          },
        }}
      >
        <List>
          {isAuthenticated && user.role === 'Administrador' && (
            <ListItem button onClick={() => handleNavigate('/empleados')}>
              <ListItemText style={{color:'white'}} primary="Empleados" />
            </ListItem>
          )}
          <ListItem button onClick={() => handleNavigate('/solicitud')}>
            <ListItemText style={{color:'white'}} primary="Solicitud" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
