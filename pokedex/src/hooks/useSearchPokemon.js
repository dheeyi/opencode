import { useState, useCallback } from 'react'
import { searchPokemon } from '../services/pokeApi'

export function useSearchPokemon() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (name) => {
    if (!name?.trim()) return

    setLoading(true)
    setError(null)
    setPokemon(null)

    try {
      const result = await searchPokemon(name)
      setPokemon(result)
    } catch (err) {
      setError(err.notFound ? err.message : `Algo salió mal: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  return { pokemon, loading, error, search }
}
