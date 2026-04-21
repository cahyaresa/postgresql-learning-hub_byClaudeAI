import { useLocalStorage } from './useLocalStorage'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const toggleFavorite = (moduleId) => {
    setFavorites((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  const isFavorite = (moduleId) => favorites.includes(moduleId)

  return { favorites, toggleFavorite, isFavorite }
}
