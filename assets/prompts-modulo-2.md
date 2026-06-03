# Módulo 2 — Comandos y Prompts

> Referencia de comandos, prompts y configuraciones. Cópialos en orden.
> Seguimos sobre el proyecto **Pokédex** del Módulo 1.
> Grabado con OpenCode (mayo 2026). Si algún comando no coincide, verifica tu versión con `opencode --version`.

---

## Recordatorio del Módulo 1 (los seguiremos usando)

Built-in: `/init` · `/undo` · `/redo` · `/share` · `/help` · `/connect` · `/models`
Atajos: `Tab` (alterna Plan / Build) · `@` (referenciar archivos)

---

## Clase 1 · Commands & Custom Commands

▸ Archivo: `.opencode/commands/test.md`
```markdown
---
description: Corre los tests y resume los fallos
---
Corre los tests del proyecto con !`npm test` y dame un resumen claro de
qué pasó: cuántos pasaron, cuántos fallaron y por qué.
```
Uso: `/test`

▸ Archivo: `.opencode/commands/componente.md`
```markdown
---
description: Crea un nuevo componente de React siguiendo las convenciones del proyecto
---
Crea un componente de React llamado $ARGUMENTS en /src/components,
siguiendo las convenciones de AGENTS.md. Incluye sus props tipadas y
un estado básico si aplica.
```
Uso: `/componente PokemonStats`

▸ Comando inline en `opencode.json`:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "review-rapido": {
      "template": "Revisa los cambios sin commitear con !`git diff` y dime si hay algo riesgoso antes de continuar.",
      "description": "Revisión rápida del diff actual"
    }
  }
}
```

---

## Clase 2 · Agents

▸ Crear un agente de forma guiada:
```bash
opencode agent create
```
> Nota: verifica que el archivo quede en `.opencode/agents/` (plural).

▸ Archivo: `.opencode/agents/reviewer.md`
```markdown
---
description: Revisa cambios de código en busca de bugs, problemas y mejoras. Solo lectura.
mode: subagent
model: opencode/claude-sonnet-4-5   # usa el id que te muestre /models
temperature: 0.1
permission:
  edit: deny
  bash: ask
---
Eres un revisor de código senior especializado en React y TypeScript.
Revisa los cambios buscando: bugs, edge cases sin cubrir, problemas de
rendimiento y malas prácticas. Sé concreto: cita archivo y línea, explica
el porqué y propón el fix. NO modifiques archivos: solo reportas.
```

▸ Archivo: `.opencode/agents/security-auditor.md`
```markdown
---
description: Audita seguridad: secretos expuestos, inputs sin validar, deps vulnerables. Solo lectura.
mode: subagent
temperature: 0.1
permission:
  edit: deny
---
Eres un auditor de seguridad. Busca secretos hardcodeados, validación de
inputs faltante, dependencias riesgosas y exposición de datos. Reporta por
severidad (alta/media/baja) con el fix recomendado. No modifiques nada.
```

▸ Archivo: `.opencode/agents/doc-writer.md`
```markdown
---
description: Escribe y actualiza documentación (README, comentarios, AGENTS.md).
mode: subagent
permission:
  bash: deny
---
Eres un redactor técnico. Genera documentación clara y concisa: README,
docstrings y secciones de AGENTS.md. Usa ejemplos y un tono didáctico.
```

▸ Usar los agentes:
```
@reviewer revisa los cambios del listado de Pokémon que hicimos en el Módulo 1
```
```
@doc-writer documenta el servicio de PokeAPI y actualiza el README
```

▸ Auditar seguridad (corre sobre el riesgo plantado en clase):
```
@security-auditor audita la Pokédex: secretos/keys en el cliente,
dependencias (npm audit), XSS y validación de inputs.
```

▸ Registrar el equipo en AGENTS.md (documento vivo):
```
Actualiza AGENTS.md: agrega una sección "Agentes del proyecto" describiendo
reviewer, security-auditor y doc-writer, y cuándo usar cada uno.
```

---

## Clase 3 · Skills

▸ Archivo: `.opencode/skills/git-commits/SKILL.md`
```markdown
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
```
> Tras crear/editar una skill, **reinicia OpenCode** (se cachean al arrancar).

▸ Probar que la skill se activa sola:
```
Voy a commitear el listado de Pokémon. Genera el mensaje de commit.
```

▸ Controlar skills por agente (`opencode.json`):
```json
{
  "agent": {
    "reviewer": {
      "permission": { "skill": "deny" }
    }
  }
}
```

---

## Clase 4 · opencode.json y permisos

▸ Esqueleto base de `opencode.json`:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode/claude-sonnet-4-5",
  "permission": {},
  "agent": {},
  "mcp": {}
}
```

▸ Permisos sensatos (allow / ask / deny):
```json
{
  "permission": {
    "edit": "ask",
    "webfetch": "allow",
    "bash": {
      "rm *": "deny",
      "git push *": "ask",
      "*": "allow"
    }
  }
}
```

▸ Overrides por agente:
```json
{
  "agent": {
    "reviewer": { "permission": { "edit": "deny", "bash": "deny" } },
    "build": { "permission": { "edit": "allow" } }
  }
}
```

▸ Verificar un permiso `ask` en vivo:
```
Edita el README y agrega una línea sobre cómo correr el proyecto.
```

---

## Clase 5 · MCP

▸ MCP remoto (GitHub) en `opencode.json`:
```json
{
  "mcp": {
    "github": {
      "type": "remote",
      "url": "https://api.githubcopilot.com/mcp/",
      "enabled": true,
      "headers": {
        "Authorization": "Bearer TU_GITHUB_TOKEN"
      }
    }
  }
}
```

▸ MCP local (ejemplo):
```json
{
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "-y", "@playwright/mcp@latest"],
      "enabled": true
    }
  }
}
```

▸ Gestionar MCP servers (terminal):
```bash
opencode mcp list      # ver servidores configurados
opencode mcp add       # agregar uno de forma guiada
```

▸ Verificar que GitHub responde:
```
Usando el MCP de GitHub, lista mis repositorios más recientes.
```

---

## Clase 6 · Workflow completo (Agents + Skills + MCP)

▸ Requerimiento (Plan Mode):
```
Quiero agregar una vista de detalle del Pokémon: al hacer clic en una card,
se navega a /pokemon/:name y se muestran sus tipos, peso, altura y estadísticas
base, con estados de loading y error. Datos desde PokeAPI. Sigue AGENTS.md.
```

▸ Iterar el plan:
```
Antes de construir: reutiliza el hook de fetch que ya tenemos y agrega
manejo del caso 404 (pokémon inexistente). ¿Cómo queda el plan?
```

▸ Implementar (Build Mode):
```
Implementa el plan que acordamos.
```

▸ Levantar y probar:
```bash
npm run dev
```

▸ Revisar con el agente:
```
@reviewer revisa la nueva vista de detalle: bugs, edge cases y rendimiento.
```

▸ Documentar con el agente (README + AGENTS.md vivo):
```
@doc-writer actualiza el README y la sección relevante de AGENTS.md con la
nueva feature de detalle de Pokémon.
```

▸ Commit (usa la skill git-commits) + push:
```
Crea una rama feature/pokemon-detalle, commitea los cambios siguiendo
nuestra convención de commits, y haz push.
```

▸ Crear el Pull Request vía MCP:
```
Usando el MCP de GitHub, abre un Pull Request de feature/pokemon-detalle
hacia main, con un título claro y una descripción de lo que se agregó.
```
