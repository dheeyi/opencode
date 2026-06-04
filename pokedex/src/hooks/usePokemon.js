import { useState, useEffect } from 'react'

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20'
const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

function parseId(url) {
  const parts = url.replace(/\/$/, '').split('/')
  return parts[parts.length - 1]
}

export function usePokemon() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPokemon() {
      try {
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
        setLoading(false)
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchPokemon()

    return () => { cancelled = true }
  }, [])

  return { pokemon, loading, error }
}
