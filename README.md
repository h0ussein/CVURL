# Resume URL - Professional CV Website

A clean, modern website to display your CV/Resume online with an admin panel for easy updates.

## ✨ Features

- ✅ Beautiful, professional resume display
- ✅ Password-protected admin panel to edit your resume
- ✅ **8 Color themes** - Choose from professional color palettes
- ✅ Print/Download as PDF functionality
- ✅ Share button with URL copying
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Fast and lightweight
- ✅ No backend needed - runs entirely in browser
- ✅ Easy to deploy to Vercel

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser!

## 🌐 Routes

- **`/`** - Your public resume (accessible to everyone)
- **`/hussein`** - Admin panel (password protected)
  - Passcode: `301103`

## ✏️ Update Your Resume

### Option 1: Using Admin Panel (Easiest)

1. Visit `http://localhost:5173/hussein`
2. Enter passcode: `301103`
3. Edit any section you want
4. Click "Save Changes"
5. View your updated resume at `/`

### Option 2: Edit Source Code

Edit `frontend/src/data/resumeData.js`:

```javascript
export const resumeData = {
  personalInfo: {
    fullName: "YOUR NAME",
    title: "Your Title",
    phone: "+1234567890",
    email: "your@email.com",
    location: "Your City"
  },
  careerObjective: "Your career objective...",
  // ... rest of your info
};
```

Save the file and the website will auto-update!

## 🚀 Deploy to Vercel (Free Hosting)

### Quick Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend folder
cd frontend
vercel --prod
```

**Your site will be live at:** `https://your-site.vercel.app`

### Detailed Deployment Guide

See [DEPLOY.md](DEPLOY.md) for complete deployment instructions including:
- Step-by-step Vercel deployment
- Custom domain setup
- Troubleshooting
- Post-deployment checklist

## 📱 Features Details

### Public Resume Page (`/`)
- Professional header with contact information
- Career objective section
- Technical skills categorized
- Project showcase
- Software experience
- Education details
- Languages proficiency
- Print/Download PDF button
- Share button

### Admin Panel (`/hussein`)
- Password protection (passcode: `301103`)
- **Color Theme Selector** - 8 beautiful themes to choose from
- Edit all resume sections:
  - Personal information
  - Career objective
  - Technical skills (add/remove categories)
  - Projects (add/remove)
  - Software experience
  - Education
  - Languages (add/remove)
- Live preview
- Instant save to browser storage

## 🎨 Customization

### Change Colors (Easy Way)

1. Visit `/hussein` admin panel
2. Select from 8 pre-designed color themes:
   - Professional Blue (default)
   - Modern Emerald
   - Creative Purple
   - Tech Indigo
   - Elegant Rose
   - Fresh Teal
   - Bold Orange
   - Corporate Slate
3. Click to apply instantly!

See [COLOR_THEMES.md](COLOR_THEMES.md) for details about each theme.

### Change Passcode

Edit `frontend/src/pages/AdminPage.jsx`:
```javascript
const PASSCODE = '301103'; // Change this to your preferred code
```

### Update Favicon

Replace `frontend/src/assets/me.jpeg` with your photo

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Resume.jsx          # Main resume display
│   ├── pages/
│   │   └── AdminPage.jsx       # Admin panel with editor
│   ├── data/
│   │   └── resumeData.js       # Your resume data
│   ├── assets/
│   │   └── me.jpeg             # Your photo (favicon)
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Styles
├── public/
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite config
└── vercel.json                 # Vercel deployment config
```

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router** - Routing
- **React Hot Toast** - Notifications
- **LocalStorage** - Data persistence

## 📄 Print as PDF

Click the "Print / Download PDF" button or press:
- Windows: `Ctrl + P`
- Mac: `Cmd + P`

Choose "Save as PDF" in the print dialog.

## 🔐 Security Notes

- Admin panel is password protected
- Data is stored in browser localStorage
- No backend means no server-side security concerns
- Change the default passcode in production

## 🌐 After Deployment

### Update Your Resume Online

1. Visit `https://your-site.vercel.app/hussein`
2. Enter passcode: `301103`
3. Make changes
4. Save

Changes are saved in your browser's localStorage.

### Share Your Resume

Add your resume URL to:
- LinkedIn profile (Contact Info → Website)
- Email signature
- Job applications
- Business cards (as QR code)
- GitHub profile README
- Portfolio website

## 📊 Analytics (Optional)

Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

In `main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

// Add <Analytics /> component
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process or change port in vite.config.js
```

### Changes Not Saving
- Clear browser cache
- Check browser console for errors
- Ensure localStorage is enabled

### Admin Page Not Loading
- Verify passcode is correct: `301103`
- Clear browser storage and try again

### Build Fails
```bash
# Test build locally
npm run build
npm run preview
```

## 📚 Additional Resources

- [Vercel Deployment Guide](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 💡 Tips

1. **Keep resume concise** - Recruiters spend ~6 seconds per resume
2. **Update regularly** - Keep projects and skills current
3. **Test on mobile** - Many recruiters view on phones
4. **Use keywords** - Include relevant tech skills for ATS systems
5. **Share widely** - Add to all professional profiles

## 🎯 Deployment Checklist

- [ ] Updated all resume information
- [ ] Tested locally
- [ ] Changed default passcode (optional)
- [ ] Deployed to Vercel
- [ ] Tested deployed site
- [ ] Tested admin panel online
- [ ] Added custom domain (optional)
- [ ] Shared resume URL

## 📞 Support

If you encounter issues:
1. Check the [DEPLOY.md](DEPLOY.md) guide
2. Review browser console for errors
3. Ensure all dependencies are installed
4. Try clearing browser cache

---

**Made with ❤️ by Hussein Ibrahim**

Ready to deploy? Check out [DEPLOY.md](DEPLOY.md) for detailed instructions!

🚀 **Deploy Now:** `cd frontend && vercel --prod`
