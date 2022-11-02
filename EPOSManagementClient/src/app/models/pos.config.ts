export interface PosConfig {
  _id: string;
  companyId: any;
  cashOnDrawer: number;
  salesTaxPercentage: number;
  posConfigTransactions: PosConfigTransaction[];
}

export interface PosConfigTransaction {
  id?: string;
  previousCashOnDrawer: number;
  newCashOnDrawer: number;
  creator: string;
  date: Date;
}
