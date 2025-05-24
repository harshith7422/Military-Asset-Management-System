export interface User {
  id: string;
  name: string;
  role: 'admin' | 'commander' | 'logistics';
  baseId?: string;
}

export interface Base {
  id: string;
  name: string;
  location: string;
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  baseId: string;
  status: AssetStatus;
  assignedTo?: string;
  quantity: number;
}

export type AssetType = 'weapon' | 'vehicle' | 'ammunition' | 'equipment';
export type AssetStatus = 'available' | 'assigned' | 'in-transit' | 'expended';

export interface Purchase {
  id: string;
  assetId: string;
  assetName: string;
  assetType: AssetType;
  baseId: string;
  quantity: number;
  date: string;
  cost: number;
}

export interface Transfer {
  id: string;
  assetId: string;
  assetName: string;
  assetType: AssetType;
  fromBaseId: string;
  toBaseId: string;
  quantity: number;
  date: string;
  status: 'pending' | 'in-transit' | 'completed';
}

export interface Assignment {
  id: string;
  assetId: string;
  assetName: string;
  assetType: AssetType;
  baseId: string;
  personnelId: string;
  personnelName: string;
  quantity: number;
  date: string;
}

export interface Expenditure {
  id: string;
  assetId: string;
  assetName: string;
  assetType: AssetType;
  baseId: string;
  quantity: number;
  date: string;
  reason: string;
}

export interface DashboardMetrics {
  openingBalance: number;
  closingBalance: number;
  purchases: number;
  transferIn: number;
  transferOut: number;
  assigned: number;
  expended: number;
}

export interface FilterOptions {
  dateRange?: {
    start: string;
    end: string;
  };
  baseId?: string;
  assetType?: AssetType;
}