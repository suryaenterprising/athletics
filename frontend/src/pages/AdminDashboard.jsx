import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('athletes');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: 'var(--surface-light)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '0 2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Admin Dashboard</h2>
        </div>
        
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['athletes', 'events', 'achievements'].map((tab) => (
            <li key={tab}>
              <button 
                onClick={() => setActiveTab(tab)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 2rem',
                  backgroundColor: activeTab === tab ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-main)',
                  border: 'none',
                  borderRight: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: '1.1rem',
                  transition: 'var(--transition)'
                }}
              >
                Manage {tab}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', padding: '0 2rem' }}>
          <button onClick={handleLogout} className="btn" style={{ width: '100%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content area */}
      <div style={{ flex: 1, padding: '3rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', textTransform: 'capitalize' }}>Manage {activeTab}</h1>
          <button className="btn btn-primary">+ Add New</button>
        </div>

        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            This is the placeholder for the {activeTab} data table. Once connected to the backend API, 
            this will display a full CRUD table allowing you to add, edit, or delete records.
          </p>
          <div style={{ marginTop: '2rem', height: '300px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Data Table goes here
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
