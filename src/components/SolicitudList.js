import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TextField, TablePagination, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';

const SolicitudList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { idRol } = useAuth(); 
  
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/solicitud', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSolicitudes(response.data.solicitudes);
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/solicitud/solicitud-form/${id}`);
  };

  const handleDelete = async (solicitud) => {
    try {
      await axios.delete(`http://localhost:3000/api/solicitud/${solicitud.ID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSolicitudes(solicitudes.filter(s => s.ID !== solicitud.ID));
    } catch (error) {
      console.error('Error deleting solicitud:', error);
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

  const filteredSolicitudes = solicitudes.filter(solicitud =>
    Object.values(solicitud).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedSolicitudes = filteredSolicitudes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2} mt={4}>
        <Typography variant='h6' sx={{ p: '0.3rem', color: 'white', background: '#169ab2', borderRadius: '12px', textAlign: 'center', marginBottom: '10px' }}>
          Solicitudes
        </Typography>
        <TextField
          label="Buscar"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          fullWidth
          sx={{ mb: 2 }}
        />
        {idRol === 'Administrador' && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="contained" style={{ color: 'white', background: '#169ab2' }} onClick={() => navigate('/solicitud/solicitud-form')}>
                Añadir Solicitud
              </Button>
            </Box>
          </>
        )}
      </Box>
      <br></br>
      <Table className="custom-table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Resumen</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Fecha de creación</TableCell>
            <TableCell>Fecha de modificación</TableCell>
            {idRol === 'Administrador' && (
              <>
                <TableCell>Acciones</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedSolicitudes.map((solicitud) => (
            <TableRow key={solicitud.ISD}>
              <TableCell>{solicitud.ID}</TableCell>
              <TableCell>{solicitud.CODIGO}</TableCell>
              <TableCell>{solicitud.DESCRIPCION}</TableCell>
              <TableCell>{solicitud.RESUMEN}</TableCell>
              <TableCell>{solicitud.NOMBRE}</TableCell>
              <TableCell>{format(new Date(solicitud.CREATED_AT), 'dd-MM-yyyy')}</TableCell>
              <TableCell>{format(new Date(solicitud.UPDATED_AT), 'dd-MM-yyyy')}</TableCell>
              {idRol === 'Administrador' && (
                <>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(solicitud.ISD)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(solicitud)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredSolicitudes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};

export default SolicitudList;
