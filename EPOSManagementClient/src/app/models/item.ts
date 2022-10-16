
export interface Item {
  _id: string;
  name: string;
  category: string;
  company: string;
  supplier?: string;
  barcode: string;
  description: string;
  itemCode: string;
  Variants: Variants[];
  dateCreated: Date;
  creator: string;
}

export interface Variants {
  _id: string;
  unitType: string;
  unitValue: string;
  unitCost: Number;
  unitPrice: Number;
}
