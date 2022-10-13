import axios from 'axios';
import { user, product } from '../types/types';

export async function loggedToken() {
  const loggedInUser = await localStorage.getItem('authToken');
  if (loggedInUser) {
    return loggedInUser;
  }
  return undefined;
}

const apiUser = axios.create({
  baseURL: 'http://localhost:3002/user',
  timeout: 1000,
  headers: {
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
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiProduct = axios.create({
  baseURL: 'http://localhost:3002/product',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const useApi = (storeToken?: string) => ({
  validateToken: async (storeToken: string) => {
    const response = await apiAccessOut.get('/checkToken', {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return response.data;
  },
  login: async (name: string, password: string) => {
    const response = await apiAccessIn.post('/access/login', {
      name,
      password,
    });
    return response;
  },
  logout: async (storeToken: string) => {
    const response = await apiAccessOut.post('/access/logout', {}, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return response.data;
  },
  createUser: async (user: user) => {
    await apiAccessOut.post('/access/register', user, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  getUser: async () => {
    const user = await apiUser.get('/', {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return user.data;
  },
  getUserById: async (id: number) => {
    const user = await apiUser.get(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return user.data;
  },
  updateUser: async (user: user) => {
    await apiUser.put('/', user, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deleteUser: async (id: number) => {
    await apiUser.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  getProduct: async () => {
    const data = await apiProduct.get('/', {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data.data;
  },
  getbyid: async (id: number) => {
    const data = await apiProduct.get(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data.data;
  },
  updateProduct: async (product: product) => {
    await apiProduct.put('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deleteProduct: async (id: number) => {
    await apiProduct.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  createProduct: async (product: product) => {
    await apiProduct.post('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  updateQuantity: async (product: product) => {
    await apiProduct.patch('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  clearTable: async () => {
    await apiProduct.delete('/clear', {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
});
