import { useState } from 'react'
import { useSearchPokemon } from '../hooks/useSearchPokemon'
import { PokemonCard } from './PokemonCard'
import './PokemonSearch.css'

export function PokemonSearch() {
  const [input, setInput] = useState('')
  const { pokemon, loading, error, search } = useSearchPokemon()

  function handleSubmit(e) {
    e.preventDefault()
    search(input)
  }

  return (
    <section className="pokemon-search">
      <form onSubmit={handleSubmit} className="pokemon-search__form">
        <input
          className="pokemon-search__input"
          type="text"
          placeholder="Ej: pikachu, charizard…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="pokemon-search__button" type="submit" disabled={loading}>
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {loading && <p className="pokemon-status">Buscando Pokémon…</p>}

      {error && <p className="pokemon-status error">{error}</p>}

      {pokemon && (
        <div className="pokemon-search__result">
          <PokemonCard {...pokemon} />
          <div className="pokemon-search__types">
            {pokemon.types.map((t) => (
              <span key={t} className="pokemon-search__type">{t}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
