---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'Agente o flujo BMad que reciba modificaciones y las aplique al proyecto'
session_goals: 'Cambios reales en el repo a partir de un lote de instrucciones; integración con BMad. Entrada frecuente: correo .eml de compañero. Incluir fase de descubrimiento explícita (qué modificar + fuente de entrada).'
selected_approach: 'ai-recommended'
techniques_used:
  - Question Storming
  - Constraint Mapping
  - Morphological Analysis
ideas_generated:
  - Descubrimiento previo con checklist (página, sección, coherencia, net-new)
  - Gobernanza: preguntar si duda; dev aprueba pre-commit; modo propuesta
  - Trazabilidad en _bmad-output con correlationId y source/
  - Lecciones en éxito y en rechazo; lectura al inicio de intake
  - Combo arquitectónico α (skills encadenados, proposal en disco, source gitignored)
context_file: ''
workflow_completed: true
---

# Brainstorming Session Results

**Facilitator:** Guille
**Date:** 2026-04-07

## Session Overview

**Topic:** Agente o flujo BMad que reciba modificaciones y las aplique al proyecto.

**Goals:** Obtener un flujo repetible (idealmente alineado con BMad) donde se pasen cambios solicitados y se materialicen en el código/archivos; contemplar requisitos que llegan en **ficheros .eml** de un compañero; incluir una **fase de descubrimiento** que clarifique *qué* hay que tocar y *desde qué fuente* llega la petición antes de implementar.

### Context Guidance

_No se cargó `context_file` en esta sesión._

### Session Setup

El usuario confirmó que el encuadre refleja su intención y amplió el alcance: la fuente de verdad a menudo es un **.eml** (cuerpo del mensaje, adjuntos, hilos). El workflow deseado incorpora **descubrimiento** (mapear petición → archivos/ámbitos del repo, validar ambigüedades, decidir orden de aplicación) antes de la fase de aplicación de parches o ediciones.

## Technique Selection

**Approach:** AI-Recommended Techniques  
**Analysis context:** Agente BMad aplicador de cambios en el repo, con entrada .eml y fase de descubrimiento.

**Recommended techniques:**

- **Question Storming:** Acotar el espacio del problema antes de diseñar el agente.
- **Constraint Mapping:** Separar límites reales y supuestos en un entorno profesional.
- **Morphological Analysis:** Explorar combinaciones de parámetros del pipeline (entrada × fases × automatización).

**AI rationale:** Tema complejo y con tono formal; conviene definir bien el problema, mapear restricciones y abrir un abanico de arquitecturas antes de cerrar una solución.

## Technique execution (en curso)

**Técnicas completadas:** Question Storming (bloques 1–3); Constraint Mapping; Morphological Analysis (**decisión α**).

### Bloque 1 — Claridad del pedido (.eml → alcance web)

Preguntas aportadas por Guille (checklist de descubrimiento):

- ¿Está bien marcado dónde aplicar los cambios en la web?
- ¿La sección o página está clara?
- ¿El contenido indicado existe o es coherente?
- ¿Hay que crear algo nuevo?

Ampliación del facilitador (solo preguntas): fuente de verdad de “página”, ambigüedad multi-archivo, qué significa “existe”, contradicciones entre páginas, adjuntos vs cuerpo, hilos con varias peticiones.

### Bloque 2 — Confianza, roles y límites

**Criterios emergentes (Guille):**

- **Incertidumbre del agente:** si no está seguro, debe **preguntar al usuario** (no asumir).
- **Aprobación:** el **desarrollador** aprueba **antes de hacer commits**.
- **Fuente de entrada:** no tiene por qué ser `.eml` ni un formato fijo; **en cada caso hay que analizar** la fuente concreta.
- **Trazabilidad:** debe quedar **registro** de qué petición/origen justifica qué cambio.
- **Veto / criterio de producto:** el desarrollador puede decir **no** cuando el pedido no encaja; asume ese rol con criterio en la práctica.
- **Autonomía (fase actual):** el agente ofrece **propuesta**; la aplicación definitiva pasa por revisión humana pre-commit.

### Bloque 3 — Trazabilidad y fuentes multiformato

**Decisiones (Guille):**

- **Ubicación de la traza:** `_bmad-output` (nota: convención de carpeta del proyecto).
- **Horizonte temporal:** basta **trazabilidad del ciclo actual** (no archivo a largo plazo como requisito duro).
- **Identificador:** cada propuesta lleva **id de petición** análogo a un **correlationId** (correlaciona origen ↔ descubrimiento ↔ propuesta).
- **Correo / fuente bruta:** se **adjunta o guarda** junto al intake (ruta referenciada desde la traza).
- **Multiformato:** criterio delegado al facilitador; abajo una **propuesta concreta** a validar en Constraint Mapping / implementación.

**Propuesta operativa multiformato (facilitador — revisable):**

- Carpeta por petición: `_bmad-output/requests/{correlationId}/`.
- `source/`: artefacto original tal cual (.eml, captura, export, PDF, texto).
- `manifest` ligero (`intake.yaml` o `manifest.json`): tipo de fuente detectado, fechas/autor si existen, rutas a `source/`, lista de ítems de petición inferidos.
- `discovery.md` (o similar): fase **solo análisis** — qué se entendió, ambigüedades, archivos del repo candidatos (sin mezclar con “ya aplicado”).
- `proposal/`: diffs o borradores de cambio **propuestos** (modo propuesta pre-commit que acordaste en bloque 2).

Así se separa **intake / descubrimiento / propuesta** y todo queda colgado del mismo **correlationId**.

---

### Question Storming — cierre breve

**Ideas clave llevadas a restricciones:** checklist de claridad del pedido; gobernanza (preguntar si duda, dev aprueba pre-commit, modo propuesta); traza en `_bmad-output` con `correlationId`; layout por petición bajo `requests/{id}/`.

### Constraint Mapping (cerrado)

Mapa — **duras**, **blandas**, **por validar**, **memoria**.

| Tipo | Restricción | Notas |
|------|-------------|--------|
| **Dura** | Sin commit sin revisión del desarrollador | Alineado con bloque 2. |
| **Dura** | Si el agente no está seguro → preguntar al usuario | No asumir alcance ni archivo. |
| **Dura** | Trazabilidad mínima en `_bmad-output` por petición | Ciclo actual; `correlationId`; fuente cruda en `source/`. |
| **Dura** | Fase descubrimiento separada de aplicación | `discovery.md` vs `proposal/` (o equivalente). |
| **Blanda** | Manifest como YAML vs JSON | Implementación abierta. |
| **Blanda** | Nombres exactos de subcarpetas bajo `requests/` | Ajustables si chocan con tooling. |
| **Por validar** | Política de datos sensibles en `source/` (.eml) | ¿Ignorar en git, vault, solo local? |
| **Por validar** | ¿Un skill BMad único vs varios pasos? | Ver Morphological Analysis. |
| **Memoria** | **Fichero de lecciones aprendidas** | Lectura/actualización por agentes; entradas ante **rechazo** y al **cerrar un ciclo bien** (éxito). |

**Artefacto “lecciones aprendidas” (acordado):**

- Log global sugerido: `_bmad-output/agent-lessons-learned.md`; opcional `postmortem.md` por `correlationId` para casos densos.
- Entradas ante fallo/rechazo: qué salió mal, veto del dev, regla **“no volver a…”**.
- Entradas ante cierre **exitoso**: qué patrón funcionó, regla **“repetir / siempre comprobar…”**.
- **Proceso:** leer el log al **inicio del intake** (mínimo viable); ampliar después con taxonomía o flags en `manifest` si hace falta.

---

### Morphological Analysis (cerrado)

Exploración de combinaciones de parámetros del pipeline (BMad + agente + repo).

| Dim | Opciones |
|-----|----------|
| **D1 — Forma BMad** | A) Un mega-skill (intake → discovery → proposal en un flujo). B) Varios skills encadenados (intake \| discovery \| proposal). C) BMad mínimo + convenciones en Cursor / `AGENTS.md` para el grueso. |
| **D2 — Propuesta de código** | A) Diffs o archivos solo en `_bmad-output/.../proposal/` (sin rama). B) Rama `req/{correlationId}` con commits solo tras tu OK. C) Solo parches `.patch` en `proposal/` hasta merge mental. |
| **D3 — `source/` sensible** | A) `_bmad-output/requests/*/source/` en **.gitignore** (traza local). B) En repo solo **manifest + hashes**; raw en vault/share fuera de git. C) Commitear `.eml` si política corporativa lo permite. |
| **D4 — Lecciones aprendidas** | **Escribir** tras rechazo **y** tras cierre exitoso. **Leer** al inicio de cada intake. |
| **D5 — Orquestación** | A) Invocación manual de skills en el chat. B) Script/CLI que crea `requests/{id}/` y dispara pasos. C) Mix: plantilla de carpeta + skills para cada fase. |

**Decisión (Guille): combinación α**

- **D1 = B:** varios skills BMad encadenados (intake → discovery → proposal).
- **D2 = A:** propuesta materializada bajo `proposal/` sin rama obligatoria.
- **D3 = A:** `source/` bajo requests **ignorado por git** (mínimo viable local).
- **D4:** según Constraint Mapping (éxito + rechazo; lectura al intake).
- **D5 = A o C:** chat manual y/o **mix** plantilla de carpeta + skills por fase.

**Alternativas descartadas en esta sesión:** β (mega-skill), γ (rama por petición) — recuperables si el MVP α se queda corto.

---

## Idea organization y priorización

**Temas:**

1. **Gobernanza y confianza** — Humano en el lazo, pre-commit, preguntar ante duda, veto del desarrollador.
2. **Trazabilidad y memoria** — `correlationId`, árbol `requests/{id}/`, lecciones aprendidas bidireccionales (fallo y éxito).
3. **Descubrimiento vs ejecución** — Checklist de claridad del pedido; `discovery.md` separado de `proposal/`.
4. **Arquitectura MVP** — Cadena de skills, artefactos en disco, fuente multiformato analizada por caso.

**Prioridades (alto impacto / alineadas con α):**

| Prioridad | Enfoque |
|-----------|---------|
| P1 | Plantilla `_bmad-output/requests/{correlationId}/` (`source/`, `manifest`, `discovery.md`, `proposal/`) + convención de id. |
| P2 | `_bmad-output/agent-lessons-learned.md` + reglas de lectura (inicio intake) y escritura (cierre ok / rechazo). |
| P3 | Tres skills BMad (o equivalente documentado) con entradas/salidas explícitas entre fases. |
| P4 | `.gitignore` para `requests/*/source/` (o patrón acordado con compliance). |

**Quick wins:** crear `agent-lessons-learned.md` vacío con cabecera y formato de entrada; añadir patrón gitignore; una carpeta `requests/_template/` de ejemplo.

**Riesgos abiertos:** política definitiva sobre datos sensibles (D3 sigue “por validar” si compliance exige B en lugar de A).

---

## Session summary

**Logros:** Flujo de agente aplicador acotado a **modo propuesta** con **descubrimiento** explícito, **trazabilidad** por `correlationId`, **lecciones** en éxito y fallo, y **arquitectura α** para prototipo.

**Siguiente paso recomendado:** implementar P1–P4 en el repo (skills/plantillas) y validar con un .eml real en entorno local.

**Workflow:** sesión de brainstorming BMad **completada** (`stepsCompleted: [1, 2, 3, 4]`).
