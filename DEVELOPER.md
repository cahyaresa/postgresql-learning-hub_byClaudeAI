# 👨‍💻 Developer Guide

Comprehensive guide untuk developers yang ingin contribute atau extend PostgreSQL Learning Hub.

## 🏗️ Project Architecture

```
postgres-learning-hub/
├── src/
│   ├── App.jsx                    # Main app + routing
│   ├── main.jsx                   # React entry
│   ├── index.css                  # Global styles
│   ├── components/
│   │   └── index.jsx              # Reusable components
│   ├── modules/                   # Educational modules
│   ├── pages/                     # Page components
│   └── utils/
│       └── helpers.js             # Utilities
├── Dockerfile                     # Production image
├── docker-compose.yml             # Docker compose
├── package.json                   # Dependencies
└── vite.config.js                 # Vite config
```

## 📦 Adding New Module

### Step 1: Create Module File

```jsx
// src/modules/NewModule.jsx
import React, { useState } from 'react'

export default function NewModule() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      {/* Your content */}
    </div>
  )
}
```

### Step 2: Add Route in App.jsx

```jsx
import NewModule from './modules/NewModule'

// Inside Routes:
<Route path="/new-module" element={<NewModule />} />
```

### Step 3: Add to Dashboard

Edit `src/pages/EnhancedDashboard.jsx` and add to modules array:

```jsx
{
  id: 'new-module',
  title: '🆕 New Module',
  description: 'Module description here',
  path: '/new-module',
  icon: '🆕',
  tags: ['tag1', 'tag2'],
  difficulty: 'Intermediate'
}
```

### Step 4: Add Navigation Link

Edit `src/App.jsx` Navigation component if needed.

## 🔧 Component Library

Reusable components dalam `src/components/index.jsx`:

```jsx
// Tabs
<Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

// Card
<Card border="primary-blue">{children}</Card>

// Code Block with copy
<CodeBlock code="npm run dev" language="bash" />

// Section
<Section title="Title" icon="📌" color="blue">{children}</Section>

// Alert
<Alert type="success" title="Success!" message="Operation complete" />

// Button
<Button variant="primary">Click Me</Button>

// Badge
<Badge variant="success">Tag</Badge>

// Table
<Table headers={['Col1', 'Col2']} rows={rows} />

// Progress
<ProgressBar value={50} max={100} label="Progress" />
```

## 🛠️ Utility Functions

Available in `src/utils/helpers.js`:

```jsx
import { 
  favorites, 
  progress, 
  storage,
  copyToClipboard,
  debounce,
  throttle,
  formatCode
} from '../utils/helpers'

// Favorites management
favorites.add('module-id')
favorites.remove('module-id')
favorites.toggle('module-id')
favorites.isFavorite('module-id')

// Progress tracking
progress.update('module-id', 75)
progress.getProgress('module-id')
progress.reset()

// Local storage
storage.get('key', defaultValue)
storage.set('key', value)
storage.remove('key')
storage.clear()
```

## 🎨 Styling Guide

### Colors
```javascript
// Primary colors
#64c8ff  // Blue - Primary
#4ade80  // Green - Success
#fbbf24  // Yellow - Warning
#f87171  // Red - Error
#a78bfa  // Purple - Advanced

// Text colors
#e0f2ff  // Primary text
#a0c8ff  // Secondary text
#708090  // Muted text
```

### Common Patterns

```jsx
// Card style
{
  background: 'rgba(100, 200, 255, 0.08)',
  border: '1px solid rgba(100, 200, 255, 0.2)',
  borderRadius: '12px',
  padding: '20px'
}

// Button style
{
  padding: '10px 16px',
  background: '#64c8ff',
  color: '#0f1419',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
}
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Check build
npm run build

# Preview build locally
npm run preview
```

## 📝 Code Standards

### Naming Conventions
- **Components**: PascalCase (NewModule.jsx)
- **Variables/Functions**: camelCase (myVariable)
- **Constants**: UPPER_SNAKE_CASE (MAX_SIZE)
- **CSS Classes**: kebab-case (my-class)

### File Organization
- One component per file
- Related utilities in utils/ folder
- Reusable components in components/ folder
- Page-level components in pages/ folder

### Comments
```jsx
// Single line comment for code clarification

/*
 * Multi-line comment for complex logic
 * explaining the implementation
 */
```

## 🔄 Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Commit changes
git add .
git commit -m "feat: Add new module"

# 4. Push to GitHub
git push origin feature/my-feature

# 5. Create Pull Request
# Go to GitHub, create PR with description
```

### Commit Message Format
```
type(scope): subject

feat(module): Add new PostgreSQL module
fix(ui): Fix responsive design issue
docs(readme): Update installation instructions
style(css): Improve button styling
refactor(components): Extract reusable logic
```

## 🚀 Building & Deploying

### Local Build
```bash
npm run build
npm run preview
```

### Docker Build
```bash
docker build -t postgres-learning-hub .
docker run -p 3000:3000 postgres-learning-hub
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🐛 Common Issues & Solutions

### Issue: Module not rendering
**Solution**: 
1. Check import statement
2. Verify route exists in App.jsx
3. Check browser console for errors

### Issue: Styles not applying
**Solution**:
1. Verify inline styles are correct
2. Check for typos in color codes
3. Use browser DevTools to inspect

### Issue: Build fails
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test locally
5. Create Pull Request
6. Wait for review

## 📞 Questions?

Check existing modules for examples or review component library documentation.

---

**Happy coding! 🚀**