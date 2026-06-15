import { Link } from 'react-router-dom'

export function PokemonCard({ name, id, sprite }) {
  return (
    <Link to={`/pokemon/${name}`} className="pokemon-card" aria-label={name}>
      <article>
        <img src={sprite} alt={name} loading="lazy" />
        <h3>#{id} {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      </article>
    </Link>
  )
}
