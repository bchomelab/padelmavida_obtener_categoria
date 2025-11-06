# Padelmavida - Consulta de Categoría y Datos de Socio

Aplicación web para consultar la categoría y datos financieros de los socios del Club Polideportivo Pádelmávida mediante su RUT.

## 📋 Descripción

Este proyecto es un sistema de consulta que permite a los socios del club verificar su información personal, categoría y estado de deudas. La aplicación consta de un servidor backend (Express.js) y una interfaz web frontend.

## 🚀 Características

- **Consulta de Categoría**: Obtiene la categoría asignada a un socio por su RUT
- **Consulta de Datos**: Muestra información completa del socio incluyendo:
  - Nombre y RUT
  - Deuda en cuotas
  - Deuda en multas
  - Periodo de multas
  - Deuda total
- **Validación de RUT**: Normaliza y valida el formato del RUT ingresado
- **Información del Club**: Muestra los datos bancarios del club para facilitar pagos
- **Alertas de Morosidad**: Notifica automáticamente si el socio tiene deudas pendientes
- **Tablero de Posiciones**: Consulta el tablero de posiciones de la liga de pádel

## 🛠️ Tecnologías

- **Backend**: Node.js con Express.js
- **Frontend**: HTML, CSS, JavaScript vanilla
- **Dependencias**:
  - `express`: Framework web para Node.js
  - `node-fetch`: Para realizar peticiones HTTP a Google Apps Script
  - `cors`: Para habilitar CORS en el servidor

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/bchomelab/padelmavida_obtener_categoria.git
cd padelmavida_obtener_categoria
```

2. Instala las dependencias:
```bash
npm install
```

## ▶️ Uso

1. Inicia el servidor:
```bash
npm start
```

2. Abre tu navegador y visita:
```
http://localhost:3000
```

3. Ingresa el RUT del socio (con o sin puntos y guión) y haz clic en "Buscar"

## 📁 Estructura del Proyecto

```
padelmavida_obtener_categoria/
├── index.mjs              # Servidor Express con las rutas API
├── package.json           # Configuración del proyecto y dependencias
├── public/                # Archivos estáticos servidos al cliente
│   ├── index.html         # Interfaz principal de la aplicación
│   ├── script.js          # Lógica del frontend (validación, búsqueda)
│   └── logo.png          # Logo del club
└── README.md             # Este archivo
```

## 🔌 API Endpoints

### `GET /categoria/:rut`
Obtiene la categoría asignada a un socio.

**Parámetros:**
- `rut`: RUT del socio (formato: 11.111.111-1 o 11111111-1)

**Respuesta:**
```json
{
  "categoria": "Categoría A"
}
```

### `GET /datos/:rut`
Obtiene los datos completos del socio.

**Parámetros:**
- `rut`: RUT del socio (formato: 11.111.111-1 o 11111111-1)

**Respuesta:**
```json
{
  "Nombre": "Juan Pérez",
  "Rut": "11.111.111-1",
  "Deuda Cuotas": 15000,
  "Deuda Multas": 5000,
  "Periodo Multas": "Enero 2024",
  "Deuda Total": 20000
}
```

### `GET /tablero`
Obtiene el tablero de posiciones de la liga de pádel.

**Parámetros:** Ninguno

**Respuesta:**
```json
{
  "success": true,
  "sheetName": "Tablero de Posiciones",
  "totalRows": 8,
  "headers": ["Equipo", "PJ", "PG", "PE", "PP", "Pts.F", "Pts.C", "Dif.Pts", "Equipo_2", "POS", "Set.F", "Set.C", "Dif.Set", "JF", "JC", "Dif.J"],
  "data": [
    {
      "Equipo": "Blanca P - Benjamin",
      "PJ": 1,
      "PG": 1,
      "POS": 1,
      "Pts.F": 4,
      "Dif.Pts": 4,
      "Set.F": 2,
      "Dif.Set": 2,
      "JF": 13,
      "JC": 6,
      "Dif.J": 7,
      "Equipo_2": "Equipo 7"
    }
  ]
}
```

## 🔗 Integración con Google Apps Script

La aplicación se conecta con tres Google Apps Scripts para obtener los datos:

1. **Script de Categoría**: Consulta la categoría del socio
2. **Script de Datos**: Consulta toda la información financiera del socio
3. **Script de Tablero**: Consulta el tablero de posiciones de la liga

Todos los scripts están configurados como Web Apps públicas de Google Sheets.

## ⚙️ Configuración

El servidor se ejecuta en el puerto 3000 por defecto. Puedes cambiar esto estableciendo la variable de entorno `PORT`:

```bash
PORT=8080 npm start
```

## 📝 Notas

- La aplicación normaliza automáticamente el formato del RUT (acepta con o sin puntos y guión)
- Si un RUT no se encuentra, se devuelven valores por defecto indicando que no hay datos disponibles
- La aplicación muestra alertas cuando un socio tiene deudas pendientes (multas > 0 o cuotas >= $3,000)

## 📄 Licencia

MIT

## 👤 Autor

Club Polideportivo Pádelmávida

## 🔗 Repositorio

[GitHub Repository](https://github.com/bchomelab/padelmavida_obtener_categoria)


