// === Funciones para el Tablero de Posiciones ===

// Usar la configuración de ligas desde ligas.js
// Si no está disponible, usar 'sexta' por defecto
async function cargarTablero(liga = null) {
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
  const loader = document.getElementById('loader-tablero');
  const content = document.getElementById('tablero-content');
  
  if (!loader || !content) {
    return;
  }
  
  loader.style.display = 'block';
  content.innerHTML = '';
  
  try {
    const response = await fetch(`/tablero/${liga}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener el tablero');
    }
    
    const data = await response.json();
    
    if (!data.success || !data.data || data.data.length === 0) {
      content.innerHTML = '<p class="error">No se encontraron datos del tablero</p>';
      loader.style.display = 'none';
      return;
    }
    
    // Ordenar por posición
    const equipos = [...data.data].sort((a, b) => {
      const posA = parseInt(a.POS) || 999;
      const posB = parseInt(b.POS) || 999;
      return posA - posB;
    });
    
    // Función auxiliar para reemplazar '-' con '0'
    function formatValue(value) {
      if (value === '' || value === null || value === undefined || value === '-') {
        return '0';
      }
      return value;
    }
    
    // Construir tabla
    let tablaHTML = '<table class="tablero-table">';
    tablaHTML += '<thead><tr>';
    tablaHTML += '<th>Pos</th>';
    tablaHTML += '<th>Equipo</th>';
    tablaHTML += '<th>PJ</th>';
    tablaHTML += '<th>PG</th>';
    tablaHTML += '<th>PE</th>';
    tablaHTML += '<th>PP</th>';
    tablaHTML += '<th>Set.F</th>';
    tablaHTML += '<th>Set.C</th>';
    tablaHTML += '<th>Dif.Set</th>';
    tablaHTML += '<th>JF</th>';
    tablaHTML += '<th>JC</th>';
    tablaHTML += '<th>Dif.J</th>';
    tablaHTML += '<th class="puntos-header">Puntos</th>';
    tablaHTML += '</tr></thead><tbody>';
    
    equipos.forEach((equipo, index) => {
      const pos = parseInt(equipo.POS) || 0;
      const posClass = pos <= 4 ? `pos-${pos}` : '';
      const top4Class = pos <= 4 ? 'top-4-row' : '';
      
      tablaHTML += `<tr class="${posClass} ${top4Class}">`;
      tablaHTML += `<td><strong>${formatValue(equipo.POS)}</strong></td>`;
      tablaHTML += `<td><strong>${equipo.Equipo || equipo.Equipo_2 || '0'}</strong></td>`;
      tablaHTML += `<td>${formatValue(equipo.PJ)}</td>`;
      tablaHTML += `<td>${formatValue(equipo.PG)}</td>`;
      tablaHTML += `<td>${formatValue(equipo.PE)}</td>`;
      tablaHTML += `<td>${formatValue(equipo.PP)}</td>`;
      tablaHTML += `<td>${formatValue(equipo['Set.F'])}</td>`;
      tablaHTML += `<td>${formatValue(equipo['Set.C'])}</td>`;
      tablaHTML += `<td>${formatValue(equipo['Dif.Set'])}</td>`;
      tablaHTML += `<td>${formatValue(equipo.JF)}</td>`;
      tablaHTML += `<td>${formatValue(equipo.JC)}</td>`;
      tablaHTML += `<td>${formatValue(equipo['Dif.J'])}</td>`;
      tablaHTML += `<td class="puntos-cell"><strong>${formatValue(equipo['Pts.F'])}</strong></td>`;
      tablaHTML += '</tr>';
    });
    
    tablaHTML += '</tbody></table>';
    
    // Cerrar el contenedor de scroll de la tabla y envolver en tablero-wrapper
    tablaHTML = '<div class="tablero-wrapper"><div class="tabla-scroll-wrapper">' + tablaHTML + '</div></div>';
    
    // Agregar leyenda de puntos
    tablaHTML += '<div class="leyenda-puntos">';
    tablaHTML += '<h3>Leyenda</h3>';
    tablaHTML += '<div class="leyenda-columnas">';
    
    // Columna 1: Siglas de las columnas
    tablaHTML += '<div class="leyenda-columna">';
    tablaHTML += '<h4>Siglas</h4>';
    tablaHTML += '<ul>';
    tablaHTML += '<li><strong>Pos:</strong> Posición en el tablero</li>';
    tablaHTML += '<li><strong>PJ:</strong> Partidos Jugados</li>';
    tablaHTML += '<li><strong>PG:</strong> Partidos Ganados</li>';
    tablaHTML += '<li><strong>PE:</strong> Partidos Empatados</li>';
    tablaHTML += '<li><strong>PP:</strong> Partidos Perdidos</li>';
    tablaHTML += '<li><strong>Set.F:</strong> Sets a Favor</li>';
    tablaHTML += '<li><strong>Set.C:</strong> Sets en Contra</li>';
    tablaHTML += '<li><strong>Dif.Set:</strong> Diferencia de Sets</li>';
    tablaHTML += '<li><strong>JF:</strong> Juegos a Favor</li>';
    tablaHTML += '<li><strong>JC:</strong> Juegos en Contra</li>';
    tablaHTML += '<li><strong>Dif.J:</strong> Diferencia de Juegos</li>';
    tablaHTML += '<li><strong>Puntos:</strong> Puntos totales obtenidos</li>';
    tablaHTML += '</ul>';
    tablaHTML += '</div>';
    
    // Columna 2: Sistema de puntos
    tablaHTML += '<div class="leyenda-columna">';
    tablaHTML += '<h4>Sistema de Puntos</h4>';
    tablaHTML += '<ul>';
    tablaHTML += '<li><strong>Victoria en 2 sets (2-0):</strong> 4 puntos</li>';
    tablaHTML += '<li><strong>Victoria en 3 sets (2-1):</strong> 3 puntos</li>';
    tablaHTML += '<li><strong>Derrota en 3 sets (1-2):</strong> 1 punto</li>';
    tablaHTML += '<li><strong>Derrota en 2 sets (0-2):</strong> 0 punto</li>';
    tablaHTML += '<li><strong>No presentado:</strong> -1 punto</li>';
    tablaHTML += '</ul>';
    tablaHTML += '</div>';
    
    tablaHTML += '</div>';
    tablaHTML += '</div>';
    
    // Agregar imagen de auspiciadores
    tablaHTML += '<div class="auspiciadores-container">';
    tablaHTML += '<img src="assets/auspiciadores.png" alt="Auspiciadores" class="auspiciadores-img">';
    tablaHTML += '</div>';
    
    content.innerHTML = tablaHTML;
    loader.style.display = 'none';
    
  } catch (error) {
    console.error('Error al cargar tablero:', error);
    content.innerHTML = '<p class="error">Error al cargar el tablero de posiciones</p>';
    loader.style.display = 'none';
  }
}

