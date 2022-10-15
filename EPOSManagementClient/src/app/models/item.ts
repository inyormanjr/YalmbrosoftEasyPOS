export interface Item {
  _id: string;
  name: string;
  category: string;
  company: string;
  supplier?: string;
  description: string;
  itemCode: string;
  unitType: string;
  unitValue: string;
  unitCost: Number;
  unitPrice: Number;
  dateCreated: Date;
  creator: string;
}
