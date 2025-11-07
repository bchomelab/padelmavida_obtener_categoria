// === Funciones para las Rondas ===

// Usar la configuración de ligas desde ligas.js
// Si no está disponible, usar 'sexta' por defecto
async function cargarRondas(liga = null) {
  // Obtener la liga actual desde ligas.js si no se proporciona
  if (!liga) {
    liga = (typeof obtenerLigaActual === 'function') ? obtenerLigaActual() : null;
    // Si no hay liga seleccionada, usar la primera disponible como fallback
    if (!liga && typeof ligasDisponibles !== 'undefined' && ligasDisponibles.length > 0) {
      liga = ligasDisponibles[0];
    } else if (!liga) {
      liga = 'sexta'; // Fallback final
    }
  }
  const loader = document.getElementById('loader-rondas');
  const content = document.getElementById('rondas-content');
  
  if (!loader || !content) {
    return;
  }
  
  loader.style.display = 'block';
  content.innerHTML = '';
  
  try {
    const response = await fetch(`/rondas/${liga}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las rondas');
    }
    
    const data = await response.json();
    
    if (!data.success || !data.data || data.data.length === 0) {
      content.innerHTML = '<p class="error">No se encontraron datos de rondas</p>';
      loader.style.display = 'none';
      return;
    }
    
    // Formatear fechas
    function formatearFecha(fecha) {
      if (!fecha) return 'No disponible';
      
      try {
        const fechaObj = new Date(fecha);
        if (isNaN(fechaObj.getTime())) {
          // Si no es una fecha válida, intentar parsear formato YYYY-MM-DD
          const partes = fecha.split('-');
          if (partes.length === 3) {
            const fechaObj2 = new Date(partes[0], partes[1] - 1, partes[2]);
            return fechaObj2.toLocaleDateString('es-CL', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
          }
          return fecha;
        }
        
        return fechaObj.toLocaleDateString('es-CL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch (error) {
        return fecha;
      }
    }
    
    // Función para parsear fecha a objeto Date (disponible globalmente)
    window.parsearFecha = function(fecha) {
      if (!fecha) return null;
      
      try {
        const fechaObj = new Date(fecha);
        if (isNaN(fechaObj.getTime())) {
          // Intentar parsear formato YYYY-MM-DD
          const partes = fecha.split('-');
          if (partes.length === 3) {
            return new Date(partes[0], partes[1] - 1, partes[2]);
          }
          return null;
        }
        return fechaObj;
      } catch (error) {
        return null;
      }
    };
    
    // Función para comparar fechas (solo día, mes, año)
    function compararFechas(fecha1, fecha2) {
      if (!fecha1 || !fecha2) return false;
      
      const d1 = parsearFecha(fecha1);
      const d2 = parsearFecha(fecha2);
      
      if (!d1 || !d2) return false;
      
      // Comparar solo día, mes y año
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      
      return d1 > d2;
    }
    
    // Guardar datos globalmente para filtros
    window.rondasData = data.data;
    
    // Obtener todas las parejas únicas de todos los enfrentamientos
    const parejasUnicas = new Set();
    data.data.forEach(ronda => {
      if (ronda.enfrentamientos) {
        ronda.enfrentamientos.forEach(enf => {
          if (enf.equipo1) parejasUnicas.add(enf.equipo1);
          if (enf.equipo2) parejasUnicas.add(enf.equipo2);
        });
      }
    });
    
    // Ordenar parejas alfabéticamente
    const parejasOrdenadas = Array.from(parejasUnicas).sort();
    
    // Construir controles de filtro
    let filtrosHTML = '<div class="rondas-filtros">';
    filtrosHTML += '<div class="filtro-group">';
    filtrosHTML += '<label for="filtro-pareja">Filtrar por Pareja:</label>';
    filtrosHTML += '<select id="filtro-pareja" onchange="filtrarRondas()">';
    filtrosHTML += '<option value="">Todas las parejas</option>';
    parejasOrdenadas.forEach(pareja => {
      filtrosHTML += `<option value="${pareja}">${pareja}</option>`;
    });
    filtrosHTML += '</select>';
    filtrosHTML += '</div>';
    filtrosHTML += '<div class="filtro-group">';
    filtrosHTML += '<label for="filtro-fecha">Filtrar por Fecha:</label>';
    filtrosHTML += '<div class="filtro-fecha-wrapper">';
    filtrosHTML += '<input type="date" id="filtro-fecha" onclick="mostrarCalendario(this)" onchange="filtrarRondas(); actualizarBotonLimpiarFecha()">';
    filtrosHTML += '<button class="filtro-clear-btn" id="btn-limpiar-fecha" onclick="limpiarFiltroFecha()" title="Limpiar filtro de fecha" aria-label="Limpiar filtro de fecha" style="display: none;">';
    filtrosHTML += '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    filtrosHTML += '</button>';
    filtrosHTML += '</div>';
    filtrosHTML += '</div>';
    filtrosHTML += '<div class="filtro-group">';
    filtrosHTML += '<label for="filtro-estado">Filtrar por Estado:</label>';
    filtrosHTML += '<select id="filtro-estado" onchange="filtrarRondas()">';
    filtrosHTML += '<option value="">Todos los partidos</option>';
    filtrosHTML += '<option value="jugado">Partidos jugados</option>';
    filtrosHTML += '<option value="pendiente">Partidos pendientes</option>';
    filtrosHTML += '</select>';
    filtrosHTML += '</div>';
    filtrosHTML += '<div class="filtro-group">';
    filtrosHTML += '<button class="filtro-limpiar-todos-btn" onclick="limpiarTodosFiltros()" title="Limpiar todos los filtros" aria-label="Limpiar todos los filtros">';
    filtrosHTML += '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    filtrosHTML += ' Limpiar Filtros';
    filtrosHTML += '</button>';
    filtrosHTML += '</div>';
    filtrosHTML += '<div class="filtro-group switch-group">';
    filtrosHTML += '<label class="switch-label">';
    filtrosHTML += '<input type="checkbox" id="toggle-todas-rondas" onchange="toggleTodasRondas()">';
    filtrosHTML += '<span class="switch-slider"></span>';
    filtrosHTML += '<span class="switch-text">Mostrar/Ocultar Enfrentamientos</span>';
    filtrosHTML += '</label>';
    filtrosHTML += '</div>';
    filtrosHTML += '</div>';
    
    // Construir HTML para cada ronda
    let rondasHTML = filtrosHTML;
    
    data.data.forEach((ronda, rondaIndex) => {
      rondasHTML += `<div class="ronda-card" data-ronda-index="${rondaIndex}">`;
      rondasHTML += '<div class="ronda-header">';
      rondasHTML += `<h3 class="ronda-title">${ronda.ronda}</h3>`;
      rondasHTML += '<div class="ronda-header-right">';
      rondasHTML += '<div class="ronda-fechas-inline">';
      rondasHTML += `<span class="ronda-fecha"><strong>Inicio:</strong> ${formatearFecha(ronda.fechaInicio)}</span>`;
      rondasHTML += `<span class="ronda-fecha"><strong>Fin:</strong> ${formatearFecha(ronda.fechaFin)}</span>`;
      rondasHTML += '</div>';
      rondasHTML += `<button class="ronda-toggle-btn" onclick="toggleRonda(${rondaIndex})" aria-label="Colapsar/Expandir ronda">`;
      rondasHTML += '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>';
      rondasHTML += '</button>';
      rondasHTML += '</div>';
      rondasHTML += '</div>';
      
      // Contenedor de enfrentamientos (colapsable)
      rondasHTML += `<div class="ronda-enfrentamientos" id="ronda-enfrentamientos-${rondaIndex}">`;
      
      // Tablas de enfrentamientos (una tabla por cada enfrentamiento)
      if (ronda.enfrentamientos && ronda.enfrentamientos.length > 0) {
        ronda.enfrentamientos.forEach((enfrentamiento, index) => {
          // Agregar data attributes para filtrado
          const equipo1Data = enfrentamiento.equipo1 || '';
          const equipo2Data = enfrentamiento.equipo2 || '';
          // Función auxiliar para formatear valores
          function formatValue(value) {
            if (value === null || value === undefined || value === '') {
              return '-';
            }
            if (value === '-') {
              return '-';
            }
            return value;
          }
          
          // Determinar qué pareja ganó (la que tiene más puntos)
          const puntosEquipo1 = typeof enfrentamiento.puntosEquipo1 === 'number' ? enfrentamiento.puntosEquipo1 : 0;
          const puntosEquipo2 = typeof enfrentamiento.puntosEquipo2 === 'number' ? enfrentamiento.puntosEquipo2 : 0;
          const equipo1Gano = puntosEquipo1 > puntosEquipo2;
          const equipo2Gano = puntosEquipo2 > puntosEquipo1;
          
          // Determinar qué sets ganó cada equipo
          const setsEquipo1 = typeof enfrentamiento.setsEquipo1 === 'number' ? enfrentamiento.setsEquipo1 : 0;
          const setsEquipo2 = typeof enfrentamiento.setsEquipo2 === 'number' ? enfrentamiento.setsEquipo2 : 0;
          
          // Determinar ganador de cada set
          const set1Equipo1 = typeof enfrentamiento.juegosSet1Equipo1 === 'number' ? enfrentamiento.juegosSet1Equipo1 : 0;
          const set1Equipo2 = typeof enfrentamiento.juegosSet1Equipo2 === 'number' ? enfrentamiento.juegosSet1Equipo2 : 0;
          const set1GanoEquipo1 = set1Equipo1 > set1Equipo2;
          const set1GanoEquipo2 = set1Equipo2 > set1Equipo1;
          
          const set2Equipo1 = typeof enfrentamiento.juegosSet2Equipo1 === 'number' ? enfrentamiento.juegosSet2Equipo1 : 0;
          const set2Equipo2 = typeof enfrentamiento.juegosSet2Equipo2 === 'number' ? enfrentamiento.juegosSet2Equipo2 : 0;
          const set2GanoEquipo1 = set2Equipo1 > set2Equipo2;
          const set2GanoEquipo2 = set2Equipo2 > set2Equipo1;
          
          const set3Equipo1 = enfrentamiento.juegosSet3Equipo1;
          const set3Equipo2 = enfrentamiento.juegosSet3Equipo2;
          const set3Jugado = set3Equipo1 !== '-' && set3Equipo2 !== '-' && set3Equipo1 !== 0 && set3Equipo2 !== 0;
          const set3GanoEquipo1 = set3Jugado && typeof set3Equipo1 === 'number' && typeof set3Equipo2 === 'number' && set3Equipo1 > set3Equipo2;
          const set3GanoEquipo2 = set3Jugado && typeof set3Equipo1 === 'number' && typeof set3Equipo2 === 'number' && set3Equipo2 > set3Equipo1;
          
          // Determinar status del enfrentamiento
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          
          let statusIcon, statusClass, tooltipText;
          
          if (enfrentamiento.jugado) {
            // Partido jugado
            statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
            statusClass = 'status-jugado';
            tooltipText = 'Partido jugado';
          } else {
            // Partido pendiente - verificar si la fecha de fin ya pasó
            const fechaFinPasada = compararFechas(hoy.toISOString().split('T')[0], ronda.fechaFin);
            
            if (fechaFinPasada) {
              // Fecha de fin ya pasó - mostrar warning
              statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';
              statusClass = 'status-warning';
              tooltipText = 'Partido pendiente - La fecha de fin de la ronda ya pasó';
            } else {
              // Partido pendiente - mostrar reloj de arena
              statusIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/></svg>';
              statusClass = 'status-pendiente';
              tooltipText = 'Partido pendiente';
            }
          }
          
          // Separador entre tablas (excepto la primera)
          if (index > 0) {
            rondasHTML += '<div class="enfrentamiento-separador"></div>';
          }
          
          // Crear tabla para este enfrentamiento con data attributes para filtrado
          const jugadoData = enfrentamiento.jugado ? 'true' : 'false';
          rondasHTML += `<div class="enfrentamiento-wrapper" data-equipo1="${equipo1Data}" data-equipo2="${equipo2Data}" data-jugado="${jugadoData}">`;
          rondasHTML += '<table class="enfrentamiento-table">';
          
          // Agregar thead a todas las tablas para mantener el mismo ancho de columnas
          // Solo mostrar visualmente en la primera tabla
          if (index === 0) {
            rondasHTML += '<thead><tr>';
            rondasHTML += '<th>Status</th>';
            rondasHTML += '<th>Parejas</th>';
            rondasHTML += '<th>Set 1</th>';
            rondasHTML += '<th>Set 2</th>';
            rondasHTML += '<th>Set 3</th>';
            rondasHTML += '<th>Puntos</th>';
            rondasHTML += '</tr></thead>';
          } else {
            // Agregar thead invisible para mantener el mismo ancho de columnas
            rondasHTML += '<thead class="thead-hidden"><tr>';
            rondasHTML += '<th>Status</th>';
            rondasHTML += '<th>Parejas</th>';
            rondasHTML += '<th>Set 1</th>';
            rondasHTML += '<th>Set 2</th>';
            rondasHTML += '<th>Set 3</th>';
            rondasHTML += '<th>Puntos</th>';
            rondasHTML += '</tr></thead>';
          }
          
          rondasHTML += '<tbody>';
          
          // Fila 1: Equipo 1
          const row1Class = equipo1Gano ? 'fila-ganadora' : '';
          rondasHTML += `<tr class="${row1Class}">`;
          rondasHTML += `<td class="${statusClass} status-cell" rowspan="2" data-tooltip="${tooltipText}" title="${tooltipText}">${statusIcon}</td>`;
          rondasHTML += `<td class="pareja-cell">${enfrentamiento.equipo1 || '-'}</td>`;
          
          // Set 1
          const set1Value1 = formatValue(enfrentamiento.juegosSet1Equipo1);
          rondasHTML += `<td class="set-cell">${set1GanoEquipo1 ? `<strong>${set1Value1}</strong>` : set1Value1}</td>`;
          
          // Set 2
          const set2Value1 = formatValue(enfrentamiento.juegosSet2Equipo1);
          rondasHTML += `<td class="set-cell">${set2GanoEquipo1 ? `<strong>${set2Value1}</strong>` : set2Value1}</td>`;
          
          // Set 3
          const set3Value1 = formatValue(enfrentamiento.juegosSet3Equipo1);
          rondasHTML += `<td class="set-cell">${set3GanoEquipo1 ? `<strong>${set3Value1}</strong>` : set3Value1}</td>`;
          
          // Puntos
          const puntosValue1 = formatValue(enfrentamiento.puntosEquipo1);
          rondasHTML += `<td class="puntos-cell">${puntosValue1}</td>`;
          rondasHTML += '</tr>';
          
          // Fila 2: Equipo 2
          const row2Class = equipo2Gano ? 'fila-ganadora' : '';
          rondasHTML += `<tr class="${row2Class}">`;
          rondasHTML += `<td class="pareja-cell">${enfrentamiento.equipo2 || '-'}</td>`;
          
          // Set 1
          const set1Value2 = formatValue(enfrentamiento.juegosSet1Equipo2);
          rondasHTML += `<td class="set-cell">${set1GanoEquipo2 ? `<strong>${set1Value2}</strong>` : set1Value2}</td>`;
          
          // Set 2
          const set2Value2 = formatValue(enfrentamiento.juegosSet2Equipo2);
          rondasHTML += `<td class="set-cell">${set2GanoEquipo2 ? `<strong>${set2Value2}</strong>` : set2Value2}</td>`;
          
          // Set 3
          const set3Value2 = formatValue(enfrentamiento.juegosSet3Equipo2);
          rondasHTML += `<td class="set-cell">${set3GanoEquipo2 ? `<strong>${set3Value2}</strong>` : set3Value2}</td>`;
          
          // Puntos
          const puntosValue2 = formatValue(enfrentamiento.puntosEquipo2);
          rondasHTML += `<td class="puntos-cell">${puntosValue2}</td>`;
          rondasHTML += '</tr>';
          
          rondasHTML += '</tbody></table>';
          rondasHTML += '</div>';
        });
      } else {
        rondasHTML += '<p class="ronda-sin-enfrentamientos">No hay enfrentamientos registrados para esta ronda</p>';
      }
      
      rondasHTML += '</div>'; // Cerrar ronda-enfrentamientos
      rondasHTML += '</div>'; // Cerrar ronda-card
    });
    
    // Agregar imagen de auspiciadores al final de la última ronda
    rondasHTML += '<div class="auspiciadores-container">';
    rondasHTML += '<img src="assets/auspiciadores.png" alt="Auspiciadores" class="auspiciadores-img">';
    rondasHTML += '</div>';
    
    content.innerHTML = rondasHTML;
    loader.style.display = 'none';
    
    // Inicializar todas las rondas como expandidas
    document.querySelectorAll('.ronda-enfrentamientos').forEach(el => {
      el.style.display = 'block';
    });
    
    // Inicializar visibilidad del botón de limpiar fecha
    actualizarBotonLimpiarFecha();
    
    // Agregar event listeners para tooltips en móvil
    const statusCells = content.querySelectorAll('.status-cell[data-tooltip]');
    statusCells.forEach(cell => {
      // Para dispositivos táctiles (móvil)
      let touchTimeout;
      
      cell.addEventListener('touchstart', function(e) {
        e.preventDefault();
        clearTimeout(touchTimeout);
        
        // Remover tooltip activo de otros elementos
        document.querySelectorAll('.status-cell.tooltip-active').forEach(el => {
          if (el !== cell) {
            el.classList.remove('tooltip-active');
          }
        });
        
        // Toggle tooltip
        cell.classList.toggle('tooltip-active');
        
        // Auto-ocultar después de 3 segundos
        touchTimeout = setTimeout(() => {
          cell.classList.remove('tooltip-active');
        }, 3000);
      });
      
      // Cerrar tooltip al tocar fuera
      document.addEventListener('touchstart', function(e) {
        if (!cell.contains(e.target)) {
          cell.classList.remove('tooltip-active');
        }
      });
    });
    
  } catch (error) {
    console.error('Error al cargar rondas:', error);
    content.innerHTML = '<p class="error">Error al cargar las rondas</p>';
    loader.style.display = 'none';
  }
}

// Función para colapsar/expandir una ronda individual
function toggleRonda(rondaIndex) {
  const enfrentamientos = document.getElementById(`ronda-enfrentamientos-${rondaIndex}`);
  const btn = document.querySelector(`[onclick="toggleRonda(${rondaIndex})"]`);
  const svg = btn ? btn.querySelector('svg') : null;
  
  if (enfrentamientos && svg) {
    if (enfrentamientos.style.display === 'none') {
      enfrentamientos.style.display = 'block';
      svg.style.transform = 'rotate(0deg)';
    } else {
      enfrentamientos.style.display = 'none';
      svg.style.transform = 'rotate(-90deg)';
    }
  }
}

// Función para colapsar/expandir todas las rondas
function toggleTodasRondas() {
  const checkbox = document.getElementById('toggle-todas-rondas');
  const todasRondas = document.querySelectorAll('.ronda-enfrentamientos');
  const todosBotones = document.querySelectorAll('.ronda-toggle-btn svg');
  
  todasRondas.forEach((ronda, index) => {
    if (checkbox.checked) {
      // Ocultar todas
      ronda.style.display = 'none';
      todosBotones[index].style.transform = 'rotate(-90deg)';
    } else {
      // Mostrar todas
      ronda.style.display = 'block';
      todosBotones[index].style.transform = 'rotate(0deg)';
    }
  });
}

// Función para filtrar rondas
function filtrarRondas() {
  const filtroPareja = document.getElementById('filtro-pareja').value;
  const filtroFecha = document.getElementById('filtro-fecha').value;
  const filtroEstado = document.getElementById('filtro-estado').value;
  const rondasCards = document.querySelectorAll('.ronda-card');
  const todosEnfrentamientos = document.querySelectorAll('.enfrentamiento-wrapper');
  
  if (!window.rondasData) {
    return;
  }
  
  // Filtrar enfrentamientos por pareja y estado
  todosEnfrentamientos.forEach((enfrentamiento, index) => {
    const equipo1 = enfrentamiento.getAttribute('data-equipo1') || '';
    const equipo2 = enfrentamiento.getAttribute('data-equipo2') || '';
    const jugado = enfrentamiento.getAttribute('data-jugado') === 'true';
    let mostrarEnfrentamiento = true;
    
    // Filtrar por pareja
    if (filtroPareja) {
      if (equipo1 !== filtroPareja && equipo2 !== filtroPareja) {
        mostrarEnfrentamiento = false;
      }
    }
    
    // Filtrar por estado
    if (filtroEstado) {
      if (filtroEstado === 'jugado' && !jugado) {
        mostrarEnfrentamiento = false;
      } else if (filtroEstado === 'pendiente' && jugado) {
        mostrarEnfrentamiento = false;
      }
    }
    
    // Mostrar u ocultar el enfrentamiento
    if (mostrarEnfrentamiento) {
      enfrentamiento.style.display = 'block';
    } else {
      enfrentamiento.style.display = 'none';
    }
  });
  
  // Manejar separadores después de filtrar
  todosEnfrentamientos.forEach((enfrentamiento, index) => {
    const separador = enfrentamiento.previousElementSibling;
    if (separador && separador.classList.contains('enfrentamiento-separador')) {
      // Si el enfrentamiento está oculto, ocultar el separador
      if (enfrentamiento.style.display === 'none') {
        separador.style.display = 'none';
      } else {
        // Si el enfrentamiento está visible, verificar el anterior
        const enfrentamientoAnterior = separador.previousElementSibling;
        if (enfrentamientoAnterior && enfrentamientoAnterior.classList.contains('enfrentamiento-wrapper')) {
          if (enfrentamientoAnterior.style.display === 'none') {
            separador.style.display = 'none';
          } else {
            separador.style.display = 'block';
          }
        } else {
          separador.style.display = 'block';
        }
      }
    }
  });
  
  // Reconstruir títulos de tablas en cada ronda
  rondasCards.forEach((card, index) => {
    if (card.style.display === 'none') return;
    
    const enfrentamientosRonda = Array.from(card.querySelectorAll('.enfrentamiento-wrapper'));
    let primerEnfrentamientoVisible = null;
    
    // Encontrar el primer enfrentamiento visible
    enfrentamientosRonda.forEach(enfrentamiento => {
      if (enfrentamiento.style.display !== 'none' && !primerEnfrentamientoVisible) {
        primerEnfrentamientoVisible = enfrentamiento;
      }
    });
    
    // Si hay un primer enfrentamiento visible, asegurar que tenga thead visible
    if (primerEnfrentamientoVisible) {
      const tabla = primerEnfrentamientoVisible.querySelector('.enfrentamiento-table');
      if (tabla) {
        let thead = tabla.querySelector('thead');
        
        // Si no tiene thead, crearlo
        if (!thead) {
          thead = document.createElement('thead');
          thead.innerHTML = '<tr>' +
            '<th>Status</th>' +
            '<th>Parejas</th>' +
            '<th>Set 1</th>' +
            '<th>Set 2</th>' +
            '<th>Set 3</th>' +
            '<th>Puntos</th>' +
            '</tr>';
          const tbody = tabla.querySelector('tbody');
          if (tbody) {
            tabla.insertBefore(thead, tbody);
          } else {
            tabla.appendChild(thead);
          }
        } else {
          // Si tiene thead oculto, mostrarlo
          if (thead.classList.contains('thead-hidden')) {
            thead.classList.remove('thead-hidden');
          }
        }
      }
      
      // Ocultar thead de todos los demás enfrentamientos visibles en esta ronda
      enfrentamientosRonda.forEach(enfrentamiento => {
        if (enfrentamiento !== primerEnfrentamientoVisible && enfrentamiento.style.display !== 'none') {
          const tabla = enfrentamiento.querySelector('.enfrentamiento-table');
          if (tabla) {
            let thead = tabla.querySelector('thead');
            if (thead) {
              if (!thead.classList.contains('thead-hidden')) {
                thead.classList.add('thead-hidden');
              }
            }
          }
        }
      });
    }
  });
  
  // Filtrar rondas por fecha y verificar si tienen enfrentamientos visibles
  rondasCards.forEach((card, index) => {
    const ronda = window.rondasData[index];
    if (!ronda) return;
    
    let mostrarRonda = true;
    
    // Filtrar por fecha
    if (filtroFecha) {
      const fechaFiltro = new Date(filtroFecha);
      fechaFiltro.setHours(0, 0, 0, 0);
      
      const fechaInicio = window.parsearFecha(ronda.fechaInicio);
      const fechaFin = window.parsearFecha(ronda.fechaFin);
      
      if (fechaInicio && fechaFin) {
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);
        
        // Verificar si la fecha está dentro del rango (inclusive)
        if (fechaFiltro < fechaInicio || fechaFiltro > fechaFin) {
          mostrarRonda = false;
        }
      } else {
        mostrarRonda = false;
      }
    }
    
    // Verificar si la ronda tiene al menos un enfrentamiento visible
    if (mostrarRonda) {
      const enfrentamientosRonda = card.querySelectorAll('.enfrentamiento-wrapper');
      let tieneEnfrentamientosVisibles = false;
      
      enfrentamientosRonda.forEach(enfrentamiento => {
        if (enfrentamiento.style.display !== 'none') {
          tieneEnfrentamientosVisibles = true;
        }
      });
      
      // Si no hay enfrentamientos visibles, ocultar la ronda
      if (!tieneEnfrentamientosVisibles) {
        mostrarRonda = false;
      }
    }
    
    // Mostrar u ocultar la ronda
    if (mostrarRonda) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Función para mostrar el calendario al hacer clic en el input de fecha
function mostrarCalendario(input) {
  // Intentar usar showPicker() si está disponible (navegadores modernos)
  if (input && typeof input.showPicker === 'function') {
    try {
      input.showPicker();
    } catch (error) {
      // Si showPicker() falla, hacer focus y activar el calendario manualmente
      input.focus();
      // Simular click en el indicador del calendario
      const event = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      input.dispatchEvent(event);
    }
  } else {
    // Fallback para navegadores que no soportan showPicker()
    input.focus();
    // Intentar activar el calendario haciendo click en el input
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    input.dispatchEvent(clickEvent);
  }
}

// Función para actualizar la visibilidad del botón de limpiar fecha
function actualizarBotonLimpiarFecha() {
  const filtroFecha = document.getElementById('filtro-fecha');
  const btnLimpiarFecha = document.getElementById('btn-limpiar-fecha');
  
  if (filtroFecha && btnLimpiarFecha) {
    if (filtroFecha.value) {
      btnLimpiarFecha.style.display = 'flex';
    } else {
      btnLimpiarFecha.style.display = 'none';
    }
  }
}

// Función para limpiar el filtro de fecha
function limpiarFiltroFecha() {
  const filtroFecha = document.getElementById('filtro-fecha');
  if (filtroFecha) {
    filtroFecha.value = '';
    actualizarBotonLimpiarFecha();
    filtrarRondas();
  }
}

// Función para limpiar todos los filtros
function limpiarTodosFiltros() {
  const filtroPareja = document.getElementById('filtro-pareja');
  const filtroFecha = document.getElementById('filtro-fecha');
  const filtroEstado = document.getElementById('filtro-estado');
  
  if (filtroPareja) filtroPareja.value = '';
  if (filtroFecha) filtroFecha.value = '';
  if (filtroEstado) filtroEstado.value = '';
  
  actualizarBotonLimpiarFecha();
  filtrarRondas();
}

