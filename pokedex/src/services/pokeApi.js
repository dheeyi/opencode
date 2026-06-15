const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

function toPokemon(data) {
  return {
    id: data.id,
    name: data.name,
    sprite: `${SPRITE_BASE}/${data.id}.png`,
    types: data.types.map((t) => t.type.name),
  }
}

function toPokemonDetail(data) {
  return {
    id: data.id,
    name: data.name,
    sprite: `${SPRITE_BASE}/${data.id}.png`,
    types: data.types.map((t) => t.type.name),
    weight: data.weight,
    height: data.height,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  }
}

export async function searchPokemon(name) {
  const res = await fetch(`${BASE_URL}/${name.toLowerCase().trim()}`)

  if (res.status === 404) {
    const error = new Error(`No se encontró un Pokémon llamado "${name}"`)
    error.notFound = true
    throw error
  }

  if (!res.ok) throw new Error(`Error al buscar: HTTP ${res.status}`)

  const json = await res.json()
  return toPokemon(json)
}

export async function getPokemonDetail(name) {
  const res = await fetch(`${BASE_URL}/${name.toLowerCase().trim()}`)

  if (res.status === 404) {
    const error = new Error(`No se encontró un Pokémon llamado "${name}"`)
    error.notFound = true
    throw error
  }

  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

  const json = await res.json()
  return toPokemonDetail(json)
}
