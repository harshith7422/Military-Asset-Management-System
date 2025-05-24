import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  Asset, Purchase, Transfer, Assignment, Expenditure, 
  FilterOptions, DashboardMetrics, AssetType 
} from '../types';
import { 
  mockAssets, mockPurchases, mockTransfers, mockAssignments, mockExpenditures,
  getDashboardMetrics, getFilteredPurchases, getFilteredTransfers,
  getFilteredAssignments, getFilteredExpenditures
} from '../utils/mockData';

interface AssetContextType {
  assets: Asset[];
  purchases: Purchase[];
  transfers: Transfer[];
  assignments: Assignment[];
  expenditures: Expenditure[];
  dashboardMetrics: DashboardMetrics;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  addPurchase: (purchase: Omit<Purchase, 'id' | 'date'>) => void;
  addTransfer: (transfer: Omit<Transfer, 'id' | 'date' | 'status'>) => void;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'date'>) => void;
  addExpenditure: (expenditure: Omit<Expenditure, 'id' | 'date'>) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [transfers, setTransfers] = useState<Transfer[]>(mockTransfers);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [expenditures, setExpenditures] = useState<Expenditure[]>(mockExpenditures);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>(getDashboardMetrics());

  // Update filtered data and metrics when filter options change
  useEffect(() => {
    // Update dashboard metrics based on current filters
    setDashboardMetrics(getDashboardMetrics(filterOptions));
  }, [filterOptions]);

  // Add a new purchase
  const addPurchase = (purchaseData: Omit<Purchase, 'id' | 'date'>) => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: `purchase${purchases.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    setPurchases([...purchases, newPurchase]);
    
    // Update asset quantity
    setAssets(prev => prev.map(asset => {
      if (asset.id === purchaseData.assetId && asset.baseId === purchaseData.baseId) {
        return { ...asset, quantity: asset.quantity + purchaseData.quantity };
      }
      return asset;
    }));
  };

  // Add a new transfer
  const addTransfer = (transferData: Omit<Transfer, 'id' | 'date' | 'status'>) => {
    const newTransfer: Transfer = {
      ...transferData,
      id: `transfer${transfers.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setTransfers([...transfers, newTransfer]);
    
    // Update asset quantities for source base
    setAssets(prev => prev.map(asset => {
      if (asset.id === transferData.assetId && asset.baseId === transferData.fromBaseId) {
        return { ...asset, quantity: asset.quantity - transferData.quantity };
      }
      return asset;
    }));
  };

  // Add a new assignment
  const addAssignment = (assignmentData: Omit<Assignment, 'id' | 'date'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `assignment${assignments.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    setAssignments([...assignments, newAssignment]);
    
    // Update asset status and quantity
    setAssets(prev => prev.map(asset => {
      if (asset.id === assignmentData.assetId && asset.baseId === assignmentData.baseId) {
        return { 
          ...asset, 
          status: 'assigned',
          quantity: asset.quantity - assignmentData.quantity
        };
      }
      return asset;
    }));
  };

  // Add a new expenditure
  const addExpenditure = (expenditureData: Omit<Expenditure, 'id' | 'date'>) => {
    const newExpenditure: Expenditure = {
      ...expenditureData,
      id: `expenditure${expenditures.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    setExpenditures([...expenditures, newExpenditure]);
    
    // Update asset quantity
    setAssets(prev => prev.map(asset => {
      if (asset.id === expenditureData.assetId && asset.baseId === expenditureData.baseId) {
        return { 
          ...asset, 
          quantity: asset.quantity - expenditureData.quantity,
          status: expenditureData.quantity >= asset.quantity ? 'expended' : asset.status
        };
      }
      return asset;
    }));
  };

  return (
    <AssetContext.Provider value={{
      assets,
      purchases,
      transfers,
      assignments,
      expenditures,
      dashboardMetrics,
      filterOptions,
      setFilterOptions,
      addPurchase,
      addTransfer,
      addAssignment,
      addExpenditure
    }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = (): AssetContextType => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};