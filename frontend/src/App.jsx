import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AthleteDirectory from './pages/AthleteDirectory';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/athletes" element={<AthleteDirectory />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Add more routes later */}
          </Routes>
        </main>
        {/* Footer component will go here */}
      </div>
    </Router>
  );
}

export default App;
