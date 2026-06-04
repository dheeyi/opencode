import { usePokemon } from '../hooks/usePokemon'
import { PokemonCard } from './PokemonCard'
import './PokemonList.css'

export default function PokemonList() {
  const { pokemon, loading, error } = usePokemon()

  if (loading) return <p className="pokemon-status">Cargando Pokémon…</p>
  if (error) return <p className="pokemon-status error">Error: {error}</p>

  return (
    <section className="pokemon-grid">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} {...p} />
      ))}
    </section>
  )
}
