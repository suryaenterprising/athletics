import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AddRecordModal from '../components/AddRecordModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('athletes');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

  const fetchTabData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/${activeTab}`);
      setData(response.data);
      
      // If we are on achievements tab, fetch events for the dropdown
      if (activeTab === 'achievements' && eventsList.length === 0) {
        const evts = await api.get('/events');
        setEventsList(evts.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout(); // Token expired or invalid
      }
      console.error(`Failed to fetch ${activeTab}`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

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
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New</button>
        </div>

        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            This is the placeholder for the {activeTab} data table. The actual CRUD interfaces will be built here.
          </p>
          <div style={{ marginTop: '2rem', minHeight: '300px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: 'var(--primary)' }}>Loading {activeTab}...</div>
            ) : (
              <div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Total {activeTab} found: {data.length}</h3>
                <pre style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-sm)', overflowX: 'auto', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {JSON.stringify(data.slice(0, 2), null, 2)}
                  {data.length > 2 && '\n\n... and more'}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddRecordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={activeTab} 
        onSuccess={fetchTabData}
        availableEvents={eventsList}
      />
    </div>
  );
};

export default AdminDashboard;
