import { User, Base, Asset, Purchase, Transfer, Assignment, Expenditure } from '../types';
import { addDays, format, subDays } from 'date-fns';

// Generate mock data for development purposes

export const mockBases: Base[] = [
  { id: 'base1', name: 'Fort Alpha', location: 'Northern Region' },
  { id: 'base2', name: 'Camp Bravo', location: 'Eastern Region' },
  { id: 'base3', name: 'Station Charlie', location: 'Western Region' },
  { id: 'base4', name: 'Outpost Delta', location: 'Southern Region' },
];

export const mockUsers: User[] = [
  { id: 'user1', name: 'General Smith', role: 'admin' },
  { id: 'user2', name: 'Colonel Johnson', role: 'commander', baseId: 'base1' },
  { id: 'user3', name: 'Major Williams', role: 'commander', baseId: 'base2' },
  { id: 'user4', name: 'Captain Davis', role: 'logistics', baseId: 'base1' },
  { id: 'user5', name: 'Lieutenant Wilson', role: 'logistics', baseId: 'base2' },
];

export const mockAssets: Asset[] = [
  { id: 'asset1', name: 'M4 Carbine', type: 'weapon', baseId: 'base1', status: 'available', quantity: 100 },
  { id: 'asset2', name: 'M9 Pistol', type: 'weapon', baseId: 'base1', status: 'available', quantity: 50 },
  { id: 'asset3', name: 'Humvee', type: 'vehicle', baseId: 'base1', status: 'available', quantity: 20 },
  { id: 'asset4', name: '5.56mm Ammo', type: 'ammunition', baseId: 'base1', status: 'available', quantity: 10000 },
  { id: 'asset5', name: 'Body Armor', type: 'equipment', baseId: 'base1', status: 'available', quantity: 200 },
  { id: 'asset6', name: 'M4 Carbine', type: 'weapon', baseId: 'base2', status: 'available', quantity: 80 },
  { id: 'asset7', name: 'M9 Pistol', type: 'weapon', baseId: 'base2', status: 'available', quantity: 40 },
  { id: 'asset8', name: 'Humvee', type: 'vehicle', baseId: 'base2', status: 'available', quantity: 15 },
  { id: 'asset9', name: '5.56mm Ammo', type: 'ammunition', baseId: 'base2', status: 'available', quantity: 8000 },
  { id: 'asset10', name: 'Body Armor', type: 'equipment', baseId: 'base2', status: 'available', quantity: 150 },
];

const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const mockPurchases: Purchase[] = [
  { 
    id: 'purchase1', 
    assetId: 'asset1', 
    assetName: 'M4 Carbine', 
    assetType: 'weapon', 
    baseId: 'base1', 
    quantity: 20, 
    date: formatDate(subDays(today, 30)), 
    cost: 20000 
  },
  { 
    id: 'purchase2', 
    assetId: 'asset4', 
    assetName: '5.56mm Ammo', 
    assetType: 'ammunition', 
    baseId: 'base1', 
    quantity: 5000, 
    date: formatDate(subDays(today, 20)), 
    cost: 2500 
  },
  { 
    id: 'purchase3', 
    assetId: 'asset6', 
    assetName: 'M4 Carbine', 
    assetType: 'weapon', 
    baseId: 'base2', 
    quantity: 15, 
    date: formatDate(subDays(today, 15)), 
    cost: 15000 
  },
  { 
    id: 'purchase4', 
    assetId: 'asset9', 
    assetName: '5.56mm Ammo', 
    assetType: 'ammunition', 
    baseId: 'base2', 
    quantity: 3000, 
    date: formatDate(subDays(today, 10)), 
    cost: 1500 
  },
];

export const mockTransfers: Transfer[] = [
  { 
    id: 'transfer1', 
    assetId: 'asset1', 
    assetName: 'M4 Carbine', 
    assetType: 'weapon', 
    fromBaseId: 'base1', 
    toBaseId: 'base2', 
    quantity: 10, 
    date: formatDate(subDays(today, 25)), 
    status: 'completed' 
  },
  { 
    id: 'transfer2', 
    assetId: 'asset4', 
    assetName: '5.56mm Ammo', 
    assetType: 'ammunition', 
    fromBaseId: 'base1', 
    toBaseId: 'base2', 
    quantity: 2000, 
    date: formatDate(subDays(today, 15)), 
    status: 'completed' 
  },
  { 
    id: 'transfer3', 
    assetId: 'asset8', 
    assetName: 'Humvee', 
    assetType: 'vehicle', 
    fromBaseId: 'base2', 
    toBaseId: 'base1', 
    quantity: 5, 
    date: formatDate(subDays(today, 5)), 
    status: 'in-transit' 
  },
];

export const mockAssignments: Assignment[] = [
  { 
    id: 'assignment1', 
    assetId: 'asset1', 
    assetName: 'M4 Carbine', 
    assetType: 'weapon', 
    baseId: 'base1', 
    personnelId: 'soldier1', 
    personnelName: 'Sgt. Miller', 
    quantity: 1, 
    date: formatDate(subDays(today, 20))
  },
  { 
    id: 'assignment2', 
    assetId: 'asset2', 
    assetName: 'M9 Pistol', 
    assetType: 'weapon', 
    baseId: 'base1', 
    personnelId: 'soldier2', 
    personnelName: 'Cpl. Johnson', 
    quantity: 1, 
    date: formatDate(subDays(today, 18))
  },
  { 
    id: 'assignment3', 
    assetId: 'asset6', 
    assetName: 'M4 Carbine', 
    assetType: 'weapon', 
    baseId: 'base2', 
    personnelId: 'soldier3', 
    personnelName: 'Sgt. Thompson', 
    quantity: 1, 
    date: formatDate(subDays(today, 15))
  },
];

export const mockExpenditures: Expenditure[] = [
  { 
    id: 'expenditure1', 
    assetId: 'asset4', 
    assetName: '5.56mm Ammo', 
    assetType: 'ammunition', 
    baseId: 'base1', 
    quantity: 500, 
    date: formatDate(subDays(today, 10)), 
    reason: 'Training Exercise' 
  },
  { 
    id: 'expenditure2', 
    assetId: 'asset9', 
    assetName: '5.56mm Ammo', 
    assetType: 'ammunition', 
    baseId: 'base2', 
    quantity: 300, 
    date: formatDate(subDays(today, 8)), 
    reason: 'Training Exercise' 
  },
  { 
    id: 'expenditure3', 
    assetId: 'asset5', 
    assetName: 'Body Armor', 
    assetType: 'equipment', 
    baseId: 'base1', 
    quantity: 5, 
    date: formatDate(subDays(today, 5)), 
    reason: 'Damage Replacement' 
  },
];

// Helper functions to get filtered data
export const getFilteredPurchases = (options?: {
  baseId?: string;
  assetType?: string;
  dateRange?: { start: string; end: string };
}) => {
  let filtered = [...mockPurchases];
  
  if (options?.baseId) {
    filtered = filtered.filter(p => p.baseId === options.baseId);
  }
  
  if (options?.assetType) {
    filtered = filtered.filter(p => p.assetType === options.assetType);
  }
  
  if (options?.dateRange) {
    const { start, end } = options.dateRange;
    filtered = filtered.filter(p => {
      const purchaseDate = new Date(p.date);
      return purchaseDate >= new Date(start) && purchaseDate <= new Date(end);
    });
  }
  
  return filtered;
};

export const getFilteredTransfers = (options?: {
  baseId?: string;
  assetType?: string;
  dateRange?: { start: string; end: string };
}) => {
  let filtered = [...mockTransfers];
  
  if (options?.baseId) {
    filtered = filtered.filter(t => 
      t.fromBaseId === options.baseId || t.toBaseId === options.baseId
    );
  }
  
  if (options?.assetType) {
    filtered = filtered.filter(t => t.assetType === options.assetType);
  }
  
  if (options?.dateRange) {
    const { start, end } = options.dateRange;
    filtered = filtered.filter(t => {
      const transferDate = new Date(t.date);
      return transferDate >= new Date(start) && transferDate <= new Date(end);
    });
  }
  
  return filtered;
};

export const getFilteredAssignments = (options?: {
  baseId?: string;
  assetType?: string;
  dateRange?: { start: string; end: string };
}) => {
  let filtered = [...mockAssignments];
  
  if (options?.baseId) {
    filtered = filtered.filter(a => a.baseId === options.baseId);
  }
  
  if (options?.assetType) {
    filtered = filtered.filter(a => a.assetType === options.assetType);
  }
  
  if (options?.dateRange) {
    const { start, end } = options.dateRange;
    filtered = filtered.filter(a => {
      const assignDate = new Date(a.date);
      return assignDate >= new Date(start) && assignDate <= new Date(end);
    });
  }
  
  return filtered;
};

export const getFilteredExpenditures = (options?: {
  baseId?: string;
  assetType?: string;
  dateRange?: { start: string; end: string };
}) => {
  let filtered = [...mockExpenditures];
  
  if (options?.baseId) {
    filtered = filtered.filter(e => e.baseId === options.baseId);
  }
  
  if (options?.assetType) {
    filtered = filtered.filter(e => e.assetType === options.assetType);
  }
  
  if (options?.dateRange) {
    const { start, end } = options.dateRange;
    filtered = filtered.filter(e => {
      const expendDate = new Date(e.date);
      return expendDate >= new Date(start) && expendDate <= new Date(end);
    });
  }
  
  return filtered;
};

// Calculate dashboard metrics
export const getDashboardMetrics = (options?: {
  baseId?: string;
  assetType?: string;
  dateRange?: { start: string; end: string };
}) => {
  const purchases = getFilteredPurchases(options);
  const transfers = getFilteredTransfers(options);
  const assignments = getFilteredAssignments(options);
  const expenditures = getFilteredExpenditures(options);
  
  const totalPurchases = purchases.reduce((sum, p) => sum + p.quantity, 0);
  
  let transferIn = 0;
  let transferOut = 0;
  
  if (options?.baseId) {
    transferIn = transfers
      .filter(t => t.toBaseId === options.baseId && t.status === 'completed')
      .reduce((sum, t) => sum + t.quantity, 0);
      
    transferOut = transfers
      .filter(t => t.fromBaseId === options.baseId && t.status === 'completed')
      .reduce((sum, t) => sum + t.quantity, 0);
  } else {
    // If no base filter, these cancel out in the system as a whole
    transferIn = 0;
    transferOut = 0;
  }
  
  const totalAssigned = assignments.reduce((sum, a) => sum + a.quantity, 0);
  const totalExpended = expenditures.reduce((sum, e) => sum + e.quantity, 0);
  
  // Base calculation on the current data (mock simplification)
  // In a real system, we'd calculate this from historical data
  const closingBalance = totalPurchases + transferIn - transferOut - totalExpended;
  const openingBalance = closingBalance - (totalPurchases + transferIn - transferOut - totalExpended);
  
  return {
    openingBalance,
    closingBalance,
    purchases: totalPurchases,
    transferIn,
    transferOut,
    assigned: totalAssigned,
    expended: totalExpended
  };
};