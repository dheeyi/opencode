import { useState, useEffect } from 'react'
import { getPokemonDetail } from '../services/pokeApi'

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20'
const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

function parseId(url) {
  const parts = url.replace(/\/$/, '').split('/')
  return parts[parts.length - 1]
}

export function usePokemon(name) {
  const [pokemon, setPokemon] = useState(name ? null : [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPokemon() {
      setLoading(true)
      setError(null)

      try {
        if (name) {
          const result = await getPokemonDetail(name)
          if (!cancelled) setPokemon(result)
        } else {
          const res = await fetch(API_URL)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const json = await res.json()

          if (cancelled) return

          const mapped = json.results.map((p) => {
            const id = parseId(p.url)
            return {
              id,
              name: p.name,
              sprite: `${SPRITE_BASE}/${id}.png`,
            }
          })

          setPokemon(mapped)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.notFound ? err.message : `Algo salió mal: ${err.message}`)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPokemon()

    return () => { cancelled = true }
  }, [name])

  return { pokemon, loading, error }
}
