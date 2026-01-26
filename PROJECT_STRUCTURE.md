# Resume URL - Project Structure

## 📁 Directory Structure

```
resumeURL/
├── backend/                    # Node.js + Express backend
│   ├── controllers/           # Request handlers
│   │   └── resumeController.js
│   ├── models/               # MongoDB schemas
│   │   └── Resume.js
│   ├── routes/               # API routes
│   │   └── resumeRoutes.js
│   ├── scripts/              # Utility scripts
│   │   └── seedData.js       # Database seeding
│   ├── .env                  # Environment variables (local)
│   ├── .env.example          # Environment template
│   ├── .gitignore           # Git ignore rules
│   ├── package.json         # Backend dependencies
│   ├── server.js            # Main server file
│   └── vercel.json          # Vercel deployment config
│
├── frontend/                  # React + Vite frontend
│   ├── public/               # Static assets
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   │   └── react.svg
│   │   ├── components/      # React components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ResumeHeader.jsx
│   │   │   └── ResumeSection.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Resume.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── config.js        # Configuration
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables (local)
│   ├── .env.example         # Environment template
│   ├── .gitignore          # Git ignore rules
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   ├── README.md           # Frontend readme
│   └── vite.config.js      # Vite configuration
│
├── .gitignore              # Root git ignore
├── README.md               # Main project documentation
├── SETUP_GUIDE.md         # Setup instructions
├── DEPLOYMENT.md          # Deployment guide
└── PROJECT_STRUCTURE.md   # This file
```

## 🔍 Detailed File Descriptions

### Backend Files

#### `/backend/server.js`
Main entry point for the backend server. Handles:
- Express app configuration
- CORS setup
- MongoDB connection
- Route mounting
- Error handling

#### `/backend/models/Resume.js`
Mongoose schema defining the resume data structure:
- Personal information
- Career objective
- Technical skills
- Projects
- Education
- Languages
- URL slug
- View count tracking

#### `/backend/controllers/resumeController.js`
Business logic for resume operations:
- `getResumeBySlug` - Fetch resume by URL slug
- `createResume` - Create new resume
- `updateResume` - Update existing resume
- `deleteResume` - Delete resume
- `getAllResumes` - Get all resumes (admin)

#### `/backend/routes/resumeRoutes.js`
API route definitions:
- `GET /api/resume/:slug` - Public resume view
- `POST /api/resume` - Create resume
- `PUT /api/resume/:slug` - Update resume
- `DELETE /api/resume/:slug` - Delete resume
- `GET /api/resume` - List all resumes

#### `/backend/scripts/seedData.js`
Database seeding script:
- Creates demo resume data
- Clears existing data
- Useful for testing and demos

#### `/backend/vercel.json`
Vercel deployment configuration:
- Serverless function setup
- Environment variables
- Route handling

### Frontend Files

#### `/frontend/src/App.jsx`
Root component with routing:
- React Router setup
- Toast notifications
- Route definitions

#### `/frontend/src/pages/Home.jsx`
Landing page component:
- URL slug input
- Demo resume link
- Feature highlights

#### `/frontend/src/pages/Resume.jsx`
Main resume display page:
- Fetches resume data from API
- Renders resume sections
- Share and print functionality
- View count display

#### `/frontend/src/pages/NotFound.jsx`
404 error page for invalid routes

#### `/frontend/src/components/ResumeHeader.jsx`
Resume header component:
- Name and title
- Contact information
- Social media links
- Professional styling

#### `/frontend/src/components/ResumeSection.jsx`
Reusable section wrapper:
- Section title
- Consistent styling
- Border and spacing

#### `/frontend/src/components/LoadingSpinner.jsx`
Loading state indicator

#### `/frontend/src/config.js`
Application configuration:
- API URL from environment variables
- Centralized config management

#### `/frontend/src/index.css`
Global styles:
- Tailwind CSS imports
- Print media queries
- Custom CSS classes

#### `/frontend/vite.config.js`
Vite build configuration:
- React plugin
- Tailwind CSS plugin
- Build optimization

## 🎨 Component Hierarchy

```
App
├── Router
    ├── Home (/)
    │   └── Input form
    │   └── Feature cards
    │
    ├── Resume (/resume/:slug)
    │   ├── LoadingSpinner (conditional)
    │   ├── Action Buttons
    │   │   ├── Share Button
    │   │   └── Print Button
    │   ├── ResumeHeader
    │   │   └── Personal Info
    │   └── Resume Sections
    │       ├── Career Objective
    │       ├── Technical Skills
    │       ├── Projects
    │       ├── Software Experience
    │       ├── Education
    │       └── Languages
    │
    └── NotFound (*)
        └── Error message
```

## 🔄 Data Flow

### Viewing a Resume

```
User enters slug
    ↓
Home component navigates to /resume/:slug
    ↓
Resume component mounts
    ↓
useEffect triggers fetchResume()
    ↓
API call: GET /api/resume/:slug
    ↓
Backend: resumeController.getResumeBySlug()
    ↓
MongoDB: Find resume by slug
    ↓
Increment view count
    ↓
Return resume data
    ↓
Frontend: Update state with resume
    ↓
Render resume components
```

### Creating a Resume

```
POST request to /api/resume
    ↓
Backend: resumeController.createResume()
    ↓
Validate data
    ↓
Create new Resume document
    ↓
Save to MongoDB
    ↓
Return created resume
    ↓
Resume accessible at /resume/:slug
```

## 🗄️ Database Schema

### Resume Collection

```javascript
{
  _id: ObjectId,
  personalInfo: {
    fullName: String (required),
    title: String (required),
    phone: String,
    email: String (required),
    location: String,
    linkedin: String,
    github: String,
    website: String
  },
  careerObjective: String (required),
  technicalSkills: [
    {
      category: String,
      skills: [String]
    }
  ],
  projects: [
    {
      title: String (required),
      description: String (required),
      technologies: [String],
      link: String,
      github: String
    }
  ],
  softwareExperience: [
    {
      title: String,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      field: String,
      institution: String,
      year: String,
      location: String
    }
  ],
  languages: [
    {
      language: String,
      proficiency: String
    }
  ],
  urlSlug: String (unique, required),
  viewCount: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🌐 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resume/:slug` | Get resume by slug |
| GET | `/health` | Health check |

### Admin Endpoints (No auth currently)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume` | Create new resume |
| PUT | `/api/resume/:slug` | Update resume |
| DELETE | `/api/resume/:slug` | Delete resume |
| GET | `/api/resume` | Get all resumes |

## 🎨 Styling Architecture

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the Vite plugin:

**Color Palette:**
- Primary: Blue (600-800)
- Background: Gray (50-900)
- Text: Gray (600-900)
- Accents: Purple, Green

**Key Utilities:**
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Print styles: `print:hidden`, `print:shadow-none`
- Gradients: `from-blue-600 to-blue-800`

### Print Styles

Special CSS for printing/PDF generation:
- Hidden elements: Action buttons, footer
- Adjusted spacing: Smaller padding
- Color preservation: `print-color-adjust: exact`

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/...   # MongoDB connection
NODE_ENV=development                         # Environment
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000          # Backend API URL
```

## 📦 Dependencies

### Backend

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **nodemon** (dev) - Auto-restart server

### Frontend

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Routing
- **react-hot-toast** - Notifications
- **tailwindcss** - Styling
- **vite** - Build tool

## 🚀 Build Process

### Development

1. Backend: `nodemon server.js`
   - Auto-restart on file changes
   - MongoDB connection
   - API routes active

2. Frontend: `vite`
   - Hot module replacement
   - Fast refresh
   - Tailwind JIT compilation

### Production

1. Backend: `node server.js`
   - Optimized for Vercel serverless
   - MongoDB Atlas connection
   - Production error handling

2. Frontend: `vite build`
   - Minified bundle
   - Tree-shaking
   - Optimized assets
   - Output: `dist/` folder

## 🧪 Testing Approach

Currently no automated tests. Future additions:

**Backend:**
- Unit tests (Jest)
- API integration tests (Supertest)
- Database tests (MongoDB Memory Server)

**Frontend:**
- Component tests (React Testing Library)
- E2E tests (Playwright)

## 🔮 Future Enhancements

### Planned Features

1. **Authentication**
   - JWT tokens
   - Protected admin routes
   - User accounts

2. **Multiple Templates**
   - Different resume styles
   - Color themes
   - Layout options

3. **Resume Editor**
   - In-browser editing
   - Real-time preview
   - Drag-and-drop sections

4. **Analytics Dashboard**
   - View statistics
   - Geographic data
   - Referrer tracking

5. **PDF Generation**
   - Server-side PDF creation
   - Custom styling
   - Download button

6. **Social Sharing**
   - Open Graph meta tags
   - Twitter cards
   - LinkedIn preview

## 📊 Performance Considerations

### Backend
- MongoDB indexing on `urlSlug`
- Efficient queries with projection
- Caching potential with Redis

### Frontend
- Code splitting with React.lazy
- Image optimization
- Minimal bundle size with Vite
- Lazy loading for images

## 🔒 Security Notes

### Current Implementation
- CORS enabled
- Environment variables for secrets
- No authentication (add for production)

### Recommendations
- Add rate limiting
- Implement authentication
- Sanitize user input
- Add HTTPS in production
- Use helmet.js for security headers

---

This structure provides a solid foundation for a professional resume sharing platform! 🚀
