/* ============================================================
   Action Adventure Divers — Node.js Backend Server
   ============================================================ */

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ============ MIDDLEWARE ============

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));
app.use(morgan('dev'));

// Rate limiting — 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please try again in a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Static file serving
app.use(express.static(__dirname));

// ============ HELPERS ============

function logError(err) {
  const timestamp = new Date().toISOString();
  const msg = `[${timestamp}] ${err.stack || err.message || err}\n`;
  fs.appendFileSync(path.join(__dirname, 'error.log'), msg);
}

function validateBooking(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push('Full name is required (min 2 characters).');
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('A valid email address is required.');
  if (!data.dates || data.dates.trim().length < 3) errors.push('Preferred dates are required.');
  if (!data.interest) errors.push('Please select what you\'re interested in.');
  return errors;
}

function saveInquiry(type, data) {
  const filename = `${type}-${Date.now()}.json`;
  const filepath = path.join(DATA_DIR, filename);
  const record = { type, timestamp: new Date().toISOString(), data };
  fs.writeFileSync(filepath, JSON.stringify(record, null, 2));
  return filepath;
}

// ============ EMAIL SENDING (nodemailer) ============
/*
  To enable email sending, set these environment variables:
    MAIL_HOST=smtp.gmail.com
    MAIL_PORT=587
    MAIL_USER=your-email@gmail.com
    MAIL_PASS=your-app-password  (Use a Gmail App Password, not your regular password)
    MAIL_TO=info@aadivers.net

  If env vars are not set, email will be logged to console instead.
*/
async function sendEmail({ subject, text, html }) {
  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const to = process.env.MAIL_TO || 'info@aadivers.net';

  if (!host || !user || !pass) {
    console.log('[EMAIL] Email not sent — MAIL_HOST/MAIL_USER/MAIL_PASS not configured.');
    console.log('[EMAIL] Would have sent:', { to, subject, text });
    return { sent: false, reason: 'Email not configured' };
  }

  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.MAIL_PORT || '587', 10),
      secure: false,
      auth: { user, pass }
    });

    const info = await transporter.sendMail({
      from: `"Action Adventure Divers" <${user}>`,
      replyTo: user,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>')
    });

    console.log('[EMAIL] Sent:', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    logError(err);
    return { sent: false, reason: err.message };
  }
}

// ============ API ROUTES ============

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Booking inquiry
app.post('/api/booking', async (req, res) => {
  try {
    const errors = validateBooking(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const data = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      phone: (req.body.phone || '').trim(),
      guests: req.body.guests || '1',
      dates: req.body.dates.trim(),
      interest: req.body.interest,
      certification: req.body.certification || 'none',
      message: (req.body.message || '').trim(),
      source: req.body.source || 'website'
    };

    // Save to local JSON file as backup
    const savedPath = saveInquiry('booking', data);

    // Build email content
    const subject = `Booking Inquiry from ${data.name}`;
    const text = [
      `New Booking Inquiry`,
      `-------------------`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Guests: ${data.guests}`,
      `Preferred Dates: ${data.dates}`,
      `Interest: ${data.interest}`,
      `Certification: ${data.certification}`,
      `Message: ${data.message}`,
      `Source: ${data.source}`,
      ``,
      `Backup saved to: ${savedPath}`
    ].join('\n');

    const emailResult = await sendEmail({ subject, text });

    res.json({
      success: true,
      message: 'Your inquiry has been received. We\'ll respond within 2 hours on business days.',
      emailSent: emailResult.sent,
      reference: path.basename(savedPath, '.json')
    });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, errors: ['An unexpected error occurred. Please try again or email us directly at info@aadivers.net.'] });
  }
});

// General contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject: subj, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, errors: ['Name, email, and message are required.'] });
    }

    const data = { name: name.trim(), email: email.trim(), subject: (subj || '').trim(), message: message.trim(), source: 'contact-form' };
    const savedPath = saveInquiry('contact', data);

    const text = [
      `New Contact Message`,
      `------------------`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      `Message: ${data.message}`,
      ``,
      `Backup saved to: ${savedPath}`
    ].join('\n');

    const emailResult = await sendEmail({ subject: `Contact from ${data.name}: ${data.subject || 'No subject'}`, text });

    res.json({
      success: true,
      message: 'Your message has been received. We\'ll get back to you soon!',
      emailSent: emailResult.sent
    });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, errors: ['An unexpected error occurred. Please try again.'] });
  }
});

// ============ GRACEFUL SHUTDOWN ============
function shutdown(signal) {
  console.log(`\n[SERVER] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[SERVER] HTTP server closed.');
    process.exit(0);
  });
  // Force exit after 10s
  setTimeout(() => {
    console.error('[SERVER] Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ============ START ============
const server = app.listen(PORT, () => {
  console.log(`\n  🏝️  Action Adventure Divers Server`);
  console.log(`  ───────────────────────────────`);
  console.log(`  Server:   http://localhost:${PORT}`);
  console.log(`  Health:   http://localhost:${PORT}/api/health`);
  console.log(`  Booking:  POST http://localhost:${PORT}/api/booking`);
  console.log(`  Contact:  POST http://localhost:${PORT}/api/contact`);
  console.log(`  Serving:  ${__dirname}\n`);
});
