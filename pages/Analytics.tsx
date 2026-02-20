
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Target, Zap, RotateCcw, Lock } from 'lucide-react';
import { CHART_DATA_VARIANTS } from '../lib/mock-data';
import { UserRole } from '../types';

interface AnalyticsProps {
  userRole: UserRole;
}

const CATEGORY_DATA = [
  { name: 'Hardware', value: 4500000 },
  { name: 'Structural', value: 3200000 },
  { name: 'Maintenance', value: 1200000 },
  { name: 'Electronics', value: 5800000 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Analytics: React.FC<AnalyticsProps> = ({ userRole }) => {
  const [period, setPeriod] = React.useState<'Day' | 'Week' | 'Month' | 'Quarter'>('Quarter');
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Operational Intelligence</h2>
          <p className="text-slate-500 text-sm">Real-time predictive modeling and performance analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className={`p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-blue-500 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RotateCcw size={18} />
          </button>
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {(['Day', 'Week', 'Month', 'Quarter'] as const).map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${period === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-opacity ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Demand Fulfillment Efficiency</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Target Demand</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Actual Supply</div>
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA_VARIANTS[period]}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="demand" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={3} />
                  <Area type="monotone" dataKey="supply" stroke="#10b981" fillOpacity={0} strokeWidth={2} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
              <Zap className="mb-4 text-blue-200" />
              <h4 className="text-xs font-bold opacity-70 uppercase tracking-widest">Efficiency Delta</h4>
              <p className="text-3xl font-bold mt-1">+14.2%</p>
              <p className="text-xs opacity-80 mt-2">Logistics overhead reduced via automated scheduling.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Target className="text-blue-500 mb-4" />
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Service Goal</h4>
              <p className="text-3xl font-bold mb-3">99.8%</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[94%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          {userRole !== 'director' && (
            <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
              <Lock className="text-slate-400 mb-2" size={32} />
              <p className="text-sm font-bold text-slate-900 dark:text-white">Confidential Assets</p>
              <p className="text-xs text-slate-500 mt-1">Valuation charts restricted to Level 1 clearance.</p>
            </div>
          )}
          <h3 className="text-lg font-bold mb-6">Asset Valuation</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-8">
            {CATEGORY_DATA.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: COLORS[i]}} />
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-blue-50 transition-colors">{cat.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {userRole === 'director' ? `$${(cat.value / 1000000).toFixed(1)}M` : '---'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
