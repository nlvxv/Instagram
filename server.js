// استيراد Express
const express = require('express');
const path = require('path');

// إنشاء تطبيق Express
const app = express();

// Middleware لتحليل JSON القادم في الطلبات
app.use(express.json());

// نقطة النهاية (Endpoint) الخاصة بتسجيل الدخول
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt received:');
  console.log('Username:', username);
  console.log('Password:', password);

  // تحقق من وجود اسم المستخدم وكلمة المرور
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'يرجى إدخال اسم المستخدم وكلمة المرور.',
    });
  }

  // هنا يمكنك إضافة منطق التحقق من صحة البيانات
  // في هذا المثال، سنقوم فقط بإرجاع رسالة نجاح
  
  // إرسال استجابة نجاح
  res.status(200).json({
    success: true,
    message: 'تم استلام بيانات تسجيل الدخول بنجاح!',
  });
});

// تصدير التطبيق ليعمل مع Vercel
module.exports = app;
