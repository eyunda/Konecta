import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {Container, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const SolicitudesForm = () => {
  const [empleados, setEmpleados] = useState([]);
  const [CODIGO, setCODIGO] = useState('');
  const [DESCRIPCION, setDESCRIPCION] = useState('');
  const [RESUMEN, setRESUMEN] = useState('');
  const [ID_EMPLEADO, setID_EMPLEADO] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [ISD, setISD] = useState('');
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employees', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEmpleados(response.data.empleado);
      } catch (error) {
        console.error('Error fetching empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/solicitud/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const {ISD, CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO } = response.data;
          setCODIGO(CODIGO);
          setDESCRIPCION(DESCRIPCION);
          setRESUMEN(RESUMEN);
          setID_EMPLEADO(ID_EMPLEADO);
          setISD(ISD);
        } catch (error) {
          console.error('Error fetching empleado:', error);
        }
      }
    };

    fetchEmpleado();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = { ISD, CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO  };
      const token = localStorage.getItem('token');
      if (id) {
        await axios.put(`http://localhost:3000/api/solicitud/${id}`, payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:3000/api/solicitud', payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      navigate('/solicitud');
    } catch (error) {
      console.error('Error saving empleado:', error);
    }
  };

  const handleBack = () => {
    navigate('/solicitud');
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant='h6' sx={{ p: '0.3rem', color: 'white', background: '#169ab2', borderRadius: '12px', textAlign: 'center', marginBottom: '10px' }}>
          {id ? 'Editar Solicitud' : 'Añadir Solicitud'}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Codigo"
            value={CODIGO}
            onChange={(e) => setCODIGO(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Descripción"
            value={DESCRIPCION}
            onChange={(e) => setDESCRIPCION(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Resumen"
            value={RESUMEN}
            onChange={(e) => setRESUMEN(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Empleado</InputLabel>
            <Select
              labelId="role-label"
              value={ID_EMPLEADO}
              onChange={(e) => setID_EMPLEADO(e.target.value)}
            >
              {empleados.map((rol) => (
                <MenuItem key={rol.IDE} value={rol.IDE}>
                  {rol.NOMBRE}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" style={{ width:'300px', color: 'white', background: '#169ab2' }} type="submit">
            {id ? 'Actualizar' : 'Añadir'}
          </Button>
          <Button variant="contained" style={{  width:'300px', color: 'white', background: 'red',  marginLeft: '10px' }} onClick={handleBack}>
            Volver
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SolicitudesForm;
