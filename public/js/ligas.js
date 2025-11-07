// === Configuración Dinámica de Ligas ===

// Variable global para almacenar la configuración de ligas
let ligasConfig = {};
let ligaActual = null;
let ligasDisponibles = [];

/**
 * Cargar la configuración de ligas desde el servidor
 */
async function cargarConfiguracionLigas() {
  try {
    const response = await fetch('/ligas');
    
    if (!response.ok) {
      throw new Error('Error al obtener la configuración de ligas');
    }
    
    const data = await response.json();
    
    if (!data.success || !data.ligas) {
      console.error('Error: No se pudo cargar la configuración de ligas');
      return;
    }
    
    ligasConfig = data.ligas;
    ligasDisponibles = data.ligasDisponibles || Object.keys(ligasConfig);
    
    // NO establecer una liga por defecto - mostrar "Liga Primavera Verano 2025-2026"
    // ligaActual se establecerá solo cuando el usuario seleccione una liga
    
    // Generar el dropdown dinámicamente
    generarDropdownLigas();
    
    // Actualizar el nombre de la liga actual en el dropdown (mostrará el texto por defecto si no hay liga seleccionada)
    actualizarNombreLigaActual();
    
    return ligasConfig;
  } catch (error) {
    console.error('Error al cargar configuración de ligas:', error);
    // Fallback: usar configuración por defecto
    ligasConfig = {
      sexta: { nombre: 'Liga Sexta', clave: 'sexta' }
    };
    ligasDisponibles = ['sexta'];
    // NO establecer ligaActual por defecto
    generarDropdownLigas();
    actualizarNombreLigaActual();
  }
}

/**
 * Generar el dropdown de ligas dinámicamente
 */
function generarDropdownLigas() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  
  if (!dropdownMenu) {
    console.error('Error: No se encontró el elemento dropdownMenu');
    return;
  }
  
  // Limpiar el dropdown existente
  dropdownMenu.innerHTML = '';
  
  // Generar items del dropdown para cada liga
  ligasDisponibles.forEach(clave => {
    const liga = ligasConfig[clave];
    if (!liga) return;
    
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.textContent = liga.nombre;
    item.onclick = () => mostrarTablero(clave);
    
    dropdownMenu.appendChild(item);
  });
}

/**
 * Obtener el nombre de una liga por su clave
 */
function obtenerNombreLiga(clave) {
  if (!clave || !ligasConfig[clave]) {
    return 'Liga';
  }
  return ligasConfig[clave].nombre;
}

/**
 * Actualizar el nombre de la liga actual en el dropdown
 */
function actualizarNombreLigaActual() {
  const ligaNombreElement = document.getElementById('liga-actual-nombre');
  if (ligaNombreElement) {
    if (ligaActual) {
      ligaNombreElement.textContent = obtenerNombreLiga(ligaActual);
    } else {
      // Si no hay liga seleccionada, mostrar el texto por defecto
      ligaNombreElement.textContent = 'Liga Primavera Verano 2025-2026';
    }
  }
}

/**
 * Actualizar el título de la sección de tablero
 */
function actualizarTituloLiga() {
  const tituloElement = document.getElementById('tablero-title');
  if (tituloElement && ligaActual) {
    const nombreLiga = obtenerNombreLiga(ligaActual);
    tituloElement.textContent = `${nombreLiga} - Primavera Verano 2025-2026`;
  }
}

/**
 * Establecer la liga actual
 */
function establecerLigaActual(clave) {
  if (!ligasDisponibles.includes(clave)) {
    console.error(`Liga "${clave}" no está disponible. Ligas disponibles: ${ligasDisponibles.join(', ')}`);
    return false;
  }
  
  ligaActual = clave;
  actualizarNombreLigaActual();
  actualizarTituloLiga();
  return true;
}

/**
 * Obtener la liga actual
 */
function obtenerLigaActual() {
  // Si no hay liga seleccionada, devolver null (no la primera liga por defecto)
  return ligaActual || null;
}

/**
 * Validar si una liga es válida
 */
function esLigaValida(clave) {
  return ligasDisponibles.includes(clave);
}

// Cargar la configuración de ligas cuando se carga la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarConfiguracionLigas);
} else {
  cargarConfiguracionLigas();
}

