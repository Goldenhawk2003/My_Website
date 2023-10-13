const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(cors()); 

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to handle email sending
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Replace these with your own email server details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ammar.webfile@gmail.com',
      pass: 'resume_2003',
    },
  });

  const mailOptions = {
    from: 'ammar.webfile@gmail.com',
    to: 'ammar.webfile@gmail.com',
    subject: 'New Message from your Website',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.json({ success: false });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

