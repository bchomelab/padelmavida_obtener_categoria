// === Funciones de Navegación ===

function toggleMobileMenu() {
  const menu = document.getElementById('navbarMenu');
  const hamburger = document.querySelector('.hamburger-button');
  
  if (menu && hamburger) {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  }
}

function cerrarMobileMenu() {
  const menu = document.getElementById('navbarMenu');
  const hamburger = document.querySelector('.hamburger-button');
  
  if (menu && hamburger) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
  }
}

function mostrarSeccion(seccionId) {
  // Ocultar todas las secciones
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Mostrar la sección seleccionada
  const seccion = document.getElementById(seccionId);
  if (seccion) {
    seccion.classList.add('active');
  }
  
  // Actualizar botones de navegación
  document.querySelectorAll('.nav-button').forEach(btn => {
    btn.classList.remove('active');
    
    // Activar el botón correspondiente a la sección
    if (seccionId === 'consulta-socio' && btn.textContent.trim() === 'Consulta Socio') {
      btn.classList.add('active');
    } else if (seccionId === 'calendario' && btn.textContent.trim() === 'Calendario') {
      btn.classList.add('active');
    }
  });
  
  // Si la sección NO es tablero-section, actualizar el nombre del dropdown al texto por defecto
  if (seccionId !== 'tablero-section') {
    // Actualizar directamente el elemento al texto por defecto
    const ligaNombreElement = document.getElementById('liga-actual-nombre');
    if (ligaNombreElement) {
      ligaNombreElement.textContent = 'Liga Primavera Verano 2025-2026';
    }
  } else {
    // Si estamos en tablero-section, actualizar el nombre según la liga seleccionada
    if (typeof actualizarNombreLigaActual === 'function') {
      actualizarNombreLigaActual();
    }
  }
  
  // Cerrar dropdown si está abierto
  cerrarDropdown();
  
  // Cerrar menú móvil si está abierto
  cerrarMobileMenu();
}

function toggleDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.classList.toggle('show');
}

function cerrarDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.classList.remove('show');
}

function mostrarTablero(liga) {
  cerrarDropdown();
  cerrarMobileMenu();
  
  // Validar que la liga sea válida usando la función de ligas.js
  if (typeof esLigaValida === 'function') {
    if (!esLigaValida(liga)) {
      console.error(`Liga "${liga}" no es válida.`);
      return;
    }
  } else {
    // Fallback si ligas.js no está cargado
    const ligasValidas = ['sexta', 'quinta', 'mixto'];
    if (!ligasValidas.includes(liga)) {
      console.error(`Liga "${liga}" no es válida. Ligas válidas: ${ligasValidas.join(', ')}`);
      return;
    }
  }
  
  // Establecer la liga actual usando la función de ligas.js
  if (typeof establecerLigaActual === 'function') {
    if (!establecerLigaActual(liga)) {
      return;
    }
  }
  
  // Actualizar el nombre de la liga en el dropdown
  const ligaNombreElement = document.getElementById('liga-actual-nombre');
  if (ligaNombreElement && typeof obtenerNombreLiga === 'function') {
    ligaNombreElement.textContent = obtenerNombreLiga(liga);
  }
  
  // Actualizar el título de la sección
  const tituloElement = document.getElementById('tablero-title');
  if (tituloElement) {
    const nombreLiga = (typeof obtenerNombreLiga === 'function') 
      ? obtenerNombreLiga(liga) 
      : `Liga ${liga}`;
    tituloElement.textContent = `${nombreLiga} - Primavera Verano 2025-2026`;
  }
  
  // Mostrar la sección de tablero
  mostrarSeccion('tablero-section');
  
  // Mostrar el tab de tablero por defecto
  mostrarTab('tablero-tab');
  
  // Cargar el tablero de la liga seleccionada
  cargarTablero(liga);
}

function mostrarTab(tabId) {
  // Ocultar todos los tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Desactivar todos los botones de tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostrar el tab seleccionado
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.classList.add('active');
  }
  
  // Activar el botón correspondiente
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick') === `mostrarTab('${tabId}')`) {
      btn.classList.add('active');
    }
  });
  
  // Si es el tab de rondas, cargar las rondas
  if (tabId === 'rondas-tab') {
    // Obtener la liga actual desde ligas.js
    let liga = (typeof obtenerLigaActual === 'function') 
      ? obtenerLigaActual() 
      : null;
    // Si no hay liga seleccionada, usar la primera disponible como fallback
    if (!liga && typeof ligasDisponibles !== 'undefined' && ligasDisponibles.length > 0) {
      liga = ligasDisponibles[0];
    } else if (!liga) {
      liga = 'sexta'; // Fallback final
    }
    cargarRondas(liga);
  }
}

// Cerrar dropdown y menú móvil al hacer clic fuera
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown-wrapper');
  const hamburger = document.querySelector('.hamburger-button');
  const menu = document.getElementById('navbarMenu');
  
  if (dropdown && !dropdown.contains(event.target)) {
    cerrarDropdown();
  }
  
  // Cerrar menú móvil si se hace clic fuera
  if (hamburger && menu && !hamburger.contains(event.target) && !menu.contains(event.target)) {
    cerrarMobileMenu();
  }
});

