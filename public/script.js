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

// Cerrar dropdown al hacer clic fuera
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

function mostrarTablero(liga) {
  cerrarDropdown();
  cerrarMobileMenu();
  
  if (liga === 'sexta') {
    mostrarSeccion('tablero-sexta');
    cargarTablero();
  } else {
    alert('Esta opción estará disponible próximamente');
  }
}

// === Función para cargar el tablero ===

async function cargarTablero() {
  const loader = document.getElementById('loader-tablero');
  const content = document.getElementById('tablero-content');
  
  loader.style.display = 'block';
  content.innerHTML = '';
  
  try {
    const response = await fetch('/tablero');
    
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
    
    equipos.forEach(equipo => {
      const pos = parseInt(equipo.POS) || 0;
      const posClass = pos <= 4 ? `pos-${pos}` : '';
      
      tablaHTML += `<tr class="${posClass}">`;
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
    
    // Cerrar el contenedor de scroll de la tabla
    tablaHTML = '<div class="tabla-scroll-wrapper">' + tablaHTML + '</div>';
    
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

// === Función para buscar datos del socio ===

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

// === Función para copiar cuenta del club ===

function copiarCuenta() {
  const cuenta = `Banco: Banco Estado
Chequera Electrónica: 43270036563
Titular: Club Polideportivo Pádelmávida
RUT: 65.232.068-6
Correo: padelmavida@gmail.com`;
  
  const btn = event.target;
  const textoOriginal = btn.textContent;
  
  // Función auxiliar para copiar usando el método más compatible
  const copiarTexto = (texto) => {
    // Método 1: Navigator Clipboard API (moderno, funciona en HTTPS)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).then(() => true).catch(() => false);
    }
    
    // Método 2: Fallback para dispositivos móviles y navegadores antiguos
    return new Promise((resolve) => {
      // Crear un elemento de texto temporal
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      
      // Para iOS, el elemento debe ser visible y editable
      const isIOS = /ipad|iphone|ipod/i.test(navigator.userAgent);
      
      if (isIOS) {
        // iOS: hacer el textarea visible pero fuera de la vista
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.style.opacity = '0';
        textArea.contentEditable = true;
        textArea.readOnly = false;
      } else {
        // Otros dispositivos: ocultar completamente
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.setAttribute('readonly', '');
      }
      
      document.body.appendChild(textArea);
      
      // Seleccionar y copiar
      if (isIOS) {
        // iOS: usar rangos de selección
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
        
        // Enfocar el textarea
        textArea.focus();
        textArea.contentEditable = true;
        textArea.readOnly = false;
      } else {
        textArea.select();
        textArea.setSelectionRange(0, 999999);
      }
      
      // Intentar copiar
      setTimeout(() => {
        try {
          let exito = false;
          if (isIOS) {
            // En iOS, intentar con document.execCommand
            exito = document.execCommand('copy');
          } else {
            exito = document.execCommand('copy');
          }
          
          // Limpiar
          if (isIOS) {
            window.getSelection().removeAllRanges();
          }
          document.body.removeChild(textArea);
          resolve(exito);
        } catch (err) {
          if (document.body.contains(textArea)) {
            document.body.removeChild(textArea);
          }
          resolve(false);
        }
      }, isIOS ? 100 : 0);
    });
  };
  
  // Intentar copiar
  copiarTexto(cuenta).then((exito) => {
    if (exito) {
      btn.textContent = '✓ Copiado!';
      btn.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        btn.textContent = textoOriginal;
        btn.style.backgroundColor = '#38B6FF';
      }, 2000);
    } else {
      // Si falla, mostrar el texto para que el usuario lo copie manualmente
      alert('Copia este texto:\n\n' + cuenta);
    }
  }).catch(err => {
    console.error('Error al copiar:', err);
    // Fallback: mostrar el texto para copiar manualmente
    alert('Copia este texto:\n\n' + cuenta);
  });
}

// === Limpiar el input ===
function limpiarInput() {
  const input = document.getElementById("rut");
  const resultado = document.getElementById("resultado");
  input.value = "";
  resultado.innerHTML = "";
  input.focus();
}
