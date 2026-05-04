import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Events = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsRes, achievementsRes] = await Promise.all([
          api.get('/events'),
          api.get(`/achievements?year=${selectedYear}`)
        ]);
        setEvents(eventsRes.data);
        setAchievements(achievementsRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>Events & Records</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore the official track and field records of IIT Indore.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'var(--surface-light)',
            color: 'white',
            fontSize: '1.1rem'
          }}
        >
          <option value="2024">2024 Inter-IIT</option>
          <option value="2023">2023 Inter-IIT</option>
          <option value="2022">2022 Inter-IIT</option>
        </select>
      </div>

      {/* Events Tables */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--primary)' }}>Loading records...</div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No events registered yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {events.map(event => {
            const achievement = achievements.find(a => a.event && a.event._id === event._id);

            return (
              <div key={event._id} className="card glass-panel" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h2 style={{ fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{event.name} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>({event.genderCategory})</span></span>
                    <span style={{ fontSize: '1rem', color: 'var(--primary)' }}>{event.type}</span>
                  </h2>
                </div>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Position</th>
                        <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Athlete & Record</th>
                      </tr>
                    </thead>
                    <tbody>
                      {achievement && achievement.positions && achievement.positions.length > 0 ? (
                        achievement.positions.map((pos) => (
                          <tr key={pos._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem 1.5rem', color: pos.position === 1 ? '#ffd700' : pos.position === 2 ? '#c0c0c0' : '#cd7f32', fontWeight: 'bold' }}>
                              {pos.position === 1 ? '🥇 1st Place' : pos.position === 2 ? '🥈 2nd Place' : '🥉 3rd Place'}
                            </td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                              {pos.athlete ? pos.athlete.name : 'Unknown Athlete'} 
                              {pos.performanceRecord && ` (${pos.performanceRecord})`}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No records found for {selectedYear}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;
