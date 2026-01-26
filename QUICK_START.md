# ⚡ Quick Start Guide

Get your Resume URL app running in 5 minutes!

## 🚀 Step-by-Step

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Configure Environment

**Backend:** Create `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumeurl
NODE_ENV=development
```

**Frontend:** Already created at `frontend/.env`
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas** (Free cloud database)
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `backend/.env`

### 4. Seed Demo Data

```bash
cd backend
npm run seed
```

You should see: "Seed data inserted successfully"

### 5. Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for: ✅ "Server running on port 5000" and "MongoDB Connected Successfully"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait for: ✅ Vite dev server running on `http://localhost:5173`

### 6. Open in Browser

Visit: `http://localhost:5173`

Click: **"View Demo Resume"**

🎉 **You should see the demo resume!**

## ✅ Verify Everything Works

- [ ] Home page loads
- [ ] Can view demo resume
- [ ] Resume displays correctly
- [ ] Share button copies URL
- [ ] Print button opens print dialog
- [ ] View count increments

## 🔥 Create Your Resume

### Option 1: API (Recommended)

Use Postman, Thunder Client, or curl:

```bash
curl -X POST http://localhost:5000/api/resume \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "fullName": "Your Name",
      "title": "Your Title",
      "phone": "+1234567890",
      "email": "your@email.com",
      "location": "Your City"
    },
    "careerObjective": "Your career objective...",
    "technicalSkills": [
      {"category": "Languages", "skills": ["JavaScript", "Python"]}
    ],
    "projects": [
      {
        "title": "My Project",
        "description": "Project description...",
        "technologies": ["React", "Node.js"]
      }
    ],
    "education": [
      {
        "degree": "Bachelor",
        "field": "Computer Science",
        "institution": "University Name"
      }
    ],
    "languages": [
      {"language": "English", "proficiency": "Native"}
    ],
    "urlSlug": "your-name"
  }'
```

### Option 2: Modify Seed Script

1. Edit `backend/scripts/seedData.js`
2. Replace with your data
3. Run `npm run seed`

### Option 3: Add More Resumes

Just change the `urlSlug` in the API call to create multiple resumes!

## 🌐 Deploy to Vercel (5 minutes)

### Quick Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd backend
vercel --prod

# Update frontend/.env with backend URL
# Deploy frontend
cd ../frontend
vercel --prod
```

**Need MongoDB for production?**
- Use MongoDB Atlas (free)
- See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide

## 📱 Share Your Resume

Your resume URL format:
```
http://localhost:5173/resume/your-slug

# After deployment:
https://your-app.vercel.app/resume/your-slug
```

Share this link on:
- ✉️ Email signatures
- 💼 LinkedIn profile
- 📄 Job applications
- 🌐 Personal website
- 📋 Business cards

## 🐛 Troubleshooting

### Backend won't start

**Error: "MongoDB connection error"**
```bash
# Check if MongoDB is running
mongosh

# Or use MongoDB Atlas
```

**Error: "Port 5000 already in use"**
```bash
# Change port in backend/.env
PORT=5001
```

### Frontend won't connect

**Error: "Failed to fetch"**
- Check backend is running on port 5000
- Verify `VITE_API_URL` in `frontend/.env`
- Open `http://localhost:5000/health` (should show OK)

### Resume not found

**Error: "Resume not found"**
```bash
# Reseed the database
cd backend
npm run seed
```

## 📚 Next Steps

1. ✅ Read [README.md](README.md) for full documentation
2. ✅ Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) to understand the code
3. ✅ Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy
4. ✅ Review [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup

## 💡 Pro Tips

1. **Use meaningful slugs**: `john-doe-software-engineer` instead of `john`
2. **Test print view**: Use Print button to see PDF version
3. **Mobile friendly**: Test on phone for responsiveness
4. **Update often**: Keep your resume current
5. **Track views**: See how many people viewed your resume

## 🆘 Need Help?

Common issues:
- [MongoDB connection issues](SETUP_GUIDE.md#mongodb-connection-issues)
- [Port conflicts](SETUP_GUIDE.md#port-already-in-use)
- [CORS errors](SETUP_GUIDE.md#cors-issues)
- [Deployment problems](DEPLOYMENT.md#troubleshooting)

## 🎯 What You Built

✅ Full-stack MERN application
✅ RESTful API with Express
✅ MongoDB database
✅ React frontend with Vite
✅ Tailwind CSS styling
✅ Responsive design
✅ Print/PDF ready
✅ Shareable URLs
✅ View analytics
✅ Production ready
✅ Vercel deployable

**Total Time:** ~5 minutes setup + customization

---

🎉 **Congratulations!** Your Resume URL app is running!

Now customize it with your information and share your professional resume with the world! 🚀
