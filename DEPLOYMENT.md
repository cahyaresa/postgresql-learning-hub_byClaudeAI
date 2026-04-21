# 🚀 Deployment Guide

Complete guide untuk deploy PostgreSQL Learning Hub ke berbagai platform.

## 📋 Quick Deployment Checklist

- [ ] Project built successfully (`npm run build`)
- [ ] No console errors
- [ ] All links working
- [ ] Responsive design tested
- [ ] Environment variables configured
- [ ] Security checked

---

## 1️⃣ Vercel (Recommended - Easiest)

### Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite-api-url"
  }
}
```

### Environment Variables

1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add your variables:
   - `VITE_API_URL`
   - `VITE_DEBUG`

### Auto-Deploy from GitHub

1. Connect GitHub repository to Vercel
2. Push to main branch
3. Automatic deployment triggers
4. Live in seconds!

**Pros**: Free tier, automatic deploys, custom domains, analytics
**Cons**: Limited free tier usage

---

## 2️⃣ Netlify

### Setup

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Manual Upload

1. Build: `npm run build`
2. Go to https://app.netlify.com
3. Drag & drop `dist` folder
4. Done!

### Continuous Deployment

1. Connect GitHub repo
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Auto-deploy on push

**Pros**: Free tier generous, easy setup, good documentation
**Cons**: Slower builds than Vercel

---

## 3️⃣ Docker Deployment

### Local Docker Testing

```bash
# Build image
docker build -t postgres-learning-hub .

# Run container
docker run -p 3000:3000 postgres-learning-hub

# Visit: http://localhost:3000
```

### Docker Compose

```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f postgres-learning-hub
```

### Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag postgres-learning-hub:latest username/postgres-learning-hub:latest

# Push
docker push username/postgres-learning-hub:latest
```

### Deploy to Container Services

**Google Cloud Run:**
```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT-ID/postgres-learning-hub

# Deploy
gcloud run deploy postgres-learning-hub --image gcr.io/PROJECT-ID/postgres-learning-hub
```

**AWS ECS:**
- Push image to ECR
- Create ECS service
- Configure task definition

---

## 4️⃣ Traditional Hosting (Hostinger, Bluehost, etc)

### Using cPanel

1. Build project:
   ```bash
   npm run build
   ```

2. Connect via FTP/SFTP:
   - Username: provided by host
   - Server: ftp.example.com
   - Upload `dist` folder contents to `public_html`

3. Configure domain:
   - Point domain to hosting IP
   - Wait for DNS propagation (24-48 hours)

### Manual Setup

1. SSH into server:
   ```bash
   ssh user@your-domain.com
   ```

2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Clone and setup:
   ```bash
   git clone https://github.com/yourusername/postgres-learning-hub.git
   cd postgres-learning-hub
   npm install
   npm run build
   ```

4. Setup reverse proxy (nginx):
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

5. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start "npm run preview" --name postgres-hub
   pm2 startup
   pm2 save
   ```

---

## 5️⃣ GitHub Pages

### Static Site Deployment

1. Update `vite.config.js`:
   ```js
   export default {
     base: '/repository-name/',  // Add this
     plugins: [react()],
     ...
   }
   ```

2. Build and push:
   ```bash
   npm run build
   git add .
   git commit -m "Deploy"
   git push origin main
   ```

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Select "main" branch + "dist" folder
   - Save

4. Site live at: `https://username.github.io/repository-name/`

---

## 6️⃣ AWS Amplify

### Setup

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### GitHub Integration

1. Connect GitHub repo to AWS Amplify
2. Select branch (main)
3. Configure build settings
4. Auto-deploys on push

---

## 7️⃣ Railway

### Deploy

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

---

## Environment Variables

### Production Variables

```env
VITE_API_URL=https://your-api.com
VITE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
NODE_ENV=production
```

### Development Variables

```env
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
NODE_ENV=development
```

---

## Performance Optimization

### Before Deployment

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer

# Check performance
npm run build
npm run preview
```

### Production Checklist

- [ ] Minification enabled (automatic)
- [ ] Source maps disabled (optional)
- [ ] Cache headers configured
- [ ] GZIP compression enabled
- [ ] CDN configured (for static assets)
- [ ] Analytics setup
- [ ] Error tracking setup

---

## SSL/HTTPS

### Auto Setup (Recommended)

- **Vercel**: Automatic
- **Netlify**: Automatic
- **GitHub Pages**: Automatic

### Manual Setup

For traditional hosting:
```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d your-domain.com

# Configure in nginx
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

---

## Domain Configuration

### DNS Records

```
Type: A
Name: @
Value: Your hosting IP

Type: CNAME
Name: www
Value: your-domain.com
```

Wait 24-48 hours for propagation.

---

## Monitoring & Logging

### Vercel
- Dashboard analytics
- Real-time monitoring
- Error tracking

### Netlify
- Deploy logs
- Analytics
- Form submissions tracking

### Docker/Self-Hosted
```bash
# View logs
docker logs container-id

# Check resources
docker stats

# Monitor with PM2
pm2 logs
pm2 monit
```

---

## Rollback

### Vercel
- Go to Deployments
- Click previous deployment
- Click "Promote to Production"

### Netlify
- Go to Deploys
- Click previous deploy
- Click "Publish deploy"

### Docker
```bash
docker run -p 3000:3000 postgres-learning-hub:v1.0
```

---

## Cost Comparison

| Platform | Cost | Pros | Cons |
|----------|------|------|------|
| Vercel | Free (generous) | Fast, easy | Limited free tier |
| Netlify | Free (generous) | Simple UI | Slower builds |
| GitHub Pages | Free | Included with GitHub | Static only |
| Docker/Self | $5-20/mo | Full control | Setup complexity |
| AWS | Pay-as-you-go | Scalable | Complex pricing |

---

## Troubleshooting

### Build fails on platform
```bash
# Test locally first
npm run build
npm run preview

# Check build logs on platform dashboard
```

### Blank page after deploy
1. Check browser console (F12)
2. Check platform build logs
3. Verify base path in vite.config.js
4. Clear browser cache

### Environment variables not working
1. Verify variables are set in platform
2. Use correct names (VITE_ prefix for Vite)
3. Rebuild/redeploy
4. Check with: `console.log(import.meta.env.VITE_VAR_NAME)`

### Performance issues
1. Use platform analytics
2. Optimize images
3. Enable compression
4. Use CDN
5. Minimize JavaScript

---

## Recommended Setup

For production use, recommend:

1. **Frontend**: Vercel (React, free, fast)
2. **Domain**: Namecheap or GoDaddy
3. **DNS**: Cloudflare (free, CDN)
4. **Monitoring**: Vercel built-in
5. **Error tracking**: Sentry (free tier)

This setup: **Fast, Reliable, Free (or cheap)**

---

**Deployment guide updated: 2024**