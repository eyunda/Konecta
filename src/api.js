import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const createEmployee = (employeeData) => axios.post(`${API_URL}/employees`, employeeData);
