export interface IuserAPI {
  user_id: number;
  access: string;
  token: string;
  name: string;
  password?: string;
  group_member: string;
};

export interface IpurchaseSend {
  purchaseId?: number;
  name: string;
  timestamp?: string;
  active?: boolean;
  summary?: object;
  group_member: string;
}

export interface Ipurchase{
  purchaseId: number;
  name: string;
  timestamp?: string;
  active?: boolean;
  summary?: object;
  group_member?: string;
}

export interface Iparticipant {
  userId: number;
  name: string;
  access: string;
}

export interface IproductReq {
  productId: number;
  name: string;
  price: string;
  participants: string[];
  quantity: string;
  purchase?: number;
  group_member: string;
}

export interface IproductSend{
  productId?: number;
  name: string;
  price: string;
  participants: string;
  quantity: string;
  purchase: number;
  group_member: string;
}

export interface Iuser {
  userId?: number;
  name: string;
  password?: string;
  access?: string;
  group_member: string;
}

export interface Iregister {
  name: string;
  password: string;
}

export interface Idialog {
  userId: number;
  setClose: (prop: boolean) => void;
}
