import { Inventory } from './item';
export interface PosTransaction {
  _id: string;
  company: string;
  creator: string;
  subTotal: number;
  discount: number;
  voucherAmount: number;
  total: number;
  posTransDetails: PosTransactionDetails[];
}

export interface PosTransactionDetails {
  inventory: Inventory;
  orderQty: number;
  unitPrice: number;
  totalPrice: number;
}
