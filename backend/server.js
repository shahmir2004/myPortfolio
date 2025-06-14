// backend/server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Render.com will set PORT env variable

// --- CORS Configuration ---
// For development, allow all. For production, restrict to your frontend domain.
const allowedOrigins = [
  'http://localhost:5173', // Your Vite frontend dev server
  process.env.FRONTEND_URL    // Your deployed frontend URL from .env
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// --- End CORS Configuration ---


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Nodemailer Transporter ---
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Your sending email address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password or service password
  },
  // Optional: For environments with strict TLS, though usually not needed for Gmail
  // tls: { rejectUnauthorized: false }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email transporter configuration:', error.message);
  } else {
    console.log('Email transporter is ready to send emails.');
  }
});
// --- End Nodemailer Transporter ---


// --- API Endpoint for Contact Form ---
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'All fields are required and cannot be empty.' });
  }

  // Basic email format validation (not foolproof, but a good start)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  // Email to You (Portfolio Owner)
  const mailToOwnerOptions = {
    from: `"Portfolio Contact <${process.env.EMAIL_USER}>"`,
    to: process.env.EMAIL_TO, // Where you receive the messages
    replyTo: email, // Client's email for easy reply
    subject: `New Portfolio Contact from ${name} (${email})`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email (Reply-To):</strong> ${email}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  // Confirmation Email to User
  const mailToUserOptions = {
    from: `"Shahmir Ahmed - Portfolio <${process.env.EMAIL_USER}>"`,
    to: email, // Send to the user who submitted the form
    subject: "Thank you for contacting Shahmir Ahmed!",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible (typically within 24-48 hours).</p>
      <p>For your records, here's a copy of the message you sent:</p>
      <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 0.5em;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </blockquote>
      <p>Best regards,</p>
      <p>Shahmir Ahmed</p>
      ${process.env.FRONTEND_URL ? `<p><a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL.replace(/^https?:\/\//, '')}</a></p>` : ''}
    `,
  };

  try {
    // Send email to yourself
    await transporter.sendMail(mailToOwnerOptions);
    console.log(`Notification email sent to ${process.env.EMAIL_TO} from ${email}`);

    // Attempt to send confirmation email to the user
    try {
      await transporter.sendMail(mailToUserOptions);
      console.log(`Confirmation email sent to user: ${email}`);
    } catch (userEmailError) {
      console.error(`Failed to send confirmation email to ${email}:`, userEmailError.message);
      // Do not fail the whole request if confirmation email fails.
      // The main email to you is more important.
    }

    res.status(200).json({ success: true, message: 'Message sent successfully! You should receive a confirmation email shortly.' });

  } catch (error) {
    console.error('Error sending main notification email:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});
// --- End API Endpoint ---


// --- Root Route for Health Check/Info ---
app.get('/', (req, res) => {
  res.send('Portfolio Contact Form Backend is active and ready!');
});
// --- End Root Route ---

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
    console.warn('WARNING: FRONTEND_URL environment variable is not set. CORS might not work as expected in production.');
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    console.error('CRITICAL ERROR: Email environment variables (EMAIL_USER, EMAIL_PASS, EMAIL_TO) are not set. Email functionality will fail.');
  }
});