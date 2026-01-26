# Resume URL - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env file):**

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumeurl
NODE_ENV=development
```

For MongoDB Atlas, replace `MONGODB_URI` with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeurl?retryWrites=true&w=majority
```

**Frontend (.env file):**

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start MongoDB (if using local MongoDB)

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Step 4: Seed the Database (Optional but Recommended)

This will create a demo resume for testing:

```bash
cd backend
npm run seed
```

### Step 5: Start the Application

**Open two terminal windows:**

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
You should see: "Server running on port 5000" and "MongoDB Connected Successfully"

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
You should see the Vite dev server running on `http://localhost:5173`

### Step 6: Test the Application

1. Open your browser and go to `http://localhost:5173`
2. Click "View Demo Resume" or enter "hussein-ibrahim" in the input field
3. You should see the demo resume!

## 🎨 Creating Your Own Resume

### Option 1: Using the API

Use a tool like Postman or Thunder Client to make a POST request:

**Endpoint:** `POST http://localhost:5000/api/resume`

**Body (JSON):**
```json
{
  "personalInfo": {
    "fullName": "Your Name",
    "title": "Your Title",
    "phone": "+1234567890",
    "email": "your.email@example.com",
    "location": "Your City, Country",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  },
  "careerObjective": "Your career objective here...",
  "technicalSkills": [
    {
      "category": "Programming",
      "skills": ["JavaScript", "Python", "Java"]
    },
    {
      "category": "Frameworks",
      "skills": ["React", "Node.js", "Django"]
    }
  ],
  "projects": [
    {
      "title": "Awesome Project",
      "description": "Description of your project...",
      "technologies": ["React", "MongoDB", "Node.js"],
      "link": "https://demo.com",
      "github": "https://github.com/username/repo"
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "institution": "University Name",
      "year": "2024",
      "location": "City, Country"
    }
  ],
  "languages": [
    { "language": "English", "proficiency": "Native" },
    { "language": "Spanish", "proficiency": "Fluent" }
  ],
  "urlSlug": "your-unique-slug",
  "isActive": true
}
```

### Option 2: Modify the Seed Data

1. Edit `backend/scripts/seedData.js`
2. Replace the data with your information
3. Run `npm run seed` again

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**

- **Local MongoDB:**
  - Ensure MongoDB is running: `mongod` or `sudo systemctl status mongod`
  - Check if MongoDB is running on port 27017
  
- **MongoDB Atlas:**
  - Verify connection string is correct
  - Ensure your IP address is whitelisted in Atlas
  - Check username and password are correct

### Port Already in Use

**Error: "Port 5000 is already in use"**

```bash
# Find and kill the process using port 5000
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port in `backend/.env`:
```env
PORT=5001
```

### CORS Issues

If you get CORS errors, ensure:
1. Backend has `cors` package installed
2. Backend `server.js` has `app.use(cors())`
3. Frontend is making requests to the correct API URL

### Frontend Not Loading Resume

1. Check browser console for errors
2. Verify backend is running (`http://localhost:5000/health` should return OK)
3. Check the API URL in `frontend/src/config.js`
4. Ensure the resume slug exists in the database

## 📦 Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

The build files will be in `frontend/dist/`

### Test Production Build Locally

```bash
cd frontend
npm run preview
```

## 🌐 Deploying to Vercel

### Deploy Backend

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy backend:
```bash
cd backend
vercel
```

3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `NODE_ENV` - production

4. Note the deployment URL (e.g., `https://your-backend.vercel.app`)

### Deploy Frontend

1. Update `frontend/.env` with your backend URL:
```env
VITE_API_URL=https://your-backend.vercel.app
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Your app is now live!

## 📝 Useful Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with demo data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 Next Steps

1. **Customize Design**: Edit Tailwind classes in components
2. **Add Authentication**: Protect admin routes
3. **Add More Features**: 
   - Resume templates
   - PDF download
   - Analytics dashboard
4. **Custom Domain**: Configure custom domain in Vercel

## 💡 Tips

- Use meaningful URL slugs (e.g., "john-doe-software-engineer")
- Keep resume content concise and professional
- Test on multiple devices and browsers
- Regularly backup your MongoDB database

## 🆘 Getting Help

If you encounter any issues:

1. Check the error messages in the terminal
2. Review this guide carefully
3. Check MongoDB connection
4. Verify all dependencies are installed
5. Ensure environment variables are set correctly

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

Happy coding! 🚀
