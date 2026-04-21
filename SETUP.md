# PostgreSQL Learning Hub - Setup Guide 🚀

Complete guide untuk setup, run, dan deploy PostgreSQL Learning Hub project.

## 📋 Prerequisites

### System Requirements
- **OS**: macOS, Linux, atau Windows
- **Node.js**: Version 16.0.0 atau lebih tinggi
- **npm**: Version 7.0.0 atau lebih tinggi
- **RAM**: Minimal 2GB (4GB recommended)
- **Disk Space**: 500MB untuk dependencies

### Check Your Environment
```bash
node --version      # Should show v16.0.0 or higher
npm --version       # Should show 7.0.0 or higher
```

## 🛠️ Installation Steps

### 1. Extract Project
```bash
# Unzip/extract postgres-learning-hub folder
cd postgres-learning-hub
```

### 2. Install Dependencies
```bash
npm install

# Wait untuk completion (first time might take 2-5 minutes)
# You should see: "added XXX packages in XXs"
```

### 3. Start Development Server
```bash
npm run dev

# Output should show:
#   VITE v5.x.x  ready in XXX ms
#   ➜  Local:   http://localhost:3000/
#   ➜  press h + enter to show help
```

### 4. Open in Browser
```bash
# Browser should auto-open
# Manually: navigate to http://localhost:3000
```

## 🎮 Development Workflow

### Working dengan Project
```bash
# Terminal 1: Start dev server
npm run dev

# Keep running while developing
# Hot reload otomatis saat file berubah

# Terminal 2 (optional): Run linter
npm run lint

# Terminal 3 (optional): Other tasks
```

### Making Changes
1. Edit files dalam `src/` folder
2. Save file → Hot reload automatic
3. Browser update instantly
4. No manual refresh needed!

### File Structure untuk Development
```
src/
├── modules/           # Educational modules
│   ├── PgCtl.jsx
│   ├── PgCtlVsSystemd.jsx
│   ├── HostBasedAuth.jsx
│   ├── TransactionLog.jsx
│   └── MemoryManagement.jsx
├── pages/
│   └── Dashboard.jsx   # Home page
├── App.jsx             # Main app router
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 📦 Build & Deployment

### Build untuk Production
```bash
npm run build

# Creates 'dist/' folder dengan optimized files
# File size typical: 100-200KB (gzipped)
```

### Preview Build Locally
```bash
npm run preview

# Simulates production build
# Visit http://localhost:4173
```

### Common Build Issues

**Issue: Build fails dengan "module not found"**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue: Build too slow**
```bash
# Check Node version (upgrade if needed)
node --version

# Try clearing cache
npm cache clean --force
npm install
npm run build
```

## 🚀 Deployment Options

### Option 1: Vercel (Easiest)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# Project akan live dalam seconds!

# Vercel Dashboard: https://vercel.com/dashboard
```

### Option 2: Netlify
```bash
# 1. Build project
npm run build

# 2. Go to https://app.netlify.com
# 3. Drag & drop 'dist' folder
# 4. Done! Site live

# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages
```bash
# 1. Modify vite.config.js (add base: '/repo-name/')
# 2. Build
npm run build

# 3. Commit dist/ folder
git add dist
git commit -m "Deploy"
git push

# 4. Enable GitHub Pages dalam repo settings
```

### Option 4: Traditional Hosting (Hostinger, Bluehost, etc)
```bash
# 1. Build
npm run build

# 2. Upload 'dist' folder to your hosting
#    (via FTP, File Manager, atau Console)

# 3. Set document root to 'dist' folder

# 4. Done!
```

### Option 5: Docker Deployment
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

```bash
# Build & run Docker
docker build -t postgres-learning-hub .
docker run -p 3000:3000 postgres-learning-hub
```

## 🔧 Customization

### Add New Module
```jsx
// 1. Create src/modules/NewModule.jsx
export default function NewModule() {
  return (
    <div className="min-h-screen">
      {/* Your content */}
    </div>
  )
}

// 2. Add route di src/App.jsx
import NewModule from './modules/NewModule'
// Add dalam Routes:
<Route path="/new-module" element={<NewModule />} />

// 3. Add link di src/pages/Dashboard.jsx
{
  title: '🆕 New Module',
  path: '/new-module',
  // ... other props
}
```

### Change Theme/Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'primary-blue': '#your-color',
      // ... update other colors
    }
  }
}
```

### Modify Styling
Edit `src/index.css`:
```css
/* Add custom styles here */
/* Tailwind utilities automatically available */
```

## 🐛 Troubleshooting

### Problem: Port 3000 already in use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Problem: Hot reload not working
```bash
# Solution: Check Vite config
# Ensure vite.config.js has:
# server: { port: 3000, open: true }

# Restart dev server
# Ctrl+C to stop, npm run dev to restart
```

### Problem: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Build shows warnings
```bash
# Warnings are normal, typically safe to ignore
# Check console for actual errors (red text)

# If warnings block build:
# eslint errors: Check .eslintrc.json
# Unused vars: Prefix with _ (e.g., _param)
```

### Problem: Modules not showing content
```bash
# Check browser console (F12 → Console)
# Look untuk error messages

# Common causes:
# 1. Missing import dalam module file
# 2. Syntax error dalam JSX
# 3. File path incorrect

# Solution: Check file dalam src/modules/
```

## 📊 Performance Tips

### Optimize Bundle Size
```bash
# Analyze bundle
npm install -g webpack-bundle-analyzer
# Check which dependencies are large
```

### Faster Development
```bash
# 1. Use fast SSD untuk node_modules
# 2. Close other applications
# 3. Update Node.js regularly
# 4. Use npm ci instead of npm install (in CI/CD)
```

### Production Optimization
- Minification: Automatic via Vite
- Code splitting: Handled automatically
- Image optimization: Move to public/ folder
- Caching: Configure via vercel.json atau netlify.toml

## 📚 Additional Resources

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Router**: https://reactrouter.com/

## 🎓 Learning Resources

### PostgreSQL
- https://www.postgresql.org/docs/
- https://postgresql-wiki.postgresql.narkive.com/

### Linux/System Admin
- https://man7.org/linux/man-pages/
- https://linuxfoundation.org/

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` started dev server successfully
- [ ] Browser opened to http://localhost:3000
- [ ] Dashboard page loaded
- [ ] Can navigate between modules
- [ ] Module content displays properly
- [ ] No console errors (F12)
- [ ] All buttons clickable
- [ ] Responsive on mobile

## 🎯 Next Steps

1. ✅ Complete setup
2. 📚 Read README.md untuk overview
3. 🚀 Start at Dashboard page
4. 🔍 Explore modules one by one
5. 💾 Build untuk production when ready
6. 🌐 Deploy ke your hosting

## 📞 Getting Help

1. Check module troubleshooting sections
2. Review README.md untuk common solutions
3. Check browser console (F12) untuk errors
4. Try reinstalling dependencies
5. Check Vite documentation

---

**You're all set! Happy Learning! 🚀**

For questions atau issues:
- Review official documentation
- Check GitHub issues (if applicable)
- Consult PostgreSQL/Linux resources

*Last updated: 2024*