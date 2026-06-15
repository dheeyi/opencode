---
name: api-patterns
description: Úsala al consumir PokeAPI o crear servicios/hooks de fetch. Define cómo hacemos data-fetching en este proyecto.
---
# Patrones de consumo de la API (PokeAPI)

- **Base URL:** `https://pokeapi.co/api/v2/` — API pública, sin API key.
- **Dónde va el fetch:** toda llamada vive en `/src/services` (ej. `pokeApi.js`).
  Los componentes NO hacen `fetch` directo.
- **Hooks:** expón los datos con un custom hook en `/src/hooks`
  (ej. `usePokemon`) que devuelva `{ data, loading, error }`.
- **Estados obligatorios:** siempre maneja `loading` y `error` en la UI.
- **Errores:** maneja el caso **404** (pokémon inexistente) con un mensaje claro,
  no un crash.
- **Formato:** capitaliza nombres y muestra el número con padding (`#001`).
