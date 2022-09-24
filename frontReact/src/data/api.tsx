import axios from 'axios';

export interface participant {
  id: number;
  name: string;
}

export interface product {
  productId: number;
  name: string;
  price: string;
  participants: string[];
  quantity: string;
}

export interface user {
  name:string;
  password:string
}

async function loggedToken() {
  const loggedInUser = localStorage.getItem('userToken');
  if (loggedInUser) {
    const foundUser = await JSON.parse(loggedInUser);
    return foundUser;
  }
  return false;
}

async function Login(user:user) {
  const userinfo = await axios.post('http://localhost:3001/login/', user);
  return userinfo;
}

let auth

const apiUser = axios.create({
  baseURL: 'http://localhost:3002/user',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  }
});

const apiProduct = axios.create({
  baseURL: 'http://localhost:3002/product',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  }
});

async function getUser() {
  auth = await loggedToken();
  const user = await apiUser.get('/');
  return user.data;
}

async function getProduct() {
  auth = await loggedToken();
  const data = await apiProduct.get('/');
  return data.data;
}

async function getbyid(id: number) {
  auth = await loggedToken();
  const data = await apiProduct.get(`/${id}`);
  return data.data;
}

async function createProduct(product: product) {
  auth = await loggedToken();
  const data = await apiProduct.post('/', product);
  return data.data;
}

async function updateProduct(product: product) {
  auth = await loggedToken();
  const data = await apiProduct.put('/', product);
  return data.data;
}

async function updateQuantity(product: product) {
  auth = await loggedToken();
  const data = await apiProduct.patch('/', product);
  return data.data;
}

async function deleteProduct(id:number) {
  auth = await loggedToken();
  const data = await apiProduct.delete(`/${id}`);
  return data.data;
}

async function clearTable() {
  auth = await loggedToken();
  const data = await apiProduct.delete('/clear');
  return data.data;
}

export {
  getUser,
  getProduct,
  getbyid,
  createProduct,
  updateProduct,
  updateQuantity,
  deleteProduct,
  clearTable,
  Login
};