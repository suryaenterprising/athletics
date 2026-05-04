import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RecordModal from '../components/RecordModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('athletes');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
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

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) {
      try {
        await api.delete(`/${activeTab}/${id}`);
        fetchTabData();
      } catch (error) {
        console.error(`Failed to delete ${activeTab.slice(0, -1)}`, error);
        alert('Failed to delete record.');
      }
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setIsModalOpen(true);
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
          {['athletes', 'events', 'achievements', 'messages'].map((tab) => (
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
          {activeTab !== 'messages' && (
            <button className="btn btn-primary" onClick={handleAddNew}>+ Add New</button>
          )}
        </div>

        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            This is the placeholder for the {activeTab} data table. The actual CRUD interfaces will be built here.
          </p>
          <div style={{ marginTop: '2rem', minHeight: '300px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: 'var(--primary)' }}>Loading {activeTab}...</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '1rem' }}>Name/Event</th>
                      <th style={{ padding: '1rem' }}>Details</th>
                      <th style={{ padding: '1rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem' }}>
                          {activeTab === 'athletes' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <img src={item.photoUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                              <span>{item.name}</span>
                            </div>
                          )}
                          {activeTab === 'events' && item.name}
                          {activeTab === 'achievements' && (item.event?.name || 'Unknown Event')}
                          {activeTab === 'messages' && (
                            <div>
                              <strong style={{ color: 'var(--text-main)' }}>{item.name}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.email}</div>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          {activeTab === 'athletes' && `${item.category} | ${item.department}`}
                          {activeTab === 'events' && `${item.type} | ${item.genderCategory}`}
                          {activeTab === 'achievements' && `Year: ${item.year} | Gender: ${item.gender}`}
                          {activeTab === 'messages' && (
                            <div style={{ maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                              {item.message}
                              <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.6 }}>
                                {new Date(item.createdAt).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {activeTab !== 'messages' && (
                              <button 
                                onClick={() => handleEdit(item)}
                                className="btn" 
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.05)' }}
                              >
                                Edit
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(item._id)}
                              className="btn" 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No records found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <RecordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={activeTab} 
        onSuccess={fetchTabData}
        availableEvents={eventsList}
        editData={editData}
      />
    </div>
  );
};

export default AdminDashboard;
