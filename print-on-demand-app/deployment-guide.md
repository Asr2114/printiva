# Frontend Deployment Guide

## Deploy to Vercel (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Connect GitHub** and import your repository
3. **Project Settings**:
   - Root Directory: `print-on-demand-app`
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables** (Add in Vercel dashboard):
```
# Strapi Backend URL (IMPORTANT: Update this after deploying backend)
NEXT_PUBLIC_STRAPI_URL=https://your-backend-url.onrender.com/api

# Strapi API Token (generate this in your production Strapi admin)
STRAPI_API_TOKEN=your-production-strapi-api-token

# Google OAuth
GOOGLE_CLIENT_ID=654482578938-47s3n9bos386ml3krf7bqrpop61chnch.apps.googleusercontent.com

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY=private_JeE+sMuM8guysUWB6Nob4x32fRo=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_qNy2lF3XdfVlR2vojf4bGZfGsuY=
NEXT_PUBLIC_IMAGEKIT_URLENDPOINT=https://ik.imagekit.io/asr21%
```

5. **Update axiosClient.tsx** after backend deployment:
```typescript
export const axiosClient = axios.create({
    baseURL: 'https://your-backend-url.onrender.com/api', // Update this
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
})
```

## Alternative: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `print-on-demand-app` folder
3. Add same environment variables in site settings

## After Deployment
1. Test all features
2. Update any hardcoded localhost URLs
3. Test cart functionality with production backend

## Troubleshooting

### Products Not Loading?
1. **Check Environment Variables** in Vercel dashboard:
   - `NEXT_PUBLIC_STRAPI_URL` should be: `https://your-backend-url.onrender.com/api`
   - `STRAPI_API_TOKEN` should be a valid production token

2. **Verify Backend is Running**:
   - Visit your backend URL directly
   - Check if `/api/products` endpoint works

3. **Check Browser Console**:
   - Look for CORS errors
   - Check network requests to your backend

4. **Common Issues**:
   - Missing `/api` in backend URL
   - Invalid API token
   - Backend not deployed yet
   - CORS configuration issues
