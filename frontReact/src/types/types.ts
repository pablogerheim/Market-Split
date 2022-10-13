export type User = {
access: string;
token: string;
user: user;
}

export interface participant {
  userId: number;
  name: string;
  access: string;
}

export interface product {
  productId: number;
  name: string;
  price: string;
  participants: string[];
  quantity: string;
}

export interface user {
  userId?: number;
  name: string;
  password?: string;
  access?: string;
  timestamp?:string;
}