
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
  unitCost: number;
  unitPrice: number;
  quantity: number;
}

export interface Inventory {
  item: Item;
  variant: Variants
}

export enum StockMovementType {
  StockIn,
  StockOut
}

export interface InventoryTransaction {
  _id: string;
  type: string;
  itemName: string;
  variant: Variants;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  company: any;
  creator: any;
  remarks: string;
  dateCreated: Date;

}
