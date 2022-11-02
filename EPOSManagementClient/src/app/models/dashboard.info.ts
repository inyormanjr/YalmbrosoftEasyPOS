import { InventoryTransaction } from './item';
import { PosTransaction } from './pos-transaction';
export interface DashboardInfo {
  itemCount: number;
  userCount: number;
  currentSales: number;
  cashOnDrawer: number;
  posTransactions: PosTransaction[];
  inventoryTransactions: InventoryTransaction[];
}
