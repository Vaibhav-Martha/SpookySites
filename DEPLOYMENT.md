# Deployment Guide - Graveyard of the Forgotten Web

## Vercel Deployment

### Prerequisites
1. GitHub account with your code pushed to a repository
2. Vercel account (free tier available)
3. MongoDB Atlas account (free tier available)

### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (generate one)
   - `NODE_ENV`: production
   - `PORT`: 5001

### Step 3: Environment Variables
Add these to your Vercel project settings:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spookysites?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_random_string_here
NODE_ENV=production
PORT=5001
```

### Step 4: Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be live at your-project.vercel.app

## Alternative: Railway Deployment

Railway is another great option for full-stack apps:

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add the same environment variables
4. Deploy automatically

## Local Testing Before Deployment

Before deploying, test your production build locally:

```bash
# Build the client
cd client
npm run build

# Start the server in production mode
cd ../server
NODE_ENV=production npm start
```

## Post-Deployment Setup

1. Visit your deployed app
2. Create a test account or use demo accounts:
   - Username: `vampire_lord` / Password: `bloodmoon123`
   - Username: `gothic_rose` / Password: `darkrose456`
   - Username: `shadow_walker` / Password: `midnight789`

## Troubleshooting

### Common Issues:
1. **Build fails**: Check that all dependencies are in package.json
2. **API not working**: Verify environment variables are set correctly
3. **Database connection**: Ensure MongoDB URI is correct and IP is whitelisted
4. **Routes not working**: Make sure vercel.json is configured properly

### Logs:
- Check Vercel function logs in the dashboard
- Use `console.log` for debugging (visible in Vercel logs)

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions