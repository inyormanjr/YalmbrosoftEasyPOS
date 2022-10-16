
export interface Item {
  _id: string;
  name: string;
  category: string;
  company: string;
  supplier?: string;
  barcode: string;
  itemType: string;
  description: string;
  itemCode: string;
  variants: Variants[];
  dateCreated: Date;
  creator: string;
}

export interface Variants {
  _id: string;
  unitType: string;
  unitValue: string;
  unitCost: Number;
  unitPrice: Number;
  quantity: Number;
}
