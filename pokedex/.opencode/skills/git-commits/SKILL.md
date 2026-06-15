---
name: git-commits
description: Úsala al crear commits. Define el formato Conventional Commits del proyecto.
---
# Convención de commits del proyecto

Usa **Conventional Commits**: `tipo(scope): descripción`.

Tipos permitidos: feat, fix, docs, style, refactor, test, chore.

Reglas:
- Mensaje en imperativo y en minúscula ("añade", no "añadido").
- Máx. 72 caracteres en la primera línea.
- El scope es opcional (ej. `feat(pokedex): ...`).

Ejemplos:
- feat(pokedex): añade grid de cards con sprites
- fix(api): maneja error 404 al buscar un pokémon inexistente
