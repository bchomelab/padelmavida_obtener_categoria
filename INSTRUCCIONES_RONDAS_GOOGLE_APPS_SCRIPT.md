# Instrucciones para Desplegar el Google Apps Script de Rondas

Este script obtiene todas las rondas y sus enfrentamientos desde Google Sheets en formato JSON.

## Estructura Requerida en Google Sheets

### Hoja "fechas"
Debe contener las siguientes columnas:
- **Ronda**: Nombre o número de la ronda (ej: "Ronda 1", "1", etc.)
- **Fecha Inicio**: Fecha de inicio de la ronda
- **Fecha Fin**: Fecha de fin de la ronda (incluida)

Ejemplo:
| Ronda | Fecha Inicio | Fecha Fin |
|-------|--------------|-----------|
| Ronda 1 | 2024-01-15 | 2024-01-22 |
| Ronda 2 | 2024-01-23 | 2024-01-30 |

### Hojas de Rondas
Debe existir una hoja para cada ronda con el nombre:
- `Ronda 1`
- `Ronda 2`
- `Ronda 3`
- `Ronda 4`
- `Ronda 5`
- `Ronda 6`
- `Ronda 7`

Cada hoja debe tener:
- **Columna A**: Equipo 1
- **Columna B**: Equipo 2

Ejemplo de estructura en "Ronda 1":
| Equipo 1 | Equipo 2 |
|----------|----------|
| Equipo A | Equipo B |
| Equipo C | Equipo D |

## Pasos para Desplegar

1. **Abrir Google Apps Script**
   - Ve a tu Google Sheet
   - Haz clic en `Extensiones` → `Apps Script`

2. **Crear un nuevo proyecto**
   - Si ya tienes un proyecto, puedes agregar este código al mismo
   - O crea un nuevo proyecto

3. **Copiar el código**
   - Copia todo el contenido de `google-apps-script-rondas.js`
   - Pégalo en el editor de Apps Script

4. **Guardar el proyecto**
   - Haz clic en el ícono de guardar (💾)
   - Dale un nombre al proyecto (ej: "Rondas API")

5. **Desplegar como aplicación web**
   - Haz clic en `Desplegar` → `Nueva implementación`
   - Tipo: `Aplicación web`
   - Descripción: "API de Rondas"
   - Ejecutar como: `Yo`
   - Quién tiene acceso: `Cualquiera`
   - Haz clic en `Desplegar`

6. **Copiar la URL de la aplicación web**
   - Se generará una URL similar a:
     ```
     https://script.google.com/macros/s/AKfycby.../exec
     ```
   - Copia esta URL

7. **Probar la API**
   - Abre la URL en tu navegador
   - Deberías ver un JSON con todas las rondas y enfrentamientos

## Formato de Respuesta JSON

```json
{
  "success": true,
  "data": [
    {
      "ronda": "Ronda 1",
      "numero": 1,
      "fechaInicio": "2024-01-15",
      "fechaFin": "2024-01-22",
      "enfrentamientos": [
        {
          "equipo1": "Equipo A",
          "equipo2": "Equipo B"
        },
        {
          "equipo1": "Equipo C",
          "equipo2": "Equipo D"
        }
      ]
    },
    {
      "ronda": "Ronda 2",
      "numero": 2,
      "fechaInicio": "2024-01-23",
      "fechaFin": "2024-01-30",
      "enfrentamientos": [...]
    }
  ],
  "totalRondas": 7
}
```

## Manejo de Errores

Si hay un error, la respuesta será:
```json
{
  "success": false,
  "error": "Descripción del error",
  "message": "Mensaje detallado"
}
```

## Notas Importantes

- El script busca automáticamente las columnas en la hoja "fechas" por nombre (no distingue mayúsculas/minúsculas)
- Si una hoja de ronda no existe, se omite y continúa con la siguiente
- Las fechas se formatean automáticamente a formato `yyyy-MM-dd`
- Los enfrentamientos vacíos (sin equipo1 o equipo2) se omiten

## Integración con Express.js

Para usar esta API en tu servidor Express, agrega una ruta similar a:

```javascript
app.get('/rondas', async (req, res) => {
  try {
    const response = await fetch('TU_URL_DEL_SCRIPT_AQUI');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

