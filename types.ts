
export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  ON_HOLD = 'On Hold'
}

export enum StockLevel {
  OPTIMAL = 'Optimal',
  LOW = 'Low',
  OUT_OF_STOCK = 'Out of Stock',
  OVERSTOCK = 'Overstock'
}

export type UserRole = 'director' | 'co-director';

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
  clearance: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  quantity: number;
  minThreshold: number;
  unitPrice: number;
  status: StockLevel;
  lastUpdated: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Activity {
  id: string;
  type: 'order' | 'inventory' | 'alert' | 'user';
  description: string;
  timestamp: string;
  user: string;
}

export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export type PageView = 'dashboard' | 'inventory' | 'orders' | 'analytics' | 'settings';
