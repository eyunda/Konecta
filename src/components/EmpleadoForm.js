import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

const EmpleadoForm = () => {
  const [NOMBRE, setNombre] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [SALARIO, setSalario] = useState('');
  const [EMAIL, setEmail] = useState('');
  const [PASSWORD_HASH, setPassword] = useState('');
  const [ROLE, setRoles] = useState('Empleado');
  const navigate = useNavigate();
  const { id } = useParams();
  const [IDE, setIDE] = useState('');
  const [IDU, setIDU] = useState('');

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const {IDE, IDU, NOMBRE, FECHA_INGRESO, SALARIO, EMAIL, PASSWORD_HASH, ROLE } = response.data;
          setNombre(NOMBRE);
          setFechaIngreso(FECHA_INGRESO);
          setSalario(SALARIO);
          setEmail(EMAIL);
          setPassword(PASSWORD_HASH);
          setRoles(ROLE);
          setIDE(IDE);
          setIDU(IDU);
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
      const formattedSalary = parseFloat(SALARIO).toFixed(2);
      const payload = { IDE, IDU, NOMBRE, FECHA_INGRESO: fechaIngreso, SALARIO: formattedSalary, EMAIL, PASSWORD_HASH, ROLE };
      const token = localStorage.getItem('token');
      if (id) {
        await axios.put(`http://localhost:3000/api/employees/${id}`, payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:3000/api/employees', payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      navigate('/empleados');
    } catch (error) {
      console.error('Error saving empleado:', error);
    }
  };

  const handleSalarioChange = (e) => {
    let value = e.target.value;

    if (!/^\d{0,8}(\.\d{0,2})?$/.test(value)) {
      return;
    }

    setSalario(value);
  };

  const handleBack = () => {
    navigate('/empleados');
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant='h6' sx={{ p: '0.3rem', color: 'white', background: '#169ab2', borderRadius: '12px', textAlign: 'center', marginBottom: '10px' }}>
          {id ? 'Editar Empleado' : 'Añadir Empleado'}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nombre"
            value={NOMBRE}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Fecha de Ingreso"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Salario"
            type="text"
            value={SALARIO}
            onChange={handleSalarioChange}
            inputProps={{
              step: '0.01',
              min: '0',
              max: '99999999.99',
              pattern: '^\\d{0,8}(\\.\\d{0,2})?$'
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            value={EMAIL}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={PASSWORD_HASH}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Rol"
            value={ROLE}
            disabled
            onChange={(e) => setRoles(e.target.value)}
          />
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

export default EmpleadoForm;
