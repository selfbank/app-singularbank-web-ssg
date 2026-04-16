# Discovery — `correlation_id: req-20260313-cambios-web-seguridad`

Fuente: `source/Cambios-web-Seguridad-por-que-Singular.eml` (multipart/related, texto plano + HTML + PNG).  
URLs citadas: `/seguridad/`, `/porque-singular-bank/`.

## Checklist de claridad

- [x] **Dónde:** `src/pages/seguridad/index.twig` y `src/pages/porque-singular-bank/index.twig` (sección `#seguridad`).
- [x] **Contenido:** El mail describe sustituciones concretas de copy y viñetas; las capturas marcan zonas en rojo (validar visualmente en los PNG del .eml).
- [x] **Tipo:** Edición de contenido existente; sin nueva ruta.

## Interpretación del correo (texto plano)

### Página Seguridad

1. **Quitar** el bloque señalado (equivalente en web actual):
   - `<h3>Alertas Self Protect ©</h3>`
   - Párrafo de servicio GRATUITO / garantía ante fraude.
   - Párrafo “Además le avisamos por SMS…” (compras elevadas / otros países).
2. **Sustituir por** un bloque centrado en **Protección Singular**, con texto del tipo: aviso por SMS de compras con tarjeta por importes elevados o en otros países (el mail mezcla “tú/su”; conviene **unificar tono** con el resto de la página: mayoritariamente tratamiento de usted).
3. **Mantener** sección **Programa de Seguridad Online** con redacción alineada al mail: IBM ® Trusteer Rapport ™, líder EEUU, operaciones online en **nuestra** web, sin coste para cliente.
4. **Registro de tu navegador** → **Registro de su navegador** (título `<h3>`; el párrafo ya usa “Si tiene…”).

### Página Por qué Singular Bank

En la lista bajo “La seguridad por encima de todo”:

1. **Quitar** la viñeta de **Programa de Seguridad Online** (IBM Trusteer…).
2. **Quitar** la viñeta de **Servicio Singular Protect** (tarjetas débito/crédito).
3. **Añadir** viñeta **Protección Singular**: aviso por SMS de compras con tarjeta (importes elevados / otros países).
4. **Mantener** las viñetas de Documentación digital y Claves de acceso (el mail no pide retirarlas).

## Candidatos en el repo

| Archivo | Cambio |
|---------|--------|
| `src/pages/seguridad/index.twig` | Líneas ~32–39: bloque Self Protect / Singular Protect; IBM; h3 Registro. |
| `src/pages/porque-singular-bank/index.twig` | Líneas ~37–41: `<ul>` de seguridad. |

## Ambigüedades / validación

- **Tono tú/usted:** el mail usa “tengas” y “su dinero” en la misma frase; proponer redacción revisada por Marketing.
- **Imágenes incrustadas:** revisar `image003.png` / `image004.png` en el .eml si hace falta pixel-perfect con lo señalado en rojo.
- **Marca “Self Protect” / ©:** desaparece del bloque sustituido según criterio del mail.

## Conflictos

- Ninguno detectado con otras peticiones abiertas.
