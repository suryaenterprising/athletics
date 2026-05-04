import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 5%',
      backgroundColor: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ color: 'white', margin: 0 }}>IIT<span style={{ color: 'var(--primary)' }}>Indore</span> Athletics</h2>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Home</Link>
        <Link to="/athletes" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Athletes</Link>
        <Link to="/events" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Events</Link>
        <Link to="/admin/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Admin Portal</Link>
      </div>
    </nav>
  );
};

export default Navbar;
