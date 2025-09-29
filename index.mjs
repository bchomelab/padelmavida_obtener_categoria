import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/categoria/:rut", async (req, res) => {
  const rut = req.params.rut;

  try {
    const url = `https://script.google.com/macros/s/AKfycbzarUmzQhgSmcgb2jyb0a0TpfLmZfn7kpG3J3BDKhuLJjTwjCokx40S03MORnVbhyO2/exec?rut=${encodeURIComponent(rut)}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: "Apps Script no respondió correctamente" });
    }

    const data = await response.json();
    res.json(data);

  } catch (e) {
    console.error("Error al llamar a Apps Script:", e);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));