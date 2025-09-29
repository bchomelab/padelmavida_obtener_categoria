async function buscar() {
  const input = document.getElementById("rut").value.trim();
  const resultado = document.getElementById("resultado");
  const loader = document.getElementById("loader");

  resultado.textContent = "";
  
  if (!input) {
    resultado.textContent = "Ingresa un RUT";
    resultado.className = "error";
    return;
  }

  // Funciones de normalización y formateo
  function normalizeRut(rut) {
    return rut.replace(/\./g, '').toUpperCase().trim();
  }

  function formatRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1);
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

  // Mostrar loader
  loader.style.display = "block";

  try {
    const res = await fetch(`/categoria/${encodeURIComponent(formattedRut)}`);
    const data = await res.json();

    // Ocultar loader
    loader.style.display = "none";

    if (data.error) {
      resultado.textContent = data.error;
      resultado.className = "error";
    } else {
      resultado.innerHTML = 'Padelmávida te ha asignado a la categoría: <h4>' + data.categoria + '</h4>';
      resultado.className = "success";
    }
  } catch (e) {
    loader.style.display = "none";
    resultado.textContent = "Error consultando la base de datos";
    resultado.className = "error";
    console.error(e);
  }
}
