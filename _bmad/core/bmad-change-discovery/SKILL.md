---
name: bmad-change-discovery
description: 'Fase discovery: lee manifest y source de una petición, rellena discovery.md con alcance web, ambigüedades y archivos candidatos del repo. Sin proponer parches ni commits. Usar tras bmad-change-request.'
---

# Change request — Discovery

## Objetivo

Responder **qué habría que cambiar** y **dónde** en el proyecto, usando solo análisis y búsqueda en el repo.

## Entrada

- `correlationId` o ruta `_bmad-output/requests/<correlationId>/`.
- `manifest.yaml` y contenido de `source/` ya presentes.

## Salida

- `discovery.md` completo: checklist, interpretación, candidatos, ambigüedades, conflictos.
- **Siguiente skill:** `bmad-change-proposal` (solo cuando el alcance sea razonablemente claro o las dudas estén listadas para el desarrollador).

## Ejecución

1. Leer `_bmad-output/agent-lessons-learned.md`.
2. Leer `manifest.yaml` y fuentes bajo `source/`. Si hay `.docx` y existe `source/extracted-from-docx.txt`, usarlo como lectura principal; si no, ejecutar `python3 _bmad/core/bmad-change-request/scripts/extract_docx_text.py` sobre el `.docx` para obtener el texto antes de analizar el repo.
3. Explorar el repo (búsqueda por rutas, nombres de página, copy) para proponer **archivos candidatos**.
4. Rellenar `discovery.md` según la plantilla (checklist brainstorming: página/sección/coherencia/net-new).
5. Si hay **ambigüedad** o **baja confianza**, formular preguntas explícitas al usuario; **no** asumir rutas finales.
6. No crear contenido en `proposal/` en esta fase.

## Restricciones

- **Prohibido** modificar archivos de aplicación o hacer commits.
- Cualquier “solución” aquí es **hipótesis** hasta la fase proposal.
