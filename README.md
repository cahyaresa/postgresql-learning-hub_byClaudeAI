# PostgreSQL Learning Hub 🚀

Comprehensive educational platform untuk PostgreSQL database management dan system administration. Built dengan **Vite + React** untuk pembelajaran interaktif dan mendalam.

## 📚 Modules Included

### 1. 🎛️ PostgreSQL pg_ctl
Master the essential PostgreSQL server control utility.
- **Topics**: Start, stop, restart, reload, status, promote
- **Coverage**: Shutdown modes, signals, options, cheatsheet
- **Practical**: Real-world examples, troubleshooting

### 2. 🔄 pg_ctl vs systemd
Modern Linux system administration approach comparison.
- **Topics**: systemd fundamentals, unit files, systemctl commands
- **Coverage**: Differences, benefits, migration path
- **Practical**: Configuration examples, best practices

### 3. 🔐 Host-Based Authentication (pg_hba.conf)
Control client connections dan authentication methods.
- **Topics**: Connection types, authentication methods, rules
- **Coverage**: Security best practices, troubleshooting
- **Practical**: Configuration examples, common issues

### 4. 📝 Transaction Log & WAL
Write-Ahead Logging dan data durability mechanics.
- **Topics**: WAL structure, transaction IDs, MVCC, checkpoints
- **Coverage**: Crash recovery, replication, monitoring
- **Practical**: Configuration, performance tuning

### 5. 🗺️ Memory Management & Virtual Address Space
System administration fundamentals untuk process memory.
- **Topics**: Virtual memory, memory segments, paging
- **Coverage**: Kernel vs user space, isolation, TLB
- **Practical**: Examples, debugging tools

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (install dari https://nodejs.org/)
- npm atau yarn

### Installation

```bash
# 1. Navigate to project directory
cd postgres-learning-hub

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Server berjalan di http://localhost:3000
```

### Build untuk Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
postgres-learning-hub/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app dengan routing
│   ├── index.css             # Global styles (Tailwind)
│   ├── pages/
│   │   └── Dashboard.jsx     # Home page dengan module overview
│   └── modules/
│       ├── PgCtl.jsx         # pg_ctl module
│       ├── PgCtlVsSystemd.jsx # pg_ctl vs systemd comparison
│       ├── HostBasedAuth.jsx # Host-based authentication
│       ├── TransactionLog.jsx # Transaction log & WAL
│       └── MemoryManagement.jsx # Memory & VAS
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router 6
- **Styling**: Tailwind CSS 3
- **UI Components**: Lucide React Icons
- **Package Manager**: npm

## 📖 How to Use

1. **Start at Dashboard**: First page shows overview semua modules
2. **Select Module**: Click card untuk navigate ke module pilihan
3. **Explore Content**: Each module punya multiple tabs dengan detailed explanation
4. **Learn Features**:
   - Interactive tab navigation
   - Syntax-highlighted code examples
   - Visual hierarchy dengan color coding
   - Comprehensive cheatsheets
   - Practical examples

## 🎯 Features

✨ **Interactive Learning**
- Tabbed interface untuk organized content
- Smooth animations dan transitions
- Responsive design (mobile-friendly)

📱 **Comprehensive Coverage**
- 5+ modules dengan in-depth explanations
- Practical examples dan troubleshooting guides
- Best practices per topic

🎨 **Modern UI**
- Dark theme (easy pada eyes)
- Color-coded categories
- Consistent design language
- Professional appearance

🔍 **Developer-Friendly**
- Clean, modular code structure
- Easy to extend dengan module baru
- Well-organized components

## 📝 Content Details

### Each Module Includes:

1. **Overview Tab**: Introduction dan fundamental concepts
2. **Multiple Content Tabs**: Detailed explanations organized by topic
3. **Practical Examples**: Real-world use cases
4. **Best Practices**: Industry-standard recommendations
5. **Troubleshooting**: Common issues dan solutions
6. **Cheatsheets**: Quick reference guides

## 🚀 Deployment

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Netlify Deployment
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload 'dist' folder to your web server
```

## 🔧 Configuration

### Vite Config
Modify `vite.config.js` untuk:
- Port configuration
- Build optimization
- Plugin settings

### Tailwind Config
Customize `tailwind.config.js` untuk:
- Color scheme
- Custom themes
- Additional utilities

## 📚 Learning Path Recommendations

### Beginner
1. Start dengan pg_ctl module
2. Learn systemd integration
3. Understand authentication

### Intermediate
4. Deep dive WAL & transactions
5. Memory management concepts

### Advanced
- Combine knowledge across modules
- Explore real-world scenarios
- Optimize PostgreSQL configurations

## 🎓 Best Practices

✅ **Do's**
- Read overview first untuk context
- Follow examples step-by-step
- Experiment dengan configurations
- Check troubleshooting sections

❌ **Don'ts**
- Skip fundamental concepts
- Memorize without understanding
- Copy-paste code without review
- Ignore security recommendations

## 🐛 Troubleshooting

### Module tidak loading?
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Styling issues?
```bash
# Rebuild Tailwind CSS
npm run build
```

### Port already in use?
```bash
# Change port in vite.config.js
# Atau kill process menggunakan port 3000
lsof -ti:3000 | xargs kill -9
```

## 📞 Support & Feedback

Found issues atau punya suggestions?
- Check modules untuk detailed explanations
- Review troubleshooting sections
- Consult official PostgreSQL documentation

## 📄 License

Educational content untuk learning purposes.

## 🙏 Credits

Created untuk comprehensive PostgreSQL dan system administration learning.

---

**Happy Learning! 🚀 PostgreSQL mastery starts here.**

*Last updated: 2024*