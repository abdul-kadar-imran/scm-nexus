
import React, { useState } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, ArrowUpDown, Check, Info, X, Package, Lock } from 'lucide-react';
import { MOCK_INVENTORY } from '../lib/mock-data';
import { StockLevel, InventoryItem, UserRole } from '../types';

interface InventoryProps {
  globalSearch: string;
  userRole: UserRole;
}

const Inventory: React.FC<InventoryProps> = ({ globalSearch, userRole }) => {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<StockLevel | 'All'>('All');
  const [isExporting, setIsExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newSku, setNewSku] = useState({
    sku: '',
    name: '',
    category: 'Hardware',
    warehouse: 'North Wing',
    quantity: 0,
    minThreshold: 50,
    unitPrice: 0
  });

  const getStatusStyle = (status: StockLevel) => {
    switch (status) {
      case StockLevel.OPTIMAL: return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case StockLevel.LOW: return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case StockLevel.OUT_OF_STOCK: return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case StockLevel.OVERSTOCK: return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const activeSearch = globalSearch || localSearch;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
                          item.sku.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || item.status === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleAddSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'director') return;
    const status = newSku.quantity === 0 ? StockLevel.OUT_OF_STOCK : 
                  newSku.quantity < newSku.minThreshold ? StockLevel.LOW : StockLevel.OPTIMAL;
    
    const item: InventoryItem = {
      ...newSku,
      id: Math.random().toString(36).substr(2, 9),
      status: status,
      lastUpdated: new Date().toISOString()
    };

    setItems([item, ...items]);
    setIsModalOpen(false);
    setNewSku({ sku: '', name: '', category: 'Hardware', warehouse: 'North Wing', quantity: 0, minThreshold: 50, unitPrice: 0 });
  };

  return (
    <div className="p-4 lg:p-8">
      {isExporting && (
        <div className="fixed top-20 right-8 z-50 animate-bounce bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-sm font-bold">
          <Check size={16} /> Data Exported Successfully
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Package className="text-blue-600" size={20} /> Add New SKU
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddSku} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU ID</label>
                  <input required type="text" placeholder="e.g. SKU-123-B" value={newSku.sku} onChange={e => setNewSku({...newSku, sku: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
                  <select value={newSku.category} onChange={e => setNewSku({...newSku, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500">
                    <option>Hardware</option>
                    <option>Electronics</option>
                    <option>Structural</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
                <input required type="text" placeholder="e.g. Industrial Valve X2" value={newSku.name} onChange={e => setNewSku({...newSku, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quantity</label>
                  <input required type="number" value={newSku.quantity} onChange={e => setNewSku({...newSku, quantity: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Min Level</label>
                  <input required type="number" value={newSku.minThreshold} onChange={e => setNewSku({...newSku, minThreshold: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit Price</label>
                  <input required type="number" step="0.01" value={newSku.unitPrice} onChange={e => setNewSku({...newSku, unitPrice: parseFloat(e.target.value) || 0})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700">Add to Registry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory Master List</h2>
          <p className="text-slate-500 text-sm">Managing {items.length} SKUs across 14 distribution centers</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <Download size={16} /> {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
          {userRole === 'director' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <Plus size={16} /> New SKU
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Local filter..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-1">
          <button 
            onClick={() => setSelectedLevel('All')}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${selectedLevel === 'All' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            All
          </button>
          {Object.values(StockLevel).map(lvl => (
            <button 
              key={lvl} 
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${selectedLevel === lvl ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valuation</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">{item.sku}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.category}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.warehouse}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${item.quantity < item.minThreshold ? 'text-red-500' : 'text-slate-900 dark:text-slate-100'}`}>
                        {item.quantity.toLocaleString()}
                      </span>
                      <div className="w-16 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.quantity < item.minThreshold ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((item.quantity / (item.minThreshold * 2)) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                    {userRole === 'director' ? (
                      `$${item.unitPrice.toFixed(2)}`
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Lock size={12} />
                        <span className="blur-[3px] select-none">$88.88</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-all">
                        <Info size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">No inventory items found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
