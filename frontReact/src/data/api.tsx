import axios from 'axios';

export interface participant {
  id: number;
  name: string;
}

export interface product {
  id: number;
  name: string;
  price: string;
  participants: string[];
  quantity: string;
}


const apiUser = axios.create({
  baseURL: 'http://localhost:3002/user',
});

const apiProduct = axios.create({
  baseURL: 'http://localhost:3002/product',
});

async function getUser() {
  const user = await apiUser.get('/');
  return user.data;
}

async function getProduct() {
  const data = await apiProduct.get('/');
  return data.data;
}

async function getbyid(id: number) {
  const data = await apiProduct.get(`/${id}`);
  return data.data;
}

async function createProduct(product: product) {
  const data = await apiProduct.post('/', product);
  return data.data;
}

async function updateProduct(product: product) {
  const data = await apiProduct.put('/', product);
  return data.data;
}

async function updateQuantity(product: product) {
  const data = await apiProduct.patch('/', product);
  return data.data;
}

async function deleteProduct(id:number) {
  const data = await apiProduct.delete(`/${id}`);
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
};