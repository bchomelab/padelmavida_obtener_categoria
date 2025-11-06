/**
 * Google Apps Script para obtener todas las rondas y enfrentamientos
 * 
 * Este script lee:
 * - La hoja "Fechas" que contiene las rondas con fechas de inicio y fin
 * - Las hojas "Ronda 1", "Ronda 2", ..., "Ronda 7" que contienen los enfrentamientos
 * 
 * Columnas de cada enfrentamiento:
 * - Columna A: Equipo 1
 * - Columna B: Equipo 2
 * - Columna C: S-E1 (Sets a favor equipo 1)
 * - Columna D: S-E2 (Sets a favor equipo 2)
 * - Columna E: S1-E1 (Juegos a favor Equipo 1 Set 1)
 * - Columna F: S1-E2 (Juegos a favor Equipo 2 Set 1)
 * - Columna G: S2-E1 (Juegos a favor Equipo 1 Set 2)
 * - Columna H: S2-E2 (Juegos a favor Equipo 2 Set 2)
 * - Columna I: S3-E1 (Juegos a favor Equipo 1 Set 3)
 * - Columna J: S3-E2 (Juegos a favor Equipo 2 Set 3)
 * - Columna K: P-E1 (Puntos a favor equipo 1)
 * - Columna L: P-E2 (Puntos a favor equipo 2)
 * 
 * Retorna un JSON con todas las rondas, sus fechas y enfrentamientos completos.
 * Incluye información sobre si el enfrentamiento se jugó y si fue victoria en 2 sets.
 */

function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Obtener datos de la hoja "Fechas"
    const fechasSheet = spreadsheet.getSheetByName('Fechas');
    if (!fechasSheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No se encontró la hoja "Fechas"'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const fechasData = fechasSheet.getDataRange().getValues();
    const fechasHeaders = fechasData[0];
    
    // Buscar índices de columnas (flexible para diferentes estructuras)
    let rondaIndex = -1;
    let fechaInicioIndex = -1;
    let fechaFinIndex = -1;
    
    fechasHeaders.forEach((header, index) => {
      const headerLower = String(header).toLowerCase().trim();
      
      // Buscar columna de ronda (más flexible)
      if (rondaIndex === -1 && (
        headerLower.includes('ronda') || 
        headerLower === 'ronda' ||
        headerLower === 'rondas' ||
        headerLower === 'numero' ||
        headerLower.includes('numero ronda')
      )) {
        rondaIndex = index;
      }
      
      // Buscar columna de fecha inicio (más flexible)
      if (fechaInicioIndex === -1 && (
        headerLower.includes('inicio') || 
        headerLower.includes('fecha inicio') ||
        headerLower.includes('desde') ||
        headerLower.includes('start') ||
        headerLower.includes('comienzo')
      )) {
        fechaInicioIndex = index;
      }
      
      // Buscar columna de fecha fin (más flexible)
      if (fechaFinIndex === -1 && (
        (headerLower.includes('fin') && !headerLower.includes('inicio')) || 
        headerLower.includes('fecha fin') ||
        headerLower.includes('hasta') ||
        headerLower.includes('end') ||
        headerLower.includes('termina') ||
        headerLower.includes('termino') ||
        headerLower === 'termino'
      )) {
        fechaFinIndex = index;
      }
    });
    
    // Si no se encuentran las columnas, intentar usar las primeras 3 columnas por defecto
    if (rondaIndex === -1 && fechaInicioIndex === -1 && fechaFinIndex === -1 && fechasHeaders.length >= 3) {
      rondaIndex = 0;
      fechaInicioIndex = 1;
      fechaFinIndex = 2;
    }
    
    if (rondaIndex === -1 || fechaInicioIndex === -1 || fechaFinIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No se encontraron las columnas necesarias en la hoja "fechas". Se requieren: Ronda, Fecha Inicio, Fecha Fin',
          debug: {
            headersEncontrados: fechasHeaders,
            headersLower: fechasHeaders.map(h => String(h).toLowerCase().trim()),
            indices: {
              ronda: rondaIndex,
              fechaInicio: fechaInicioIndex,
              fechaFin: fechaFinIndex
            }
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Procesar datos de fechas
    const rondasFechas = {};
    for (let i = 1; i < fechasData.length; i++) {
      const row = fechasData[i];
      let ronda = String(row[rondaIndex] || '').trim();
      const fechaInicio = row[fechaInicioIndex];
      const fechaFin = row[fechaFinIndex];
      
      if (ronda && fechaInicio && fechaFin) {
        // Normalizar el nombre de la ronda para que coincida con "Ronda X"
        // Si es solo un número, agregar "Ronda " al inicio
        const rondaNumero = parseInt(ronda.replace(/[^0-9]/g, ''));
        if (rondaNumero && !ronda.toLowerCase().includes('ronda')) {
          ronda = `Ronda ${rondaNumero}`;
        } else if (rondaNumero) {
          // Si ya tiene "ronda" pero no está en formato estándar, normalizarlo
          ronda = `Ronda ${rondaNumero}`;
        }
        
        // Formatear fechas
        let fechaInicioFormatted = '';
        let fechaFinFormatted = '';
        
        if (fechaInicio instanceof Date) {
          fechaInicioFormatted = Utilities.formatDate(fechaInicio, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } else {
          fechaInicioFormatted = String(fechaInicio).trim();
        }
        
        if (fechaFin instanceof Date) {
          fechaFinFormatted = Utilities.formatDate(fechaFin, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } else {
          fechaFinFormatted = String(fechaFin).trim();
        }
        
        // Guardar con el nombre normalizado
        rondasFechas[ronda] = {
          fechaInicio: fechaInicioFormatted,
          fechaFin: fechaFinFormatted
        };
        
        // También guardar con el número solo por si acaso
        if (rondaNumero) {
          rondasFechas[`Ronda ${rondaNumero}`] = {
            fechaInicio: fechaInicioFormatted,
            fechaFin: fechaFinFormatted
          };
        }
      }
    }
    
    // Obtener todas las rondas y sus enfrentamientos
    const rondas = [];
    const numRondas = 7; // Total de rondas
    
    for (let i = 1; i <= numRondas; i++) {
      const rondaNombre = `Ronda ${i}`;
      const rondaSheet = spreadsheet.getSheetByName(rondaNombre);
      
      if (!rondaSheet) {
        // Si no existe la hoja, continuar con la siguiente
        continue;
      }
      
      const rondaData = rondaSheet.getDataRange().getValues();
      
      // Obtener enfrentamientos
      // Columna A (0): Equipo 1
      // Columna B (1): Equipo 2
      // Columna C (2): S-E1 (Sets a favor equipo 1)
      // Columna D (3): S-E2 (Sets a favor equipo 2)
      // Columna E (4): S1-E1 (Juegos a favor Equipo 1 Set 1)
      // Columna F (5): S1-E2 (Juegos a favor Equipo 2 Set 1)
      // Columna G (6): S2-E1 (Juegos a favor Equipo 1 Set 2)
      // Columna H (7): S2-E2 (Juegos a favor Equipo 2 Set 2)
      // Columna I (8): S3-E1 (Juegos a favor Equipo 1 Set 3)
      // Columna J (9): S3-E2 (Juegos a favor Equipo 2 Set 3)
      // Columna K (10): P-E1 (Puntos a favor equipo 1)
      // Columna L (11): P-E2 (Puntos a favor equipo 2)
      const enfrentamientos = [];
      
      for (let j = 1; j < rondaData.length; j++) {
        const row = rondaData[j];
        const equipo1 = String(row[0] || '').trim();
        const equipo2 = String(row[1] || '').trim();
        
        // Solo agregar si ambos equipos tienen datos
        if (equipo1 && equipo2) {
          // Función auxiliar para convertir valores a número o mantener string
          function parseValue(value) {
            if (value === null || value === undefined || value === '') {
              return 0;
            }
            const strValue = String(value).trim();
            if (strValue === '-' || strValue === '') {
              return '-';
            }
            const numValue = parseFloat(strValue);
            return isNaN(numValue) ? strValue : numValue;
          }
          
          // Obtener valores de las columnas
          const setsEquipo1 = parseValue(row[2]); // S-E1
          const setsEquipo2 = parseValue(row[3]); // S-E2
          const juegosSet1Equipo1 = parseValue(row[4]); // S1-E1
          const juegosSet1Equipo2 = parseValue(row[5]); // S1-E2
          const juegosSet2Equipo1 = parseValue(row[6]); // S2-E1
          const juegosSet2Equipo2 = parseValue(row[7]); // S2-E2
          const juegosSet3Equipo1 = parseValue(row[8]); // S3-E1
          const juegosSet3Equipo2 = parseValue(row[9]); // S3-E2
          const puntosEquipo1 = parseValue(row[10]); // P-E1
          const puntosEquipo2 = parseValue(row[11]); // P-E2
          
          // Determinar si el enfrentamiento se jugó
          // Si todos los campos numéricos están en 0, el partido no se ha jugado
          const valoresNumericos = [
            setsEquipo1, setsEquipo2,
            juegosSet1Equipo1, juegosSet1Equipo2,
            juegosSet2Equipo1, juegosSet2Equipo2,
            juegosSet3Equipo1, juegosSet3Equipo2,
            puntosEquipo1, puntosEquipo2
          ];
          
          const todosCeros = valoresNumericos.every(val => {
            if (val === '-') return false;
            const num = typeof val === 'number' ? val : parseFloat(val);
            return !isNaN(num) && num === 0;
          });
          
          const jugado = !todosCeros;
          
          // Determinar si se jugó en 2 sets (si el set 3 tiene "-")
          const victoriaEn2Sets = (juegosSet3Equipo1 === '-' || juegosSet3Equipo2 === '-');
          
          enfrentamientos.push({
            equipo1: equipo1,
            equipo2: equipo2,
            setsEquipo1: setsEquipo1,
            setsEquipo2: setsEquipo2,
            juegosSet1Equipo1: juegosSet1Equipo1,
            juegosSet1Equipo2: juegosSet1Equipo2,
            juegosSet2Equipo1: juegosSet2Equipo1,
            juegosSet2Equipo2: juegosSet2Equipo2,
            juegosSet3Equipo1: juegosSet3Equipo1,
            juegosSet3Equipo2: juegosSet3Equipo2,
            puntosEquipo1: puntosEquipo1,
            puntosEquipo2: puntosEquipo2,
            jugado: jugado,
            victoriaEn2Sets: victoriaEn2Sets
          });
        }
      }
      
      // Obtener fechas de esta ronda
      const fechasRonda = rondasFechas[rondaNombre] || rondasFechas[`Ronda ${i}`] || {
        fechaInicio: '',
        fechaFin: ''
      };
      
      rondas.push({
        ronda: rondaNombre,
        numero: i,
        fechaInicio: fechasRonda.fechaInicio,
        fechaFin: fechasRonda.fechaFin,
        enfrentamientos: enfrentamientos
      });
    }
    
    // Ordenar rondas por número
    rondas.sort((a, b) => a.numero - b.numero);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: rondas,
        totalRondas: rondas.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función de prueba para desarrollo local
 */
function testRondas() {
  const result = doGet({});
  Logger.log(result.getContent());
}

