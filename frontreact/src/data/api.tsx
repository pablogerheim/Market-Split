import axios from 'axios';
import { user, productapi, purchase } from '../types/types';

const BASEurl= 'https://market-split-development.up.railway.app'

fetch('https://market-split-development.up.railway.app', {
  method: "POST",
  body: JSON.stringify({name:"admin",password:'admin'}),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})

const apiUser = axios.create({
  baseURL: `${BASEurl}/user`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiAccess = axios.create({
  baseURL: `${BASEurl}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});


const apiProduct = axios.create({
  baseURL: `${BASEurl}/product`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiPurchase = axios.create({
  baseURL: `${BASEurl}/purchase`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const useApi = (storeToken?: string) => ({
  validateToken: async () => {
    const response = await apiAccess.get('/checkToken', {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return response.data;
  },
  login: async (name: string, password: string) => {
    const response = await apiAccess.post('/access/login', {
      name,
      password,
    });
    return response;
  },
  logout: async () => {
    const response = await apiAccess.post('/access/logout', {}, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return response.data;
  },
  createUser: async (user: user) => {
    await apiAccess.post('/access/register', user, {
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
  getProduct: async (purchase:number) => {
    const data = await apiProduct.get(`/purchase/${purchase}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data.data;
  },
  getbyid: async (id: number) => {
    const data = await apiProduct.get(`/id/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data.data;
  },
  updateProduct: async (product: productapi) => {
    await apiProduct.put('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deleteProduct: async (id: number) => {
    await apiProduct.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  createProduct: async (product: productapi) => {
    await apiProduct.post('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  updateQuantity: async (product: productapi) => {
    await apiProduct.patch('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  clearTable: async (purchase:number) => {
    await apiProduct.delete(`/clear/${purchase}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  getPurchase: async () => {
    const data = await apiPurchase.get(`/`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data.data;
  },
  getPurchasebyid: async (id: number) => {
    const data = await apiPurchase.get(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data.data;
  },
  updatePurchase: async (purchase: purchase) => {
    await apiPurchase.put('/', purchase, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deletePurchase: async (id: number) => {
    await apiPurchase.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  createPurchase: async (purchase: purchase) => {
    await apiPurchase.post('/', purchase, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  }
});
