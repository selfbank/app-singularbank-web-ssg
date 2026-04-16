---
name: bmad-change-request
description: 'Change request intake from email, .eml, Word, or plain text: read lessons learned, scaffold _bmad-output/requests/{correlationId}, manifest, source/; .docx extraction. First step before bmad-change-discovery and bmad-change-proposal.'
---

# Change request (intake)

## Objetivo

Preparar **trazabilidad** y carpeta de trabajo para una petición (correo, .eml, texto, export, etc.) sin analizar aún el repo de producto.

## Entrada

- Origen del cambio (fichero, pegado en chat, o ruta ya copiada bajo `source/`).
- Opcional: `correlationId` existente; si no, generar uno (`req-YYYYMMDD-<slug>`).

## Salida

- Carpeta `_bmad-output/requests/<correlationId>/` basada en `_template`.
- `manifest.yaml` con `correlation_id`, `source_type`, `created_at`, lista de ficheros en `source/`.
- **Siguiente skill:** `bmad-change-discovery`.

## Ejecución

1. Leer `_bmad-output/agent-lessons-learned.md` completo (contexto de reglas previas).
2. Si no existe la carpeta de petición, copiar `_bmad-output/requests/_template/` → `_bmad-output/requests/<correlationId>/`.
3. Crear `source/` y guardar ahí el artefacto crudo (no versionado por git).
4. Completar `manifest.yaml` (mínimo obligatorio arriba).
5. **Si hay `.docx` en `source/`:** extraer contenido para trazabilidad y discovery (ver siguiente sección).
6. Dejar `discovery.md` y `proposal/` sin rellenar de análisis profundo (solo plantilla si aplica), salvo volcar el extracto de Word en `source/extracted-from-docx.txt` si ayuda al siguiente paso.
7. Resumir al usuario: ruta de la petición, `correlationId`, y recordar invocar **`bmad-change-discovery`**.

## Fuentes Word (`.docx`)

Un `.docx` es un ZIP con XML; el texto útil está en `word/document.xml`. Para no depender de herramientas externas, usar el script de este skill:

**Ruta del script:** `_bmad/core/bmad-change-request/scripts/extract_docx_text.py` (relativo a la raíz del repo).

**Extraer texto plano** (stdout o fichero):

```bash
python3 _bmad/core/bmad-change-request/scripts/extract_docx_text.py "ruta/al/archivo.docx"
python3 _bmad/core/bmad-change-request/scripts/extract_docx_text.py "ruta/al/archivo.docx" -o _bmad-output/requests/<correlationId>/source/extracted-from-docx.txt
```

**Listar medios incrustados** (imágenes dentro del Word; las sueltas del mail van aparte):

```bash
python3 _bmad/core/bmad-change-request/scripts/extract_docx_text.py "ruta/al/archivo.docx" --media
```

**Qué hacer con el resultado**

- Rellenar `detected_request_items` en `manifest.yaml` a partir de títulos / fechas / enlaces del extracto.
- Si el Word solo referencia nombres de imagen (p. ej. `iran`, `javier-sanchez`), enlazarlos con los adjuntos reales en `source/` cuando existan.
- **Limitación:** el script no sustituye imágenes incrustadas en el propio Word; si hace falta ese PNG, extraerlo manualmente del `.docx` (descomprimir ZIP → `word/media/`) o usar los adjuntos del correo.

## Restricciones

- No editar `src/` ni aplicar parches en esta fase.
- Si algo impide clasificar la fuente, **preguntar** al usuario antes de inventar metadatos.
