// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './ContactPage.css';
// Import shared variants
import {
  sectionScrollRevealVariants,
  itemFadeInUpVariants, // Using this for scrollItemVariants as well
  buttonHoverTapVariants
} from '../utils/animationVariants'; // Adjust path if needed, e.g., '../../utils/animationVariants' if ContactPage is deeper

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: null, message: 'Sending...' });

    const contactApiUrl = '/api/contact';

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setFormStatus({ submitting: false, success: true, message: result.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus({ submitting: false, success: null, message: '' }), 5000);
      } else {
        setFormStatus({ submitting: false, success: false, message: result.message || 'An error occurred. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ submitting: false, success: false, message: 'Network error or server issue. Please try again later.' });
    }
  };

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'shahmir.portfolio@example.com';

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Shahmir Ahmed",
    "description": "Get in touch with Shahmir Ahmed - Software Developer and Programmer for project inquiries, collaborations, or questions",
    "mainEntity": {
      "@type": "Person",
      "name": "Shahmir Ahmed",
      "email": contactEmail,
      "url": "https://shahmirahmad.vercel.app/"
    }
  };

  return (
    <motion.div
      className="contact-page content-section-overlay"
      variants={sectionScrollRevealVariants}
      initial="hidden"
      animate="visible" // Or whileInView
      viewport={{ once: true, amount: 0.1 }} // Only if using whileInView
    >
      <SEO 
        title="Contact Shahmir Ahmed | Software Developer & Programmer"
        description="Get in touch with Shahmir Ahmed - Software Developer and Programmer. Available for freelance projects, collaborations, and inquiries. Let's build something amazing together!"
        keywords="Contact Shahmir Ahmed, Hire Software Developer, Hire Programmer, Freelance Developer, Contact Programmer"
        url="/contact"
        schemaMarkup={contactSchema}
      />
      <div className="container">
        <motion.h2 variants={itemFadeInUpVariants} className="section-title text-shadow-soft text-center">
            Get In Touch
        </motion.h2>
        <motion.p variants={itemFadeInUpVariants} className="section-subtitle text-center">
          Have a project in mind, a question, or just want to say hi? I'd love to hear from you!
        </motion.p>

        <div className="contact-content-grid">
          <motion.div variants={itemFadeInUpVariants} className="contact-info-block">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="standard-link">{contactEmail}</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/shahmir-ahmed-a89790294/" target="_blank" rel="noopener noreferrer" className="standard-link">Shahmir Ahmed</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/shahmir2004" target="_blank" rel="noopener noreferrer" className="standard-link">shahmir2004</a></p>
          </motion.div>

          <motion.form variants={itemFadeInUpVariants} className="contact-form-block" onSubmit={handleSubmit}>
            <h3>Send Me a Message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
            </div>

            {formStatus.message && (
              <motion.p
                className={`form-status ${formStatus.success === true ? 'success' : formStatus.success === false ? 'error' : 'info'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10}} // Requires AnimatePresence if it unmounts
              >
                {formStatus.message}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={formStatus.submitting}
              variants={buttonHoverTapVariants} // Now defined and imported
              whileHover="hover"
              whileTap="tap"
              // Initial animation handled by parent's itemFadeInUpVariants if this button is wrapped in motion.div
              // If not wrapped, you might need initial/animate here too.
              // Let's wrap it for consistency:
            >
              {formStatus.submitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactPage;