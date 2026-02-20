
import React from 'react';
import { Eye, Check, X, Truck, Clock, AlertCircle, Search } from 'lucide-react';
import { MOCK_ORDERS } from '../lib/mock-data';
import { OrderStatus } from '../types';

interface OrdersProps {
  globalSearch: string;
}

const Orders: React.FC<OrdersProps> = ({ globalSearch }) => {
  const [orders, setOrders] = React.useState(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = React.useState<OrderStatus | 'All'>('All');

  const handleAction = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return <Check size={14} className="text-emerald-500" />;
      case OrderStatus.SHIPPED: return <Truck size={14} className="text-blue-500" />;
      case OrderStatus.PROCESSING: return <Clock size={14} className="text-purple-500" />;
      case OrderStatus.ON_HOLD: return <AlertCircle size={14} className="text-amber-500" />;
      default: return <Clock size={14} />;
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(globalSearch.toLowerCase()) || 
                          o.customerName.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Workflow Pipeline</h2>
          <p className="text-slate-500 text-sm">Managing active fulfillment cycles and regional approvals</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {['All', OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPED].map(s => (
            <button 
              key={s} 
              onClick={() => setFilterStatus(s as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${filterStatus === s ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors ${order.status === OrderStatus.PENDING ? 'bg-amber-400' : 'bg-blue-600'}`} />
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{order.id}</h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${order.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'bg-slate-50 text-slate-500 dark:bg-slate-800'}`}>
                    {order.priority} Priority
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="font-semibold text-slate-900 dark:text-slate-300">{order.customerName}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span>{order.items} Units</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 lg:gap-12">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Total</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">${order.total.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                    {getStatusIcon(order.status)}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">{order.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {order.status === OrderStatus.PENDING && (
                    <>
                      <button 
                        onClick={() => handleAction(order.id, OrderStatus.PROCESSING)}
                        className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleAction(order.id, OrderStatus.CANCELLED)}
                        className="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                  <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-slate-900 dark:hover:text-white transition-all">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="text-blue-600">Order</span>
                <span className={order.status !== OrderStatus.PENDING ? 'text-blue-600' : ''}>Production</span>
                <span className={order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED ? 'text-blue-600' : ''}>Transit</span>
                <span className={order.status === OrderStatus.DELIVERED ? 'text-blue-600' : ''}>Delivered</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-700" 
                  style={{ width: order.status === OrderStatus.DELIVERED ? '100%' : order.status === OrderStatus.SHIPPED ? '75%' : order.status === OrderStatus.PROCESSING ? '50%' : '25%' }}
                />
              </div>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
             <Clock size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-500 font-bold">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
