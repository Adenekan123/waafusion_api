export interface IPartnerOrderItem {
  productid: number;
  quantity: number;
  totalAmount: number;
  userid?: number;
}

export interface IVistitorOrderItem {
  id?: number;
  productid: number;
  quantity: number;
  totalAmount: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
}
