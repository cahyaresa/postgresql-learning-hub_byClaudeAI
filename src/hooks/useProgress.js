import { useLocalStorage } from './useLocalStorage'

export function useProgress() {
  const [progress, setProgress] = useLocalStorage('progress', {})

  const updateProgress = (moduleId, percent) => {
    setProgress((prev) => ({
      ...prev,
      [moduleId]: Math.min(100, Math.max(0, percent)),
    }))
  }

  const getModuleProgress = (moduleId) => progress[moduleId] || 0

  const resetProgress = () => setProgress({})

  return { progress, updateProgress, getModuleProgress, resetProgress }
}
