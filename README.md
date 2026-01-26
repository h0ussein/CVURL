# Resume URL - Simple CV Display Website

A clean, professional website to display your CV/Resume online.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser!

## ✏️ Update Your CV

Edit `frontend/src/data/resumeData.js` with your information:

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

## 🌐 Deploy to Vercel (Free)

### One-Command Deploy

```bash
cd frontend
npm install -g vercel
vercel
```

Follow the prompts, and your CV will be live at: `https://your-site.vercel.app`

### Or Use Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Select the `frontend` folder
5. Click Deploy

Done! Your CV is live! 🎉

## 📱 Features

- ✅ Clean, professional design
- ✅ Print/Download as PDF
- ✅ Share button with URL copying
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Fast and lightweight
- ✅ No backend needed
- ✅ Easy to customize

## 🎨 Customize

All the code is in `frontend/src/`:
- `data/resumeData.js` - Your CV data
- `components/Resume.jsx` - Resume display
- `index.css` - Styling

## 📄 Print as PDF

Click the "Print / Download PDF" button or press `Ctrl+P` (Windows) or `Cmd+P` (Mac).

---

Made with React + Tailwind CSS
