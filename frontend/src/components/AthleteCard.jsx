import React from 'react';
import { Link } from 'react-router-dom';

const AthleteCard = ({ athlete }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={athlete.photoUrl || 'https://via.placeholder.com/300x400'} 
          alt={athlete.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }}
          className="athlete-img"
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          backdropFilter: 'blur(4px)',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--primary)'
        }}>
          {athlete.category}
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{athlete.name}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {athlete.department} {athlete.graduationYear && `'${athlete.graduationYear.toString().slice(-2)}`}
        </p>
        
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to={`/athletes/${athlete._id || athlete.id}`} className="btn" style={{ 
            width: '100%', 
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'white'
          }}>
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
