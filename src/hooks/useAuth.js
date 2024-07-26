import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [idRol, setRol] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({ role: decodedToken.role, name: decodedToken.name });
                setRol(decodedToken.role);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token decoding failed:', error);
                setRol({});
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
            setRol({});
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
        window.location.reload();
    };

    return { user, isAuthenticated, logout, idRol };
};

export { useAuth };
