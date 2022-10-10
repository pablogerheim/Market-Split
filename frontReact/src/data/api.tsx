import axios from 'axios';
import { user, product } from '../types/types';

async function loggedToken() {
  const loggedInUser = localStorage.getItem('authToken');
  if (loggedInUser) {
    return loggedInUser;
  }
  return false;
}

let auth: any;

const apiUser = axios.create({
  baseURL: 'http://localhost:3002/user',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiAccessIn = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiAccessOut = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiProduct = axios.create({
  baseURL: 'http://localhost:3002/product',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const useApi = () => ({
  validateToken: async () => {
    auth = await loggedToken();
    const response = await apiAccessOut.get('/checkToken');
    return response.data;
  },
  login: async (name: string, password: string) => {
    const response = await apiAccessIn.post('/access/login', {
      name,
      password,
    });
    return response.data;
  },
  logout: async () => {
    auth = await loggedToken();
    const response = await apiAccessOut.post('/access/logout');
    return response.data;
  },
  createUser: async (user: user) => {
    auth = await loggedToken();
    await apiAccessOut.post('/access/register', user);
  },
  getUser: async () => {
    auth = await loggedToken();
    const user = await apiUser.get('/');
    return user.data;
  },
  getUserById: async (id: number) => {
    auth = await loggedToken();
    const user = await apiUser.get(`/${id}`);
    return user.data;
  },
  updateUser: async (user: user) => {
    auth = await loggedToken();
    await apiUser.put('/', user);
  },
  deleteUser: async (id: number) => {
    auth = await loggedToken();
    await apiUser.delete(`/${id}`);
  },
  getProduct: async () => {
    auth = await loggedToken();
    const data = await apiProduct.get('/');
    return data.data;
  },
  getbyid: async (id: number) => {
    auth = await loggedToken();
    const data = await apiProduct.get(`/${id}`);
    return data.data;
  },
  updateProduct: async (product: product) => {
    auth = await loggedToken();
    await apiProduct.put('/', product);
  },
  deleteProduct: async (id: number) => {
    auth = await loggedToken();
    await apiProduct.delete(`/${id}`);
  },
  createProduct: async (product: product) => {
    auth = await loggedToken();
    await apiProduct.post('/', product);
  },
  updateQuantity: async (product: product) => {
    auth = await loggedToken();
    await apiProduct.patch('/', product);
  },
  clearTable: async () => {
    auth = await loggedToken();
    await apiProduct.delete('/clear');
  },
});
