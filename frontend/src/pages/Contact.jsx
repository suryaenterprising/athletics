import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '6rem 5%', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Have questions about athletics at IIT Indore? Want to join a team or report an achievement? We're here to help.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Email Us</h3>
            <p style={{ fontSize: '1.2rem' }}>athletics@iiti.ac.in</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Our Location</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Sports Complex, <br/>
              IIT Indore, Simrol, <br/>
              Khandwa Road, Indore - 453552
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Office Hours</h3>
            <p style={{ color: 'var(--text-muted)' }}>Monday - Friday: 9:00 AM - 5:30 PM</p>
            <p style={{ color: 'var(--text-muted)' }}>Saturday: 10:00 AM - 2:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card glass-panel" style={{ padding: '3rem' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Name</label>
              <input type="text" className="contact-input" placeholder="Your Name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" className="contact-input" placeholder="your@email.com" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
              <textarea className="contact-input" style={{ minHeight: '150px' }} placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-input {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          color: white;
          font-family: inherit;
          transition: var(--transition);
        }
        .contact-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
        }
      `}} />
    </div>
  );
};

export default Contact;
