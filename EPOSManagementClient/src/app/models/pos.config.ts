export interface PosConfig {
  _id: string;
  companyId: any;
  cashOnDrawer: Number;
  salesTaxPercentage: Number;
  posConfigTransactions: PosConfigTransaction[];
}

export interface PosConfigTransaction {
  id?: string;
  previousCashOnDrawer: Number;
  newCashOnDrawer: Number;
  creator: string;
  date: Date;
}
