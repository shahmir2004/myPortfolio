// portfolio-project/api/contact.js
import { Resend } from 'resend';
import cors from 'cors';

// Helper to initialize and run CORS middleware
const corsMiddleware = cors({
  methods: ['POST', 'OPTIONS'], // Allow POST and OPTIONS for preflight
  // For production, you might want to restrict origin:
  // origin: process.env.VERCEL_ENV === 'production' ? 'https://your-deployed-domain.com' : '*',
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Resend Setup
// Get your API key from https://resend.com/api-keys
const resend = new Resend(process.env.RESEND_API_KEY);


export default async function handler(req, res) {
  // Run CORS middleware for every request to this function
  await runMiddleware(req, res, corsMiddleware);

  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please try again later.',
      });
    }

    const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || 'saima.shahmir@gmail.com';

    // Basic validation
    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    try {
      // Send notification email to owner
      const { error: ownerError } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: EMAIL_RECEIVER,
        replyTo: email,
        subject: `New Portfolio Contact from ${name} (${email})`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email (Reply-To):</strong> ${email}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (ownerError) {
        console.error('Error sending notification email:', ownerError);
        return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
      }

      console.log(`Notification email sent to ${EMAIL_RECEIVER} from ${email}`);

      // Send confirmation email to user (optional, don't fail if this fails)
      try {
        await resend.emails.send({
          from: 'Shahmir Ahmed <onboarding@resend.dev>',
          to: email,
          subject: 'Thank you for contacting Shahmir Ahmed!',
          html: `
            <p>Hi ${name},</p>
            <p>Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible (typically within 24-48 hours).</p>
            <p>For your records, here's a copy of the message you sent:</p>
            <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 0.5em; font-style: italic;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </blockquote>
            <p>Best regards,</p>
            <p>Shahmir Ahmed</p>
          `,
        });
        console.log(`Confirmation email sent to user: ${email}`);
      } catch (userEmailError) {
        console.error(`Failed to send confirmation email to ${email}:`, userEmailError.message);
      }

      return res.status(200).json({ success: true, message: 'Message sent successfully! You should receive a confirmation email shortly.' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}