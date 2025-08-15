# Deployment Guide

## 1. Backend (Strapi) Deployment

### Option A: Render.com (Recommended - Free tier)
1. Push code to GitHub (already done ✅)
2. Go to [render.com](https://render.com) and sign up
3. Create new "Web Service" from GitHub repo
4. Settings:
   - **Build Command**: `cd print-on-demand-web-admin && npm install && npm run build`
   - **Start Command**: `cd print-on-demand-web-admin && npm start`
   - **Environment**: Node.js

### Environment Variables for Production:
```
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
DATABASE_CLIENT=postgres
DATABASE_URL=your-neon-db-url-here
DATABASE_SSL=true

# Generate NEW production secrets (don't use dev secrets)
APP_KEYS=generate-new-keys
API_TOKEN_SALT=generate-new-salt
ADMIN_JWT_SECRET=generate-new-secret
TRANSFER_TOKEN_SALT=generate-new-salt
ENCRYPTION_KEY=generate-new-key
JWT_SECRET=generate-new-secret
```

## 2. Frontend (Next.js) Deployment

### Option A: Vercel (Recommended - Free tier)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Import GitHub repo
3. Settings:
   - **Root Directory**: `print-on-demand-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Environment Variables for Frontend:
```
STRAPI_API_TOKEN=your-production-api-token
GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
NEXT_PUBLIC_IMAGEKIT_URLENDPOINT=your-imagekit-endpoint
```

## 3. Alternative Hosting Options

### Backend Alternatives:
- **Railway.app** (Easy, paid)
- **Heroku** (Paid after free tier removal)
- **DigitalOcean App Platform** (Paid)

### Frontend Alternatives:
- **Netlify** (Free tier)
- **Railway.app** (Paid)

## 4. Database
Your Neon PostgreSQL database is already production-ready! Just use the same connection string.

## 5. Post-Deployment Steps
1. Create admin user in production Strapi
2. Generate production API token
3. Update frontend environment variables with production backend URL
4. Test all functionality

Would you like me to help with any specific deployment platform?
