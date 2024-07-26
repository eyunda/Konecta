import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Grid, CssBaseline, Paper, InputAdornment, IconButton} from '@mui/material';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import './Login.css';
import { LockOpen, Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from './logokonecta.jpg';

const LoginPage = () => {
  const [EMAIL, setUsername] = useState('');
  const [PASSWORD_HASH, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { EMAIL, PASSWORD_HASH });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        if (decodedToken.role === 'Administrador') {
          navigate('/empleados');
          window.location.reload();
        } else if (decodedToken.role === 'Empleado') {
          navigate('/solicitud');
          window.location.reload();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error en el login');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8}
        sx={{
          backgroundImage: 'url(https://cdn.prod.website-files.com/6228993c449206dbc618a7df/6641fc494ca6b21a10249980_main-partner-konecta-google-cloud.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? "#27aae1" : "#27aae1",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={10} square className='grid'>
        <Box
          sx={{ my: 10, mx: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '140px' }}
        >
          <img src={Logo} alt='Logo' className='logo' />
          <br></br>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              autoFocus
              value={EMAIL}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              label="Usuario"
              name="username"
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              value={PASSWORD_HASH}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              name="password"
              label="Contraseña"
              type={showPass ? "text" : "password"}
              autoComplete="password"
              onKeyDown={e => { if (e.keyCode === 13) { handleSubmit(); } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              startIcon={<LockOpen />}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              className='boton'
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
