# Plantilla de petición de cambio

1. **Leer** `_bmad-output/agent-lessons-learned.md`.
2. **Generar `correlationId`:** `req-YYYYMMDD-<slug-corto>` (ej. `req-20260407-seguridad-copy`) o UUID si preferís.
3. **Copiar** esta carpeta `_template` a `../<correlationId>/` (mismo nivel que `_template`).
4. Colocar la fuente cruda (`.eml`, export, captura, texto, PDF…) en `source/` (carpeta **no versionada** por git).
5. Rellenar `manifest.yaml` (mínimo: `correlation_id`, `source_type`, `created_at`).
6. Invocar skills en orden: **`bmad-change-request`** → **`bmad-change-discovery`** → **`bmad-change-proposal`**.

## Contenido esperado por carpeta

| Ruta | Uso |
|------|-----|
| `source/` | Artefacto original tal cual (ignorado por git). |
| `manifest.yaml` | Metadatos, tipo de fuente, punteros; trazabilidad. |
| `discovery.md` | Solo análisis: qué tocar, ambigüedades, candidatos en repo (**sin** aplicar cambios). |
| `proposal/` | Borradores: diffs, `.patch` o notas de edición (**sin commit** hasta revisión humana). |
