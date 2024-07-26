import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import EmpleadosList from './components/EmpleadosList';
import EmpleadoForm from './components/EmpleadoForm';
import SolicitudForm from './components/SolicitudesForm';
import SolicitudList from './components/SolicitudList';
import { useAuth } from './hooks/useAuth';

const App = () => {
    const { isAuthenticated, idRol } = useAuth();

    return (
        <div>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                {idRol === 'Administrador' && (
                    <>
                        <Route path="/empleados" element={<EmpleadosList />} />
                        <Route path="/empleados/empleado-form" element={<EmpleadoForm />} />
                        <Route path="/empleados/empleado-form/:id" element={<EmpleadoForm />} />
                        <Route path="/solicitud" element={<SolicitudList />} />
                        <Route path="/solicitud/solicitud-form" element={<SolicitudForm />} />
                        <Route path="/solicitud/solicitud-form/:id" element={<SolicitudForm />} />
                    </>
                )}
                {idRol === 'Empleado' && (
                    <>
                        <Route path="/empleados" element={<EmpleadosList />} />
                        <Route path="/solicitud" element={<SolicitudList />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;
