export type User = {
    id: number;
    name: string;
    access: string;
    password?: string;
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
  password: string;
  access?: string;
}