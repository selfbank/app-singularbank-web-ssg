---
name: bmad-change-proposal
description: 'Genera propuesta de cambios bajo proposal/ (diffs, patches o notas) a partir de discovery.md; modo pre-commit sin git commit hasta aprobación humana. Tras cierre, actualizar agent-lessons-learned. Usar tras bmad-change-discovery.'
---

# Change request — Proposal

## Objetivo

Materializar **borradores** de cambio para revisión del desarrollador, alineados con `discovery.md`.

## Entrada

- `_bmad-output/requests/<correlationId>/` con `discovery.md` razonablemente completo.
- Opcional: decisiones del usuario sobre dudas abiertas.

## Salida

- Ficheros bajo `proposal/` (p. ej. `.patch`, `edits.md` por archivo).
- Resumen corto para el desarrollador: qué tocar, riesgos, cómo validar.
- Tras **aprobación** o **rechazo** del ciclo, nueva entrada en `_bmad-output/agent-lessons-learned.md` (éxito o rechazo).

## Ejecución

1. Leer `_bmad-output/agent-lessons-learned.md`, `manifest.yaml`, `discovery.md`.
2. Si persisten dudas críticas, **preguntar** antes de escribir parches grandes.
3. Generar propuestas solo bajo `proposal/` (no aplicar directamente en `src/` salvo que el usuario pida explícitamente aplicar; el flujo por defecto es **propuesta**).
4. Entregar al usuario el resumen y esperar revisión **antes de commit**.
5. Al **cerrar** el ciclo (aceptado o rechazado), **añadir** entrada al log de lecciones con regla reutilizable.

## Restricciones

- **No commit** sin revisión explícita del desarrollador (criterio de sesión).
- Mantener referencia al `correlationId` en los artefactos de `proposal/`.
