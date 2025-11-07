import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

/**
 * 🏆 Configuración de Ligas
 * Cada liga tiene su propio Google Apps Script para tablero y rondas
 * Para agregar una nueva liga, simplemente añade un nuevo objeto aquí
 */
const LIGAS_CONFIG = {
  sexta: {
    nombre: "Liga Sexta",
    tablero: "https://script.google.com/macros/s/AKfycbznOVFz5Mlwjbv71Z5DEoqh0_0xjcmFh-_UQTbC5bKocq7q0MRrl3uwzFxQs1hE34_O/exec",
    rondas: "https://script.google.com/macros/s/AKfycbx9laIjtP7GgLbmxfA-ZrfvO7WwLtr9Grtxx0NIc4_GdXmdt7kF84gbvqpjcei6_s4F/exec"
  },
  quinta: {
    nombre: "Liga Quinta",
    // TODO: Reemplazar con las URLs reales de Google Apps Script para Liga Quinta
    tablero: "https://script.google.com/macros/s/AKfycbyv9d7fqnyc8w5q5q9jS2RZNL3Ji5lTrh2xuuvku0I8NSTEZj8KGBGlqBsDJAXDROfK/exec",
    rondas: "https://script.google.com/macros/s/AKfycbyukrnsJ8Rlp1IViqGL2cypogc-XC-SQMpJJB6pGjJ2kCwwRfiyty5cFznG6O4RdbnM/exec"
  },
  mixto: {
    nombre: "Liga Mixto",
    // TODO: Reemplazar con las URLs reales de Google Apps Script para Liga Mixto
    tablero: "https://script.google.com/macros/s/AKfycbxfmDJ-Km4dxfQsqx9f3u1mQ6DgZDZ3CyiZMRXYSERTAiT2-Drg4vugvFQxJUAQFe4BdA/exec",
    rondas: "https://script.google.com/macros/s/AKfycbyiE7PyZo0KIQfbP2SFMTTHPjKTfz5vVt8ZDwHbUlcM5sTff6ueDQSNwJQ8HG4u_X1fbg/exec"
  }
};

/**
 * 🔍 Función auxiliar para validar y obtener configuración de liga
 */
function obtenerConfigLiga(liga) {
  const ligaNormalizada = liga?.toLowerCase();
  
  if (!ligaNormalizada || !LIGAS_CONFIG[ligaNormalizada]) {
    return null;
  }
  
  return LIGAS_CONFIG[ligaNormalizada];
}

/**
 * 📋 Endpoint para obtener la configuración de ligas disponibles
 * Devuelve solo los nombres y claves, sin las URLs por seguridad
 */
app.get("/ligas", (req, res) => {
  const ligasInfo = {};
  
  for (const [clave, config] of Object.entries(LIGAS_CONFIG)) {
    ligasInfo[clave] = {
      nombre: config.nombre,
      clave: clave
    };
  }
  
  res.json({
    success: true,
    ligas: ligasInfo,
    ligasDisponibles: Object.keys(LIGAS_CONFIG)
  });
});

/**
 * 🔹 Función auxiliar para manejar errores y valores por defecto
 */
function datosPorDefecto(tipo) {
  if (tipo === "categoria") {
    return {
      categoria: "No asignada",
      error: "Categoría no encontrada para el RUT ingresado."
    };
  } else if (tipo === "datos") {
    return {
      Nombre: "No disponible",
      Rut: "No disponible",
      "Deuda Cuotas": 0,
      "Deuda Multas": 0,
      "Periodo Multas": "Sin multas",
      "Deuda Total": 0,
      error: "Datos del usuario no encontrados."
    };
  }
  return {};
}

/**
 * 🟢 Ruta para obtener la categoría
 */
app.get("/categoria/:rut", async (req, res) => {
  const rut = req.params.rut;

  try {
    const url = `https://script.google.com/macros/s/AKfycbzarUmzQhgSmcgb2jyb0a0TpfLmZfn7kpG3J3BDKhuLJjTwjCokx40S03MORnVbhyO2/exec?rut=${encodeURIComponent(rut)}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("❌ Apps Script categoría no respondió:", response.status);
      return res.json(datosPorDefecto("categoria"));
    }

    const data = await response.json();

    if (data.error || !data.categoria) {
      return res.json(datosPorDefecto("categoria"));
    }

    res.json(data);
  } catch (error) {
    console.error("⚠️ Error al obtener categoría:", error.message);
    res.json(datosPorDefecto("categoria"));
  }
});

/**
 * 🟣 Ruta para obtener los datos del usuario
 */
app.get("/datos/:rut", async (req, res) => {
  const rut = req.params.rut;

  try {
    // 👉 Nueva URL actualizada que me diste:
    const url = `https://script.google.com/macros/s/AKfycbzIfU3xYB8nu8VM4JUnZHKQVR5fago4hEjRQPjZAH3ACQzilybefVUMV7QzP47Q6Yo/exec?rut=${encodeURIComponent(rut)}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("❌ Apps Script datos no respondió:", response.status);
      return res.json(datosPorDefecto("datos"));
    }

    const data = await response.json();

    if (data.error || !data.Nombre) {
      return res.json(datosPorDefecto("datos"));
    }

    // Si el campo "Periodo Multas" viene vacío o nulo → asignamos "Sin multas"
    if (!data["Periodo Multas"]) {
      data["Periodo Multas"] = "Sin multas";
    }

    res.json(data);
  } catch (error) {
    console.error("⚠️ Error al obtener datos del usuario:", error.message);
    res.json(datosPorDefecto("datos"));
  }
});

/**
 * 💚 Health check endpoint para evitar sleep en Render
 */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * 🔄 Endpoint de ping para keep-alive
 */
app.get("/ping", (req, res) => {
  res.json({ status: "pong", timestamp: new Date().toISOString() });
});

/**
 * 🏆 Función auxiliar para obtener el tablero de posiciones
 */
async function obtenerTablero(liga, res) {
  const config = obtenerConfigLiga(liga);

  if (!config) {
    return res.status(400).json({
      success: false,
      error: `Liga "${liga}" no encontrada. Ligas disponibles: ${Object.keys(LIGAS_CONFIG).join(", ")}`,
      data: []
    });
  }

  try {
    const url = config.tablero;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`❌ Apps Script tablero (${liga}) no respondió:`, response.status);
      return res.json({
        success: false,
        error: `Error al obtener el tablero de posiciones de ${config.nombre}`,
        data: []
      });
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      return res.json({
        success: false,
        error: `Datos del tablero de ${config.nombre} no encontrados`,
        data: []
      });
    }

    // Ordena los equipos por posición (POS) si existe
    if (data.data && data.data.length > 0) {
      data.data.sort((a, b) => {
        const posA = parseInt(a.POS) || 999;
        const posB = parseInt(b.POS) || 999;
        return posA - posB;
      });
    }

    res.json(data);
  } catch (error) {
    console.error(`⚠️ Error al obtener tablero de ${config.nombre}:`, error.message);
    res.json({
      success: false,
      error: error.message,
      data: []
    });
  }
}

/**
 * 🏆 Ruta para obtener el tablero de posiciones (con parámetro de liga)
 * Ejemplo: /tablero/sexta, /tablero/quinta, /tablero/mixto
 */
app.get("/tablero/:liga", async (req, res) => {
  const liga = req.params.liga;
  return obtenerTablero(liga, res);
});

/**
 * 🏆 Ruta para obtener el tablero de posiciones (compatibilidad hacia atrás - usa sexta por defecto)
 */
app.get("/tablero", async (req, res) => {
  return obtenerTablero("sexta", res);
});

/**
 * 📅 Función auxiliar para obtener todas las rondas y enfrentamientos
 */
async function obtenerRondas(liga, res) {
  const config = obtenerConfigLiga(liga);

  if (!config) {
    return res.status(400).json({
      success: false,
      error: `Liga "${liga}" no encontrada. Ligas disponibles: ${Object.keys(LIGAS_CONFIG).join(", ")}`,
      data: []
    });
  }

  try {
    const url = config.rondas;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`❌ Apps Script rondas (${liga}) no respondió:`, response.status);
      return res.json({
        success: false,
        error: `Error al obtener las rondas de ${config.nombre}`,
        data: []
      });
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      return res.json({
        success: false,
        error: `Datos de rondas de ${config.nombre} no encontrados`,
        data: []
      });
    }

    // Las rondas ya vienen ordenadas por número desde el script
    res.json(data);
  } catch (error) {
    console.error(`⚠️ Error al obtener rondas de ${config.nombre}:`, error.message);
    res.json({
      success: false,
      error: error.message,
      data: []
    });
  }
}

/**
 * 📅 Ruta para obtener todas las rondas y enfrentamientos (con parámetro de liga)
 * Ejemplo: /rondas/sexta, /rondas/quinta, /rondas/mixto
 */
app.get("/rondas/:liga", async (req, res) => {
  const liga = req.params.liga;
  return obtenerRondas(liga, res);
});

/**
 * 📅 Ruta para obtener todas las rondas y enfrentamientos (compatibilidad hacia atrás - usa sexta por defecto)
 */
app.get("/rondas", async (req, res) => {
  return obtenerRondas("sexta", res);
});

/**
 * 🚀 Inicio del servidor
 */
const PORT = process.env.PORT || 3000;

/**
 * 🔄 Verifica si está en el horario activo (7 AM - 2 AM hora Chile)
 * @returns {boolean} true si está en horario activo, false si está en horario de descanso
 */
function estaEnHorarioActivo() {
  try {
    // Obtener hora actual en zona horaria de Chile (America/Santiago)
    const ahora = new Date();
    const formatter = new Intl.DateTimeFormat('es-CL', {
      timeZone: 'America/Santiago',
      hour: '2-digit',
      hour12: false
    });
    
    const partes = formatter.formatToParts(ahora);
    const hora = parseInt(partes.find(part => part.type === 'hour').value);
    
    // Horario activo: 7 AM (7) hasta 2 AM del día siguiente (2)
    // Esto significa que de 2 AM a 7 AM está inactivo (5 horas de descanso)
    if (hora >= 2 && hora < 7) {
      // Horario de descanso: 2 AM - 7 AM
      return false;
    }
    // Horario activo: 7 AM - 2 AM
    return true;
  } catch (error) {
    // Si hay error al obtener la hora, asumimos que está activo
    console.error("⚠️ Error al verificar horario:", error.message);
    return true;
  }
}

/**
 * 🔄 Sistema de keep-alive interno (evita sleep en Render)
 * Se auto-llama cada 10 minutos para mantener el servicio activo
 * Solo funciona de 7 AM a 2 AM (hora Chile)
 */
function keepAlive() {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  const interval = 10 * 60 * 1000; // 10 minutos

  const ejecutarPing = async () => {
    if (!estaEnHorarioActivo()) {
      const ahora = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
      console.log(`😴 Keep-alive en pausa (horario de descanso 2 AM - 7 AM Chile) - ${ahora}`);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/ping`);
      if (response.ok) {
        const ahora = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
        console.log(`✅ Keep-alive: Servidor activo - ${ahora}`);
      }
    } catch (error) {
      console.error("⚠️ Error en keep-alive:", error.message);
    }
  };

  setInterval(ejecutarPing, interval);

  // Primera llamada después de 5 segundos
  setTimeout(async () => {
    try {
      if (estaEnHorarioActivo()) {
        await fetch(`${baseUrl}/ping`);
        console.log("✅ Keep-alive inicializado (horario activo)");
      } else {
        console.log("😴 Keep-alive inicializado (horario de descanso - esperando hasta las 7 AM)");
      }
    } catch (error) {
      console.log("⚠️ Keep-alive no disponible en desarrollo local");
    }
  }, 5000);
}

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  // Iniciar keep-alive solo en producción (cuando hay RENDER_EXTERNAL_URL)
  if (process.env.RENDER_EXTERNAL_URL) {
    keepAlive();
  }
});
