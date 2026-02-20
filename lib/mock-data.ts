
import { InventoryItem, Order, OrderStatus, StockLevel, Activity, KPIData } from '../types';

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', sku: 'SKU-001-A', name: 'Precision Bearing X-10', category: 'Hardware', warehouse: 'North Wing', quantity: 450, minThreshold: 100, unitPrice: 24.50, status: StockLevel.OPTIMAL, lastUpdated: '2024-05-10T10:30:00Z' },
  { id: '2', sku: 'SKU-005-C', name: 'Hydraulic Seal Kit', category: 'Maintenance', warehouse: 'South Wing', quantity: 12, minThreshold: 50, unitPrice: 89.00, status: StockLevel.LOW, lastUpdated: '2024-05-12T14:20:00Z' },
  { id: '3', sku: 'SKU-012-B', name: 'Alloy Support Beam', category: 'Structural', warehouse: 'Central Depot', quantity: 0, minThreshold: 10, unitPrice: 1540.00, status: StockLevel.OUT_OF_STOCK, lastUpdated: '2024-05-11T08:15:00Z' },
  { id: '4', sku: 'SKU-099-Z', name: 'Control Panel V4', category: 'Electronics', warehouse: 'East Wing', quantity: 85, minThreshold: 20, unitPrice: 420.00, status: StockLevel.OPTIMAL, lastUpdated: '2024-05-12T16:45:00Z' },
  { id: '5', sku: 'SKU-105-X', name: 'Thermal Insulator M2', category: 'Hardware', warehouse: 'North Wing', quantity: 1200, minThreshold: 400, unitPrice: 5.25, status: StockLevel.OVERSTOCK, lastUpdated: '2024-05-09T11:00:00Z' },
  { id: '6', sku: 'SKU-202-K', name: 'Heavy Duty Caster', category: 'Hardware', warehouse: 'South Wing', quantity: 45, minThreshold: 50, unitPrice: 32.00, status: StockLevel.LOW, lastUpdated: '2024-05-13T09:10:00Z' },
  { id: '7', sku: 'SKU-305-L', name: 'Titanium Fastener', category: 'Hardware', warehouse: 'North Wing', quantity: 4500, minThreshold: 1000, unitPrice: 1.50, status: StockLevel.OPTIMAL, lastUpdated: '2024-05-14T08:00:00Z' },
  { id: '8', sku: 'SKU-410-M', name: 'Logic Controller G7', category: 'Electronics', warehouse: 'East Wing', quantity: 8, minThreshold: 15, unitPrice: 850.00, status: StockLevel.LOW, lastUpdated: '2024-05-14T10:30:00Z' },
  { id: '9', sku: 'SKU-520-P', name: 'Pneumatic Actuator', category: 'Maintenance', warehouse: 'Central Depot', quantity: 62, minThreshold: 20, unitPrice: 175.00, status: StockLevel.OPTIMAL, lastUpdated: '2024-05-13T15:20:00Z' },
  { id: '10', sku: 'SKU-630-Q', name: 'Coolant Pump Pro', category: 'Maintenance', warehouse: 'South Wing', quantity: 3, minThreshold: 10, unitPrice: 450.00, status: StockLevel.LOW, lastUpdated: '2024-05-12T09:15:00Z' },
  { id: '11', sku: 'SKU-740-R', name: 'Composite Panel 4x8', category: 'Structural', warehouse: 'North Wing', quantity: 120, minThreshold: 50, unitPrice: 85.00, status: StockLevel.OPTIMAL, lastUpdated: '2024-05-11T12:00:00Z' },
  { id: '12', sku: 'SKU-850-S', name: 'Signal Amplifier Z', category: 'Electronics', warehouse: 'East Wing', quantity: 0, minThreshold: 5, unitPrice: 210.00, status: StockLevel.OUT_OF_STOCK, lastUpdated: '2024-05-10T14:45:00Z' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-7721', customerName: 'Apex Industries', date: '2024-05-12', total: 12450.00, status: OrderStatus.SHIPPED, items: 12, priority: 'High' },
  { id: 'ORD-7722', customerName: 'Global Logistics', date: '2024-05-13', total: 3200.50, status: OrderStatus.PROCESSING, items: 4, priority: 'Medium' },
  { id: 'ORD-7723', customerName: 'BuildRight Corp', date: '2024-05-13', total: 450.00, status: OrderStatus.PENDING, items: 2, priority: 'Low' },
  { id: 'ORD-7724', customerName: 'TechFlow Systems', date: '2024-05-11', total: 28900.00, status: OrderStatus.DELIVERED, items: 45, priority: 'High' },
  { id: 'ORD-7725', customerName: 'Nordic Warehousing', date: '2024-05-12', total: 1560.00, status: OrderStatus.ON_HOLD, items: 8, priority: 'Medium' },
  { id: 'ORD-7726', customerName: 'Skyline Construction', date: '2024-05-14', total: 45000.00, status: OrderStatus.PENDING, items: 120, priority: 'High' },
  { id: 'ORD-7727', customerName: 'Prime Manufacturing', date: '2024-05-14', total: 890.00, status: OrderStatus.PROCESSING, items: 3, priority: 'Low' },
  { id: 'ORD-7728', customerName: 'Oceanic Trade', date: '2024-05-10', total: 7200.00, status: OrderStatus.DELIVERED, items: 15, priority: 'Medium' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act-1', type: 'order', description: 'Order ORD-7721 marked as Shipped', timestamp: '2 hours ago', user: 'System' },
  { id: 'act-2', type: 'inventory', description: 'Stock for SKU-012-B depleted below threshold', timestamp: '5 hours ago', user: 'Warehouse Monitor' },
  { id: 'act-3', type: 'alert', description: 'Delayed shipment detected for Lane 4: NYC-LON', timestamp: '1 day ago', user: 'Logistics AI' },
  { id: 'act-4', type: 'user', description: 'Sarah Chen updated Inventory policy for "North Wing"', timestamp: '2 days ago', user: 'Sarah Chen' },
  { id: 'act-5', type: 'order', description: 'New order ORD-7726 received from Skyline', timestamp: '3 days ago', user: 'Sales API' },
  { id: 'act-6', type: 'inventory', description: 'Restock received: 500 units Titanium Fasteners', timestamp: '4 days ago', user: 'Dock Master' },
];

export const MOCK_KPI: KPIData[] = [
  { label: 'Total Inventory Value', value: '$4.2M', change: 12.5, trend: 'up', icon: 'Package' },
  { label: 'Orders in Pipeline', value: '1,240', change: -2.4, trend: 'down', icon: 'ShoppingCart' },
  { label: 'On-Time Fulfillment', value: '98.2%', change: 0.5, trend: 'up', icon: 'CheckCircle' },
  { label: 'Critical Alerts', value: '4', change: 2, trend: 'neutral', icon: 'AlertTriangle' },
];

export const CHART_DATA_VARIANTS = {
  Day: [
    { month: '00:00', demand: 400, supply: 600 },
    { month: '04:00', demand: 300, supply: 400 },
    { month: '08:00', demand: 900, supply: 800 },
    { month: '12:00', demand: 1500, supply: 1200 },
    { month: '16:00', demand: 1800, supply: 1600 },
    { month: '20:00', demand: 1200, supply: 1400 },
  ],
  Week: [
    { month: 'Mon', demand: 2400, supply: 2200 },
    { month: 'Tue', demand: 1398, supply: 2100 },
    { month: 'Wed', demand: 9800, supply: 7000 },
    { month: 'Thu', demand: 3908, supply: 4500 },
    { month: 'Fri', demand: 4800, supply: 4200 },
    { month: 'Sat', demand: 3800, supply: 3000 },
    { month: 'Sun', demand: 4300, supply: 3500 },
  ],
  Month: [
    { month: 'Week 1', demand: 14000, supply: 12400 },
    { month: 'Week 2', demand: 13000, supply: 13198 },
    { month: 'Week 3', demand: 12000, supply: 19800 },
    { month: 'Week 4', demand: 12780, supply: 13908 },
  ],
  Quarter: [
    { month: 'Jan', demand: 4000, supply: 2400 },
    { month: 'Feb', demand: 3000, supply: 1398 },
    { month: 'Mar', demand: 2000, supply: 9800 },
    { month: 'Apr', demand: 2780, supply: 3908 },
    { month: 'May', demand: 1890, supply: 4800 },
    { month: 'Jun', demand: 2390, supply: 3800 },
    { month: 'Jul', demand: 3490, supply: 4300 },
  ]
};
