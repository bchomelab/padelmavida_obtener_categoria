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
  
  if (liga === 'sexta') {
    mostrarSeccion('tablero-sexta');
    // Mostrar el tab de tablero por defecto
    mostrarTab('tablero-tab');
    cargarTablero();
  } else {
    alert('Esta opción estará disponible próximamente');
  }
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
    cargarRondas();
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

