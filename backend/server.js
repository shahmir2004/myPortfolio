// backend/server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001; // Backend runs on a different port

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Nodemailer Transporter Setup (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Optional: For some environments or strict TLS, you might need these
  // tls: {
  //   rejectUnauthorized: false // Not recommended for production unless necessary
  // }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email transporter configuration:', error);
  } else {
    console.log('Email transporter is ready to send emails');
  }
});

// API Endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"Portfolio Contact <${process.env.EMAIL_USER}>"`, // Sender address (shows your name)
    to: process.env.EMAIL_TO, // List of receivers
    subject: `New Contact Form Submission from ${name}`, // Subject line
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p> {/* Preserve line breaks */}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully from:', email);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    // Log the specific error from Nodemailer if possible
    // console.error('Nodemailer error details:', error.response || error.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// Simple test route
app.get('/', (req, res) => {
  res.send('Contact Form Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});