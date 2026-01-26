# Deploying Resume URL to Vercel

This guide will walk you through deploying your Resume URL application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account (free)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free)
- [Vercel CLI](https://vercel.com/cli) installed (optional but recommended)

## Part 1: Setup MongoDB Atlas

### 1. Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new **FREE** cluster (M0)
4. Choose your preferred cloud provider and region
5. Click "Create Cluster" (takes 3-5 minutes)

### 2. Setup Database Access

1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Enter username and password (save these!)
5. Set user privileges to **Read and write to any database**
6. Click **Add User**

### 3. Setup Network Access

1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (or add `0.0.0.0/0`)
4. Click **Confirm**

### 4. Get Your Connection String

1. Go to **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add your database name before the `?`:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resumeurl?retryWrites=true&w=majority
   ```

## Part 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy Backend:**
   ```bash
   cd backend
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Choose your account
   - Link to existing project? **No**
   - Project name? **resumeurl-backend** (or your choice)
   - Directory? **./backend** (or just press Enter)
   - Override settings? **No**

5. **Add Environment Variables:**
   ```bash
   vercel env add MONGODB_URI
   ```
   Paste your MongoDB Atlas connection string when prompted.
   
   ```bash
   vercel env add NODE_ENV
   ```
   Type `production` when prompted.

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

7. **Save Your Backend URL:**
   You'll get a URL like: `https://resumeurl-backend.vercel.app`
   Copy this - you'll need it for the frontend!

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select the `backend` folder as root directory
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
5. Click **Deploy**
6. Copy your deployment URL

## Part 3: Seed Your Production Database

After deploying the backend, seed your database:

1. **Update your local .env to use production MongoDB:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resumeurl?retryWrites=true&w=majority
   ```

2. **Run the seed script:**
   ```bash
   cd backend
   npm run seed
   ```

3. **Revert your local .env back to local MongoDB** (optional)

## Part 4: Deploy Frontend to Vercel

### 1. Update Frontend Environment Variable

Update `frontend/.env` with your backend URL:

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

### 2. Deploy Frontend

**Using Vercel CLI:**

```bash
cd frontend
vercel --prod
```

**Using Vercel Dashboard:**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select the `frontend` folder as root directory
4. Add environment variable:
   - `VITE_API_URL`: Your backend Vercel URL
5. Click **Deploy**

### 3. Get Your Frontend URL

You'll get a URL like: `https://resumeurl.vercel.app`

## Part 5: Test Your Deployment

1. Visit your frontend URL
2. Click "View Demo Resume"
3. You should see the resume you seeded!
4. Test sharing the URL
5. Test the print functionality

## Environment Variables Summary

### Backend Environment Variables (Vercel)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeurl?retryWrites=true&w=majority
NODE_ENV=production
```

### Frontend Environment Variables (Vercel)
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Verify your MongoDB Atlas connection string is correct
- Ensure password doesn't have special characters (or URL encode them)
- Check that you whitelisted `0.0.0.0/0` in Network Access

**Error: Function invocation timeout**
- Increase timeout in Vercel dashboard (Settings → Functions → Timeout)
- Default is 10s, you can increase to 60s on free tier

**Error: 500 Internal Server Error**
- Check Vercel function logs in dashboard
- Verify all environment variables are set correctly

### Frontend Issues

**Error: Failed to fetch**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that backend is deployed and accessible
- Ensure backend has CORS enabled

**Resume not loading**
- Check browser console for errors
- Verify resume exists in database (run seed script)
- Test backend endpoint directly: `https://your-backend.vercel.app/api/resume/hussein-ibrahim`

### CORS Issues

If you get CORS errors after deployment:

1. Update `backend/server.js` to specify frontend origin:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
     credentials: true
   }));
   ```

2. Redeploy backend:
   ```bash
   cd backend
   vercel --prod
   ```

## Custom Domain (Optional)

### Add Custom Domain to Frontend

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `resumeurl.com`)
4. Follow Vercel's instructions to update DNS records
5. Wait for DNS propagation (can take up to 48 hours)

### Update Backend CORS

After adding custom domain, update CORS in `backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:5173'],
  credentials: true
}));
```

## Continuous Deployment

### Automatic Deployments with Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect Vercel to your repository
3. Every push to main branch will auto-deploy!

### Setup Git Deployment

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/resumeurl.git
git push -u origin main
```

## Monitoring & Analytics

### View Logs

**Backend Logs:**
1. Go to Vercel Dashboard
2. Select your backend project
3. Click **Deployments** → Select deployment → **Functions**
4. Click on any function to see logs

**Frontend Logs:**
1. Same as above, but for frontend project

### Monitor Performance

- Vercel Dashboard shows:
  - Function execution time
  - Error rates
  - Bandwidth usage
  - Request count

## Cost Considerations

### Free Tier Limits

**Vercel Free Tier:**
- 100GB bandwidth/month
- 100 hours serverless function execution/month
- 6,000 build minutes/month
- More than enough for personal resume websites!

**MongoDB Atlas Free Tier:**
- 512MB storage
- Shared RAM
- Shared CPU
- Perfect for resume data!

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use environment variables** - All secrets in Vercel dashboard
3. **Regularly update dependencies:**
   ```bash
   npm update
   npm audit fix
   ```
4. **Add authentication** for admin routes (future enhancement)

## Updating Your Deployed App

### Backend Updates

```bash
cd backend
# Make your changes
vercel --prod
```

### Frontend Updates

```bash
cd frontend
# Make your changes
npm run build
vercel --prod
```

### Or use Git auto-deploy

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically deploy!

## Backup Your Data

### Export MongoDB Data

```bash
# Install MongoDB tools
# Then export your data
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/resumeurl"
```

### Schedule Regular Backups

Use MongoDB Atlas automated backups (available on paid tiers) or set up a cron job.

## Next Steps

1. ✅ Add your own resume data
2. ✅ Share your resume URL on LinkedIn, email signatures, etc.
3. ✅ Monitor analytics
4. Consider adding:
   - Admin dashboard
   - Multiple resume templates
   - PDF download feature
   - Resume editor UI
   - Authentication
   - Custom themes

## Support

If you encounter issues:

1. Check Vercel function logs
2. Test API endpoints directly
3. Verify environment variables
4. Check MongoDB Atlas connectivity
5. Review CORS configuration

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Node.js Deployment Guide](https://vercel.com/docs/runtimes#official-runtimes/node-js)

---

🎉 **Congratulations!** Your Resume URL app is now live and accessible worldwide!

Share your resume: `https://your-app.vercel.app/resume/your-slug`
