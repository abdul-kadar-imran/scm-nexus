
import React from 'react';
import { Package, ShoppingCart, CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_KPI, CHART_DATA_VARIANTS, MOCK_ACTIVITIES } from '../lib/mock-data';
import { UserRole } from '../types';

interface DashboardProps {
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return <Package className="text-blue-500" size={20} />;
      case 'ShoppingCart': return <ShoppingCart className="text-purple-500" size={20} />;
      case 'CheckCircle': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'AlertTriangle': return <AlertTriangle className="text-amber-500" size={20} />;
      default: return null;
    }
  };

  // Co-directors see less critical financial data and fewer metrics
  const visibleKPIs = userRole === 'director' 
    ? MOCK_KPI 
    : MOCK_KPI.filter(k => k.label === 'Orders in Pipeline' || k.label === 'Critical Alerts');

  const activitiesToShow = userRole === 'director' 
    ? MOCK_ACTIVITIES 
    : MOCK_ACTIVITIES.slice(0, 3); // Minimal list for co-directors

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                {getIcon(kpi.icon)}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                kpi.trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 
                kpi.trend === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 
                'text-slate-500 bg-slate-50 dark:bg-slate-800'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={14} /> : kpi.trend === 'down' ? <ArrowDownRight size={14} /> : null}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Supply vs Demand Forecast</h3>
              <p className="text-sm text-slate-500">Inventory flow comparison across global nodes</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-xs font-semibold rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Last 7 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA_VARIANTS.Quarter}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="demand" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} />
                <Area type="monotone" dataKey="supply" stroke="#10b981" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            {userRole === 'director' && <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>}
          </div>
          <div className="space-y-6">
            {activitiesToShow.map((act) => (
              <div key={act.id} className="flex gap-4 group">
                <div className={`w-2 mt-1.5 h-10 rounded-full transition-all group-hover:w-3 ${
                  act.type === 'order' ? 'bg-blue-400' : 
                  act.type === 'inventory' ? 'bg-amber-400' : 
                  act.type === 'alert' ? 'bg-red-400' : 'bg-slate-300'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{act.type}</p>
                    <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-2">{act.description}</p>
                  {userRole === 'director' && <p className="text-[11px] text-slate-500 mt-1">Initiated by <span className="font-semibold">{act.user}</span></p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
