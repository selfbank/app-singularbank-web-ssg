# Propuesta — req-20260313-cambios-web-seguridad

**Origen:** `source/Cambios-web-Seguridad-por-que-Singular.eml`.  
**Estado:** cambios **aplicados** en `src/` el 2026-04-07 (revisión previa del desarrollador).

---

## 1. `src/pages/seguridad/index.twig`

### 1.1 Sustituir bloque “Alertas Self Protect ©” + párrafos por “Protección Singular”

**Quitar (aprox. líneas 32–34):**

```twig
        <h3>Alertas Self Protect ©</h3>
        <p>Singular Protect es un servicio GRATUITO adicional a sus tarjetas con el que tendrá la mayor garantía de seguridad ante cualquier operación fraudulenta.</p>
        <p>Además le avisamos por SMS de las compras realizadas por importes elevados o en otros países para que tengas siempre el control de tu dinero.</p>
```

**Poner (redacción alineada al mail, tono usted):**

```twig
        <h3>Protección Singular</h3>
        <p>Le avisamos por SMS de las compras realizadas con tarjeta por importes elevados o en otros países para que tenga siempre el control de su dinero.</p>
```

### 1.2 Programa de Seguridad Online

**Sustituir** el párrafo actual por texto más cercano al mail (mantener énfasis en IBM):

```twig
        <h3>Programa de Seguridad Online</h3>
        <p><strong>IBM ® Trusteer Rapport ™:</strong> software de seguridad, líder en EEUU, para que sus operaciones online en nuestra web sean aún más seguras. Por ser cliente de Singular Bank, lo tendrá sin coste.</p>
```

### 1.3 Registro del navegador

```twig
        <h3>Registro de su navegador</h3>
```

(el párrafo siguiente puede permanecer igual)

---

## 2. `src/pages/porque-singular-bank/index.twig`

**Sustituir** el `<ul>` interno de la sección `#seguridad` (líneas ~37–42).

**Antes:**

```twig
        <ul>
          <li><strong>Programa de Seguridad Online</strong>. Ofrecemos gratuitamente a nuestros clientes el IBM ® Trusteer Rapport ™, software de seguridad líder en EEUU, para que las operaciones online en web sean aún más seguras.</li>
          <li><strong>Servicio Singular Protect</strong>, para lograr una mayor protección en las operaciones efectuadas con las tarjetas de débito y crédito.</li>
          <li><strong>Documentación digital</strong>, evitando los riesgos del correo.</li>
          <li><strong>Claves de acceso y operativas</strong>: con distintos niveles de seguridad que se adaptan en función de la operación a realizar.</li>
        </ul>
```

**Después:**

```twig
        <ul>
          <li><strong>Protección Singular:</strong> aviso por SMS de las compras realizadas con tarjeta por importes elevados o en otros países.</li>
          <li><strong>Documentación digital</strong>, evitando los riesgos del correo.</li>
          <li><strong>Claves de acceso y operativas</strong>: con distintos niveles de seguridad que se adaptan en función de la operación a realizar.</li>
        </ul>
```

---

## Validación sugerida

- Build/preview de `/seguridad/` y `/porque-singular-bank/` (ancla `#seguridad`).
- Relectura de Marketing por mezcla tú/usted y por © / marcas IBM.
