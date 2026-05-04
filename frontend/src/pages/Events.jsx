import React, { useState } from 'react';

// Temporary Mock Data
const mockEvents = [
  { id: 1, name: '100m Sprint', type: 'Track', genderCategory: 'Boys' },
  { id: 2, name: 'Long Jump', type: 'Field', genderCategory: 'Girls' },
  { id: 3, name: '4x100m Relay', type: 'Relay', genderCategory: 'Mixed' }
];

const mockAchievements = [
  { id: 1, eventId: 1, year: 2024, first: 'John Doe (10.5s)', second: 'Surya Pratap (10.8s)', third: 'Rahul Verma (11.0s)' },
  { id: 2, eventId: 2, year: 2024, first: 'Aditi Sharma (5.2m)', second: 'Priya Singh (4.9m)', third: 'Neha Gupta (4.8m)' }
];

const Events = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {mockEvents.map(event => {
          const achievement = mockAchievements.find(a => a.eventId === event.id && a.year.toString() === selectedYear);

          return (
            <div key={event.id} className="card glass-panel" style={{ overflow: 'hidden' }}>
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
                    {achievement ? (
                      <>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1rem 1.5rem', color: '#ffd700', fontWeight: 'bold' }}>🥇 1st Place</td>
                          <td style={{ padding: '1rem 1.5rem' }}>{achievement.first}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1rem 1.5rem', color: '#c0c0c0', fontWeight: 'bold' }}>🥈 2nd Place</td>
                          <td style={{ padding: '1rem 1.5rem' }}>{achievement.second}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1rem 1.5rem', color: '#cd7f32', fontWeight: 'bold' }}>🥉 3rd Place</td>
                          <td style={{ padding: '1rem 1.5rem' }}>{achievement.third}</td>
                        </tr>
                      </>
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
    </div>
  );
};

export default Events;
