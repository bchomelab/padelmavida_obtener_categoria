// === Funciones para Consulta Socio ===

async function buscar() {
  const input = document.getElementById("rut").value.trim();
  const resultado = document.getElementById("resultado");
  const loader = document.getElementById("loader");

  resultado.innerHTML = "";
  
  if (!input) {
    resultado.textContent = "Ingresa un RUT";
    resultado.className = "error";
    return;
  }

  // === Funciones auxiliares ===
  function normalizeRut(rut) {
    return rut.replace(/\./g, '').toUpperCase().trim();
  }

  function formatRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    return body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
  }

  function isValidRut(rut) {
    const clean = normalizeRut(rut);
    return /^\d{7,8}[0-9K]$/i.test(clean.replace('-', ''));
  }

  if (!isValidRut(input)) {
    resultado.textContent = "RUT inválido";
    resultado.className = "error";
    return;
  }

  const cleanRut = normalizeRut(input);
  const formattedRut = formatRut(cleanRut);

  loader.style.display = "block";

  try {
    // === Llamadas paralelas a ambos endpoints ===
    const [resCat, resDatos] = await Promise.all([
      fetch(`/categoria/${encodeURIComponent(formattedRut)}`),
      fetch(`/datos/${encodeURIComponent(formattedRut)}`)
    ]);

    const [categoriaData, datosData] = await Promise.all([
      resCat.json(),
      resDatos.json()
    ]);

    loader.style.display = "none";

    // === Si hay errores o no existen datos, usar valores por defecto ===
    const categoria = categoriaData?.categoria || "No Encontrada";
    const nombre = datosData?.Nombre || "No Encontrado";
    const rut = datosData?.Rut || formattedRut;
    const deudaCuotas = datosData?.["Deuda Cuotas"] ?? "No encontrado";
    const deudaMultas = datosData?.["Deuda Multas"] ?? "No encontrado";
    const periodoMultas = datosData?.["Periodo Multas"] || "No Encontrado";
    const deudaTotal = datosData?.["Deuda Total"] ?? "No encontrado";
    var moroso = "";

    if (deudaCuotas !== "No encontrado" && deudaMultas !== "No encontrado") {
      if (deudaMultas > 0 || deudaCuotas >= 3000) {
        moroso = "<br><div class=\"club-info\"><h3>Atención!!</h3><p>Su estado como socio se encuentra moroso.</p><p>Si no regulariza puede ser excluido de algunas actividades del club.</p></div>";
      }
    }

    // === Construir tablas de resultado ===
    resultado.innerHTML = `
      <h3>Información del Socio</h3>
      <table class="result-table">
        <tr><td><strong>Nombre:</strong></td><td>${nombre}</td></tr>
        <tr><td><strong>RUT:</strong></td><td>${rut}</td></tr>
        <tr><td><strong>Categoría:</strong></td><td>${categoria}</td></tr>
        <tr><td><strong>Deuda Cuotas:</strong></td><td>$${deudaCuotas.toLocaleString()}</td></tr>
        <tr><td><strong>Deuda Multas:</strong></td><td>$${deudaMultas.toLocaleString()}</td></tr>
        <tr><td><strong>Periodo Multas:</strong></td><td>${periodoMultas}</td></tr>
        <tr style="background: #38B6FF; font-weight: 900; font-size: larger;"><td><strong>Deuda Total:</strong></td><td><strong>$${deudaTotal.toLocaleString()}</strong></td></tr>
      </table>
      ${moroso}
    `;
    resultado.className = "success";

  } catch (error) {
    loader.style.display = "none";
    resultado.textContent = "Error al consultar los datos.";
    resultado.className = "error";
    console.error("❌ Error:", error);
  }
}

