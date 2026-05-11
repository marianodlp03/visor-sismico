/*
Este archivo controla las funciones principales de idioma del visor, lo que permite crear textos específicos para
cada idioma. Para crear un idioma hay que crear un nuevo objeto estático dentro de la clase "LangangeFunctions"
con la clave del idioma, escribir esa clave dentro del objeto global de tipo array "availableLangages", y 
sustituir cada una de sus propiedades por el texto que se quiere mostrar en dicho idioma.
Es recomendable copiar y pegar alguno de los dos idiomas definidos por defecto para asegurarse de que se traducen
todos los textos del visor.

* Nota: para traducir los textos de los pop-ups de eventos consultar el archivo "PopupFunctions.js".

This file controls the visor main langange function, which lets the creation os specific texts for each langage.
To create a langage a new static object must be created inside the "LangageFunctions" class with the langage key,
type that key inside the "availableLangages" global array type object, and replace every of its properties with
the text desired to show in that langage. It is recomended to copy and paste any of the two default langages
to be sure that all texts are translated.

* Note: to translate event pop-ups consult the "PopupFunctions.js" file.
*/

availableLangages = ['spanish', 'english'];

class LangageFunctions {
  static getLangage() {
    return langage; // Modificar después
  }

  static getText(key, langage) {
    if (!langage) langage = this.getLangage();
    return this[langage][key];
  }

  static updateContextMenuTexts() {
    let i, item;
    const items = GeneralFunctions.getContextMenuItems();
    map.contextmenu.removeAllItems();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      map.contextmenu.addItem(item);
    }
  }

  static updateLayersTexts() {
    SidePanelFunctions.initializeQuakeFiltersInputs();
    SidePanelFunctions.initializeFaultFiltersInputs();
    SidePanelFunctions.initializePopulationFiltersInputs();
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removeAllLayers();
    LayerFunctions.removeLimitsLayers();
    LayerFunctions.removeFilterBufferLayer();
    LangageFunctions.updateLayerControlBaseLayersTexts();
    GeneralFunctions.initializeOverlayLayers();
    LayerFunctions.reorderOverlayLayersInControl();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    SidePanelFunctions.setFilterLegendAllLayersFilters();

  }

  static updateLayerControlBaseLayersTexts() {
    if (layerControl) {
      layerControl.removeLayer(emptyLayer);
      layerControl.removeLayer(osmLayer);
      layerControl.addBaseLayer(emptyLayer, LangageFunctions.getText('EMPTY_LAYER'));
      layerControl.addBaseLayer(osmLayer, LangageFunctions.getText('OSM_LAYER'));
    }
  }

  static spanish = {
    NAME: "Castellano",

    // Textos del control de capas
    EMPTY_LAYER: "Nada",
    OSM_LAYER: "Open Street Map",
    REGIONS_LAYER: "Comunidades Autónomas",
    PROVINCES_LAYER: "Provincias",
    TERRITORIAL_LIMIT: "Límite territorial",
    QUAKES_LAYER: "Sismos",
    FAULTS_LAYER: "Fallas",
    POPULATIONS_LAYER: "Poblaciones",
    INTENSITIES_LAYER: "Intensidades",
    DUPLICATED_QUAKES_LAYER: "Sismos (copia)",
    DUPLICATED_FAULTS_LAYER: "Fallas (copia)",
    DUPLICATED_POPULATIONS_LAYER: "Poblaciones (copia)",

    // Textos del panel lateral

    // Todos los filtros
    SIDE_PANEL_ALL_FILTERS_TAB_TITLE: "Filtrar todas las capas",
    SIDE_PANEL_ALL_FILTERS_TAB_DESCRIPTION: "Filtra las capas de sismos, fallas y poblaciones según los parámetros especificados.",
    SIDE_PANEL_QUAKE_FILTERS_TITLE: "Filtros de sismos",
    SIDE_PANEL_FAULT_FILTERS_TITLE: "Filtros de fallas",
    SIDE_PANEL_POPULATION_FILTERS_TITLE: "Filtros de poblaciones",

    // Filtros de sismos
    SIDE_PANEL_QUAKE_FILTERS_TAB_TITLE: "Filtrar capa de sismos",
    SIDE_PANEL_QUAKE_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de sismos según los parámetros especificados.",
    SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_TITLE: "Filtros de magnitud",
    SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_DESCRIPTION: "<em>La magnitud es un parámetro instrumental que mide la cantidad de enenergía liberada por el terremoto.</em>",
    SIDE_PANEL_QUAKE_MIN_MAGNITUDE_FILTER_TEXT: "Magnitud mínima:  ",
    SIDE_PANEL_QUAKE_MAX_MAGNITUDE_FILTER_TEXT: "Magnitud máxima:  ",
    SIDE_PANEL_QUAKE_INTENSITY_FILTERS_TITLE: "Filtros de intensidad",
    SIDE_PANEL_QUAKE_INTENSITY_FILTERS_DESCRIPTION: "<em>La intensidad es un parámetro que estima los efectos del terremoto en los alrededores.</em>",
    SIDE_PANEL_QUAKE_MIN_INTENSITY_FILTER_TEXT: "Intensidad mínima:  ",
    SIDE_PANEL_QUAKE_MAX_INTENSITY_FILTER_TEXT: "Intensidad máxima:  ",
    SIDE_PANEL_QUAKE_DEPTH_FILTERS_TITLE: "Filtros de profundidad",
    SIDE_PANEL_QUAKE_MIN_DEPTH_FILTER_TEXT: "Profundidad mínima [km]:  ",
    SIDE_PANEL_QUAKE_MAX_DEPTH_FILTER_TEXT: "Profundidad máxima [km]:  ",
    SIDE_PANEL_QUAKE_DATE_FILTERS_TITLE: "Filtros de fecha",
    SIDE_PANEL_QUAKE_MIN_DATE_FILTER_TEXT: "Fecha mínima:  ",
    SIDE_PANEL_QUAKE_MAX_DATE_FILTER_TEXT: "Fecha máxima:  ",
    SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY: "Desconocida",

    // Filtros de fallas
    SIDE_PANEL_FAULT_FILTERS_TAB_TITLE: "Filtrar la capa de fallas",
    SIDE_PANEL_FAULT_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de fallas según los parámetros especificados.<br><br>Las fallas que cruzan parcialmente el radio de búsqueda se consideran como dentro.",
    SIDE_PANEL_FAULT_MAGNITUDE_FILTERS_TITLE: "Filtros de magnitud",
    SIDE_PANEL_FAULT_MIN_MAGNITUDE_FILTER_TEXT: "Magnitud mínima esperable:  ",
    SIDE_PANEL_FAULT_MAX_MAGNITUDE_FILTER_TEXT: "Magnitud máxima esperable:  ",
    SIDE_PANEL_FAULT_DEPTH_FILTERS_TITLE: "Filtros de profundidad",
    SIDE_PANEL_FAULT_MIN_DEPTH_FILTER_TEXT: "Profundidad mínima [km]:  ",
    SIDE_PANEL_FAULT_MAX_DEPTH_FILTER_TEXT: "Profundidad máxima [km]:  ",

    // Filtros de poblaciones
    SIDE_PANEL_POPULATION_FILTERS_TAB_TITLE: "Filtrar capa de poblaciones",
    SIDE_PANEL_POPULATION_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de poblaciones según los parámetros especificados.",
    SIDE_PANEL_POPULATION_NUMBER_FILTERS_TITLE: "Filtros de número de habitantes",
    SIDE_PANEL_POPULATION_MIN_NUMBER_FILTER_TEXT: "Mínimo de habitantes:  ",
    SIDE_PANEL_POPULATION_MAX_NUMBER_FILTER_TEXT: "Máximo de habitantes:  ",

    // Filtros espaciales
    SIDE_PANEL_SPATIAL_FILTERS_TAB_TITLE: "Filtros espaciales",
    SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION: "Filtra los elementos de las capas cuyos centros (sismos y poblaciones) estén dentro del radio de búsqueda especificados o lo crucen (fallas).<br><br>Esta opción no filtra por ningún otro tipo de parámetro.",
    SIDE_PANEL_SPATIAL_FILTERS_TITLE: "Filtros espaciales",
    SIDE_PANEL_SPATIAL_FILTERS_COORDINATES_TITLE: "Coordenadas del centro de búsqueda",
    SIDE_PANEL_SPATIAL_FILTERS_RADIUS_TITLE: "Radio de búsqueda",
    SIDE_PANEL_SPATIAL_CONDITION_TITLE: "Condición",
    SIDE_PANEL_SPATIAL_LATITUDE_FILTER_TEXT: "Latitud [º]:  ",
    SIDE_PANEL_SPATIAL_LONGITUDE_FILTER_TEXT: "Longitud [º]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FILTER_TEXT: "Radio [km]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FIXED_TEXT: "Fijar",
    SIDE_PANEL_SPATIAL_INSIDE_TERRITORIAL_LIMIT_FILTER_TEXT: "Dentro de límite territorial",

    // Botones
    SIDE_PANEL_FILTER_BUTTON: "Filtrar",
    SIDE_PANEL_FILTER_ALL_BUTTON: "Filtrar todos",
    SIDE_PANEL_DUPLICATE_BUTTON: "Duplicar y filtrar",
    SIDE_PANEL_DUPLICATE_ALL_BUTTON: "Duplicar y filtrar todos",
    SIDE_PANEL_REFRESH_BUTTON: "Limpiar",
    SIDE_PANEL_REFRESH_ALL_BUTTON: "Limpiar todos",
    SIDE_PANEL_UNMARK_ALL_BUTTON: "Desmarcar todos",
    SIDE_PANEL_UNMARK_BUTTON: "Desmarcar",

    // Archivos
    SIDE_PANEL_FILES_TAB_TITLE: "Gestión de archivos",
    SIDE_PANEL_FILES_TAB_DESCRIPTION: "Importa capas desde archivos GeoJSON y exporta capas a formato CSV y GeoJSON.",
    SIDE_PANEL_FILES_IMPORT_TITLE: "Importar",
    SIDE_PANEL_FILES_IMPORT_LAYER_NAME_TEXT: "<b>Nombre (opcional)</b>:",
    SIDE_PANEL_FILES_IMPORT_LAYER_BUTTON_TEXT: "Cargar",
    SIDE_PANEL_FILES_EXPORT_TITLE: "Exportar",
    SIDE_PANEL_FILES_EXPORT_NAME_TEXT: "<b>Nombre:</b>  ",
    SIDE_PANEL_FILES_EXPORT_LAYER_TEXT: "<b>Capa:</b>  ",
    SIDE_PANEL_FILES_EXPORT_ONLY_VISIBLE_BOUNDS_TEXT: "Exportar vista actual",
    SIDE_PANEL_FILES_EXPORT_CSV_BUTTON_TEXT: "Exportar CSV",
    SIDE_PANEL_FILES_EXPORT_GEOJSON_BUTTON_TEXT: "Exportar GeoJSON",

    // Opciones
    SIDE_PANEL_OPTIONS_TITLE: "Opciones del visor",
    SIDE_PANEL_OPTIONS_DESCRIPTION: "Modifica el idioma, visibilidad de controles y estilos de capas",
    SIDE_PANEL_OPTIONS_LANGAGE_TITLE: "Idioma",
    SIDE_PANEL_OPTIONS_LANGAGE_TEXT: "<em><b>Aviso:</b> Cambiar el idioma reiniciará todas las capas a su estado inicial.</em>",
    SIDE_PANEL_OPTIONS_CONTROLS_TITLE: "Visibilidad de controles",
    SIDE_PANEL_OPTIONS_STYLES_TITLE: "Estilos de capas",
    SIDE_PANEL_OPTIONS_LAYER_CONTROL_ALWAYS_DEPLOYED_TEXT: "C. de capas siempre desplegado",
    SIDE_PANEL_OPTIONS_SCALEBAR_CONTROL_VISIBLE_TEXT: "Mostrar barra de escala",
    SIDE_PANEL_OPTIONS_COORDINATE_VISOR_CONTROL_VISIBLE_TEXT: "Mostrar visor de coordenadas",
    SIDE_PANEL_OPTIONS_FILTER_LEGEND_CONTROL_VISIBLE_TEXT: "Mostrar leyenda de filtros",
    SIDE_PANEL_OPTIONS_EVENT_LEGEND_CONTROL_VISIBLE_TEXT: "Mostrar leyenda de eventos",
    SIDE_PANEL_OPTIONS_QUAKES_STYLES_TITLE: "Estilos de sismos",
    SIDE_PANEL_OPTIONS_QUAKES_BORDER_COLOR_TEXT: "Color de borde de sismo",
    SIDE_PANEL_OPTIONS_QUAKES_FILL_COLOR_TEXT: "Color de relleno de sismo",
    SIDE_PANEL_OPTIONS_QUAKES_MIN_DEPTH_COLOR_TEXT: "C. de profundidad mínima",
    SIDE_PANEL_OPTIONS_QUAKES_MAX_DEPTH_COLOR_TEXT: "C. de profundidad máxima",
    SIDE_PANEL_OPTIONS_FAULTS_STYLES_TITLE: "Estilos de fallas",
    SIDE_PANEL_OPTIONS_FAULTS_BORDER_COLOR_TEXT: "Color de borde de falla",
    SIDE_PANEL_OPTIONS_POPULATIONS_STYLES_TITLE: "Estilos de poblaciones",
    SIDE_PANEL_OPTIONS_POPULATIONS_BORDER_COLOR_TEXT: "Color de borde de población",
    SIDE_PANEL_OPTIONS_POPULATIONS_FILL_COLOR_TEXT: "Color de relleno de población",
    SIDE_PANEL_OPTIONS_POPULATIONS_MIN_NUMBER_COLOR_TEXT: 'C. de nº habitantes mínimo',
    SIDE_PANEL_OPTIONS_POPULATIONS_MAX_NUMBER_COLOR_TEXT: 'C. de nº habitantes máximo',
    SIDE_PANEL_OPTIONS_INTENSITIES_STYLES_TITLE: "Estilos de intensidades",
    SIDE_PANEL_OPTIONS_INTENSITIES_BORDER_COLOR_TEXT: "Color de borde de intensidad",
    SIDE_PANEL_OPTIONS_REGIONS_STYLES_TITLE: "Estilos de comunidades autónomas",
    SIDE_PANEL_OPTIONS_REGIONS_BORDER_COLOR_TEXT: "C. de borde de comunidad autónoma",
    SIDE_PANEL_OPTIONS_PROVINCES_STYLES_TITLE: "Estilos de provincias",
    SIDE_PANEL_OPTIONS_PROVINCES_BORDER_COLOR_TEXT: "Color de borde de provincia",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_STYLES_TITLE: "Estilos de límite territorial",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_BORDER_COLOR_TEXT: "C. de borde de l. territorial",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_STYLES_TITLE: "Estilos de círculo de filtrado",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_BORDER_COLOR_TEXT: "C. de borde de c. de filtrado",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_FILL_COLOR_TEXT: "C. de relleno de c. de filtrado",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_TITLE: "Capa importada",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_BORDER_COLOR_TEXT: "C. de borde de c. importada",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_FILL_COLOR_TEXT: "C. de relleno de c. importada",
    SIDE_PANEL_OPTIONS_SYSTEM_STYLES_TITLE: "Estilos de sistema",
    SIDE_PANEL_OPTIONS_MARKED_COLOR_TEXT: "Color de marcado",

    // Instrucciones
    SIDE_PANEL_INSTRUCTIONS_TITLE: "Manual de usuario",
    SIDE_PANEL_INSTRUCTIONS_DESCRIPTION: "El visor nacional de eventos sísmicos permite visualizar, filtrar y realizar consultas con fines didácticos sobre eventos sísmicos, de falla y poblacionales de España."
    + "<h2>Controles básicos</h2>"
    + "<ul><li><b>Click izquierdo:</b> En el mapa: eliminar círculo de filtrado/búfer (si los hubiera) / Sobre un evento de capa: mostrar pop-up de información / En modo dibujo: confirmar.</li>"
    + "<li><b>Mantener click izquierdo y arrastrar:</b> desplazar mapa.</li>"
    + "<li><b>Click derecho:</b> En el mapa: abrir menú contextual (consultar sección \"Menú contextual\") / Sobre un evento de capa: abrir menú contextual + consultas específicas de evento / En modo dibujo: cancelar.</li>"
    + "<li><b>Rueda del ratón arriba/abajo:</b> aumentar/disminuir el zoom.</li></ul>"
    + "<h2>Elementos del visor</h2>"
    + "<img src='images/User_Manual_1.png' width='320'/>"
    + "<ol><li><b>Controles de zoom:</b> aumentar o disminuir el zoom.</li>"
    + "<li><b>Barra de búsqueda de población:</b> permite buscar y desplazarse a la población seleccionada.</li>"
    + "<li><b>Botón de captura de pantalla:</b> permite hacer una captura de pantalla de la vista actual.<em>Atención: esta opción no está disponible en el navegador \"Edge\"</em>.</li>"
    + "<li><b>Botón del panel lateral:</b> despliega el panel lateral (consultar sección \"Panel lateral\").</li>"
    + "<li><b>Leyenda de eventos:</b> muestra la simbología de los eventos de la capas visibles.</li>"
    + "<li><b>Control de capas: </b> selecciona la capa base visible y enciende o apaga capas de superposición.</li>"
    + "<li><b>Leyenda de filtros: </b>muestra los filtros activos de cada capa.</li>"
    + "<li><b>Visor de coordenadas: </b>muestra la latitud y longitud actuales del cursor.</li>"
    + "<li><b>Barra de escala: </b> muestra la escala del mapa en función del zoom.</li></ol>"
    + "<h2>Panel lateral</h2>"
    + "<img src='images/User_Manual_2.png' height='300'/>"
    + "<ol><li><b>Todos los filtros:</b> muestra todos los filtros."
    + "<ul><li><b>Filtrar todos:</b> filtra todas las capas (y las muestra si estuvieran apagadas) según los parámetros establecidos.</li>"
    + "<li><b>Duplicar y filtrar todos: </b> crea copias de todas las capas con los eventos filtrados según los parámetros establecidos.</li>"
    + "<li><b>Refrescar todos: </b> reestablece los valores iniciales de todos los filtros, elimina todas las capas duplicadas y enciende todas las capas normales.</li>"
    + "<li><b>Desmcar todos: </b> desmarca los eventos de todas las capas.</li></ul></li>"
    + "<li><b>Filtros de sismos:</b> filtra únicamente los eventos de la capa \"Sismos\"."
    + "<ul><li><b>Filtrar:</b> filtra la capa de \"Sismos\" (y la muestra si estuviera apagada) según los parámetros establecidos.</li>"
    + "<li><b>Duplicar y filtrar:</b> crea una copia de la capa \"Sismos\" con los eventos filtrados según los parémtros establecidos.</li>"
    + "<li><b>Refrescar:</b> reestablece los valores iniciales de los filtros de sismos, elimina la capa duplicada de \"Sismos\" y enciende la capa normal de \"Sismos\".</li>"
    + "<li><b>Desmarcar:</b> desmarcar los eventos de la capa \"Sismos\" y/o su copia.</ul></li>"
    + "<li><b>Filtros de fallas:</b> filtra únicamente los eventos de la capa \"Fallas\"."
    + "<ul><li><b>Filtrar:</b> filtra la capa de \"Fallas\" (y la muestra si estuviera apagada) según los parámetros establecidos.</li>"
    + "<li><b>Duplicar y filtrar:</b> crea una copia de la capa \"Fallas\" con los eventos filtrados según los parémtros establecidos.</li>"
    + "<li><b>Refrescar:</b> reestablece los valores iniciales de los filtros de fallas, elimina la capa duplicada de \"Fallas\" y enciende la capa normal de \"Fallas\".</li>"
    + "<li><b>Desmarcar:</b> desmarcar los eventos de la capa \"Fallas\" y/o su copia.</ul></li>"
    + "<li><b>Filtros de poblaciones:</b> filtra únicamente los eventos de la capa \"Poblaciones\"."
    + "<ul><li><b>Filtrar:</b> filtra la capa de \"Poblaciones\" (y la muestra si estuviera apagada) según los parámetros establecidos.</li>"
    + "<li><b>Duplicar y filtrar:</b> crea una copia de la capa \"Poblaciones\" con los eventos filtrados según los parémtros establecidos.</li>"
    + "<li><b>Refrescar:</b> reestablece los valores iniciales de los filtros de poblaciones, elimina la capa duplicada de \"Poblaciones\" y enciende la capa normal de \"Poblaciones\".</li>"
    + "<li><b>Desmarcar:</b> desmarcar los eventos de la capa \"Poblaciones\" y/o su copia.</ul></li>"
    + "<li><b>Filtros espaciales:</b> filtra todas las capas únicamente de acuerdo de los parámetros espaciales establecidos. Estos parámetros están disponibles en el resto de filtros. Cambiar los valores de latitud, longitud y radio actualizarán el círculo de filtrado."
    + "El círculo de filtrado sólo se muestra si el radio es mayor que cero. Un radio igual a cero será interpretado como <b>infinito</b> y por tanto todos los eventos se considerarían \"dentro\" del círculo de filtrado."
    + "<ul><li>La opción \"Fijar\" filtro de radio impide que se modifique el valor del radio, por tanto al seleccionar un proceso que implique dibujar un radio de búsqueda, este paso será ignorado.</li>"
    + "<li>La opción \"Dentro de límite territorial\" filtra únicamente los eventos dentro (sismos y poblaciones) o parcialmente dentro (fallas) de los límites territoriales nacionales.<em>Atención: esta opción aumenta el tiempo de procesamiento.</em></li>"
    + "<li><b>Filtrar:</b> filtra todas las capas (y las muestra si estuvieran apagadas) según los parámetros establecidos.</li>"
    + "<li><b>Duplicar y filtrar:</b> crea una copia de todas las capas con los eventos filtrados según los parémtros establecidos.</li>"
    + "<li><b>Refrescar:</b> reestablece los valores iniciales de los filtros espciales, elimina las capas duplicadas y enciende todas las capas normales.</li>"
    + "<li><b>Desmarcar:</b> desmarcar los eventos de todas las capas.</ul></li>"
    + "<li><b>Gestión de archivos: </b> permite importar una capa en formato \".geojson\" y exportar capas a formato \".csv\" o \".geojson\".</li>"
    + "<li><b>Opciones del visor: </b> permite modificar el idioma, los controles visibles y el estilo de las capas.</li>"
    + "<li><b>Manual de usuario: </b> permite consultar información sobre el uso y funcionamiento del visor.</li>"
    + "<li><b>Información: </b> información de contacto, créditos de terceros y orígenes de datos.</li></ol>"
    + "<h2>Menú contextual</h2>"
    + "Permite hacer funciones y consultas de tipo espacial según la posición del mapa en la que se haya hecho click derecho."
    + "<em>Atención: si la opción \"Fijar\" filtro de radio está activa, cualquier proceso que implique dibujar un círculo de búsqueda ignorará este paso.</em>"
    + "<h3>Consultas y funciones generales</h3>"
    + "Se muestran al hacer click derecho en el mapa o en un evento. Cualquier consulta que implique un evento se hará sobre la capa duplicada si existiera, si no, sobre la capa normal. Si no estuviera visible se encenderá al terminar la consula."
    + "<ul><li><b>Centrar mapa:</b> centra la vista del mapa a la posición seleccionada.</li>"
    + "<li><b>Fijar coordenadas:</b> establece como valor de los filtros de latitud y longitud los de la posición seleccionada.</li>"
    + "<li><b>Dibujar radio de búsqueda:</b> permite dibujar el círculo de filtrado con centro en la posición selecionada.<em>Atención: si la opción \"Fijar\" filtro de radio está activa, esta función es exactamente la misma que \"Fijar coordenadas\".</em></li>"
    + "<li><b>Zoom a sismo más cercano al lugar seleccionado:</b> hace un zoom al sismo más próximo y lo marca.</li>"
    + "<li><b>Zoom a falla más cercana al lugar seleccionado:</b> hace un zoom a la falla más próxima y la marca.</li>"
    + "<li><b>Zoom a población más cercana al lugar seleccionado:</b> hace un zoom a la población más próxima y la marca.</li>"
    + "<li><b>Zoom a sismo de mayor magnitud en radio:</b> hace un zoom al sismo de mayor magnitud encontrado en el círculo dibujado si se encontrase alguno y lo marca.</li>"
    + "<li><b>Zoom a sismo de mayor intensidad en radio:</b> hace un zoom al sismo de más intensidad encontrado en el círculo dibujado si se encontrase alguno y lo marca.</li>"
    + "<li><b>Desplazar a intensidad máxima en radio:</b> se desplaza al polígono de intensidades máximas de mayor valor encontrado en el círculo dibujado si se encontrase alguno.</li>"
    + "<li><b>Obtener número de sismos en radio:</b> marca los sismos encontrados dentro del círculo de búsqueda y muestra una ventana con información sobre ellos.</li>"
    + "<li><b>Obtener número de fallas en radio:</b> marca las fallas encontradas dentro del círculo de búsqueda y muestra una ventana con información sobre ellas.</li>"
    + "<li><b>Obtener número de habitantes en radio:</b> marca las poblaciones encontradas dentro del círculo de búsqueda y muestra una ventana con información sobre el número de habitantes.</li>"
    + "<li><b>Obtener último sismo mayor que una magnitud en radio:</b> marca el sismo más actual dentro del radio de búsqueda y de magnitud mayor o igual a la introducida, si se encontrase alguno, y muestra información sobre él.</li>"
    + "<li><b>Obtener último sismo mayor que una intensidad en radio:</b> marca el sismo más actual dentro del radio de búsqueda y de intensidad mayor o igual a la introducida, si se encontrase alguno, y muestra información sobre él.</li></ul>"
    + "<h3>Consultas de falla</h3>"
    + "Permite hacer consultas específicas al hacer click derecho sobre un evento de falla."
    + "<ul><li><b>Obtener poblaciones a una distancia de la falla:</b> marca las poblaciones a una distancia de la falla igual o menor a la introducida, si hubiera alguna, y muestra información sobre ellas.</li>"
    + "<li><b>Obtener sismo de mayor magnitud a una distancia de la falla:</b> marca el sismo de mayor magnitud a una distancia de la falla igual o menor a la introducida, si hubiera alguno.</li>"
    + "<li><b>Obtener poblaciones con número de habitantes mayor a un valor a una distancia de la falla:</b> marca poblaciones con un número de habitantes igual o mayor al valor introducido, a una distancia de la falla igual o menor a la introducida, si se encontrase alguno, y muestra información sobre ellas.</li></ul>"
    + "<h3>Consultas de población</h3>"
    + "Permite hacer consultas específicas al hacer click derecho sobre un evento de población."
    + "<ul><li><b>Obtener intensidad máxima sentida en la población:</b> muestra la intensidad máxima referida al polígono de intensidades máximas sobre el que se encuentra situada la población.</li></ul>",

    // Contacto
    SIDE_PANEL_CONTACT_TITLE: "Información",
    SIDE_PANEL_CONTACT_DESCRIPTION: "<h2>Título</h2><b>Visor de eventos sísmicos de España</b><br>"
    + "<h3>Autor inicial</h3>"
    + "<b>Nombre: </b>Francisco Manuel Anta Sánchez<br>"
    + "<b>Correo electrónico: </b><a href='mailto:francisco.anta.sanchez@gmail.com'>francisco.anta.sanchez@gmail.com</a><br>"
    + "<b>Enlace a GitHub: </b><a href='https://github.com/franciscoanta'>https://github.com/franciscoanta</a><br>"
    + "<b>Enlace a TFG: </b><a href='https://oa.upm.es/85085/'>https://oa.upm.es/85085/</a><br>"

    + "<h3>Autor versión 1.3</h3>"
    + "<b>Nombre: </b>Mariano de la Parte Juan<br>"
    + "<b>Correo electrónico: </b><a href='mailto:marianodlp03@gmail.com'>marianodlp03@gmail.com</a><br>"
    + "<b>Enlace a GitHub: </b><a href='https://github.com/marianodlp03'>https://github.com/marianodlp03</a><br>"

    + "<h3>Tutor y supervisor</h3>"
    + "<b>Nombre: </b>Jorge Miguel Gaspar Escribano<br>"
    + "<b>Correo electrónico: </b><a href='mailto:jorge.gaspar@upm.es'>jorge.gaspar@upm.es</a><br>"

    + "<h3>Desarrollado en:</h3>"
    + "Escuela Superior de Ingenieros en Topografía, Geodesia y Cartografía. Universidad Politécnica de Madrid."

    + "<h2>Créditos de plugins de terceros</h2>"
    + "<h3>Leaflet</h3><b>Autor:</b> Volodymyr Agafonkin.<br><b>URL:</b> <a href='https://leafletjs.com/' target='_blank'>https://leafletjs.com/</a>"
    + "<h3>Leaflet.SidePanel</h3><b>Autor:</b> Maxwell Ilai.<br><b>URL</b> <a href='https://github.com/maxwell-ilai/Leaflet.SidePanel' target='_blank'>https://github.com/maxwell-ilai/Leaflet.SidePanel</a>"
    + "<h3>Leaflet.SvgShapeMarkers</h3><b>Autor:</b> Rowan Winsemius.<br><b>URL</b> <a href='https://github.com/rowanwins/Leaflet.SvgShapeMarkers' target='_blank'>https://github.com/rowanwins/Leaflet.SvgShapeMarkers</a>"
    + "<h3>Leaflet.Control.Window</h3><b>Autor:</b> mapshakers.<br><b>URL</b> <a href='https://github.com/mapshakers/leaflet-control-window' target='_blank'>https://github.com/mapshakers/leaflet-control-window</a>"
    + "<h3>Leaflet.Corridor</h3><b>Autor:</b> Mikhail Shilkov.<br><b>URL</b> <a href='https://github.com/mikhailshilkov/leaflet-corridor' target='_blank'>https://github.com/mikhailshilkov/leaflet-corridor</a>"
    + "<h3>Leaflet.EasyPrint</h3><b>Autor:</b> Rowan Winsemius.<br><b>URL</b> <a href='https://github.com/rowanwins/leaflet-easyPrint' target='_blank'>https://github.com/rowanwins/leaflet-easyPrint</a>"
    + "<h3>Leaflet.contextmenu</h3><b>Autor:</b> Adam Ratcliffe.<br><b>URL</b> <a href='https://github.com/aratcliffe/Leaflet.contextmenu' target='_blank'>https://github.com/aratcliffe/Leaflet.contextmenu</a>"
    + "<h3>Leaflet.EasyButton</h3><b>Autor:</b> atstp.<br><b>URL</b> <a href='https://github.com/CliffCloud/Leaflet.EasyButton' target='_blank'>https://github.com/CliffCloud/Leaflet.EasyButton</a>"
    + "<h3>Leaflet.BetterScale</h3><b>Autor:</b> Dan Brown<br><b>URL</b> <a href='https://github.com/daniellsu/leaflet-betterscale' target='_blank'>https://github.com/daniellsu/leaflet-betterscale</a>"
    + "<h3>Leaflet.AnimatedSearchBox</h3><b>Autor:</b> Luka Steinbach.<br><b>URL</b> <a href='https://github.com/luka1199/Leaflet.AnimatedSearchBox' target='_blank'>https://github.com/luka1199/Leaflet.AnimatedSearchBox</a>"
    + "<h3>Fuse</h3><b>Autor:</b> Kiro Risk.<br><b>URL</b> <a href='https://www.fusejs.io/' target='_blank'>https://www.fusejs.io/</a>"
    
    + "<h2>Orígenes de los datos</h2>"
    + "<h3>Límites de comunidades autónomas</h3><b>Fuente:</b> Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Límites de provincias</h3><b>Fuente:</b> Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Límite territorial</h3><b>Fuente:</b> Generado con QGIS (<a href='https://www.qgis.org/es/site/' target='_blank'>https://www.qgis.org/es/site/</a>) a partir de datos de límites de comundiades autónomas del Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Sismos</h3><b>Fuente:</b> Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Fallas</h3><b>Fuente:</b> QAFI (Quaternary Active Faults database of Iberia), Instituto Geológico y Minero de España (IGME).<br><b>URL:</b> <a href='http://info.igme.es/qafi/' target='_blank'>http://info.igme.es/qafi/</a>"
    + "<h3>Poblaciones</h3><b>Fuente:</b> Centroides generados con QGIS (<a href='https://www.qgis.org/es/site/' target='_blank'>https://www.qgis.org/es/site/</a>) a partir de datos de población del Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Intensidades</h3><b>Fuente:</b> García y Cabañas (2022) 'Mapa de Intensidad Máxima (MIM) de España (Península Ibérica y Baleares)'<br><b>URL:</b><a href='https://www.ign.es/web/resources/acercaDe/libDigPub/X-AHPGG-articulos.pdf#page=520' target='_blank'>https://www.ign.es/web/resources/acercaDe/libDigPub/X-AHPGG-articulos.pdf#page=520'</a><br>"
    + "<b>URL:</b><a href='https://www.researchgate.net/publication/403874338_Mapa_de_Intensidad_Maxima_MIM_de_Espana_Peninsula_Iberica_y_Baleares' target='_blank'>https://www.researchgate.net/publication/403874338_Mapa_de_Intensidad_Maxima_MIM_de_Espana_Peninsula_Iberica_y_Baleares'</a>"
    + "<h3>Iconos del panel lateral</h3><b>URL:</b> <a href='https://www.reshot.com/free-svg-icons' target='_blank'>https://www.reshot.com/free-svg-icons</a>",

    // Ventana de alerta
    ALERT_WINDOW_FILTER_ALL_LAYERS_TEXT: "Se han filtrado todas las capas.",
    ALERT_WINDOW_FILTER_LAYER_FORMAT: "Se ha filtrado la capa %1.",
    ALERT_WINDOW_DUPLICATE_ALL_LAYERS_TEXT: "Se han filtrado y duplicado todas las capas.",
    ALERT_WINDOW_DUPLICATE_LAYER_FORMAT: "Se ha filtrado y duplicado la capa %1.",
    ALERT_WINDOW_REFRESH_ALL_TEXT: "Se han limpiado todos los filtros y capas.",
    ALERT_WINDOW_REFRESH_FORMAT: "Se han limpiado los filtros de %1.",
    ALERT_WINDOW_UNMARK_ALL_TEXT: "Se han desmarcado todas las capas",
    ALERT_WINDOW_UNMARK_FORMAT: "Se han desmarcado los eventos de la capa %1",
    ALERT_WINDOW_IMPORT_LAYER_FORMAT: "Se ha importado la capa %1.",
    ALERT_WINDOW_EXPORT_LAYER_FORMAT: "Se ha exportado la capa %1.",

    // Textos del menú contextual
    // General
    CONTEXT_MENU_CENTER_MAP_ITEM: "Centrar mapa",
    CONTEXT_MENU_RESTORE_INITIAL_VIEW_ITEM: "Restaurar vista inicial",
    CONTEXT_MENU_SET_COORDINATES_ITEM: "Fijar coordenadas",
    CONTEXT_MENU_DRAW_FILTER_CIRCLE_ITEM: "Dibujar círculo de filtrado",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_QUAKES_ITEM: "Zoom a sismo más cercano al lugar seleccionado",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_FAULTS_ITEM: "Zoom a falla más cercana al lugar seleccionado",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_POPULATIONS_ITEM: "Zoom a población más cercana al lugar seleccionado",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_MAGNITUDE_QUAKE_IN_RADIUS_TEXT: "Zoom a sismo de mayor magnitud en radio",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_INTENSITY_QUAKE_IN_RADIUS_TEXT: "Zoom a sismo de mayor intensidad en radio",
    CONTEXT_MENU_PAN_TO_MAX_INTENSITY_IN_RADIUS: "Desplazar a intensidad máxima en radio",
    CONTEXT_MENU_QUAKES_NUMBER_IN_RADIUS_TEXT: "Obtener número de sismos en radio",
    CONTEXT_MENU_FAULTS_NUMBER_IN_RADIUS_TEXT: "Obtener número de fallas en radio",
    CONTEXT_MENU_POPULATIONS_NUMBER_IN_RADIUS_TEXT: "Obtener número de habitantes en radio",
    CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT: "Obtener último sismo mayor que una magnitud en radio",
    CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT: "Obtener último sismo mayor que una intensidad en radio",

    // Fallas
    CONTEXT_MENU_POPULATIONS_DISTANCE_TO_FAULT: "Obtener poblaciones a una distancia de la falla",
    CONTEXT_MENU_BIGGEST_QUAKE_DISTANCE_TO_FAULT: "Obtener sismo de mayor magnitud a una distancia de la falla",
    CONTEXT_MENU_POPULATION_NUMBER_DISTANCE_TO_FAULT: "Obtener poblaciones con número de habitantes mayor a un valor a una distancia de la falla",

    // Poblaciones
    CONTEXT_MENU_POPULATION_MAX_INTENSITY_TEXT: "Obtener intensidad máxima sentida en la población",

    // Textos de consulta
    QUERY_QUAKE_NUMBER_IN_RADIUS_TITLE: "Número de sismos en radio.<br>Capa: %1.",
    QUERY_FAULT_NUMBER_IN_RADIUS_TITLE: "Número de fallas en radio.<br>Capa: %1.",
    QUERY_POPULATION_NUMBER_IN_RADIUS_TITLE: "Número de habitantes en radio.<br>Capa: %1.",
    QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT: "<b>Total: %1.</b><br><b>Latitud:</b> %2º.<br><b>Longitud:</b> %3º.<br><b>Radio:</b> %4km<br>Los objetos han sido marcados en el mapa.",
    QUERY_POPULATION_MAX_INTENSITY_TITLE: "Intensidad máxima sentida en la población %1",
    QUERY_POPULATION_MAX_INTENSITY_TEXT: "<b>Intensidad máxima: %1.</b><br><b>Latitud:</b> %2º.<br><b>Longitud:</b> %3º.",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_TITLE: "Último sismo de magnitud >= %1",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_FORMAT: "<b>Localización: </b>%1.<br><b>Magnitud: </b>%2.<br><b>Fecha: </b>%3.<br><b>Latitud: </b>%4º.<br><b>Longitud: </b>%5º.<br><b>Radio: </b>%6km.",
    QUERY_LAST_QUAKE_BY_INTENSITY_TITLE: "Último sismo de intensidad >= %1",
    QUERY_LAST_QUAKE_BY_INTENSITY_FORMAT: "<b>Localización: </b>%1.<br><b>Intensidad: </b>%2.<br><b>Fecha: </b>%3.<br><b>Latitud: </b>%4º.<br><b>Longitud: </b>%5º.<br><b>Radio: </b>%6km.",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_TITLE: "Número de habitantes a %1km de la falla seleccionada",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_FORMAT: "<b>Número total de habitantes: </b>%1.<br><b>Número de poblaciones:</b> %2.",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE: "Poblaciones de más de %1 habitantes a %2km de la falla seleccionada",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_FORMAT: "<b>Número total de habitantes: </b>%1.<br><b>Número de poblaciones:</b> %2.",
    QUERY_NO_OBJECT_FOUND_TEXT: "No se ha encontrado ningún objeto.",
    QUERY_NAME_TEXT: "Nombre",
    QUERY_QUAKE_MAGNITUDE_TEXT: "Magnitud",
    QUERY_FAULT_MAGNITUDE_TEXT: "Magnitud máxima",
    QUERY_POPULATION_NUMBER_TEXT: "Habitantes",
    QUERY_MAGNITUDE_INPUT_TEXT: "Magnitud >=  ",
    QUERY_INTENSITY_SELECT_TEXT: "Intensidad >=  ",
    QUERY_DISTANCE_INPUT_TEXT: "Distancia [km]:  ",
    QUERY_POPULATION_NUMBER_INPUT_TEXT: "Número de habitantes >=  ",
    QUERY_ACCEPT_BUTTON_TEXT: "Aceptar",

    // Textos del visor de coordenadas
    COORDINATE_VISOR_CONTROL_LATITUDE: "Latitud",
    COORDINATE_VISOR_CONTROL_LONGITUDE: "Longitud",

    // Textos de la leyenda de filtros
    FILTER_LEGEND_CONTROL_TITLE: "Filtros activos",
    FILTER_LEGEND_CONTROL_MAGNITUDE: "Magnitud",
    FILTER_LEGEND_CONTROL_DEPTH: "Profunidad [km]",
    FILTER_LEGEND_CONTROL_INTENSITY: "Intensidad",
    FILTER_LEGEND_CONTROL_DATE: "Rango de fechas",
    FILTER_LEGEND_CONTROL_POPULATION: "Habitantes",
    FILTER_LEGEND_CONTROL_UNKNOWN: "Desconocido",

    // Textos de la leyenda de eventos
    EVENT_LEGEND_CONTROL_TITLE: "Leyenda",
    EVENT_LEGEND_CONTROL_INTENSITY_TITLE: "Intensidades máximas",
    EVENT_LEGEND_CONTROL_FAULT_TITLE: "Fallas",
    EVENT_LEGEND_CONTROL_FAULT_TEXT: "Falla",
    EVENT_LEGEND_CONTROL_POPULATION_TITLE: "Habitantes",
    EVENT_LEGEND_CONTROL_MAGNITUDE_TITLE: "Magnitud",
    EVENT_LEGEND_CONTROL_DEPTH_TITLE: "Profundidad [km]",
    EVENT_LEGEND_CONTROL_MAGNITUDE_LETTER: "M",
    EVENT_LEGEND_CONTROL_POPULATION_NUMBER_LETTER: "H",

    // Textos de archivo
    PRINTED_MAP_FILENAME: "Captura de pantalla",

    // Otros textos
    MINIMIZE_BUTTON_SYMBOl: "-",
    MAXIMIZE_BUTTON_SYMBOl: "+",
    POPUP_UNKNOWN_TEXT: "Desconocido/a"
  }

  static english = {
    NAME: "English",

    // Layer control texts
    EMPTY_LAYER: "Empty",
    OSM_LAYER: "Open Street Map",
    REGIONS_LAYER: "Regions",
    PROVINCES_LAYER: "Provinces",
    TERRITORIAL_LIMIT: "Territorial limit",
    QUAKES_LAYER: "Quakes",
    FAULTS_LAYER: "Faults",
    POPULATIONS_LAYER: "Locations",
    INTENSITIES_LAYER: "Intensities",
    DUPLICATED_QUAKES_LAYER: "Quakes (copy)",
    DUPLICATED_FAULTS_LAYER: "Faults (copy)",
    DUPLICATED_POPULATIONS_LAYER: "Locations (copy)",

    // Side panel texts

    // All filters
    SIDE_PANEL_ALL_FILTERS_TAB_TITLE: "Filter all layers",
    SIDE_PANEL_ALL_FILTERS_TAB_DESCRIPTION: "Filter quakes, faults and locations layers by the specified parameters",
    SIDE_PANEL_QUAKE_FILTERS_TITLE: "Quakes filters",
    SIDE_PANEL_FAULT_FILTERS_TITLE: "Faults filters",
    SIDE_PANEL_POPULATION_FILTERS_TITLE: "Locations filters",

    // Quakes filters
    SIDE_PANEL_QUAKE_FILTERS_TAB_TITLE: "Filter quakes layer",
    SIDE_PANEL_QUAKE_FILTERS_TAB_DESCRIPTION: "Filters only quakes layers by the specified parameters.",
    SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_TITLE: "Magnitude filters",
    SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_DESCRIPTION: "<em>Magnitude is an instrumental parameter that measures the amount of energy liberated by the earthquake.</em>",
    SIDE_PANEL_QUAKE_MIN_MAGNITUDE_FILTER_TEXT: "Minimum magnitude:  ",
    SIDE_PANEL_QUAKE_MAX_MAGNITUDE_FILTER_TEXT: "Maximum magnitude:  ",
    SIDE_PANEL_QUAKE_INTENSITY_FILTERS_TITLE: "Intensity filters",
    SIDE_PANEL_QUAKE_INTENSITY_FILTERS_DESCRIPTION: "<em>Intensity is a parameter that estimates the effects of the eartquake in its surroundings.</em>",
    SIDE_PANEL_QUAKE_MIN_INTENSITY_FILTER_TEXT: "Minimum intensity:  ",
    SIDE_PANEL_QUAKE_MAX_INTENSITY_FILTER_TEXT: "Maximum intensity:  ",
    SIDE_PANEL_QUAKE_DEPTH_FILTERS_TITLE: "Depth filters",
    SIDE_PANEL_QUAKE_MIN_DEPTH_FILTER_TEXT: "Minimum depth [km]:  ",
    SIDE_PANEL_QUAKE_MAX_DEPTH_FILTER_TEXT: "Maximum depth [km]:  ",
    SIDE_PANEL_QUAKE_DATE_FILTERS_TITLE: "Date filters",
    SIDE_PANEL_QUAKE_MIN_DATE_FILTER_TEXT: "Minimum date:  ",
    SIDE_PANEL_QUAKE_MAX_DATE_FILTER_TEXT: "Maximum date:  ",
    SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY: "Unknown",

    // Faults filters
    SIDE_PANEL_FAULT_FILTERS_TAB_TITLE: "Filter faults layers",
    SIDE_PANEL_FAULT_FILTERS_TAB_DESCRIPTION: "Filters only locations layer by the specified parameters.<br><br>Faults that partially cross the filter radius are considered as inside.",
    SIDE_PANEL_FAULT_MAGNITUDE_FILTERS_TITLE: "Magnitude filters",
    SIDE_PANEL_FAULT_MIN_MAGNITUDE_FILTER_TEXT: "Minimum expected magnitude:  ",
    SIDE_PANEL_FAULT_MAX_MAGNITUDE_FILTER_TEXT: "Maximum expceted magnitude:  ",
    SIDE_PANEL_FAULT_DEPTH_FILTERS_TITLE: "Depth filters",
    SIDE_PANEL_FAULT_MIN_DEPTH_FILTER_TEXT: "Minimum depth [km]:  ",
    SIDE_PANEL_FAULT_MAX_DEPTH_FILTER_TEXT: "Maximum depth [km]:  ",

    // Populations filters
    SIDE_PANEL_POPULATION_FILTERS_TAB_TITLE: "Filter locations layers",
    SIDE_PANEL_POPULATION_FILTERS_TAB_DESCRIPTION: "Filters only locations layer by the specified parameters.",
    SIDE_PANEL_POPULATION_NUMBER_FILTERS_TITLE: "Inhabitants number filters",
    SIDE_PANEL_POPULATION_MIN_NUMBER_FILTER_TEXT: "Minimum inhabitants:  ",
    SIDE_PANEL_POPULATION_MAX_NUMBER_FILTER_TEXT: "Maximum inhabitants:  ",

    // Spatial filters
    SIDE_PANEL_SPATIAL_FILTERS_TAB_TITLE: "Spatial filters",
    SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION: "Filtra los elementos de las capas cuyos centros (sismos y poblaciones) estén dentro del radio de búsqueda especificados o lo crucen (fallas).<br><br>Esta opción no filtra por ningún otro tipo de parámetro.",
    SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION: "Filters only elements from layers whose centers (quakes and locations) are inside the filter radius or that cross it (faults).<br><br>This option does not filter by any other type of parameter.",
    SIDE_PANEL_SPATIAL_FILTERS_TITLE: "Spatial filters",
    SIDE_PANEL_SPATIAL_FILTERS_COORDINATES_TITLE: "Filter center coordinates",
    SIDE_PANEL_SPATIAL_FILTERS_RADIUS_TITLE: "Filter radius",
    SIDE_PANEL_SPATIAL_CONDITION_TITLE: "Condition",
    SIDE_PANEL_SPATIAL_LATITUDE_FILTER_TEXT: "Latitude [º]:  ",
    SIDE_PANEL_SPATIAL_LONGITUDE_FILTER_TEXT: "Longitude [º]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FILTER_TEXT: "Radius [km]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FIXED_TEXT: "Lock",
    SIDE_PANEL_SPATIAL_INSIDE_TERRITORIAL_LIMIT_FILTER_TEXT: "Inside territorial limit",

    // Buttons
    SIDE_PANEL_FILTER_BUTTON: "Filter",
    SIDE_PANEL_FILTER_ALL_BUTTON: "Filter all",
    SIDE_PANEL_DUPLICATE_BUTTON: "Duplicate and filter",
    SIDE_PANEL_DUPLICATE_ALL_BUTTON: "Duplicate and filter all",
    SIDE_PANEL_REFRESH_BUTTON: "Refresh",
    SIDE_PANEL_REFRESH_ALL_BUTTON: "Refresh all",
    SIDE_PANEL_UNMARK_BUTTON: "Unmark",
    SIDE_PANEL_UNMARK_ALL_BUTTON: "Unmark all",

    // Files
    SIDE_PANEL_FILES_TAB_TITLE: "File management",
    SIDE_PANEL_FILES_TAB_DESCRIPTION: "Import layers from GeoJSON files and export layers to CSV and GeoJSON formats.",
    SIDE_PANEL_FILES_IMPORT_TITLE: "Import",
    SIDE_PANEL_FILES_IMPORT_LAYER_NAME_TEXT: "<b>Name (optional)</b>:",
    SIDE_PANEL_FILES_IMPORT_LAYER_BUTTON_TEXT: "Load",
    SIDE_PANEL_FILES_EXPORT_TITLE: "Export",
    SIDE_PANEL_FILES_EXPORT_NAME_TEXT: "<b>Name:</b>  ",
    SIDE_PANEL_FILES_EXPORT_LAYER_TEXT: "<b>Layer:</b>  ",
    SIDE_PANEL_FILES_EXPORT_ONLY_VISIBLE_BOUNDS_TEXT: "Export current view",
    SIDE_PANEL_FILES_EXPORT_CSV_BUTTON_TEXT: "Export CSV",
    SIDE_PANEL_FILES_EXPORT_GEOJSON_BUTTON_TEXT: "Export GeoJSON",

    // Options
    SIDE_PANEL_OPTIONS_TITLE: "Visor options",
    SIDE_PANEL_OPTIONS_DESCRIPTION: "Modifies langage, controls visibility and layers styles",
    SIDE_PANEL_OPTIONS_LANGAGE_TITLE: "Langange",
    SIDE_PANEL_OPTIONS_LANGAGE_TEXT: "<em><b>Warning:</b> Changing langage will revert layers to their original state.</em>",
    SIDE_PANEL_OPTIONS_CONTROLS_TITLE: "Controls visibility",
    SIDE_PANEL_OPTIONS_STYLES_TITLE: "Layers styles",
    SIDE_PANEL_OPTIONS_LAYER_CONTROL_ALWAYS_DEPLOYED_TEXT: "Layer control always deployed",
    SIDE_PANEL_OPTIONS_SCALEBAR_CONTROL_VISIBLE_TEXT: "Show scalebar",
    SIDE_PANEL_OPTIONS_COORDINATE_VISOR_CONTROL_VISIBLE_TEXT: "Show coordinate visor",
    SIDE_PANEL_OPTIONS_FILTER_LEGEND_CONTROL_VISIBLE_TEXT: "Show filter legend",
    SIDE_PANEL_OPTIONS_EVENT_LEGEND_CONTROL_VISIBLE_TEXT: "Show event legend",
    SIDE_PANEL_OPTIONS_QUAKES_STYLES_TITLE: "Quakes styles",
    SIDE_PANEL_OPTIONS_QUAKES_BORDER_COLOR_TEXT: "Quake border color",
    SIDE_PANEL_OPTIONS_QUAKES_FILL_COLOR_TEXT: "Quake fill color",
    SIDE_PANEL_OPTIONS_QUAKES_MIN_DEPTH_COLOR_TEXT: "Minimum depth fill color",
    SIDE_PANEL_OPTIONS_QUAKES_MAX_DEPTH_COLOR_TEXT: "Maximum depth fill color",
    SIDE_PANEL_OPTIONS_FAULTS_STYLES_TITLE: "Faults styles",
    SIDE_PANEL_OPTIONS_FAULTS_BORDER_COLOR_TEXT: "Fault border color",
    SIDE_PANEL_OPTIONS_POPULATIONS_STYLES_TITLE: "Locations styles",
    SIDE_PANEL_OPTIONS_POPULATIONS_BORDER_COLOR_TEXT: "Population border color",
    SIDE_PANEL_OPTIONS_POPULATIONS_FILL_COLOR_TEXT: "Population fill color",
    SIDE_PANEL_OPTIONS_POPULATIONS_MIN_NUMBER_COLOR_TEXT: 'Min population number color',
    SIDE_PANEL_OPTIONS_POPULATIONS_MAX_NUMBER_COLOR_TEXT: 'Max population number color',
    SIDE_PANEL_OPTIONS_INTENSITIES_STYLES_TITLE: "Intensities styles",
    SIDE_PANEL_OPTIONS_INTENSITIES_BORDER_COLOR_TEXT: "Intensity border color",
    SIDE_PANEL_OPTIONS_REGIONS_STYLES_TITLE: "Regions styles",
    SIDE_PANEL_OPTIONS_REGIONS_BORDER_COLOR_TEXT: "Region border color",
    SIDE_PANEL_OPTIONS_PROVINCES_STYLES_TITLE: "Provinces styles",
    SIDE_PANEL_OPTIONS_PROVINCES_BORDER_COLOR_TEXT: "Province border color",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_STYLES_TITLE: "Territorial limit styles",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_BORDER_COLOR_TEXT: "Territorial limit border color",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_STYLES_TITLE: "Filter circle style",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_BORDER_COLOR_TEXT: "Filter circle border color",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_FILL_COLOR_TEXT: "Filter circle fill color",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_TITLE: "Imported layer",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_BORDER_COLOR_TEXT: "Imported layer border color",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_FILL_COLOR_TEXT: "Imported layer fill color",
    SIDE_PANEL_OPTIONS_SYSTEM_STYLES_TITLE: "System styles",
    SIDE_PANEL_OPTIONS_MARKED_COLOR_TEXT: "Mark color",

    // User manual
    SIDE_PANEL_INSTRUCTIONS_TITLE: "User manual",
    SIDE_PANEL_INSTRUCTIONS_DESCRIPTION: "The national seismic events allows the visualization, filtering and doing queries with a didactic end of quake, fault and populational events of Spain."
    + "<h2>Basic controls</h2>"
    + "<ul><li><b>Left click:</b> On map: erase filter circle/buffer (if they exist) / On layer event: show information pop-up / In draw mode: confirm.</li>"
    + "<li><b>Hold left click and drag:</b> pan map.</li>"
    + "<li><b>Right click:</b> On map: open context menu (consult \"Context menu\" section) / On layer event: open context menu + event specific queries / In draw mode: cancel.</li>"
    + "<li><b>Mouse wheel up/down:</b> increase/reduce zoom.</li></ul>"
    + "<h2>Visor elements</h2>"
    + "<img src='images/User_Manual_1.png' width='320'/>"
    + "<ol><li><b>Zoom controls:</b> increases or reduces zoom.</li>"
    + "<li><b>Population searchbar:</b> allows to search and pan to the selected population.</li>"
    + "<li><b>Screenshot button:</b> allows to take a screenshot of the current view.<em>Warning: this option does not work with \"Edge\" browser.</em></li>"
    + "<li><b>Side panel button:</b> unfolds the sidepanel (consult \"Side panel\" section).</li>"
    + "<li><b>Event legend:</b> shows the symbology of visible layer events.</li>"
    + "<li><b>Layer control: </b> selects the base layer and show or hide overlay layers.</li>"
    + "<li><b>Filter legend: </b>shows each layer current active filters.</li>"
    + "<li><b>Coordinates visor: </b>shows cursor's current latitude and longitude coordinates.</li>"
    + "<li><b>Scalebar: </b> shows map's scale depending on zoom.</li></ol>"
    + "<h2>Side panel</h2>"
    + "<img src='images/User_Manual_2.png' height='300'/>"
    + "<ol><li><b>All filters:</b> show all filters."
    + "<ul><li><b>Filter all:</b> filter all layers (and show them if they are hidden) by the established parameters.</li>"
    + "<li><b>Duplicate and filter all: </b> creates copies of all layers with filtered events by the established parameters.</li>"
    + "<li><b>Refresh all: </b> restores all filters initial values, erases all duplicated layers and shows all regular layers.</li>"
    + "<li><b>Unmark all: </b> unmarks all layers events.</li></ul></li>"
    + "<li><b>Quake filters:</b> filters only the \"Quakes\" layer."
    + "<ul><li><b>Filter:</b> filters the \"Quakes\" layer (and shows it if hidden) by the established parameters.</li>"
    + "<li><b>Duplicate and filter:</b> creates a copy of the \"Quakes\" layer with the events filtered by the established parameters.</li>"
    + "<li><b>Refresh:</b> restores quakes initial filters, erases the \"Quakes\" layer and shows the regular \"Quakes\" layer.</li>"
    + "<li><b>Unmark:</b> unmarks the \"Quakes\" layer and/or its copy.</ul></li>"
    + "<li><b>Fault filters:</b> filters only the \"Faults\" layer."
    + "<ul><li><b>Filter:</b> filters the \"Faults\" layer (and shows it if hidden) by the established parameters.</li>"
    + "<li><b>Duplicate and filter:</b> creates a copy of the \"Faults\" layer with the events filtered by the established parameters.</li>"
    + "<li><b>Refresh:</b> restores faults initial filters, erases the \"Faults\" layer and shows the regular \"Faults\" layer.</li>"
    + "<li><b>Unmark:</b> unmarks the \"Faults\" layer and/or its copy.</ul></li>"
    + "<li><b>Population filters:</b> filters only the \"Locations\" layer."
    + "<ul><li><b>Filter:</b> filters the \"Locations\" layer (and shows it if hidden) by the established parameters.</li>"
    + "<li><b>Duplicate and filter:</b> creates a copy of the \"Locations\" layer with the events filtered by the established parameters.</li>"
    + "<li><b>Refresh:</b> restores locations initial filters, erases the \"Locations\" layer and shows the regular \"Locations\" layer.</li>"
    + "<li><b>Unmark:</b> unmarks the \"Locations\" layer and/or its copy.</ul></li>"
    + "<li><b>Spatial filters:</b> filters all layers only by the spatial established parameters. This parameters are allowed in the rest of filters. Changing the latitude, longitude and radius values will update the filter circle."
    + "The filter circle is only shown if the radius is higher than zero. A radius equal to zero is considered as <b>infinite</b> and thus, all events are considered \"inside\" the filter circle."
    + "<ul><li>The \"Lock\" radius filter prevents the radius to be modified, thus, when selecting a process that requires to draw a search radius, this step will be omited.</li>"
    + "<li>The \"Inside territorial limit\" filters only events inside (quakes and Locations) or partially inside (faults) the national territorial limits.<em>Warning: this option increases processing time.</em></li>"
    + "<li><b>Filter:</b> filters all layers (and shows them if hidden) by the established parameters.</li>"
    + "<li><b>Duplicate and filter:</b> creates a copy of all layers with the events filtered by the established parameters.</li>"
    + "<li><b>Refresh:</b> restores spatial filters initial values, erases duplicated layers and show all regular layers.</li>"
    + "<li><b>Unmark:</b> unmarks all layers events.</ul></li>"
    + "<li><b>File management: </b> allows to import a layer in \".geojson\" format and export layers in \".csv\" or \".geojson\" formats.</li>"
    + "<li><b>Visor options: </b> allows to change the langage, controls visibility and layer styles.</li>"
    + "<li><b>User manual: </b> allows to check information on the visor use and functionality.</li>"
    + "<li><b>Information: </b> contact information, third party credtis and data origins.</li></ol>"
    + "<h2>Context menu</h2>"
    + "Allows to use functions and do spatial queries depending on the place right clicked."
    + "<em>Warning: if the \"Lock\" radius filter is on, any process that requires to draw a search radius will ignore this step.</em>"
    + "<h3>General functions and queries</h3>"
    + "Show when right clicking on the map or any event. Any event query will target the duplicated layer if it exits, or the normal layer if not. If the layer is not visible, it will be shown."
    + "<ul><li><b>Center map:</b> centers the map view to the selected position.</li>"
    + "<li><b>Set coordinates:</b> sets the latitude and longitude filters of the current position.</li>"
    + "<li><b>Draw filter circle:</b> allows to draw a filter circle with its center in the selected position.<em>Warning: if the \"Lock\" radius filter is on, this functions is exactly the same as \"Set coordinates\".</em></li>"
    + "<li><b>Zoom to closest quake to clicked position:</b> zooms to the closest quake and marks it.</li>"
    + "<li><b>Zoom to closest fault to clicked position:</b> zooms to the closest fault and marks it.</li>"
    + "<li><b>Zoom to closest population to clicked position:</b> zooms to the closest population and marks it.</li>"
    + "<li><b>Zoom to biggest magnitude quake in radius:</b> zooms to the biggest magnitude quake found within the drawn circle if any is found and marks it.</li>"
    + "<li><b>Zoom to biggest intensity quake in radius:</b> zooms to the biggest intensity quake found within the drawn circle if any is found and marks it.</li>"
    + "<li><b>Pan to biggest intensity in radius:</b> pans to the  maximum intensity polygon of highest value found within the drawn circle, if any is found.</li>"
    + "<li><b>Get quakes number in radius:</b> marks all quakes found within the search circle and shows a window with information about them.</li>"
    + "<li><b>Get faults number in radius:</b> marks all faults found within the search circle and shows a window with information about them.</li>"
    + "<li><b>Get inhabitants number in radius:</b> marks all locations found within the search circle and shows a window with information about them.</li>"
    + "<li><b>Get last quake bigger than a magnitude in radius:</b> marks the most recent quake within the search radius and higher or equal to the inputed magnitude, if any is found, and shows information about it.</li>"
    + "<li><b>Get last quake bigger than an intensity in radius:</b> marks the most recent quake within the search radius and higher or equal to the inputed intensity, if any is found, and shows information about it.</li></ul>"
    + "<h3>Fault queries</h3>"
    + "Allows to do fault specific queries when right clicking on a fault event."
    + "<ul><li><b>Get locations from a distance to a fault:</b> marks locations a distance to the fault lower or equal to the inputed, if any found, and shows information about them.</li>"
    + "<li><b>Get biggest magnitude quake from a distance to a fault:</b> marks the bigghest magnitude quake a distance to the fault lower or equal to the inputed, if any found.</li>"
    + "<li><b>Get highest inhabitants number locations from a distance to a fault:</b> marks locations with a number of inhabitants higher or equal than the inputed value, a distance to the fault lower or equal than the inputed, if any is found, and shows information about them.</li></ul>"
    + "<h3>Population queries</h3>"
    + "Allows to do population specific queries when right clicking on a population event."
    + "<ul><li><b>Get highest intensity felt in the population:</b> shows maximum intensity refered to the maximum intensities polygon the population is inside.</li></ul>",

    // Contact
    SIDE_PANEL_CONTACT_TITLE: "Information",
    SIDE_PANEL_CONTACT_DESCRIPTION: "<h2>Title</h2><b>Spanish sismic events visor</b><br>"
    + "<h3>Initial author</h3>"
    + "<b>Name: </b>Francisco Manuel Anta Sánchez<br>"
    + "<b>e-mail: </b><a href='mailto:francisco.anta.sanchez@gmail.com'>francisco.anta.sanchez@gmail.com</a><br>"
    + "<b>GitHub link: </b><a href='https://github.com/franciscoanta'>https://github.com/franciscoanta</a><br>"
    + "<b>TFG link: </b><a href='https://oa.upm.es/85085/'>https://oa.upm.es/85085/</a><br>"

    + "<h3>1.3 version author</h3>"
    + "<b>Name: </b>Mariano de la Parte Juan<br>"
    + "<b>e-mail: </b><a href='mailto:marianodlp03@gmail.com'>marianodlp03@gmail.com</a><br>"
    + "<b>GitHub link: </b><a href='https://github.com/marianodlp03'>https://github.com/marianodlp03</a><br>"

    + "<h3>Supervisor</h3>"
    + "<b>Name: </b>Jorge Miguel Gaspar Escribano<br>"
    + "<b>e-mail: </b><a href='mailto:jorge.gaspar@upm.es'>jorge.gaspar@upm.es</a><br>"

    + "<h3>Developed in:</h3>"
    + "Escuela Superior de Ingenieros en Topografía, Geodesia y Cartografía. Universidad Politécnica de Madrid."
  
    + "<h2>Third party plugin credits:</h2>"
    + "<h3>Leaflet</h3><b>Author:</b> Volodymyr Agafonkin.<br><b>URL:</b> <a href='https://leafletjs.com/' target='_blank'>https://leafletjs.com/</a>"
    + "<h3>Leaflet.SidePanel</h3><b>Author:</b> Maxwell Ilai.<br><b>URL</b> <a href='https://github.com/maxwell-ilai/Leaflet.SidePanel' target='_blank'>https://github.com/maxwell-ilai/Leaflet.SidePanel</a>"
    + "<h3>Leaflet.SvgShapeMarkers</h3><b>Author:</b> Rowan Winsemius.<br><b>URL</b> <a href='https://github.com/rowanwins/Leaflet.SvgShapeMarkers' target='_blank'>https://github.com/rowanwins/Leaflet.SvgShapeMarkers</a>"
    + "<h3>Leaflet.Control.Window</h3><b>Author:</b> mapshakers.<br><b>URL</b> <a href='https://github.com/mapshakers/leaflet-control-window' target='_blank'>https://github.com/mapshakers/leaflet-control-window</a>"
    + "<h3>Leaflet.Corridor</h3><b>Author:</b> Mikhail Shilkov.<br><b>URL</b> <a href='https://github.com/mikhailshilkov/leaflet-corridor' target='_blank'>https://github.com/mikhailshilkov/leaflet-corridor</a>"
    + "<h3>Leaflet.EasyPrint</h3><b>Author:</b> Rowan Winsemius.<br><b>URL</b> <a href='https://github.com/rowanwins/leaflet-easyPrint' target='_blank'>https://github.com/rowanwins/leaflet-easyPrint</a>"
    + "<h3>Leaflet.contextmenu</h3><b>Author:</b> Adam Ratcliffe.<br><b>URL</b> <a href='https://github.com/aratcliffe/Leaflet.contextmenu' target='_blank'>https://github.com/aratcliffe/Leaflet.contextmenu</a>"
    + "<h3>Leaflet.EasyButton</h3><b>Author:</b> atstp.<br><b>URL</b> <a href='https://github.com/CliffCloud/Leaflet.EasyButton' target='_blank'>https://github.com/CliffCloud/Leaflet.EasyButton</a>"
    + "<h3>Leaflet.BetterScale</h3><b>Author:</b> Dan Brown<br><b>URL</b> <a href='https://github.com/daniellsu/leaflet-betterscale' target='_blank'>https://github.com/daniellsu/leaflet-betterscale</a>"
    + "<h3>Leaflet.AnimatedSearchBox</h3><b>Author:</b> Luka Steinbach.<br><b>URL</b> <a href='https://github.com/luka1199/Leaflet.AnimatedSearchBox' target='_blank'>https://github.com/luka1199/Leaflet.AnimatedSearchBox</a>"
    + "<h3>Fuse</h3><b>Author:</b> Kiro Risk.<br><b>URL</b> <a href='https://www.fusejs.io/' target='_blank'>https://www.fusejs.io/</a>"
    + "<h2>Data origin</h2>"
    + "<h3>Region (Comunidades Autónomas) limits</h3><b>Source:</b> Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Province limits</h3><b>Source:</b> Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Territorial limit</h3><b>Source:</b> Generated with QGIS (<a href='https://qgis.org/en/site/' target='_blank'>https://qgis.org/en/site/</a>) from region data from Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Quakes</h3><b>Source:</b> Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Faults</h3><b>Source:</b> QAFI (Quaternary Active Faults database of Iberia), Instituto Geológico y Minero de España (IGME).<br><b>URL:</b> <a href='http://info.igme.es/qafi/' target='_blank'>http://info.igme.es/qafi/</a>"
    + "<h3>Locations</h3><b>Source:</b> Centroids generated with QGIS (<a href='https://qgis.org/en/site/' target='_blank'>https://qgis.org/en/site/</a>) from poblational data from Instituto Geográfico Nacional (IGN).<br><b>URL:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Intensities</h3><b>Fuente:</b> García y Cabañas (2022) 'Mapa de Intensidad Máxima (MIM) de España (Península Ibérica y Baleares)'<br><b>URL:</b><a href='https://www.ign.es/web/resources/acercaDe/libDigPub/X-AHPGG-articulos.pdf#page=520' target='_blank'>https://www.ign.es/web/resources/acercaDe/libDigPub/X-AHPGG-articulos.pdf#page=520'</a><br>"
    + "<b>URL:</b><a href='https://www.researchgate.net/publication/403874338_Mapa_de_Intensidad_Maxima_MIM_de_Espana_Peninsula_Iberica_y_Baleares' target='_blank'>https://www.researchgate.net/publication/403874338_Mapa_de_Intensidad_Maxima_MIM_de_Espana_Peninsula_Iberica_y_Baleares'</a>"
    + "<h3>Side panel icons</h3><b>URL:</b> <a href='https://www.reshot.com/free-svg-icons' target='_blank'>https://www.reshot.com/free-svg-icons</a>",

    // Alert window
    ALERT_WINDOW_FILTER_ALL_LAYERS_TEXT: "Filtered all layers.",
    ALERT_WINDOW_FILTER_LAYER_FORMAT: "Filtered %1 layer.",
    ALERT_WINDOW_DUPLICATE_ALL_LAYERS_TEXT: "Filtered and duplicated all layers.",
    ALERT_WINDOW_DUPLICATE_LAYER_FORMAT: "Filtered and duplicated %1 layer.",
    ALERT_WINDOW_REFRESH_ALL_TEXT: "Refreshed all layers.",
    ALERT_WINDOW_REFRESH_FORMAT: "Refreshed %1 layer.",
    ALERT_WINDOW_UNMARK_ALL_TEXT: "Unmarked all layers",
    ALERT_WINDOW_UNMARK_FORMAT: "Unmarked all events in %1 layer.",
    ALERT_WINDOW_IMPORT_LAYER_FORMAT: "Imported %1 layer.",
    ALERT_WINDOW_EXPORT_LAYER_FORMAT: "Exported %1 layer.",

    // Context menut texts
    // General
    CONTEXT_MENU_CENTER_MAP_ITEM: "Center map",
    CONTEXT_MENU_RESTORE_INITIAL_VIEW_ITEM: "Restore initial view",
    CONTEXT_MENU_SET_COORDINATES_ITEM: "Set coordinates",
    CONTEXT_MENU_DRAW_FILTER_CIRCLE_ITEM: "Draw filter circle",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_QUAKES_ITEM: "Zoom to closest quake to clicked position",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_FAULTS_ITEM: "Zoom to closest fault to clicked position",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_POPULATIONS_ITEM: "Zoom to closest population to clicked position",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_MAGNITUDE_QUAKE_IN_RADIUS_TEXT: "Zoom to biggest magnitude quake in radius",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_INTENSITY_QUAKE_IN_RADIUS_TEXT: "Zoom to biggest intensity quake in radius",
    CONTEXT_MENU_PAN_TO_MAX_INTENSITY_IN_RADIUS: "Pan to biggest intensity in radius",
    CONTEXT_MENU_QUAKES_NUMBER_IN_RADIUS_TEXT: "Get quakes number in radius",
    CONTEXT_MENU_FAULTS_NUMBER_IN_RADIUS_TEXT: "Get faults number in radius",
    CONTEXT_MENU_POPULATIONS_NUMBER_IN_RADIUS_TEXT: "Get inhabitants number in radius",
    CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT: "Get last quake bigger than a magnitude in radius",
    CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT: "Get last quake bigger than an intensity in radius",

    // Faults
    CONTEXT_MENU_POPULATIONS_DISTANCE_TO_FAULT: "Get locations from a distance to a fault",
    CONTEXT_MENU_BIGGEST_QUAKE_DISTANCE_TO_FAULT: "Get biggest magnitude quake from a distance to a fault",
    CONTEXT_MENU_POPULATION_NUMBER_DISTANCE_TO_FAULT: "Get highest inhabitants number locations from a distance to a fault",

    // Populations
    CONTEXT_MENU_POPULATION_MAX_INTENSITY_TEXT: "Get highest intensity felt in the population",

    // Query texts
    QUERY_QUAKE_NUMBER_IN_RADIUS_TITLE: "Number of quakes in radius.<br>Layer: %1.",
    QUERY_FAULT_NUMBER_IN_RADIUS_TITLE: "Number of faults in radius.<br>Layer: %1.",
    QUERY_POPULATION_NUMBER_IN_RADIUS_TITLE: "Number of inhabitants in radius.<br>Layer: %1.",
    QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT: "<b>Total: %1.</b><br><b>Latitude:</b> %2º.<br><b>Longitude:</b> %3º.<br><b>Radius:</b> %4km<br>Objects have been marked in the map.",
    QUERY_POPULATION_MAX_INTENSITY_TITLE: "Highest intensity felt in the population %1.",
    QUERY_POPULATION_MAX_INTENSITY_TEXT: "<b>Maximum intensity: %1.</b><br><b>Latitude:</b> %2º.<br><b>Longitude:</b> %3º.",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_TITLE: "Last quake of magnitude >= %1",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_FORMAT: "<b>Location: </b>%1.<br><b>Magnitude: </b>%2.<br><b>Date: </b>%3.<br><b>Latitude: </b>%4º.<br><b>Longitude: </b>%5º.<br><b>Radius: </b>%6km.",
    QUERY_LAST_QUAKE_BY_INTENSITY_TITLE: "Last quake of intensity >= %1",
    QUERY_LAST_QUAKE_BY_INTENSITY_FORMAT: "<b>Location: </b>%1.<br><b>Intensity: </b>%2.<br><b>Date: </b>%3.<br><b>Latitude: </b>%4º.<br><b>Longitude: </b>%5º.<br><b>Radius: </b>%6km.",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_TITLE: "Number of inhabitants at %1km from the selected fault",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_FORMAT: "<b>Total number of inhabitants: </b>%1.<br><b>Number of populatlocationsions:</b> %2.",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE: "Poblaciones de más de %1 habitantes a %2km de la falla seleccionada",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE: "Locations with higher than %1 inhabitants at %2km from the selected fault",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_FORMAT: "<b>Total number of inhabitants: </b>%1.<br><b>Number of locations:</b> %2.",
    QUERY_NO_OBJECT_FOUND_TEXT: "No object has been found.",
    QUERY_NAME_TEXT: "Name",
    QUERY_QUAKE_MAGNITUDE_TEXT: "Magnitude",
    QUERY_FAULT_MAGNITUDE_TEXT: "Maximum magnitude",
    QUERY_POPULATION_NUMBER_TEXT: "Inhabitants",
    QUERY_MAGNITUDE_INPUT_TEXT: "Magnitude >=  ",
    QUERY_INTENSITY_SELECT_TEXT: "Intensity >=  ",
    QUERY_DISTANCE_INPUT_TEXT: "Distance [km]:  ",
    QUERY_POPULATION_NUMBER_INPUT_TEXT: "Number of inhabitants >=  ",
    QUERY_ACCEPT_BUTTON_TEXT: "Accept",

    // Coordinates visor texts
    COORDINATE_VISOR_CONTROL_LATITUDE: "Latitude",
    COORDINATE_VISOR_CONTROL_LONGITUDE: "Longitude",

    // Filter legend texts
    FILTER_LEGEND_CONTROL_TITLE: "Active filters",
    FILTER_LEGEND_CONTROL_MAGNITUDE: "Magnitude",
    FILTER_LEGEND_CONTROL_DEPTH: "Depth [km]",
    FILTER_LEGEND_CONTROL_INTENSITY: "Intensity",
    FILTER_LEGEND_CONTROL_DATE: "Date range",
    FILTER_LEGEND_CONTROL_POPULATION: "Inhabitants",
    FILTER_LEGEND_CONTROL_UNKNOWN: "Uknown",

    // Event legend texts
    EVENT_LEGEND_CONTROL_TITLE: "Legend",
    EVENT_LEGEND_CONTROL_INTENSITY_TITLE: "Maximum intensities",
    EVENT_LEGEND_CONTROL_FAULT_TITLE: "Faults",
    EVENT_LEGEND_CONTROL_FAULT_TEXT: "Fault",
    EVENT_LEGEND_CONTROL_POPULATION_TITLE: "Population number",
    EVENT_LEGEND_CONTROL_DEPTH_TITLE: "Depth [km]",
    EVENT_LEGEND_CONTROL_MAGNITUDE_TITLE: "Magnitude",
    EVENT_LEGEND_CONTROL_MAGNITUDE_LETTER: "M",
    EVENT_LEGEND_CONTROL_POPULATION_NUMBER_LETTER: "P",

    // File texts
    PRINTED_MAP_FILENAME: "Screenshot",

    // Other texts
    MINIMIZE_BUTTON_SYMBOl: "-",
    MAXIMIZE_BUTTON_SYMBOl: "+",
    POPUP_UNKNOWN_TEXT: "Unknown"
  }
}