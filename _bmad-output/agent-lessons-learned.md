# Lecciones aprendidas — agente de cambios

Registro evolutivo para que los agentes **no repitan errores** y **repliquen aciertos**.  
Convención de sesión (brainstorming 2026-04-07, combo α):

- **Leer este fichero al inicio** de cada intake / petición nueva.
- **Añadir entrada al cerrar** el ciclo: tanto si el desarrollador **rechaza** la propuesta como si el cierre es **exitoso**.

## Formato de cada entrada

Copia el bloque siguiente y rellénalo.

```markdown
### YYYY-MM-DD — <correlationId> — <éxito|rechazo>

- **Contexto breve:** …
- **Qué hizo el agente:** …
- **Resultado:** …
- **Regla:** «no volver a…» / «siempre comprobar…» / «repetir cuando…»
```

## Entradas

### 2026-04-07 — req-20260313-cambios-web-seguridad — éxito (aplicado en src)

- **Contexto breve:** Petición desde `.eml` real (Marketing: Seguridad + Por qué Singular).
- **Qué hizo el agente:** Intake + discovery + proposal; luego aplicación en `seguridad/index.twig` y `porque-singular-bank/index.twig`.
- **Resultado:** Copy alineado al correo; commit a cargo del desarrollador.
- **Regla:** «Tras texto plano del mail, **unificar tú/usted** con el resto de la página antes de publicar.»

### 2026-04-07 — req-20260407-demo — éxito (dry-run)

- **Contexto breve:** Prueba Phising/Phishing sintética.
- **Qué hizo el agente:** Demo bajo `req-20260407-demo`; segunda ocurrencia en `<h2>`.
- **Resultado:** Dry-run de flujo.
- **Regla:** «Buscar **todas** las apariciones de la cadena en el mismo archivo antes de proponer solo el fragmento del mail.»

_(Añadir nuevas entradas arriba del bloque demo cuando cierres ciclos.)_
