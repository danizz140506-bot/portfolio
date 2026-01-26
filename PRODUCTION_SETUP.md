# Production Deployment Guide

## Environment Variables

### Required Environment Variables

Add these to your hosting platform (Vercel, Netlify, Railway, etc.):

```env
EMAIL_HOST=mail.privateemail.com
EMAIL_PORT=465
EMAIL_USER=iskandar@danish.my
EMAIL_PASS=your_email_password_here
```

**⚠️ Important:**
- Never commit `.env.local` to git (already in `.gitignore`)
- Use your actual email password for `EMAIL_PASS`
- These variables are server-side only (not exposed to the client)

## Deployment Platforms

### Vercel (Recommended for Next.js)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add each variable:
     - `EMAIL_HOST` = `mail.privateemail.com`
     - `EMAIL_PORT` = `465`
     - `EMAIL_USER` = `iskandar@danish.my`
     - `EMAIL_PASS` = `your_password`
   - Click "Save"
   - Redeploy (or it will auto-deploy)

4. **Build Settings**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

### Netlify

1. **Push code to Git repository**

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (leave empty)

4. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all 4 variables (same as above)

### Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"

2. **Add Environment Variables**
   - Go to Variables tab
   - Add all 4 variables

3. **Build Settings**
   - Railway auto-detects Next.js

### Other Platforms

For any Node.js hosting platform:
- Set environment variables in the platform's dashboard
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18.x or higher

## Pre-Deployment Checklist

### Code
- [x] All features working locally
- [x] Contact form tested and working
- [x] No console errors
- [x] Responsive design tested on mobile/tablet

### Environment Variables
- [ ] `.env.local` is in `.gitignore` (should already be)
- [ ] All 4 SMTP variables added to hosting platform
- [ ] Password is correct (case-sensitive)

### Build Test
```bash
npm run build
npm start
```
- [ ] Build completes without errors
- [ ] Site loads correctly on `localhost:3000`
- [ ] Contact form works in production build

### Security
- [x] Rate limiting implemented (5 requests/minute)
- [x] Input validation and sanitization
- [x] XSS protection
- [x] Credentials stored server-side only
- [x] Error messages don't expose sensitive info

## Post-Deployment Testing

1. **Visit your deployed site**
   - Test all pages load correctly
   - Check mobile responsiveness

2. **Test Contact Form**
   - Fill out the form
   - Submit and verify success message
   - Check your email (`iskandar@danish.my`)
   - Verify email content is correct
   - Test replying to the email (should go to sender)

3. **Check Server Logs**
   - Look for any errors in hosting platform logs
   - Verify `[CONTACT API]` logs appear when submitting form

## Troubleshooting

### Build Fails
- Check Node.js version (need 18+)
- Check for TypeScript errors: `npm run lint`
- Check for missing dependencies

### Contact Form Not Working
- Verify all 4 environment variables are set correctly
- Check password is correct (case-sensitive)
- Check server logs for SMTP errors
- Verify `EMAIL_PORT` is `465` (not 587)
- Test SMTP connection locally first

### Emails Not Sending
- Check Namecheap Private Email is active
- Verify SMTP credentials in Namecheap dashboard
- Check server logs for authentication errors
- Ensure `EMAIL_PASS` matches your email password exactly

### Rate Limit Errors
- Wait 1 minute between test submissions
- This is intentional to prevent spam

## Current Features

✅ **SMTP Email Sending**: Namecheap Private Email via Nodemailer  
✅ **Rate Limiting**: 5 requests per minute per IP  
✅ **Input Validation**: Name, email format, message length  
✅ **XSS Protection**: All inputs sanitized  
✅ **Professional Email Template**: HTML and plain text  
✅ **Error Handling**: Graceful error messages  
✅ **Security**: Credentials never exposed to client  
✅ **Responsive Design**: Mobile and tablet optimized  

## Support

If you encounter issues:
1. Check server logs in your hosting platform
2. Verify environment variables are set correctly
3. Test locally with `npm run build && npm start`
4. Check Namecheap Private Email settings
