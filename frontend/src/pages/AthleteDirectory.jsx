import React, { useState, useEffect } from 'react';
import AthleteCard from '../components/AthleteCard';
import api from '../services/api';

const AthleteDirectory = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const { data } = await api.get('/athletes');
        setAthletes(data);
      } catch (error) {
        console.error('Failed to fetch athletes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || athlete.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>Athlete Directory</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore the profiles of our students, alumni, and coaching staff.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '3rem', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--surface-light)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'var(--bg-dark)',
            color: 'white',
            flexGrow: 1,
            maxWidth: '400px'
          }}
        />
        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'var(--bg-dark)',
            color: 'white'
          }}
        >
          <option value="All">All Categories</option>
          <option value="Student">Students</option>
          <option value="Alumni">Alumni</option>
          <option value="Coach">Coaches</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--primary)' }}>Loading athletes...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredAthletes.map(athlete => (
              <AthleteCard key={athlete._id || athlete.id} athlete={athlete} />
            ))}
          </div>
          
          {filteredAthletes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No athletes found matching your criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AthleteDirectory;
