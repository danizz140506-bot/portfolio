# Production Setup Guide

## Email Configuration (Resend)

### Step 1: Verify Your Domain

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter: `danish.my`
4. Resend will provide DNS records to add:
   - **SPF Record** (for email authentication)
   - **DKIM Record** (for email signing)
   - **DMARC Record** (optional, recommended)
5. Add these records to your domain's DNS settings (wherever you manage `danish.my`)
6. Wait for verification (usually 5-15 minutes)
7. Once verified, you'll see a green checkmark

### Step 2: Update Environment Variables

After domain verification, update your `.env.local` (and production environment):

```env
RESEND_API_KEY=re_LJMdWpaY_AV7S7W1nr8gbwmw2zTbB1dfL
RESEND_FROM_EMAIL=Portfolio Contact <noreply@danish.my>
RESEND_TO_EMAIL=iskandar@danish.my
```

### Step 3: Test

1. Restart your server
2. Test the contact form
3. Check that emails arrive from `noreply@danish.my`
4. Verify you can reply directly to the sender

## Production Deployment Checklist

### Environment Variables
- [ ] Add `RESEND_API_KEY` to production environment (Vercel, Netlify, etc.)
- [ ] Add `RESEND_FROM_EMAIL` after domain verification
- [ ] Never commit `.env.local` to git (already in `.gitignore`)

### Security
- [x] Rate limiting implemented (5 requests per minute per IP)
- [x] Input validation and sanitization
- [x] XSS protection
- [x] API key stored server-side only
- [x] Error messages don't expose sensitive information

### Performance
- [x] Email sending is async (non-blocking)
- [x] Proper error handling
- [x] Input length limits

### Monitoring
- Consider adding logging service (e.g., Sentry) for production errors
- Monitor Resend dashboard for email delivery rates
- Set up alerts for failed email sends

## Current Features

✅ **Rate Limiting**: 5 requests per minute per IP address
✅ **Input Validation**: Name, email format, message length (10-5000 chars)
✅ **XSS Protection**: All inputs are sanitized
✅ **Professional Email Template**: HTML and plain text versions
✅ **Error Handling**: Graceful error messages
✅ **Security**: API key never exposed to client

## Testing

Test the contact form:
1. Fill out all fields
2. Submit the form
3. Check your email (`iskandar@danish.my`)
4. Verify the email looks professional
5. Test replying to the email (should go to sender)

## Troubleshooting

**Emails not sending?**
- Check Resend API key is correct
- Check Resend dashboard for error logs
- Verify domain is verified (if using custom domain)
- Check server logs for errors

**Rate limit errors?**
- Wait 1 minute between submissions
- This prevents spam/abuse

**Domain verification failing?**
- Double-check DNS records are added correctly
- Wait up to 24 hours for DNS propagation
- Contact Resend support if issues persist
