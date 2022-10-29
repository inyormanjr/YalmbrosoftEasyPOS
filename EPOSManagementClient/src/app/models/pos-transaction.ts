import { Inventory } from './item';
export interface PosTransaction {
  _id: string;
  company: string;
  creator: string;
  subTotal: number;
  discount: number;
  voucher: Voucher;
  salesTax: number;
  total: number;
  totalBalance: number;
  payment: number;
  posTransDetails: PosTransactionDetails[];
}

export interface PosTransactionDetails {
  inventory: Inventory;
  orderQty: number;
  unitDiscount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Voucher {
  _id: string;
  code: string;
  amount: number;
  used: boolean;
}
