export function PokemonCard({ name, id, sprite }) {
  return (
    <article className="pokemon-card">
      <img src={sprite} alt={name} loading="lazy" />
      <h3>#{id} {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    </article>
  )
}
