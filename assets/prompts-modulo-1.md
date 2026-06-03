# Módulo 1 — Comandos y Prompts

> Referencia de comandos y prompts. Cópialos en el orden de las clases.
> Proyecto: **Pokédex** (Vite + React + PokeAPI) usando **OpenCode Zen**.
> Grabado con OpenCode (mayo 2026). Si algún comando no coincide, verifica tu versión con `opencode --version`.

---

## Clase 1 · Bienvenida e instalación

▸ Instalar OpenCode (script universal):
```bash
curl -fsSL https://opencode.ai/install | bash
```

▸ Alternativas:
```bash
npm install -g opencode-ai@latest   # npm (multiplataforma)
brew install opencode               # Homebrew (macOS / Linux)
```

▸ Verificar instalación:
```bash
opencode --version
```

▸ Crear la carpeta del proyecto y abrir OpenCode:
```bash
mkdir pokedex && cd pokedex
opencode
```

▸ Salir de la TUI: escribe `/exit` (alias `/quit`, `/q`) o pulsa `Ctrl+C`.

---

## Clase 2 · Conectar modelos con OpenCode Zen

▸ Conectar tu API key de Zen (dentro de la TUI):
```
/connect
```

▸ Alternativa desde la terminal:
```bash
opencode auth login      # iniciar sesión / pegar la key
opencode auth list       # ver proveedores conectados
opencode auth logout     # cerrar sesión de un proveedor
```

▸ Elegir / cambiar de modelo:
```
/models
```
> IDs de Zen (formato `opencode/<id>`): `opencode/claude-opus-4-8`,
> `opencode/claude-sonnet-4-5`, `opencode/gpt-5.5`,
> gratis para practicar: `opencode/deepseek-v4-flash-free`.

▸ Primer prompt (comprobar que responde):
```
Hola, ¿qué modelo eres y en qué carpeta estamos trabajando?
```

---

## Clase 3 · Comandos esenciales, modelos y AGENTS.md

▸ Slash commands del día a día:
```
/init      → analiza el proyecto y crea AGENTS.md
/undo      → revierte el último cambio del agente
/redo      → rehace lo revertido
/share     → genera un link para compartir la conversación
/help      → lista todos los comandos y atajos
/models    → cambiar de modelo
/compact   → compacta la conversación larga
/exit      → salir
```

▸ Crear el scaffold de la Pokédex:
```bash
npm create vite@latest . -- --template react
npm install
```

▸ Generar el AGENTS.md:
```
/init
```

▸ Listar modelos disponibles (terminal):
```bash
opencode models
```

> **Regla de costos:** modelo gratis/barato para explorar y planificar;
> modelo potente solo para implementar. Cambia con `/models` cuando lo necesites.

▸ Explorar el codebase con el subagente Explore:
```
Usa el agente Explore para mapear la estructura del proyecto y explicarme
qué hace cada archivo generado por Vite.
```

---

## Clase 4 · Plan Mode vs Build Mode

▸ Alternar entre Plan y Build: pulsa `Tab` (mira la barra de estado).

▸ Prompt en **Plan Mode** (NO escribe código, solo planifica):
```
Quiero mostrar un listado de los primeros 20 Pokémon desde PokeAPI,
cada uno en una card con su sprite y su nombre. Hazme un plan de
implementación: qué archivos crear, qué componentes, cómo hago el fetch.
No escribas código todavía.
```

▸ Iterar el plan (ejemplos):
```
Añade manejo de un estado de "cargando".
```
```
Usa un custom hook para el fetch.
```

▸ Prompt en **Build Mode** (ya ejecuta):
```
Perfecto, implementa el plan que acabamos de definir.
```

---

## Clase 5 · Creación de proyecto (ciclo completo)

▸ Prompt para definir el feature (Plan Mode):
```
Quiero implementar el listado principal de la Pokédex.
- Datos: trae los primeros 20 Pokémon desde PokeAPI
  (https://pokeapi.co/api/v2/pokemon?limit=20), y para cada uno su
  sprite y nombre.
- UI: un grid responsive de cards; cada card muestra el sprite, el
  nombre capitalizado y el número (#001).
- Estados: muestra un estado de "cargando" mientras llega la data y un
  mensaje de error si el fetch falla.
- Convenciones: componentes en /src/components, la lógica de fetch en
  un servicio en /src/services. Sigue lo que dice AGENTS.md.
```

▸ Iterar el plan:
```
Antes de construir: extrae el fetch a un custom hook usePokemon, y
asegúrate de capitalizar el nombre. ¿Cómo quedaría el plan?
```

▸ Implementar (Build Mode):
```
Implementa el plan que acordamos.
```

▸ Levantar el dev server:
```bash
npm run dev
```

▸ Revisión del propio código:
```
Revisa el código que generaste: ¿hay edge cases sin cubrir en el fetch?
¿el manejo de errores es robusto? Sugiere mejoras pero no las apliques aún.
```

▸ Cuando el agente se equivoca (pega el error y pide el fix):
```
Esto falló con este error: <pega el error>. Diagnostícalo y corrígelo.
```
> Y recuerda `/undo` para revertir el último cambio si empeoró las cosas.
