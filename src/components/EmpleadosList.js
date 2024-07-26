import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TextField, TablePagination, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/empleados/empleado-form/${id}`);
  };

  const handleDelete = async (empleado) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/${empleado.IDE}/${empleado.IDU}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEmpleados(empleados.filter(e => e.IDE !== empleado.IDE));
    } catch (error) {
      console.error('Error deleting empleado:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmpleados = empleados.filter(empleado =>
    Object.values(empleado).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedEmpleados = filteredEmpleados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2} mt={4}>
        <Typography variant='h6' sx={{ p: '0.3rem', color: 'white', background: '#169ab2', borderRadius: '12px', textAlign: 'center', marginBottom: '10px' }}>
          Empleado
        </Typography>
        <TextField
          label="Buscar"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="contained" style={{ color: 'white', background: '#169ab2' }} onClick={() => navigate('/empleados/empleado-form')}>
            Añadir Empleado
          </Button>
        </Box>
      </Box>
      <br></br>
      <Table className="custom-table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha de Ingreso</TableCell>
            <TableCell>Salario</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEmpleados.map((empleado) => (
            <TableRow key={empleado.IDE}>
              <TableCell>{empleado.ID}</TableCell>
              <TableCell>{empleado.NOMBRE}</TableCell>
              <TableCell>{empleado.FECHA_INGRESO}</TableCell>
              <TableCell>{empleado.SALARIO}</TableCell>
              <TableCell>{empleado.EMAIL}</TableCell>
              <TableCell>{empleado.PASSWORD_HASH}</TableCell>
              <TableCell>{empleado.ROLE}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(empleado.IDE)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(empleado)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmpleados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};

export default Empleados;
