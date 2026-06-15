import { useParams, Link } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'
import './PokemonDetail.css'

export default function PokemonDetail() {
  const { name } = useParams()
  const { pokemon, loading, error } = usePokemon(name)

  if (loading) return <p className="pokemon-status">Cargando detalle de {name}…</p>
  if (error) return <p className="pokemon-status error">{error}</p>
  if (!pokemon) return null

  return (
    <article className="pokemon-detail">
      <Link to="/" className="pokemon-detail__back">← Volver</Link>

      <img className="pokemon-detail__sprite" src={pokemon.sprite} alt={pokemon.name} loading="lazy" />

      <h1 className="pokemon-detail__name">
        #{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h1>

      <div className="pokemon-detail__tags">
        {pokemon.types.map((t) => (
          <span key={t} className="pokemon-detail__type">{t}</span>
        ))}
      </div>

      <div className="pokemon-detail__grid">
        <div className="pokemon-detail__stat">
          <span className="pokemon-detail__label">Peso</span>
          <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="pokemon-detail__stat">
          <span className="pokemon-detail__label">Altura</span>
          <span>{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
      </div>

      <section className="pokemon-detail__stats">
        <h2>Estadísticas base</h2>
        {pokemon.stats.map((s) => (
          <div key={s.name} className="pokemon-detail__stat-bar">
            <span className="pokemon-detail__stat-label">{s.name}</span>
            <span className="pokemon-detail__stat-value">{s.value}</span>
            <div className="pokemon-detail__bar-track">
              <div
                className="pokemon-detail__bar-fill"
                style={{ width: `${Math.min((s.value / 255) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </section>
    </article>
  )
}
