import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../api';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = isRegistering ? await register({ EMAIL: email, PASSWORD: password }) : await login({ EMAIL: email, PASSWORD: password });
        if (response.data.token) {
            setUser({ ...response.data });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </form>
    );
};

export default AuthForm;
