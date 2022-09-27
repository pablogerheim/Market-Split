import axios from 'axios';

export interface participant {
  userId: number;
  name: string;
  access:string;
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
  password:string;
  access:string;
}

async function loggedToken() {
  const loggedInUser = localStorage.getItem('userToken');
  if (loggedInUser) {
    const foundUser = await JSON.parse(loggedInUser);
    return foundUser;
  }
  return false;
}

async function login(user:user) {
  
  const userinfo = await axios.post('http://localhost:3002/login', user, {
    headers: {
      'Content-Type': 'application/json; charset = utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
  
  userinfo && localStorage.setItem('userToken', userinfo.data.token);
  return userinfo;
}

async function verify() {
  const store = localStorage.getItem('userToken');
  const userinfo = await axios.get('http://localhost:3002/checkToken',{
    headers: {
      Authorization: `Bearer ${store}`,
      'Content-Type': 'application/json; charset = utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
  
  return userinfo;
}

let auth: any;

async function logout() {
  // const userinfo = await axios.post('http://localhost:3002/logout', {
  //   headers: {
  //     Authorization: `Bearer ${auth}`,
  //     'Content-Type': 'application/json; charset = utf-8',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': 'true',
  //   },
  // });

  localStorage.removeItem('userToken')
}

async function createUser(user:user) {
  // auth = await loggedToken();
  const userinfo = await axios.post('http://localhost:3002/login/register', user, {
    headers: {
       //  Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json; charset = utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
  
  userinfo && localStorage.setItem('userToken', userinfo.data.token);
  return userinfo;
}

const apiUser = axios.create({
  baseURL: 'http://localhost:3002/user',
  timeout: 1000,
  headers: {
  //  Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  }
});

const apiProduct = axios.create({
  baseURL: 'http://localhost:3002/product',
  timeout: 1000,
  headers: {
   // Authorization: `Bearer ${auth}`,
    'Content-Type': 'application/json; charset = utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  }
});

async function getUser() {
 // auth = await loggedToken();
  const user = await apiUser.get('/');
  return user.data;
}

async function updateUser(participant:participant) {
  // auth = await loggedToken();
   const data = await apiUser.put('/', participant);
   return data.data;
 }

 async function deleteUser(id:number) {
  
  // auth = await loggedToken();
   const user = await apiUser.delete(`/${id}`);
   return user.data;
 }

async function getProduct() {
  //auth = await loggedToken();
  const data = await apiProduct.get('/');
  return data.data;
}

async function getbyid(id: number) {
  //auth = await loggedToken();
  const data = await apiProduct.get(`/${id}`);
  return data.data;
}

async function createProduct(product: product) {
  //auth = await loggedToken();
  const data = await apiProduct.post('/', product);
  return data.data;
}

async function updateProduct(product: product) {
  //auth = await loggedToken();
  const data = await apiProduct.put('/', product);
  return data.data;
}

async function updateQuantity(product: product) {
  //auth = await loggedToken();
  const data = await apiProduct.patch('/', product);
  return data.data;
}

async function deleteProduct(id:number) {
  //auth = await loggedToken();
  const data = await apiProduct.delete(`/${id}`);
  return data.data;
}

async function clearTable() {
  //auth = await loggedToken();
  const data = await apiProduct.delete('/clear');
  return data
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
  login,
  verify,
  logout,
  createUser,
  updateUser,
  deleteUser
};