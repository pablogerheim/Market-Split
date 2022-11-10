import axios from 'axios';
import { Iuser, IproductSend, IpurchaseSend, Iregister, Ipurchase } from '../types/types';

const BASEurl = 'https://market-split-production.up.railway.app'

const apiUser = axios.create({
  baseURL: `${BASEurl}/user`,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiAccess = axios.create({
  baseURL: `${BASEurl}`,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});


const apiProduct = axios.create({
  baseURL: `${BASEurl}/product`,
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const apiPurchase = axios.create({
  baseURL: `${BASEurl}/purchase`,
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
    return response;
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
  register: async (user: Iregister) => {
    const response = await apiAccess.post('/access/register', user, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return response
  },
  createUser: async (user: Iuser) => {
    return await apiUser.post('/', user, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  getUser: async (group_member: string) => {
    const user = await apiUser.get(`/${group_member}`, {
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
  updateUser: async (user: Iuser) => {
    return await apiUser.put('/', user, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deleteUser: async (id: number) => {
    await apiUser.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  getProduct: async (purchase: number) => {
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
  updateProduct: async (product: IproductSend) => {
    await apiProduct.put('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deleteProduct: async (id: number) => {
    await apiProduct.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  createProduct: async (product: IproductSend) => {
    await apiProduct.post('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  updateQuantity: async (product: IproductSend) => {
    await apiProduct.patch('/', product, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  clearTable: async (purchase: number) => {
    await apiProduct.delete(`/clear/${purchase}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  getPurchase: async (group_member: string) => {
    const data = await apiPurchase.get(`/${group_member}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data;
  },
  getPurchasebyid: async (id: number) => {
    const data = await apiPurchase.get(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
    return data;
  },
  updatePurchase: async (purchase: Ipurchase) => {
    return await apiPurchase.put('/', purchase, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  deletePurchase: async (id: number) => {
    return await apiPurchase.delete(`/${id}`, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  },
  createPurchase: async (purchase: IpurchaseSend) => {
    return await apiPurchase.post('/', purchase, {
      headers: { 'Authorization': `Bearer ${storeToken}`, },
    });
  }
})
