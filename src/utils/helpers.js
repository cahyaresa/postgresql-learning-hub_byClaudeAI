// String utilities
export const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Array utilities
export const chunk = (arr, size) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

// Color utilities
export const getColorByIndex = (index) => {
  const colors = ['#64c8ff', '#4ade80', '#fbbf24', '#f87171', '#a78bfa']
  return colors[index % colors.length]
}

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error('Failed to save to localStorage')
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      console.error('Failed to remove from localStorage')
    }
  },
  clear: () => {
    try {
      localStorage.clear()
    } catch {
      console.error('Failed to clear localStorage')
    }
  }
}

// Favorites management
export const favorites = {
  get: () => storage.get('favorites', []),
  add: (moduleId) => {
    const favs = favorites.get()
    if (!favs.includes(moduleId)) {
      favs.push(moduleId)
      storage.set('favorites', favs)
    }
  },
  remove: (moduleId) => {
    const favs = favorites.get()
    storage.set('favorites', favs.filter(id => id !== moduleId))
  },
  isFavorite: (moduleId) => favorites.get().includes(moduleId),
  toggle: (moduleId) => {
    if (favorites.isFavorite(moduleId)) {
      favorites.remove(moduleId)
    } else {
      favorites.add(moduleId)
    }
  }
}

// Progress tracking
export const progress = {
  get: () => storage.get('progress', {}),
  update: (moduleId, percent) => {
    const prog = progress.get()
    prog[moduleId] = Math.min(100, Math.max(0, percent))
    storage.set('progress', prog)
  },
  getProgress: (moduleId) => progress.get()[moduleId] || 0,
  reset: () => storage.set('progress', {})
}

// Code formatting
export const formatCode = (code) => {
  return code.trim()
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Search utilities
export const searchInText = (text, query) => {
  const regex = new RegExp(query, 'gi')
  return text.match(regex) ? text.replace(regex, `[${query}]`) : text
}

// Print functionality
export const printPage = (content) => {
  const printWindow = window.open('', '', 'height=400,width=800')
  printWindow.document.write(content)
  printWindow.document.close()
  printWindow.print()
}

// Share functionality
export const shareModule = async (title, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'PostgreSQL Learning Hub',
        text: `Check out this module: ${title}`,
        url: url
      })
    } catch (err) {
      console.error('Share failed:', err)
    }
  } else {
    // Fallback: copy to clipboard
    copyToClipboard(url)
  }
}

// Time utilities
export const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

// Random utilities
export const getRandomColor = () => {
  const colors = ['#64c8ff', '#4ade80', '#fbbf24', '#f87171', '#a78bfa', '#10b981']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}