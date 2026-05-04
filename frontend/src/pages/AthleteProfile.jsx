import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const AthleteProfile = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const { data } = await api.get(`/athletes/${id}`);
        setAthlete(data);
      } catch (error) {
        console.error('Failed to fetch athlete', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAthlete();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--primary)' }}>Loading profile...</div>;
  if (!athlete) return <div style={{ textAlign: 'center', padding: '5rem' }}>Athlete not found.</div>;

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh' }}>
      <Link to="/athletes" style={{ color: 'var(--primary)', marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Directory
      </Link>
      
      <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', padding: '3rem' }}>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <img 
            src={athlete.photoUrl} 
            alt={athlete.name} 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {athlete.category}
            </span>
            <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0' }}>{athlete.name}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              {athlete.department} | {athlete.graduationYear ? `Class of ${athlete.graduationYear}` : 'Staff'}
            </p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Biography</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              {athlete.bio || `${athlete.name} is a dedicated ${athlete.category.toLowerCase()} athlete from the ${athlete.department} department at IIT Indore.`}
            </p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
              {athlete.email && <div><span style={{color: 'var(--text-muted)'}}>Email:</span> <br/> {athlete.email}</div>}
              {athlete.contact && <div><span style={{color: 'var(--text-muted)'}}>Phone:</span> <br/> {athlete.contact}</div>}
              {athlete.whatsappNumber && <div><span style={{color: 'var(--text-muted)'}}>WhatsApp:</span> <br/> {athlete.whatsappNumber}</div>}
              {athlete.homeAddress && <div style={{gridColumn: 'span 2'}}><span style={{color: 'var(--text-muted)'}}>Address:</span> <br/> {athlete.homeAddress}</div>}
              {(!athlete.email && !athlete.contact && !athlete.whatsappNumber && !athlete.homeAddress) && 
                <div style={{color: 'var(--text-muted)'}}>No contact information provided.</div>
              }
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Medical Status</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: athlete.medicalStatus === 'Fit' ? 'var(--accent)' : '#ef4444' }}>
                {athlete.medicalStatus}
              </span>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Status</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: athlete.isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
                {athlete.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfile;
