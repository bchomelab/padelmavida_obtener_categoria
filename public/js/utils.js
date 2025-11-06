// === Funciones de Utilidad ===

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

// Limpiar el input
function limpiarInput() {
  const input = document.getElementById("rut");
  const resultado = document.getElementById("resultado");
  input.value = "";
  resultado.innerHTML = "";
  input.focus();
}

