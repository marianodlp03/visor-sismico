/*
Este archivo contiene las configuracines de los "panes", compuesto por un objeto global con las 
enumeraciones de los símbolos y otro con las de los "z-index".
Cuanto mayor sea el "z-index", mayor prioridad tendrá el "pane" y por tanto se mostrará por encima
de "panes" de menor "z-index".
Se puede editar este archivo para añadir nuevos "panes" personalizados.

Valores por defecto:
  - Lienzo (canvas): 100.
  - Elementos SVG: 200.
  - Capas base (tile): 200.
  - Capas de superposición (overlay): 400.
  - Sombras (shadow): 500.
  - Marcadores (marker): 600.
  - Tooltips: 650.
  - Popups: 700.

This file contains the configurations for the "panes", composed of a global object with
the enumerations for the symbols and another for the "z-index" values.
The higher the "z-index", the highest the priority of the "pane", and thus, it will be
displayed above "panes" with lower "z-index".
This file can be edited to add new customized "panes".

Default values:
  - Canvas: 100.
  - SVG elements: 200.
  - Base layers (tiles): 200.
  - Overlay layers: 400
  - Sombras: 500.
  - Marcadores: 600.
  - Tooltips: 650.
  - Popups: 700.
*/

PaneSymbol = {
  INTENSITIES:' intensities',
  REGIONS: 'regions',
  PROVINCES: 'provinces',
  TERRITORIAL_LIMIT: 'territorialLimit',
  FILTER_BUFFER: 'filterBuffer', // No es una capa de usuario / Not an user layer
  QUAKES: 'quakes',
  DUPLICATED_QUAKES: 'duplicatedQuakes',
  POPULATIONS: 'populations',
  DUPLICATED_POPULATIONS: 'duplicatedPopulations',
  FAULTS: 'faults',
  DUPLICATED_FAULTS: 'duplicatedFaults',
  IMPORTED_LAYER: 'importedLayer',
  FILTER_CIRCLE: 'filterCircle' // No es una capa de usuario / Not an user layer
}

PaneZIndex = {
  INTENSITIES: 290,
  REGIONS: 300,
  PROVINCES: 310,
  TERRITORIAL_LIMIT: 311,
  FILTER_BUFFER: 320, // No es una capa de usuario / Not an user layer
  QUAKES: 330,
  DUPLICATED_QUAKES: 340,
  POPULATIONS: 350,
  DUPLICATED_POPULATIONS: 360,
  FAULTS: 370,
  DUPLICATED_FAULTS: 380,
  IMPORTED_LAYER: 390,
  FILTER_CIRCLE: 400 // No es una capa de usuario / Not an user layer
}