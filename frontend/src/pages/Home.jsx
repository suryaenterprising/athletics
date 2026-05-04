import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 5%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'var(--primary)',
          filter: 'blur(150px)',
          opacity: 0.2,
          borderRadius: '50%',
          zIndex: -1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'var(--secondary)',
          filter: 'blur(150px)',
          opacity: 0.15,
          borderRadius: '50%',
          zIndex: -1
        }}></div>

        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'white' }}>
          Pushing Limits.<br/>
          <span style={{ color: 'var(--primary)' }}>Breaking Records.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2.5rem' }}>
          The official athletics portal of IIT Indore. Discover our elite athletes, track historic records, and stay updated with upcoming events.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/athletes" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Meet the Athletes
          </Link>
          <Link to="/events" className="btn" style={{ 
            fontSize: '1.1rem', 
            padding: '1rem 2rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white'
          }}>
            View Records
          </Link>
        </div>
      </section>

      {/* Featured Section placeholder */}
      <section style={{ padding: '5rem 5%', backgroundColor: 'var(--bg-dark)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Latest Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* We will map over recent achievements here */}
          {[1, 2, 3].map(i => (
            <div key={i} className="card glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>100m Sprint</span>
                <span style={{ color: 'var(--text-muted)' }}>2024</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Gold Medal</h3>
              <p style={{ color: 'var(--text-muted)' }}>Achieved by John Doe with a record time of 10.5s.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
