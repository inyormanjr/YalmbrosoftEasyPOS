export interface CashInOut {
  _id: string;
  company: string;
  creator: any;
  amount: number;
  categoryName: string;
  type: string;
  isFromDrawer: boolean;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}
