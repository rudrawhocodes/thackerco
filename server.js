const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for frontend on a different domain/port
app.use(cors());

// Serve static files (optional, if you want to serve your frontend from here)
 app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const submissionsFile = path.join(__dirname, 'submissions.jsonl');

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,   // your email address
    pass: process.env.EMAIL_PASSWORD     // your email app password
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, company, message } = req.body;
  const timestamp = new Date().toISOString();
  const entry = { name, email, company, message, timestamp };

  // Store to file
  fs.appendFileSync(submissionsFile, JSON.stringify(entry) + '\n');

  // Email content
  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USERNAME}>`,
    to: process.env.EMAIL_USERNAME,
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Company: ${company}
      Message: ${message}
      Time: ${timestamp}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Company:</strong> ${company}</li>
        <li><strong>Message:</strong> ${message}</li>
        <li><strong>Time:</strong> ${timestamp}</li>
      </ul>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Submission received and emailed!" });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Contact backend running on http://localhost:${PORT}`);
});