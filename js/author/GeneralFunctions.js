/*
Este archivo contiene un objeto global que es una enumeración con los diferentes "modos" del visor,
utilizados principalmente para dibujar y funciones de consultas y una clase con las funciones
principales, utilizadas para principalmente para la configuración inicial del visor y la
inicialización de capas y controles, así como otros métodos generales.

This file contains a global object which is an enumeration with the diferente visor "modes",
used mainly to draw and query functions and a class with the main functions, used mostly for
the initial setup and layer and control initialization as well as general methods.
*/

VisorMode = {
  NORMAL: 0,
  FILTER_CIRCLE: 1,
  BIGGEST_MAG_QUAKE: 2,
  BIGGEST_INT_QUAKE: 3,
  BIGGEST_INTENSITY: 4,
  QUAKES_NUMBER: 5,
  FAULTS_NUMBER: 6,
  POPULATIONS_NUMBER: 7,
  LAST_MAG_QUAKE: 8,
  LAST_INT_QUAKE: 9
}

class GeneralFunctions {
  static intialize() {
    this.initializePanes();
    this.initializeFirstControls();
    this.initializeLayers();
    this.initializeMapEvents();
    this.initializeSecondControls();
  }

  static initializePanes() {
    this.createPanes();
    this.setupPanes();
  }

  static createPanes() {
    map.createPane(PaneSymbol.INTENSITIES);
    map.createPane(PaneSymbol.REGIONS);
    map.createPane(PaneSymbol.PROVINCES);
    map.createPane(PaneSymbol.TERRITORIAL_LIMIT);
    map.createPane(PaneSymbol.FILTER_BUFFER);
    map.createPane(PaneSymbol.QUAKES);
    map.createPane(PaneSymbol.DUPLICATED_QUAKES);
    map.createPane(PaneSymbol.POPULATIONS);
    map.createPane(PaneSymbol.DUPLICATED_POPULATIONS);
    map.createPane(PaneSymbol.FAULTS);
    map.createPane(PaneSymbol.DUPLICATED_FAULTS);
    map.createPane(PaneSymbol.IMPORTED_LAYER);
    map.createPane(PaneSymbol.FILTER_CIRCLE);
  }

  static setupPanes() {
    map.getPane(PaneSymbol.INTENSITIES).style.zIndex = PaneZIndex.INTENSITIES;
    map.getPane(PaneSymbol.REGIONS).style.zIndex = PaneZIndex.REGIONS;
    map.getPane(PaneSymbol.PROVINCES).style.zIndex = PaneZIndex.PROVINCES;
    map.getPane(PaneSymbol.TERRITORIAL_LIMIT).style.zIndex = PaneZIndex.TERRITORIAL_LIMIT;
    map.getPane(PaneSymbol.FILTER_BUFFER).style.zIndex = PaneZIndex.FILTER_BUFFER;
    map.getPane(PaneSymbol.QUAKES).style.zIndex = PaneZIndex.QUAKES;
    map.getPane(PaneSymbol.DUPLICATED_QUAKES).style.zIndex = PaneZIndex.DUPLICATED_QUAKES;
    map.getPane(PaneSymbol.POPULATIONS).style.zIndex = PaneZIndex.POPULATIONS;
    map.getPane(PaneSymbol.DUPLICATED_POPULATIONS).style.zIndex = PaneZIndex.DUPLICATED_POPULATIONS;
    map.getPane(PaneSymbol.FAULTS).style.zIndex = PaneZIndex.FAULTS;
    map.getPane(PaneSymbol.DUPLICATED_FAULTS).style.zIndex = PaneZIndex.DUPLICATED_FAULTS;
    map.getPane(PaneSymbol.IMPORTED_LAYER).style.zIndex = PaneZIndex.IMPORTED_LAYER;
    map.getPane(PaneSymbol.FILTER_CIRCLE).style.zIndex = PaneZIndex.FILTER_CIRCLE;
  }

  static initializeLayers() {
    this.initializeBaseLayers();
    this.initializeOverlayLayers();
    LayerFunctions.reorderOverlayLayersInControl();
  }

  static initializeBaseLayers() {
    emptyLayer = LayerFunctions.getEmptyLayer();
    osmLayer = LayerFunctions.getOsmLayer();
    map.addLayer(osmLayer);
    layerControl.addBaseLayer(emptyLayer, LangageFunctions.getText('EMPTY_LAYER'));
    layerControl.addBaseLayer(osmLayer, LangageFunctions.getText('OSM_LAYER'));
  }
  
  static initializeOverlayLayers() {
    LayerFunctions.addRegionsLayer();
    LayerFunctions.addProvincesLayer();
    LayerFunctions.addTerritorialLimitLayer();
    LayerFunctions.addQuakesLayer(this.getQuakeInitialFilters());
    LayerFunctions.addFaultsLayer(this.getFaultInitialFilters());
    LayerFunctions.addPopulationsLayer(this.getPopulationInitialFilters());
    LayerFunctions.addIntensitiesLayer();

    LayerFunctions.hideProvincesLayer();
    LayerFunctions.hidePopulationsLayer();
    LayerFunctions.hideIntensitiesLayer();
  }

  static initializeFirstControls() {
    this.initializeZoomControl();
    this.initializeLayerControl();
    this.initializeScalebarControl();
    this.initializeCoordinatesVisorControl();
    this.initializeSearchboxControl();
    this.initializePrintControl();
  }

  static initializeSecondControls() {
    this.initializeSidePanelControl();
    this.initializeFilterLegendControl();
    this.initializeEventLegendControl();
  }

  static initializeZoomControl() {
    zoomControl = L.control.zoom({position: 'topleft'}).addTo(map);
  }

  static initializeLayerControl() {
    layerControl = L.control.layers({}, {}, {collapsed: !DEFAULT_LAYER_CONTROL_ALLWAYS_DEPLOYED, sortLayers: false}).addTo(map);
  }

  static initializeScalebarControl() {
    scalebarControl = L.control.betterscale({position: 'bottomright', imperial: false, metric: true, maxWidth: 300}).addTo(map);
    if (!DEAULT_SCALEBAR_CONTROL_VISIBLE) {
      this.hideControl(scalebarControl);
    }
  }

  static initializeCoordinatesVisorControl() {
    coordinatesVisorControl = L.control.coordinatesVisor({position: 'bottomright'}).addTo(map);
    if (!DEFAULT_COORDINATE_VISOR_CONTROL_VISIBLE) {
      this.hideControl(coordinatesVisorControl);
    }
  }

  static initializeSearchboxControl() {
    searchboxControl = L.control.searchbox({position: 'topleft', expand: 'right', width: '300px', autocompleteFeatures: ['setValueOnClick'], iconPath: 'css/images/search_icon.png'});

    // IMPORTANTE: Los eventos del control deben añadirse DESPUÉS de añadir el control al mapa
    // IMPORTANT: Events of the control have to be added AFTER adding the control to the map
    searchboxControl.addTo(map);
    searchboxControl.onInput('keyup', this.onSeachboxInput);
    searchboxControl.onButton('click', MiscFunctions.searchPopulation);
    searchboxControl.onAutocomplete('click', MiscFunctions.searchPopulation);
  }

  static initializePrintControl() {
    // Al contrario que otros controles, el objeto "printControl" no aparecerá visible,
    // si no que funcionará mediante un control de la clase "easyButton". Sin embargo,
    // es necesario instanciarlo para poder acceder a sus métodos
    // Unlike other controls, the "printControl" object is not to be visible,
    // it will work with a control of the "easyButton" class. However,
    // it is necesary to instance it to access its methods

    printControl = L.easyPrint({position: 'bottomright', exportOnly: true, sizeModes: ['CurrentSize', 'A4Landscape'], hidden: true}).addTo(map);
    printButton = L.easyButton('<img src="css/images/Camera.svg">', FileFunctions.printMap).addTo(map);
  }

  static initializeSidePanelControl() {
    L.control.sidepanel('sidePanel', {startTab: 'tab-1'});
    sidePanelControl = L.control.sidepanel('sidePanel', {startTab: 'tab-1', tabsPosition: 'left',});
    sidePanelControl.addTo(map);
    SidePanelFunctions.initializeAll();
    this.showSidePanel();
  }

  static initializeFilterLegendControl() {
    filterLegendControl = L.control.filterLegend({position: 'bottomright'}).addTo(map);
  }

  static initializeEventLegendControl() {
    eventLegendControl = L.control.eventLegend({position: 'bottomleft'}).addTo(map);
  }

  static initializeMapEvents() {
    map.on('mousemove', this.onMapMouseMove);
    map.on('click', this.onMapLeftClick);
    map.on('contextmenu', this.onMapContextMenu);
    map.on('overlayadd', this.onMapOverlayAdd);
    map.on('overlayremove', this.onMapOverlayRemove);
  }

  // Eventos de mapa / Map events

  static onMapMouseMove(ev) {
    if (coordinatesVisorControl) {
      GeneralFunctions.updateCoordinatesVisor(ev);
    }
    if (GeneralFunctions.isDraw() && filterCircle && filterCircleOrigin && !spatialRadiusFixed) {
      GeneralFunctions.updateFilterCircleRadius(ev);
    }
  }

  static onMapLeftClick(ev) {
    if (searchboxControl) {
      searchboxControl.hide();
      searchboxControl.clear();
    }
    if (GeneralFunctions.isDraw()) {
      GeneralFunctions.processDrawMode();
    } else if (!map.contextmenu.isVisible()) {
      if (filterCircle) GeneralFunctions.removeFilterCircle();
      if (filterBuffer) GeneralFunctions.removeFilterBuffer();
    }
  }

  static onMapContextMenu(ev) {
    if (GeneralFunctions.isDraw()) {
      GeneralFunctions.cancelDraw();
    }
  }

  static onMapOverlayAdd(ev) {
    if (eventLegendControl) eventLegendControl.update();
  }

  static onMapOverlayRemove(ev) {
    if (eventLegendControl) eventLegendControl.update();
  }

  static updateCoordinatesVisor(ev) {
    coordinatesVisorControl.update(ev);
  }

  static updateFilterCircleRadius(ev) {
    const latlng1 = filterCircle.getLatLng();
    const latlng2 = ev.latlng;
    const r = map.distance(latlng1, latlng2);
    filterCircle.setRadius(r);
    SidePanelFunctions.setSpatialRadiusFilter(r / 1000);
  }

  // Eventos de la caja de búsqueda / Searchbox events

  static onSeachboxInput(ev) {
    // La propiedad "keyCode" del objeto "evento (ev)" con valor 13 se corresponde con la tecla "ENTER" del teclado
    // The "event (ev)" object "keyCode" property with value 13 corresponds to key "ENTER" in the keyboard.
    if (ev.keyCode === 13) {
      MiscFunctions.searchPopulation();
    } else {
      const value = this.getValue();
      if (value !== "") {
        const array = fuse.search(value);
        this.setItems(array.map(obj => obj.item).slice(0, 5));
      } else {
        this.clearItems();
      }
    }
  }

  // Funciones de modo visor / Visor mode functions

  static getMode() {
    return visorMode;
  }

  static setMode(mode) {
    visorMode = mode;
  }

  // Funciones de objeto de selección / Selection object functions

  static getSelectedObject() {
    return selectedObject;
  }

  static setSelectedObject(obj) {
    selectedObject = obj;
  }

  // Funciones de menú contextual / Context menu functions

  static getContextMenuItems() {
    let array = [];
    array = array.concat(this.getContextMenuItemsBasicFunctions());
    array.push('-');
    array = array.concat(QueryFunctions.getClosestObjectFunctions());
    array.push('-');
    array = array.concat(QueryFunctions.getBiggestObjectFunctions());
    array.push('-');
    array = array.concat(QueryFunctions.getObjectNumberFunctions());
    array.push('-');
    array = array.concat(QueryFunctions.getAdvancedQueries());
    return array;
  }

  static getContextMenuItemsBasicFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_CENTER_MAP_ITEM'), callback: this.centerMap});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_RESTORE_INITIAL_VIEW_ITEM'), callback: this.restoreInitialView});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_SET_COORDINATES_ITEM'), callback: this.setCoordinates});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_DRAW_FILTER_CIRCLE_ITEM'), callback: this.starDrawFilterCircle});
    return array;
  }

  static centerMap(ev) {
    map.panTo(ev.latlng);
  }

  static restoreInitialView(ev) {
    const latlng = L.latLng(INITIAL_LATITUDE, INITIAL_LONGITUDE);
    map.setView(latlng, INITIAL_ZOOM_LEVEL);
  }

  static setCoordinates(ev) {
    const lat = MiscFunctions.clamp(ev.latlng.lat, MIN_LATITUDE, MAX_LATITUDE);
    const lng = MiscFunctions.clamp(ev.latlng.lng, MIN_LONGITUDE, MAX_LONGITUDE);
    SidePanelFunctions.setSpatialLatitudeFilter(lat);
    SidePanelFunctions.setSpatialLongitudeFilter(lng);
    GeneralFunctions.finishDraw();
  }

  static starDrawFilterCircle(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.FILTER_CIRCLE);
  }

  // Funciones de dibujo / Draw functions

  static startDraw(ev, mode) {
    previousCircleLat = SidePanelFunctions.getSpatialLatitudeFilter();
    previousCircleLng = SidePanelFunctions.getSpatialLongitudeFilter();
    previousCircleRadius = SidePanelFunctions.getSpatialRadiusFilter();

    SidePanelFunctions.setSpatialLatitudeFilter(ev.latlng.lat);
    SidePanelFunctions.setSpatialLongitudeFilter(ev.latlng.lng);

    map.contextmenu.disable();
    GeneralFunctions.setMode(mode);

    if (spatialRadiusFixed) {
      GeneralFunctions.processDrawMode();
    } else {
      if (filterCircle) LayerFunctions.removeFilterCircleLayer();
      LayerFunctions.addFilterCircleLayer(ev.latlng, true);
      filterCircle.setRadius(previousCircleRadius * 1000);
    }
  }

  static finishDrawMode() {
    this.finishDraw();
    GeneralFunctions.setMode(VisorMode.NORMAL);
    map.contextmenu.enable();
  }

  static finishDraw() {
    // Por desgracia el motor de Leaflet no permite modificar la interactividad de una capa una vez creada,
    // por tanto, hacemos este apaño, en el que destruimos la capa y la volvemos a crear esta vez sin ser interactiva.
    // ¿Por qué queremos esto? Porque las capas no interactivas permiten llamar a eventos (como abrir popups) de capas
    // que están por debajo, sin embargo, cuando estamos "dibujando" en tiempo real el círculo de filtrado sí que queremos
    // que no interfieran los popups del resto de capas.

    // Unfortunately Leaflet's engine does not allow to modify the layer interactivity once it is creade,
    // thus, we do this hotfix, where we destroy the layer and then we create it again just this time without being interactive.
    // Why do we do this? Because not interactive layer allow the call of events (like opening popups) from layer that
    // area below, however, when we are "drawing" the filter circle in real time we do want other popups from other layers not
    // to interfere.

    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const radius = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const latlng = L.latLng(lat, lng);
    LayerFunctions.removeFilterCircleLayer();
    if (radius > MIN_RADIUS) {
      LayerFunctions.addFilterCircleLayer(latlng, false);
      filterCircle.setRadius(radius);
    }
  }

  static cancelDraw() {
    SidePanelFunctions.setSpatialLatitudeFilter(previousCircleLat);
    SidePanelFunctions.setSpatialLongitudeFilter(previousCircleLng);
    SidePanelFunctions.setSpatialRadiusFilter(previousCircleRadius);
    GeneralFunctions.finishDrawMode();
  }

  static isDraw() {
    const mode = this.getMode();
    return mode === VisorMode.FILTER_CIRCLE || mode === VisorMode.BIGGEST_MAG_QUAKE
    || mode === VisorMode.BIGGEST_INT_QUAKE || mode === VisorMode.QUAKES_NUMBER
    || mode === VisorMode.BIGGEST_INTENSITY || mode === VisorMode.FAULTS_NUMBER 
    || mode === VisorMode.POPULATIONS_NUMBER || mode === VisorMode.LAST_MAG_QUAKE
    || mode === VisorMode.LAST_INT_QUAKE;
  }

  static processDrawMode() {
    const mode = this.getMode();
      if (mode === VisorMode.BIGGEST_MAG_QUAKE) {
        QueryFunctions.zoomToBiggestMagnitudeQuakeInRadius();
      } else if (mode === VisorMode.BIGGEST_INT_QUAKE) {
        QueryFunctions.zoomToBiggestIntensityQuakeInRadius();
      } else if (mode === VisorMode.QUAKES_NUMBER) {
        QueryFunctions.getQuakesNumberInRadius();
      } else if (mode === VisorMode.FAULTS_NUMBER) {
        QueryFunctions.getFaultsNumberInRadius();
      } else if (mode === VisorMode.POPULATIONS_NUMBER) {
        QueryFunctions.getPopulationsNumberInRadius();
      } else if (mode === VisorMode.BIGGEST_INTENSITY) {
        QueryFunctions.panToBiggestIntensityInRadius();
      } else if (mode === VisorMode.LAST_MAG_QUAKE) {
        WindowFunctions.showMagnitudeInputQuery();
      } else if (mode === VisorMode.LAST_INT_QUAKE) {
        WindowFunctions.showIntensitySelectQuery();
      }
      GeneralFunctions.finishDrawMode();
  }

  static removeFilterCircle() {
    SidePanelFunctions.setSpatialRadiusFilter(MIN_RADIUS);
    LayerFunctions.removeFilterCircleLayer();
  }

  static removeFilterBuffer() {
    LayerFunctions.removeFilterBufferLayer();
  }

  // Funciones de controles / Controls functions

  static toogleControlVisibility(control) {
    let container;
    if (control) {
      container = control.getContainer();
      container.hidden = !container.hidden;
    }
  }

  static showControl(control) {
    control.getContainer().hidden = false;
  }

  static hideControl(control) {
    control.getContainer().hidden = true;
  }

  static setLayerControlCollapse(value) {
    if (layerControl) layerControl.options.collapsed = value;
  }

  static toogleLayerControlCollpase() {
    if (map && layerControl) {
      map.removeControl(layerControl);
      layerControl.options.collapsed = !layerControl.options.collapsed;
      map.addControl(layerControl);
    }
  }

  static updateLayerControl() {
    if (map && layerControl) {
      map.removeControl(layerControl);
      map.addControl(layerControl);
    }
  }

  // Funciones del panel lateral / Side panel functions

  static getSidePanel() {
    return document.querySelector('#sidePanel');
  }

  static toogleSidePanel() {
    const obj = this.getSidePanel();
    if (obj.style.display !== 'block') {
      this.showSidePanel();
    } else {
      this.hideSidePanel();
    }
  }

  static showSidePanel() {
    const obj = this.getSidePanel();
    if (obj && obj.style.display !== 'block') {
      obj.style.display = 'block';
    }
  }

  static hideSidePanel() {
    const obj = this.getSidePanel();
    if (obj && obj.style.display === 'block') {
      obj.style.display = 'none';
    }
  }

  // Otros / Others
  static getQuakeInitialFilters() {
    return {
      minMagnitude: INITIAL_QUAKES_MIN_MAGNITUDE,
      maxMagnitude: INITIAL_QUAKES_MAX_MAGNITUDE,
      minIntensity: INITIAL_QUAKES_MIN_INTENSITY,
      maxIntensity: INITIAL_QUAKES_MAX_INTENSITY,
      minDepth: INITIAL_QUAKES_MIN_DEPTH,
      maxDepth: INITIAL_QUAKES_MAX_DEPTH,
      minDate: INITIAL_QUAKES_MIN_DATE,
      maxDate: INITIAL_QUAKES_MAX_DATE,
      latitude: INITIAL_LATITUDE,
      longitude: INITIAL_LONGITUDE,
      radius: INITIAL_RADIUS,
      insideTerritorialLimit: DEFAULT_INSIDE_TERRITORIAL_LIMIT
    }
  }

  static getFaultInitialFilters() {
    return {
      minMagnitude: INITIAL_FAULTS_MIN_MAGNITUDE,
      maxMagnitude: INITIAL_FAULTS_MAX_MAGNITUDE,
      minDepth: INITIAL_FAULTS_MIN_DEPTH,
      maxDepth: INITIAL_FAULTS_MAX_DEPTH,
      latitude: INITIAL_LATITUDE,
      longitude: INITIAL_LONGITUDE,
      radius: INITIAL_RADIUS,
      insideTerritorialLimit: DEFAULT_INSIDE_TERRITORIAL_LIMIT
    }
  }

  static getPopulationInitialFilters() {
    return {
      minNumber: INITIAL_POPULATIONS_MIN_NUMBER,
      maxNumber: POPULATIONS_MAX_NUMBER,
      latitude: INITIAL_LATITUDE,
      longitude: INITIAL_LONGITUDE,
      radius: INITIAL_RADIUS,
      insideTerritorialLimit: DEFAULT_INSIDE_TERRITORIAL_LIMIT
    }
  }
}