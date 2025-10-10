import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

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
 * 🚀 Inicio del servidor
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
