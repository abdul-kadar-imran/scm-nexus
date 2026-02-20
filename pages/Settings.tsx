
import React, { useState } from 'react';
import { User, Bell, Shield, Database, Globe, Sliders, Check, Smartphone, Mail, Loader2, Lock } from 'lucide-react';
import { UserRole } from '../types';

interface SettingsProps {
  userRole: UserRole;
}

const Settings: React.FC<SettingsProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState({
    name: userRole === 'director' ? 'Sarah Jenkins' : 'Marcus Chen',
    email: userRole === 'director' ? 's.jenkins@nexus-scm.com' : 'm.chen@nexus-scm.com',
    region: userRole === 'director' ? 'EMEA Central' : 'APAC North',
    timezone: userRole === 'director' ? 'UTC +0 (London)' : 'UTC +8 (Singapore)'
  });

  // Notification Preference State
  const [prefs, setPrefs] = useState({
    lowStock: true,
    delays: true,
    approvals: false
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = userRole === 'director' 
    ? ['Profile', 'Security', 'Notifications', 'Database']
    : ['Profile', 'Notifications'];

  return (
    <div className="p-4 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">System Architecture</h2>
          <p className="text-slate-500 text-sm">Configure global node endpoints and administrative preferences</p>
        </div>
        {saved && (
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-right-4">
            <Check size={14} /> Configuration Updated
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-56 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
          {userRole === 'co-director' && (
            <div className="p-4 mt-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                 <Lock size={12} /> Security Locked
               </p>
               <p className="text-[9px] text-slate-500 mt-1">Admin clearance required for infra settings.</p>
            </div>
          )}
        </aside>

        <div className="flex-1 space-y-6">
          {activeTab === 'Profile' && (
            <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
              <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800">
                    <img src={userRole === 'director' ? 'https://picsum.photos/seed/director/200/200' : 'https://picsum.photos/seed/codir/200/200'} alt={profile.name} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{profile.name}</h3>
                    <p className="text-xs text-slate-500">{userRole === 'director' ? 'Director of Global Supply Chains' : 'Associate Operations Director'}</p>
                    <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Change Profile Picture</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Email</label>
                    <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Default Region</label>
                    <select value={profile.region} onChange={e => setProfile({...profile, region: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>EMEA Central</option>
                      <option>APAC North</option>
                      <option>North America</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timezone</label>
                    <select value={profile.timezone} onChange={e => setProfile({...profile, timezone: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>UTC +0 (London)</option>
                      <option>UTC +1 (Paris)</option>
                      <option>UTC +8 (Singapore)</option>
                      <option>UTC -5 (New York)</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
              <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h3 className="font-bold mb-6 flex items-center gap-2"><Bell size={18} className="text-blue-500" /> Alert Thresholds</h3>
                <div className="space-y-4">
                  {[
                    { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Notify when SKU drops below threshold', icon: <Database size={16} /> },
                    { key: 'delays', label: 'Shipment Delays', desc: 'Notify if transit exceeds 48h ETA', icon: <Smartphone size={16} /> },
                    { key: 'approvals', label: 'Approval Required', desc: 'Email when orders require manager sign-off', icon: <Mail size={16} /> }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                      <div className="flex gap-4">
                        <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-500">{item.icon}</div>
                        <div>
                          <p className="text-sm font-bold">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => togglePref(item.key as any)}
                        className={`w-12 h-6 rounded-full relative p-1 transition-colors ${prefs[item.key as keyof typeof prefs] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${prefs[item.key as keyof typeof prefs] ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'Security' && userRole === 'director' && (
            <div className="animate-[fadeIn_0.3s_ease-out] bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <Shield size={48} className="mx-auto text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Corporate SSO Active</h3>
              <p className="text-sm text-slate-500 mb-6">Your account is managed via Azure Active Directory. Security policies are enforced by your organization.</p>
              <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Manage SSO Identity</button>
            </div>
          )}

          {activeTab === 'Database' && userRole === 'director' && (
            <div className="animate-[fadeIn_0.3s_ease-out] bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-3 mb-6">
                <Database className="text-amber-500" />
                <h3 className="font-bold">Data Retention Policy</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-xl">
                    <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">Critical: Automated backups are scheduled for 02:00 GMT daily.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retain Audit Logs For</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2.5 outline-none">
                      <option>12 Months</option>
                      <option>24 Months</option>
                      <option>Indefinite</option>
                    </select>
                  </div>
               </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 active:scale-95 disabled:opacity-70 transition-all flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : null}
              {isSaving ? 'Processing...' : 'Commit Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
