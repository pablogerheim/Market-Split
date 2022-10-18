export type User = {
access: string;
token: string;
user: user;
}

export interface purchaseu {
  purchaseId: number;
  name:string;
  timestamp?:string;
  active?:boolean;
  summary?:object;
}

export interface purchase {
  purchaseId?: number;
  name:string;
  timestamp?:string;
  active?:boolean;
  summary?:object;
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
  purchase?: number;
}

export interface productapi {
  productId?: number;
  name: string;
  price: string;
  participants: string;
  quantity: string;
  purchase?: number;
}

export interface user {
  userId?: number;
  name: string;
  password?: string;
  access?: string;
  timestamp?:string;
}