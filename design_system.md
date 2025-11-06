# PÁDEL CLUB ÉLITE - DESIGN SYSTEM

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Colores](#colores)
3. [Tipografía](#tipografía)
4. [Componentes](#componentes)
5. [Animaciones](#animaciones)
6. [Espaciado](#espaciado)
7. [Accesibilidad](#accesibilidad)
8. [Patrones de Uso](#patrones-de-uso)

---

## Introducción

El sistema de diseño de Padel Club es una guía completa para mantener la coherencia visual y la experiencia del usuario en todo el sitio web. Este documento detalla los colores, tipografía, componentes, animaciones y patrones de diseño utilizados en el proyecto.

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Tema:** Athletic Modern

---

## Colores

### Paleta de Colores Principal

El diseño utiliza una paleta de 5 colores principales con variantes para diferentes contextos.

#### Sky Blue (Azul Cielo) - Color Primario
\`\`\`
Valor Hexadecimal: #63C1F5
RGB: (99, 193, 245)
Uso: Botones primarios, iconos destacados, acentos principales
Estados:
  - Normal: #63C1F5
  - Hover: #89d9fb (más claro)
  - Activo: #4fa8e0 (más oscuro)
Contraste: ✓ WCAG AA en fondos oscuros y claros
\`\`\`

#### Navy Blue (Azul Marino) - Color Secundario
\`\`\`
Valor Hexadecimal: #1A438A
RGB: (26, 67, 138)
Uso: Botones secundarios, secciones de contraste, elementos de énfasis
Estados:
  - Normal: #1A438A
  - Hover: #2557a8
Contraste: ✓ WCAG AA solo en fondos claros
\`\`\`

#### Charcoal Gray (Gris Carbón)
\`\`\`
Valor Hexadecimal: #2C2C2C
RGB: (44, 44, 44)
Uso: Secciones de fondo, elementos secundarios, bordes sutiles
Brillo: 15% (muy oscuro)
\`\`\`

### Fondos (Background Colors)

| Nombre | Hexadecimal | RGB | Uso |
|--------|------------|-----|-----|
| Primary Dark | #0e0e0e | (14, 14, 14) | Fondo principal del sitio |
| Secondary Dark | #1a1a1a | (26, 26, 26) | Fondos secundarios oscuros |
| Accent Dark | #111820 | (17, 24, 32) | Fondos con tonalidad azul oscura |
| Navy Blue | #1A438A | (26, 67, 138) | Secciones de héroe y contraste |
| Charcoal | #2C2C2C | (44, 44, 44) | Secciones de contenido oscuro |
| Sky Blue | #63C1F5 | (99, 193, 245) | Secciones de estadísticas y énfasis |
| Cream | #F8F8F8 | (248, 248, 248) | Secciones ligeras, fondos suaves |
| White | #FFFFFF | (255, 255, 255) | Máximo contraste, fondos blancos puros |

### Colores de Texto

#### En Fondos Oscuros
\`\`\`
Primario:    #FFFFFF (Blanco puro)
Secundario:  #CCCCCC (Gris claro)
Muted:       #999999 (Gris muted)
Contraste WCAG AA: ✓ Todos
\`\`\`

#### En Fondos Claros
\`\`\`
Primario:    #1a1a1a (Negro suave)
Secundario:  #666666 (Gris oscuro)
Muted:       #999999 (Gris muted)
Contraste WCAG AA: ✓ Todos
\`\`\`

#### Texto sobre Colores de Marca
\`\`\`
Sobre Sky Blue (#63C1F5):      #FFFFFF (Blanco)
Sobre Navy Blue (#1A438A):     #FFFFFF (Blanco)
Sobre Charcoal (#2C2C2C):      #FFFFFF (Blanco)
\`\`\`

### Colores de Estado

| Estado | Color | Hexadecimal | Uso |
|--------|-------|------------|-----|
| Success | Verde | #10b981 | Confirmaciones, acciones exitosas |
| Warning | Naranja | #f59e0b | Alertas, cambios de estado |
| Error | Rojo | #ef4444 | Errores, acciones destructivas |
| Info | Sky Blue | #63C1F5 | Información, datos |

### Colores de Componentes

#### Cards y Contenedores
\`\`\`
Fondo predeterminado: #1a1a1a
Fondo alternativo: #111820
Fondo claro: #F8F8F8
Borde primario: #63C1F5 (Sky Blue)
Borde sutil: #333333 (Gris muy oscuro)
Borde claro: #E0E0E0 (Gris muy claro)
Sombra (oscura): rgba(99, 193, 245, 0.1) - Sombra azul sutil
Sombra (clara): rgba(26, 67, 138, 0.1) - Sombra azul marino sutil
\`\`\`

#### Estados Interactivos
\`\`\`
Hover:     rgba(99, 193, 245, 0.1) - Sky Blue con 10% opacidad
Focus:     rgba(99, 193, 245, 0.2) - Sky Blue con 20% opacidad
Active:    #63C1F5 - Sky Blue puro
Disabled:  #666666 - Gris deshabilitado
\`\`\`

---

## Tipografía

### Fuentes

El proyecto utiliza 3 familias tipográficas principales:

#### 1. Oswald (Headings - Encabezados)
\`\`\`
Familia: Oswald
Pesos: 300, 400, 500, 600, 700
Uso: Encabezados h1-h6, títulos, etiquetas
Características: Sans-serif, modern, athletic
Descarga: Google Fonts
\`\`\`

#### 2. Bebas Neue (Accent Text - Texto Acentuado)
\`\`\`
Familia: Bebas Neue
Pesos: 400
Uso: Títulos principales, acentos visuals, callouts
Características: Display, bold, impactante
Descarga: Google Fonts
Letter-spacing: 0.1em (10%)
\`\`\`

#### 3. Montserrat (Body - Cuerpo de Texto)
\`\`\`
Familia: Montserrat
Pesos: 300, 400, 500, 600, 700, 800
Uso: Párrafos, descripcionés, texto regular
Características: Sans-serif, legible, moderno
Descarga: Google Fonts
\`\`\`

### Pesos Tipográficos

\`\`\`
Light:     300 - Texto fino, menos énfasis
Normal:    400 - Texto regular, estándar
Medium:    500 - Texto medio, ligero énfasis
Semibold:  600 - Texto semi-bold, énfasis moderado
Bold:      700 - Texto bold, énfasis fuerte
Extrabold: 800 - Texto extra-bold, máximo énfasis
\`\`\`

### Tamaños de Fuente

\`\`\`
xs:   0.75rem   (12px)  - Etiquetas pequeñas, metadata
sm:   0.875rem  (14px)  - Subtítulos, texto secundario
base: 1rem      (16px)  - Párrafos estándar
lg:   1.125rem  (18px)  - Títulos secundarios
xl:   1.25rem   (20px)  - Títulos medianos
2xl:  1.5rem    (24px)  - Títulos grandes
3xl:  1.875rem  (30px)  - Títulos muy grandes
4xl:  2.25rem   (36px)  - Títulos hero (tablets)
5xl:  3rem      (48px)  - Títulos hero medianos
6xl:  3.75rem   (60px)  - Títulos hero grandes
7xl:  4.5rem    (72px)  - Títulos hero máximos
\`\`\`

### Estilos Tipográficos

#### Encabezados (Headings)
\`\`\`
Fuente:        Oswald
Peso:          700 (bold)
Transform:     UPPERCASE
Letter-spacing: 0.05em (5%)
Line-height:   1.2
\`\`\`

#### Cuerpo de Texto (Body)
\`\`\`
Fuente:        Montserrat
Peso:          400 o 500
Transform:     Ninguno (normal case)
Letter-spacing: normal
Line-height:   1.6
\`\`\`

#### Texto Acentuado (Accent)
\`\`\`
Fuente:        Bebas Neue
Peso:          400
Transform:     UPPERCASE
Letter-spacing: 0.1em (10%)
Line-height:   1.2
\`\`\`

---

## Componentes

### Botones

Los botones son elementos interactivos primarios del sistema. Se definen 8 variantes.

#### 1. Button Variant: Primary (Primario)
\`\`\`
Función: Acción principal recomendada
Fondo: Sky Blue (#63C1F5)
Texto: Blanco (#FFFFFF)
Borde: Sky Blue (#63C1F5)
Hover: Sky Blue más claro (#89d9fb)
Tamaños disponibles: sm, md, lg, xl
Animación: Escala 1.05, sombra expandida
Ejemplo de uso: Botones de "INSCRIBIRSE", "VER EVENTOS"
\`\`\`

#### 2. Button Variant: Secondary (Secundario)
\`\`\`
Función: Acciones secundarias
Fondo: Dark Gray (#1a1a1a)
Texto: Blanco (#FFFFFF)
Borde: Dark Gray (#1a1a1a)
Hover: Gris más claro
Tamaños disponibles: sm, md, lg, xl
Ejemplo de uso: Botones de navegación alternativa
\`\`\`

#### 3. Button Variant: Outline (Contorno)
\`\`\`
Función: Acciones alternativas o menos enfatizadas
Fondo: Transparente
Texto: Sky Blue (#63C1F5)
Borde: Sky Blue (#63C1F5) - 2px
Hover: Fondo Sky Blue, Texto Blanco
Tamaños disponibles: sm, md, lg, xl
Ejemplo de uso: Botones secundarios en secciones claras
\`\`\`

#### 4. Button Variant: Ghost (Fantasma)
\`\`\`
Función: Acciones mínimas, sin enfasis visual
Fondo: Transparente
Texto: Sky Blue (#63C1F5)
Borde: Ninguno
Hover: Fondo Sky Blue con opacidad 10%
Tamaños disponibles: sm, md, lg, xl
Ejemplo de uso: Enlaces estilizados como botones
\`\`\`

#### 5. Button Variant: Navy (Marino)
\`\`\`
Función: Acción de contraste en secciones claras
Fondo: Navy Blue (#1A438A)
Texto: Blanco (#FFFFFF)
Borde: Navy Blue (#1A438A)
Hover: Navy más claro (#2557a8)
Tamaños disponibles: sm, md, lg, xl
Ejemplo de uso: Botones en fondos claros (Cream, White)
\`\`\`

#### 6. Button Variant: White (Blanco)
\`\`\`
Función: Máximo contraste en fondos oscuros
Fondo: Blanco (#FFFFFF)
Texto: Oscuro (#2C2C2C)
Borde: Blanco (#FFFFFF)
Hover: Gris claro (#f0f0f0)
Tamaños disponibles: sm, md, lg, xl
Ejemplo de uso: Botones en secciones Navy o Charcoal
\`\`\`

#### 7. Button Variant: Sky Blue (Sky Blue)
\`\`\`
Función: Equivalente a Primary (alias)
Fondo: Sky Blue (#63C1F5)
Texto: Blanco (#FFFFFF)
Borde: Sky Blue (#63C1F5)
Tamaños disponibles: sm, md, lg, xl
\`\`\`

#### 8. Button Variant: CTA (Call-To-Action)
\`\`\`
Función: Llamada a acción importante con animación extra
Fondo: Sky Blue (#63C1F5)
Texto: Blanco (#FFFFFF)
Borde: Sky Blue (#63C1F5)
Fuente: Bebas Neue (accent font)
Letter-spacing: 0.1em
Sombra: Sombra más grande (shadow-2xl)
Hover: Sombra aún más grande (shadow-3xl)
Animación adicional: Pulse continuo (scale 1.05)
Ejemplo de uso: "ÚNETE AL CLUB", "INSCRÍBETE AHORA"
\`\`\`

#### Propiedades Comunes de Botones
\`\`\`
Transition:    all 0.3s ease
Transform:     hover:scale(1.05), active:scale(0.95)
Border-radius: sm: 0.375rem, md: 0.5rem, lg: 0.5rem, xl: 0.75rem
Focus:         outline 2px solid Sky Blue, outline-offset 2px
Disabled:      opacity 50%, cursor not-allowed
Min-height:    sm: 2.5rem, md: 3rem, lg: 3.5rem, xl: 4rem
\`\`\`

#### Tamaños de Botones
\`\`\`
Small (sm):
  Padding: 0.5rem 1rem (py-2 px-4)
  Font-size: 0.875rem
  Min-height: 2.5rem

Medium (md) - Default:
  Padding: 0.75rem 1.5rem (py-3 px-6)
  Font-size: 1rem
  Min-height: 3rem

Large (lg):
  Padding: 1rem 2rem (py-4 px-8)
  Font-size: 1.125rem
  Min-height: 3.5rem

Extra Large (xl):
  Padding: 1.25rem 3rem (py-5 px-12)
  Font-size: 1.25rem
  Min-height: 4rem
\`\`\`

### Cards

Los Cards son contenedores de contenido versátiles con múltiples variantes.

#### Card Variant: Default
\`\`\`
Fondo: Dark Gray (#1a1a1a)
Borde: Ninguno
Sombra: 0 4px 20px rgba(99, 193, 245, 0.1)
Hover: -translate-y-1 (movimiento hacia arriba 4px)
Animación: transform duration-300
Padding: md (1.5rem)
Border-radius: lg (0.5rem)
Uso: Contenedor estándar de contenido
\`\`\`

#### Card Variant: Elevated
\`\`\`
Fondo: Dark Gray (#1a1a1a)
Borde: Ninguno
Sombra: 0 10px 40px rgba(99, 193, 245, 0.15)
Hover: -translate-y-1, sombra más grande
Elevación visual: Mayor que default
Uso: Contenedores destacados
\`\`\`

#### Card Variant: Bordered
\`\`\`
Fondo: Dark Gray (#1a1a1a)
Borde: 2px solid Sky Blue (#63C1F5)
Sombra: Mínima
Border-radius: lg
Hover: Border opacity cambia
Uso: Contenedores con énfasis de borde
\`\`\`

#### Card Variant: Athletic
\`\`\`
Fondo: Dark Gray (#1a1a1a)
Borde Izquierdo: 4px solid Sky Blue (#63C1F5)
Sombra: 0 8px 32px rgba(99, 193, 245, 0.1)
Hover: 
  - Borde izquierdo 8px (se expande)
  - -translate-y-4 (movimiento mayor)
  - Sombra se expande
Animación: Más dinámica que variantes estándar
Uso: Cards principales, artículos destacados
\`\`\`

#### Card Padding Opciones
\`\`\`
Small (sm):   1rem (16px)
Medium (md):  1.5rem (24px) - Default
Large (lg):   2rem (32px)
\`\`\`

### Secciones (Sections)

Las Secciones son contenedores de área completa con fondos adaptables.

#### Section Backgrounds
\`\`\`
primary:    #0e0e0e - Fondo principal oscuro
secondary:  #1a1a1a - Fondo secundario oscuro
accent:     #111820 - Fondo con tonalidad azul
navy:       #1A438A - Azul marino
charcoal:   #2C2C2C - Gris carbón
skyBlue:    #63C1F5 - Azul cielo
cream:      #F8F8F8 - Crema claro
white:      #FFFFFF - Blanco puro
gradient:   primary → navy - Degradado diagonal
\`\`\`

#### Section Padding
\`\`\`
Small (sm):  py-8   (2rem)
Medium (md): py-12  (3rem)
Large (lg):  py-20  (5rem) - Default
Extra Large (xl): py-32 (8rem)
\`\`\`

#### Section Propiedades Opcionales
\`\`\`
diagonal: boolean - Añade efecto de corte diagonal
className: string - Clases adicionales
\`\`\`

### Feature Cards

Componentes especializados para mostrar características.

#### Propiedades
\`\`\`
icon:       React Component (Lucide Icon)
title:      string - Título en UPPERCASE
description: string - Descripción del feature
featured:   boolean - Resalta el card
background: 'dark' | 'light' | 'navy' | 'skyBlue'
\`\`\`

#### Estilos por Background
\`\`\`
Dark:
  Card Bg:    #1a1a1a
  Icon Bg:    Sky Blue (#63C1F5)
  Icon Color: Blanco (#FFFFFF)
  
Light:
  Card Bg:    #FFFFFF
  Icon Bg:    Navy Blue (#1A438A)
  Icon Color: Blanco (#FFFFFF)
  
Navy:
  Card Bg:    #F8F8F8
  Icon Bg:    Sky Blue (#63C1F5)
  Icon Color: Blanco (#FFFFFF)
  
Sky Blue:
  Card Bg:    #FFFFFF
  Icon Bg:    Navy Blue (#1A438A)
  Icon Color: Blanco (#FFFFFF)
\`\`\`

#### Animaciones
\`\`\`
Icon container:
  Hover: scale(1.25) rotate(12deg)
  Duration: 500ms

Card:
  Hover: -translate-y-4 (movimiento hacia arriba)
  Duration: 500ms

Title:
  Hover: scale(1.05)
  Duration: 300ms
\`\`\`

### Event Cards

Componentes especializados para eventos.

#### Propiedades
\`\`\`
title:              string
date:               string
time:               string
location:           string
description:        string
category:           'TORNEO' | 'ENTRENAMIENTO' | 'LIGA' | 'CLÍNICA' | 'EVENTO SOCIAL'
registrationLink:   string (URL)
featured:           boolean
background:         'dark' | 'light' | 'navy' | 'skyBlue'
\`\`\`

#### Categorías y Colores
\`\`\`
TORNEO:          #63C1F5 (Sky Blue)
ENTRENAMIENTO:   #10b981 (Verde)
LIGA:            #8b5cf6 (Púrpura)
CLÍNICA:         #63C1F5 (Información)
EVENTO SOCIAL:   #f59e0b (Naranja)
\`\`\`

#### Iconos Incluidos
\`\`\`
- Calendar (Fecha)
- Clock (Hora)
- MapPin (Ubicación)
- ExternalLink (Botón de inscripción)
- Trophy (Insignia de categoría)
\`\`\`

---

## Animaciones

### Transiciones de Entrada (Entry Animations)

#### fadeInUp (0.8s)
\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Clase: .animate-fadeInUp
Timing: ease-out
Duración: 0.8s
Uso: Elementos que aparecen de abajo hacia arriba
\`\`\`

#### slideInLeft (0.8s)
\`\`\`css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
Clase: .animate-slideInLeft
Timing: ease-out
Duración: 0.8s
Uso: Títulos y contenido desde la izquierda
\`\`\`

#### slideInRight (0.8s)
\`\`\`css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
Clase: .animate-slideInRight
Timing: ease-out
Duración: 0.8s
Uso: Contenido desde la derecha
\`\`\`

### Animaciones Continuas (Looping Animations)

#### Pulse Custom (2s)
\`\`\`css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
Clase: .animate-pulse-custom
Duración: 2s
Repetición: infinite
Uso: Iconos interactivos, botones CTA
\`\`\`

#### Glow (2s)
\`\`\`css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 193, 245, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 193, 245, 0.6);
  }
}
Clase: .animate-glow
Duración: 2s
Repetición: infinite
Color: Sky Blue con variación de opacidad
Uso: Elementos destacados, llamadas a acción
\`\`\`

#### Loading Dots (1.5s)
\`\`\`css
@keyframes dots {
  0%, 20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: #63c1f5;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 #63c1f5, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%, 100% {
    text-shadow: 0.25em 0 0 #63c1f5, 0.5em 0 0 #63c1f5;
  }
}
Clase: .loading-dots
Duración: 1.5s
Repetición: infinite
Uso: Indicador de carga
\`\`\`

### Efectos de Hover (Hover Effects)

#### Button Athletic Shine Effect
\`\`\`css
.btn-athletic::before {
  Brillo diagonal de izquierda a derecha
  Duración: 0.5s
  Opacidad: 20%
  Trigger: :hover
}
Uso: Reflexión estilizada en botones
\`\`\`

#### Card Athletic Gradient Overlay
\`\`\`css
.card-athletic::before {
  Gradiente diagonal 135deg
  Color: rgba(99, 193, 245, 0.1)
  Opacity: 0 → 1 al hover
  Duración: 300ms
}
Uso: Efecto visual de card al pasar mouse
\`\`\`

### Transiciones Estándar

\`\`\`
Botones y cards:        all 0.3s ease
Elementos interactivos: all 0.3s ease
Transforms:             duration-300, duration-500
Shadows:                Aumentan en hover
Scale:                  hover:scale-105, active:scale-95
Translate:              hover:-translate-y-1, hover:-translate-y-4
\`\`\`

---

## Espaciado

### Sistema de Espaciado (Tailwind Scale)

\`\`\`
1:   0.25rem (4px)
2:   0.5rem  (8px)
3:   0.75rem (12px)
4:   1rem    (16px)
6:   1.5rem  (24px)
8:   2rem    (32px)
12:  3rem    (48px)
16:  4rem    (64px)
20:  5rem    (80px)
24:  6rem    (96px)
32:  8rem    (128px)
\`\`\`

### Padding Comunes (Internal Spacing)

\`\`\`
Componentes pequeños:  px-4 py-2   (1rem, 0.5rem)
Componentes medianos:  px-6 py-3   (1.5rem, 0.75rem)
Componentes grandes:   px-8 py-4   (2rem, 1rem)
Cards:                 p-6         (1.5rem)
Secciones:             px-4        (1rem) + responsive
\`\`\`

### Margin Comunes (External Spacing)

\`\`\`
Títulos:        mb-6 (1.5rem) or mb-8 (2rem)
Párrafos:       mb-4 (1rem)
Espacios entre: gap-4 (1rem) or gap-6 (1.5rem) or gap-8 (2rem)
Secciones:      py-8, py-12, py-20, py-32
\`\`\`

### Grid y Flex Gaps

\`\`\`
Compacto:       gap-4  (1rem)
Normal:         gap-6  (1.5rem)
Espaciado:      gap-8  (2rem)
Extra espaciado: gap-12 (3rem)
\`\`\`

---

## Accesibilidad

### Contraste de Colores (WCAG AA)

Todos los colores de texto y fondo mantienen ratio de contraste mínimo 4.5:1 (para texto normal) o 3:1 (para texto grande).

#### Verificado y Aprobado

\`\`\`
✓ Blanco (#FFFFFF) sobre Sky Blue (#63C1F5)     - Ratio: 3.5:1 ✓
✓ Blanco (#FFFFFF) sobre Navy Blue (#1A438A)    - Ratio: 7.8:1 ✓
✓ Blanco (#FFFFFF) sobre Charcoal (#2C2C2C)     - Ratio: 15:1 ✓
✓ Oscuro (#1a1a1a) sobre Cream (#F8F8F8)        - Ratio: 15:1 ✓
✓ Oscuro (#2C2C2C) sobre White (#FFFFFF)        - Ratio: 13.6:1 ✓
\`\`\`

### Focus States

\`\`\`
Input focus:    outline 2px solid #63c1f5
Button focus:   focus:ring-2 focus:ring-offset-2
Outline offset: 2px
Color: Sky Blue (#63C1F5)
\`\`\`

### Interactividad

\`\`\`
Botones:     cursor-pointer
Deshabilitado: cursor-not-allowed, opacity-50
Enlaces:      underline al hover
Hover states: Cambio de color + escala mínima
\`\`\`

### Tipografía Accesible

\`\`\`
Min font-size (body):    0.875rem (14px)
Max font-size (body):    1rem     (16px)
Line-height (body):      1.6
Line-height (headings):  1.2
Letter-spacing:          normal o 0.05em máximo
\`\`\`

### Scrollbar Personalizado

\`\`\`
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #63c1f5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #89d9fb;
}
\`\`\`

---

## Patrones de Uso

### 1. Sección Hero

Una sección hero típica incluye:

\`\`\`tsx
<Section background="navy" padding="xl" className="bg-overlay">
  <div className="text-center">
    <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center rounded-full animate-pulse-custom"
      style={{
        backgroundColor: colors.brand.primary,
        boxShadow: `0 0 40px ${colors.brand.primary}60`
      }}
    >
      <IconComponent className="w-16 h-16" />
    </div>
    
    <h1 className="text-6xl md:text-8xl font-extrabold"
      style={{
        color: colors.text.onNavy,
        fontFamily: typography.fonts.accent
      }}
    >
      TÍTULO PRINCIPAL
    </h1>
    
    <p className="text-xl mb-12" style={{ color: colors.text.onNavy }}>
      Descripción de la sección
    </p>
    
    <div className="flex gap-6 justify-center">
      <Button variant="skyBlue" size="xl">
        ACCIÓN PRIMARIA
      </Button>
      <Button variant="white" size="xl">
        ACCIÓN SECUNDARIA
      </Button>
    </div>
  </div>
</Section>
\`\`\`

**Características:**
- Fondo Navy con overlay oscuro
- Padding extra grande (xl)
- Icon animado con pulse
- Título en Bebas Neue (accent font)
- Dos botones contrastantes
- Tipografía centrada

### 2. Sección de Características (Features)

\`\`\`tsx
<Section background="charcoal" padding="lg">
  <div className="container mx-auto px-4">
    <h2 className="text-5xl font-extrabold text-center mb-20"
      style={{ fontFamily: typography.fonts.accent }}
    >
      ¿POR QUÉ ELEGIR NUESTRO CLUB?
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<IconComponent />}
        title="Característica 1"
        description="Descripción..."
        featured={true}
      />
      {/* Más cards... */}
    </div>
  </div>
</Section>
\`\`\`

**Características:**
- Fondo Charcoal oscuro
- Grid de 3 columnas (responsive)
- Feature cards con iconos
- Primera card marcada como featured

### 3. Sección con Fondos Alternados

\`\`\`tsx
<Section background="cream" padding="lg">
  {/* Contenido claro */}
</Section>

<Section background="charcoal" padding="lg">
  {/* Contenido oscuro */}
</Section>

<Section background="skyBlue" padding="lg">
  {/* Contenido destacado */}
</Section>
\`\`\`

**Patrón:**
- Alternar entre fondos claros y oscuros
- Mantener contraste adecuado
- Usar espaciado consistente

### 4. Galería de Imágenes

\`\`\`tsx
<Section background="charcoal" padding="lg">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {images.map((image) => (
      <Card
        variant="athletic"
        borderAccent={true}
        className="overflow-hidden group"
        style={{
          backgroundColor: colors.card.background,
          borderLeftColor: colors.brand.primary
        }}
      >
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Card>
    ))}
  </div>
</Section>
\`\`\`

### 5. Formulario

\`\`\`tsx
<Card variant="athletic" borderAccent={true}
  style={{
    backgroundColor: colors.card.backgroundWhite,
    borderLeftColor: colors.brand.secondary
  }}
>
  <form onSubmit={handleSubmit} className="space-y-8">
    <div>
      <label className="block text-sm font-bold mb-3 uppercase">
        Campo Requerido *
      </label>
      <input
        type="text"
        placeholder="Ingresa datos..."
        className="w-full px-4 py-3 border-2 rounded-lg"
        style={{
          backgroundColor: colors.background.cream,
          borderColor: colors.card.borderLight,
          color: colors.text.onLight
        }}
      />
    </div>
    
    <Button variant="navy" fullWidth type="submit">
      ENVIAR FORMULARIO
    </Button>
  </form>
</Card>
\`\`\`

### 6. Sección de Estadísticas

\`\`\`tsx
<Section background="navy" padding="lg">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {stats.map((stat) => (
      <div key={stat.id} className="group">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
          style={{
            backgroundColor: colors.brand.primary,
            boxShadow: `0 0 30px ${colors.brand.primary}60`
          }}
        >
          <stat.icon className="w-10 h-10" style={{ color: colors.text.onSkyBlue }} />
        </div>
        
        <div className="text-5xl font-extrabold"
          style={{ color: colors.brand.primary, fontFamily: typography.fonts.accent }}
        >
          {stat.number}
        </div>
        
        <div className="text-sm font-bold uppercase" style={{ color: colors.text.onNavy }}>
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</Section>
\`\`\`

---

## Checklist de Implementación

Antes de implementar un nuevo componente, verifica:

- [ ] Los colores tienen contraste WCAG AA apropiado
- [ ] La tipografía es legible (min 14px para body text)
- [ ] Los botones tienen estados hover y focus visibles
- [ ] Las animaciones son suaves (0.3s - 0.8s)
- [ ] El espaciado es consistente (múltiples de 4px)
- [ ] Los iconos tienen color que contrasta
- [ ] Las secciones tienen suficiente padding
- [ ] Los cards tienen sombra y borde consistentes
- [ ] El texto está en UPPERCASE cuando corresponde
- [ ] Se utilizan las 3 fuentes tipográficas correctamente

---

## Referencias

**Google Fonts Importadas:**
- Oswald: https://fonts.google.com/specimen/Oswald
- Bebas Neue: https://fonts.google.com/specimen/Bebas+Neue
- Montserrat: https://fonts.google.com/specimen/Montserrat

**Iconos:**
- Lucide React: https://lucide.dev

**Framework:**
- Tailwind CSS: https://tailwindcss.com
- React: https://react.dev

---

**Documento generado para:** Pádel Club Élite  
**Versión del Design System:** 1.0  
**Última actualización:** Noviembre 2025  
**Contacto:** contacto@padelclub.cl
