import React from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const sectionVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! (This is a demo form - For real functionality, integrate a service like Formspree or a backend.)");
    // Add actual form submission logic here
  };

  return (
    <motion.div
      className="contact-page page-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.h2 variants={itemVariants} className="text-center page-title">Get In Touch</motion.h2>
        <motion.p variants={itemVariants} className="text-center page-subtitle">
          Have a project in mind, a question, or just want to say hi? I'd love to hear from you!
        </motion.p>

        <div className="contact-content">
          <motion.div variants={itemVariants} className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> <a href="mailto:your.actual.email@example.com">your.actual.email@example.com</a></p> {/* PLEASE UPDATE YOUR EMAIL */}
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/shahmir-ahmed-a89790294/" target="_blank" rel="noopener noreferrer">linkedin.com/in/shahmir-ahmed-a89790294/</a></p> {/* UPDATED */}
            <p><strong>GitHub:</strong> <a href="https://github.com/shahmir2004" target="_blank" rel="noopener noreferrer">github.com/shahmir2004</a></p> {/* UPDATED */}
          </motion.div>

          <motion.form variants={itemVariants} className="contact-form" onSubmit={handleSubmit}>
            <h3>Send Me a Message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
export default ContactPage;