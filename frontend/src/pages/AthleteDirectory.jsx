import React, { useState, useEffect } from 'react';
import AthleteCard from '../components/AthleteCard';

// Temporary Mock Data for UI demonstration
const mockAthletes = [
  { id: 1, name: 'Surya Pratap', department: 'Computer Science', category: 'Student', graduationYear: 2026, photoUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Aditi Sharma', department: 'Electrical', category: 'Student', graduationYear: 2025, photoUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Rahul Verma', department: 'Mechanical', category: 'Alumni', graduationYear: 2022, photoUrl: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Coach Singh', department: 'Sports', category: 'Coach', photoUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80' },
];

const AthleteDirectory = () => {
  const [athletes, setAthletes] = useState(mockAthletes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Logic to fetch from API will go here
  // useEffect(() => { ... fetch from /api/athletes ... }, [])

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

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {filteredAthletes.map(athlete => (
          <AthleteCard key={athlete.id || athlete._id} athlete={athlete} />
        ))}
      </div>
      
      {filteredAthletes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No athletes found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default AthleteDirectory;
