import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddRecordModal = ({ isOpen, onClose, type, onSuccess, availableEvents, availableAthletes }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when type changes
  useEffect(() => {
    if (type === 'athletes') {
      setFormData({ name: '', rollNo: '', department: '', category: 'Student', graduationYear: new Date().getFullYear(), medicalStatus: 'Fit' });
    } else if (type === 'events') {
      setFormData({ name: '', type: 'Track', genderCategory: 'Boys', description: '' });
    } else if (type === 'achievements') {
      setFormData({ 
        event: availableEvents.length > 0 ? availableEvents[0]._id : '', 
        year: new Date().getFullYear(), 
        gender: 'Boys',
        positions: [] 
      });
    }
  }, [type, availableEvents]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (type === 'athletes') {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
          data.append(key, formData[key]);
        });
        await api.post(`/${type}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post(`/${type}`, formData);
      }
      
      onSuccess(); // Refresh data
      onClose(); // Close modal
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="card glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>Add New {type.slice(0, -1)}</h2>
        
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {type === 'athletes' && (
            <>
              <div><label>Name</label><input required name="name" value={formData.name || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Roll No (Optional)</label><input name="rollNo" value={formData.rollNo || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Department</label><input required name="department" value={formData.department || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Category</label>
                <select name="category" value={formData.category || 'Student'} onChange={handleChange} className="form-input">
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Coach">Coach</option>
                </select>
              </div>
              <div><label>Class of (Graduation Year)</label><input type="number" name="graduationYear" value={formData.graduationYear || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Email (Gmail)</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Contact Number</label><input name="contact" value={formData.contact || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>WhatsApp Number</label><input name="whatsappNumber" value={formData.whatsappNumber || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Home Address</label><input name="homeAddress" value={formData.homeAddress || ''} onChange={handleChange} className="form-input" /></div>
              <div><label>Bio</label><textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="form-input" style={{ minHeight: '100px' }} /></div>
              <div>
                <label>Athlete Photo</label>
                <input type="file" name="photo" accept="image/*" onChange={handleChange} className="form-input" style={{ padding: '0.5rem' }} />
                <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem'}}>Optional. Must have Cloudinary keys set in backend .env to work.</p>
              </div>
            </>
          )}

          {type === 'events' && (
            <>
              <div><label>Event Name</label><input required name="name" placeholder="e.g., 100m Sprint" value={formData.name || ''} onChange={handleChange} className="form-input" /></div>
              <div>
                <label>Type</label>
                <select name="type" value={formData.type || 'Track'} onChange={handleChange} className="form-input">
                  <option value="Track">Track</option>
                  <option value="Field">Field</option>
                  <option value="Relay">Relay</option>
                </select>
              </div>
              <div>
                <label>Gender Category</label>
                <select name="genderCategory" value={formData.genderCategory || 'Boys'} onChange={handleChange} className="form-input">
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </>
          )}

          {type === 'achievements' && (
            <>
              <div>
                <label>Event</label>
                <select required name="event" value={formData.event || ''} onChange={handleChange} className="form-input">
                  {availableEvents.map(evt => <option key={evt._id} value={evt._id}>{evt.name} ({evt.genderCategory})</option>)}
                </select>
              </div>
              <div><label>Year</label><input required type="number" name="year" value={formData.year || ''} onChange={handleChange} className="form-input" /></div>
              <div>
                <label>Gender</label>
                <select name="gender" value={formData.gender || 'Boys'} onChange={handleChange} className="form-input">
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                </select>
              </div>
              <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>* Note: Position adding is simplified for this demo. API accepts standard positions array.</p>
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn" style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .form-input {
          width: 100%; padding: 0.75rem; margin-top: 0.25rem; border-radius: var(--radius-sm);
          border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: white;
        }
        label { color: var(--text-muted); font-size: 0.9rem; }
      `}} />
    </div>
  );
};

export default AddRecordModal;
