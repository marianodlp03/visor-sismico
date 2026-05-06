/*
Este archivo contiene únicamente una clase con métodos estáticos para la obtención de objetos de capas,
adición, eliminación, encendido, apagado y marcado. Es importante destacar que aunque yo utilizo el
término "capa", la mayoría de objetos, a excepción del círculo de filtrado (que son dos capas), que son
capas geoJSON, son realmente grupos de capas puesto que Leaflet considera que una capa es el elemento 
mínimo y necesario que se dibuja.

This file contains only a class with static methods for the obtention of layer objects, addition,
removal, show, hide and mark functions. It is important to note that while I use the term "layer",
most objects, with the exception of the filter circle (which are actually two layers), are geoJSON
layers, which are actually layer groups, since Leaflet considers a layer is the minimum and necessary
element that is drawn.
*/

class LayerFunctions {

  // Funciones de capa / Layer functions

  // Sismos /Quakes

  static getQuakesPointToLayerFunction(feature, latlng, pane) {
    return L.circleMarker(latlng, {
      pane: pane
    })
  }

  static getQuakesFilterFunction(feature, filters) {
    let isMagnitude, isIntensity, isDepth, isDate, isInsideFilterCircle, isInsideTerritorialLimit;
    const magnitude = feature.properties[AttributesConfig.QUAKE_MAGNITUDE];
    const depth = feature.properties[AttributesConfig.QUAKE_DEPTH];
    const intensityString = feature.properties[AttributesConfig.QUAKE_INTENSITY];
    const intensityValue = MiscFunctions.getIntensityValue(intensityString)
    const date = MiscFunctions.getDate(feature.properties[AttributesConfig.QUAKE_DATE]);

    if (filters.minMagnitude !== undefined && filters.maxMagnitude !== undefined) {
      isMagnitude = magnitude >= filters.minMagnitude && magnitude <= filters.maxMagnitude;
    } else {
      isMagnitude = true;
    }

    if (filters.minIntensity !== undefined && filters.maxIntensity !== undefined) {
      isIntensity = intensityValue >= filters.minIntensity && intensityValue <= filters.maxIntensity;
    } else {
      isIntensity = true;
    }

    if (filters.minDepth !== undefined && filters.maxDepth !== undefined) {
      isDepth = depth >= filters.minDepth && depth <= filters.maxDepth;
    } else {
      isDepth = true;
    }

    if (filters.minDate !== undefined && filters.maxDate !== undefined) {
      isDate = date >= filters.minDate && date <= filters.maxDate;
    } else {
      isDate = true;
    }

    if (filters.latitude !== undefined && filters.longitude !== undefined && filters.radius !== undefined) {
      isInsideFilterCircle = GeometryFunctions.isFeatureInsideRadius(feature, filters.longitude, filters.latitude, filters.radius * 1000);
    } else {
      isInsideFilterCircle = true;
    }

    if (filters.insideTerritorialLimit) {
      isInsideTerritorialLimit = GeometryFunctions.isFeatureInsidelayerGroup(territorialLimitLayer, feature);
    } else {
      isInsideTerritorialLimit = true;
    }

    return isMagnitude && isIntensity && isDepth && isDate && isInsideFilterCircle && isInsideTerritorialLimit;
  }

  static getQuakesOnEachFeatureFunction(feature, layer) {
    layer.bindPopup(PopupFunctions.getText(PopupQuakeAttributes, feature));
    layer.on({
      mouseover: StyleFunctions.highlightLayer,
      mouseout: StyleFunctions.unhighlightLayer,
      contextmenu: GeneralFunctions.setSelectedObject
    })
  }

  // Fallas / Faults

  static getFaultsOnEachFeatureFunction(feature, layer) {
    layer.bindPopup(PopupFunctions.getText(PopupFaultAttributes, feature));
    layer.on({
      mouseover: StyleFunctions.highlightLayer,
      mouseout: StyleFunctions.unhighlightLayer,
      contextmenu: GeneralFunctions.setSelectedObject
    });
    layer.bindContextMenu({
      contextmenu: true,
      contextmenuItems: QueryFunctions.getFaultsContextMenuItems()
    });
  }

  static getFaultsFilterFunction(feature, filters) {
    let isMagnitude, isDepth, isInsideFilterCircle, isInsideTerritorialLimit;
    const magnitude = feature.properties[AttributesConfig.FAULT_MAGNITUDE];
    const depth = feature.properties[AttributesConfig.FAULT_DEPTH];
    if (filters.minMagnitude !== undefined && filters.maxMagnitude !== undefined) {
      isMagnitude = magnitude >= filters.minMagnitude && magnitude <= filters.maxMagnitude;
    } else {
      isMagnitude = true;
    }

    if (filters.minDepth !== undefined && filters.maxDepth !== undefined) {
      isDepth = depth >= filters.minDepth && depth <= filters.maxDepth;
    } else {
      isDepth = true;
    }

    if (filters.latitude !== undefined && filters.longitude !== undefined && filters.radius !== undefined) {
      isInsideFilterCircle = GeometryFunctions.isFeatureInsideRadius(feature, filters.longitude, filters.latitude, filters.radius * 1000);
    } else {
      isInsideFilterCircle = true;
    }

    if (filters.insideTerritorialLimit) {
      isInsideTerritorialLimit = GeometryFunctions.isFeatureInsidelayerGroup(territorialLimitLayer, feature);
    } else {
      isInsideTerritorialLimit = true;
    }

    return isMagnitude && isDepth && isInsideFilterCircle && isInsideTerritorialLimit;
  }

  // Poblaciones / Populations

  static getPopulationsOnEachFeatureFunction(feature, layer) {
    layer.bindPopup(PopupFunctions.getText(PopupPopulationAttributes, feature));
    layer.on({
      mouseover: StyleFunctions.highlightLayer,
      mouseout: StyleFunctions.unhighlightLayer,
      contextmenu: GeneralFunctions.setSelectedObject
    });
    layer.bindContextMenu({
      contextmenu: true,
      contextmenuItems: QueryFunctions.getPopulationsContextMenuItems()
    })
  }

  static getPopulationsPointToLayerFunction(feature, latlng, pane) {
    return L.shapeMarker(latlng, StyleFunctions.getPopulationOldStyle(feature, pane));
  }

  static getPopulationsFilterFunction(feature, filters) {
    let isNumber, isInsideFilterCircle, isInsideTerritorialLimit;
    const number = feature.properties[AttributesConfig.POPULATION_NUMBER];

    if (filters.minNumber !== undefined && filters.maxNumber !== undefined) {
      isNumber = number >= filters.minNumber && number <= filters.maxNumber;
    } else {
      isNumber = true;
    }

    if (filters.latitude !== undefined && filters.longitude !== undefined && filters.radius !== undefined) {
      isInsideFilterCircle = GeometryFunctions.isFeatureInsideRadius(feature, filters.longitude, filters.latitude, filters.radius * 1000);
    } else {
      isInsideFilterCircle = true;
    }

    if (filters.insideTerritorialLimit) {
      isInsideTerritorialLimit = GeometryFunctions.isFeatureInsidelayerGroup(territorialLimitLayer, feature);
    } else {
      isInsideTerritorialLimit = true;
    }

    return isNumber && isInsideFilterCircle && isInsideTerritorialLimit;
  }

  // Intensidades / Intensities

  static getIntensitiesOnEachFeatureFunction(feature, layer) {
    layer.bindPopup(PopupFunctions.getText(PopupIntensityAttributes, feature));
    layer.on({
      mouseover: StyleFunctions.highlightLayer,
      mouseout: StyleFunctions.unhighlightLayer,
      contextmenu: GeneralFunctions.setSelectedObject
    })
  }

  // Capa importada / Imported layer

  static getImportedLayerOnEachFeatureFunction(feature, layer) {
    layer.on({
      mouseover: StyleFunctions.highlightLayer,
      mouseout: StyleFunctions.unhighlightLayer
    })
  }

  // Funciones de creación de capas 
  // Permiten obtener un objeto de capa a partir de unos parámetros

  static getEmptyLayer() {
    return L.geoJSON();
  }

  static getOsmLayer() {
    return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }) 
  }

  static getRegionsLayer() {
    const options = {
      interactive: false,
      pane: PaneSymbol.REGIONS,
      style: StyleFunctions.getRegionsStyle,
      attribution: "<a href='https://www.ign.es/'>IGN"
    }
    return L.geoJSON(regionsData, options);
  }

  static getProvincesLayer() {
    const options = {
      interactive: false,
      pane: PaneSymbol.PROVINCES,
      style: StyleFunctions.getProvincesStyle,
      attribution: "<a href='https://www.ign.es/'>IGN"
    }
    return L.geoJSON(provincesData, options);
  }

  static getTerritorialLimitLayer() {
    const options = {
      interactive: false,
      pane: PaneSymbol.TERRITORIAL_LIMIT,
      style: StyleFunctions.getTerritorialLimitStyle,
      attribution: "<a href='https://www.ign.es/'>IGN"
    }
    return L.geoJSON(territorialLimitData, options);
  }
  
  static getQuakesLayer(pane, filters) {
    if (!pane) pane = PaneSymbol.QUAKES;
    if (!filters) filters = {};
    const pointToLayerFunction = this.getQuakesPointToLayerFunction;
    const filterFunction = this.getQuakesFilterFunction;
    let options = {
      interactive: true,
      pane: pane,
      style: StyleFunctions.getQuakesStyle,
      attribution: "<a href='https://www.ign.es/'>IGN",
      onEachFeature: this.getQuakesOnEachFeatureFunction,
      pointToLayer: function(feature, latlng) {
        return pointToLayerFunction(feature, latlng, pane);
      },
      filter: function(feature) {
        return filterFunction(feature, filters);
      }
    }
    return L.geoJSON(quakesData, options);
  }

  static getFaultsLayer(pane, filters) {
    if (!pane) pane = PaneSymbol.FAULTS;
    if (!filters) filters = {};
    const filterFunction = this.getFaultsFilterFunction;
    let options = {
      interactive: true,
      pane: pane,
      style: StyleFunctions.getFaultsStyle,
      attribution: "<a href='http://info.igme.es/qafi/'>QAFI",
      onEachFeature: this.getFaultsOnEachFeatureFunction,
      filter: function(feature) {
        return filterFunction(feature, filters);
      }
    }
    return L.geoJSON(faultsData, options);
  }

  static getPopulationsLayer(pane, filters) {
    if (!pane) pane = PaneSymbol.POPULATIONS;
    if (!filters) filters = {};
    const pointToLayerFunction = this.getPopulationsPointToLayerFunction;
    const filterFunction = this.getPopulationsFilterFunction;
    let options = {
      interactive: true,
      pane: pane,
      attribution: "<a href='https://www.ign.es/'>IGN",
      onEachFeature: this.getPopulationsOnEachFeatureFunction,
      pointToLayer: function(feature, latlng) {
        return pointToLayerFunction(feature, latlng, pane);
      },
      filter: function(feature) {
        return filterFunction(feature, filters);
      }
    }
    return L.geoJSON(populationsData, options);
  }

  static getIntensitiesLayer() {
    const options = {
      interactive: true,
      pane: PaneSymbol.INTENSITIES,
      onEachFeature: this.getIntensitiesOnEachFeatureFunction,
      style: function(feature) {
        return StyleFunctions.getIntensitiesStyle(feature);
      }
    }
    return L.geoJSON(intensitiesData, options);
  }

  static getFilterCircleLayer(latlng, isInteractive) {
    return L.circle(latlng, StyleFunctions.getFilterCircleOptions(isInteractive));
  }

  static getFilterCircleOriginLayer(latlng, isInteractive) {
    return L.circleMarker(latlng, StyleFunctions.getFilterCircleOriginOptions(isInteractive));
  }

  static getFilterBufferLayer(latlngs, width) {
    return L.corridor(latlngs, StyleFunctions.getFilterBufferOptions(width));
  }

  static getImportedLayer(data) {
    const options = {
      interactive: true,
      pane: PaneSymbol.IMPORTED_LAYER,
      onEachFeature: this.getImportedLayerOnEachFeatureFunction,
      style: function() {
        return StyleFunctions.getImportedLayerStyle();
      }
    }
    return L.geoJSON(data, options);
  }

  // Funciones para añadir capas
  // Añaden la capa al mapa y al control de capas con un nombre
  // También pueden (y se recomienda hacerlo) asginar el objeto de capa a un objeto global
  // No utilizar con capas base

  static addLayer(layer, layerName) {
    this.showLayer(layer);
    layerControl.addOverlay(layer, layerName);
  }

  static addRegionsLayer() {
    const layer = this.getRegionsLayer();
    regionsLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('REGIONS_LAYER'));
  }

  static addProvincesLayer() {
    const layer = this.getProvincesLayer();
    provincesLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('PROVINCES_LAYER'));
  }

  static addTerritorialLimitLayer() {
    const layer = this.getTerritorialLimitLayer();
    territorialLimitLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('TERRITORIAL_LIMIT'));
  }

  static addQuakesLayer(filters) {
    const layer = this.getQuakesLayer(PaneSymbol.QUAKES, filters);
    quakesLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('QUAKES_LAYER'));
    StyleFunctions.updateQuakesLayerFillColor(quakesLayer);
  }

  static addFaultsLayer(filters) {
    const layer = this.getFaultsLayer(PaneSymbol.FAULTS, filters);
    faultsLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('FAULTS_LAYER'));
  }

  static addPopulationsLayer(filters) {
    const layer = this.getPopulationsLayer(PaneSymbol.POPULATIONS, filters);
    populationsLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('POPULATIONS_LAYER'));
  }

  static addIntensitiesLayer() {
    const layer = this.getIntensitiesLayer(PaneSymbol.INTENSITIES);
    intensitiesLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('INTENSITIES_LAYER'));
  }

  static addDuplicatedQuakesLayer(filters) {
    const layer = this.getQuakesLayer(PaneSymbol.DUPLICATED_QUAKES, filters);
    duplicatedQuakesLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('DUPLICATED_QUAKES_LAYER'));
    StyleFunctions.updateQuakesLayerFillColor(duplicatedQuakesLayer);
  }

  static addDuplicatedFaultsLayer(filters) {
    const layer = this.getFaultsLayer(PaneSymbol.DUPLICATED_FAULTS, filters);
    duplicatedFaultsLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('DUPLICATED_FAULTS_LAYER'));
  }

  static addDuplicatedPopulationsLayer(filters) {
    const layer = this.getPopulationsLayer(PaneSymbol.DUPLICATED_POPULATIONS, filters);
    duplicatedPopulationsLayer = layer;
    this.addLayer(layer, LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER'));
  }

  static addFilterCircleLayer(latLng, isInteractive) {
    // Se añaden tanto la capa del círculo como la del origen
    // Al contrario que el resto de capas, no se añade al control de capas, puesto que no se quiere
    // que el usuario tenga control sobre su visibilidad

    // Both the circle layer and the origin are added
    // Unlike the rest of layer, they are not added to the layer control, since we do not want
    // the user to have control on its visibility

    const circleLayer = this.getFilterCircleLayer(latLng, isInteractive);
    const circleOriginLayer = this.getFilterCircleOriginLayer(latLng, isInteractive);
    filterCircle = circleLayer;
    filterCircleOrigin = circleOriginLayer;
    map.addLayer(circleLayer);
    map.addLayer(circleOriginLayer);
  }

  static addFilterBufferLayer(latlngs, width) {
    // Parámetro "width" en metros
    // Parameter "width" in meters
    const layer = this.getFilterBufferLayer(latlngs, width);
    filterBuffer = layer;
    map.addLayer(layer);
  }

  static addImportedLayer(data, name) {
    const layer = this.getImportedLayer(data);
    importedLayer = layer;
    this.addLayer(layer, name);
  }

  // Funciones de quitar capa / Remove layer functions

  static removeLayer(layer) {
    map.removeLayer(layer);
    layerControl.removeLayer(layer);
    if (eventLegendControl) eventLegendControl.update();
  }

  static removeAllLayers() {
    this.removeAllRegularLayers();
    this.removeAllDuplicatedLayers();
  }

  static removeAllRegularLayers() {
    this.removeQuakesLayer();
    this.removeFaultsLayer();
    this.removePopulationsLayer();
    this.removeIntensitiesLayer();
  }

  static removeAllDuplicatedLayers() {
    this.removeDuplicatedQuakesLayer();
    this.removeDuplicatedFaultsLayer();
    this.removeDuplicatedPopulationsLayer();
  }

  static removeLimitsLayers() {
    this.removeRegionsLayer();
    this.removeProvincesLayer();
    this.removeTerritorialLimitLayer();
  }

  static removeRegionsLayer() {
    if (regionsLayer) {
      this.removeLayer(regionsLayer);
      regionsLayer = null;
    }
  }

  static removeProvincesLayer() {
    if (provincesLayer) {
      this.removeLayer(provincesLayer);
      provincesLayer = null;
    }
  }

  static removeTerritorialLimitLayer() {
    if (territorialLimitLayer) {
      this.removeLayer(territorialLimitLayer);
      territorialLimitLayer = null;
    }
  }

  static removeQuakesLayer() {
    if (quakesLayer) {
      this.removeLayer(quakesLayer);
      quakesLayer = null;
    }
  }

  static removeFaultsLayer() {
    if (faultsLayer) {
      this.removeLayer(faultsLayer);
      faultsLayer = null;
    }
  }

  static removePopulationsLayer() {
    if (populationsLayer) {
      this.removeLayer(populationsLayer);
      populationsLayer = null;
    }
  }

  static removeDuplicatedQuakesLayer() {
    if (duplicatedQuakesLayer) {
      this.removeLayer(duplicatedQuakesLayer);
      duplicatedQuakesLayer = null;
    }
  }

  static removeDuplicatedFaultsLayer() {
    if (duplicatedFaultsLayer) {
      this.removeLayer(duplicatedFaultsLayer);
      duplicatedFaultsLayer = null;
    }
  }

  static removeDuplicatedPopulationsLayer() {
    if (duplicatedPopulationsLayer) {
      this.removeLayer(duplicatedPopulationsLayer);
      duplicatedPopulationsLayer = null;
    }
  }

  static removeIntensitiesLayer() {
    if (intensitiesLayer) {
      this.removeLayer(intensitiesLayer);
      intensitiesLayer = null;
    }
  }

  static removeFilterCircleLayer() {
    if (filterCircle && filterCircleOrigin) {
      map.removeLayer(filterCircle);
      map.removeLayer(filterCircleOrigin);
      filterCircle = null;
      filterCircleOrigin = null;
    }
  }

  static removeFilterBufferLayer() {
    if (filterBuffer) {
      map.removeLayer(filterBuffer);
      filterBuffer = null;
    }
  }

  static removeImportedLayer() {
    if (importedLayer) {
      this.removeLayer(importedLayer);
      importedLayer = null;
    }
  }

  // Funciones de visibilidad de capa

  static isLayerVisible(layer) {
    return layer && map.hasLayer(layer);
  }

  static toogleLayer(layer) {
    if (layer) {
      if (this.isLayerVisible(layer)) {
        this.hideLayer(layer);
      } else {
        this.showLayer(layer);
      }
    }
  }

  static showLayer(layer) {
    if (layer && !this.isLayerVisible(layer)) map.addLayer(layer);
    if (eventLegendControl) eventLegendControl.update();
  }

  static hideLayer(layer) {
    if (layer && this.isLayerVisible(layer)) map.removeLayer(layer);
    if (eventLegendControl) eventLegendControl.update();
  }

  static toogleRegionsLayer() {
    this.toogleLayer(regionsLayer);
  }

  static showRegionsLayer() {
    this.showLayer(regionsLayer);
  }

  static hideRegionsLayer() {
    this.hideLayer(regionsLayer);
  }

  static toogleProvincesLayer() {
    this.toogleLayer(provincesLayer);
  }

  static showProvincesLayer() {
    this.showLayer(provincesLayer);
  }

  static hideProvincesLayer() {
    this.hideLayer(provincesLayer);
  }

  static toogleTerritorialLimitLayer() {
    this.toogleLayer(territorialLimitLayer);
  }

  static showTerritorialLimitLayer() {
    this.showLayer(territorialLimitLayer);
  }

  static hideTerritorialLimitLayer() {
    this.hideLayer(territorialLimitLayer);
  }

  static toogleQuakesLayer() {
    this.toogleLayer(quakesLayer);
  }

  static showQuakesLayer() {
    this.showLayer(quakesLayer);
  }

  static hideQuakesLayer() {
    this.hideLayer(quakesLayer);
  }

  static toogleFaultsLayer() {
    this.toogleLayer(faultsLayer);
  }

  static showFaultsLayer() {
    this.showLayer(faultsLayer);
  }

  static hideFaultsLayer() {
    this.hideLayer(faultsLayer);
  }

  static tooglePopulationsLayer() {
    this.toogleLayer(populationsLayer);
  }

  static showPopulationsLayer() {
    this.showLayer(populationsLayer);
  }

  static hidePopulationsLayer() {
    this.hideLayer(populationsLayer);
  }

  static toogleDuplicatedQuakesLayer() {
    this.toogleLayer(duplicatedQuakesLayer);
  }

  static showDuplicatedQuakesLayer() {
    this.showLayer(duplicatedQuakesLayer);
  }

  static hideDuplicatedQuakesLayer() {
    this.hideLayer(duplicatedQuakesLayer);
  }

  static toogleDuplicatedFaultsLayer() {
    this.toogleLayer(duplicatedFaultsLayer);
  }

  static showDuplicatedFaultsLayer() {
    this.showLayer(duplicatedFaultsLayer);
  }

  static hideDuplicatedFaultsLayer() {
    this.hideLayer(duplicatedFaultsLayer);
  }

  static toogleDuplicatedPopulationsLayer() {
    this.toogleLayer(duplicatedPopulationsLayer);
  }

  static showDuplicatedPopulationsLayer() {
    this.showLayer(duplicatedPopulationsLayer);
  }

  static hideDuplicatedPopulationsLayer() {
    this.hideLayer(duplicatedPopulationsLayer);
  }

  static toogleIntensitiesLayer() {
    this.toogleLayer(intensitiesLayer);
  }

  static showIntensitiesLayer() {
    this.showLayer(intensitiesLayer);
  }

  static hideIntensitiesLayer() {
    this.hideLayer(intensitiesLayer);
  }

  static toogleAllLayers() {
    this.toogleAllRegularLayers();
    this.toogleAllDuplicatedLayers();
  }

  static toogleAllRegularLayers() {
    this.toogleQuakesLayer();
    this.toogleFaultsLayer();
    this.tooglePopulationsLayer();
    this.toogleIntensitiesLayer();
  }

  static toogleAllDuplicatedLayers() {
    this.toogleDuplicatedQuakesLayer();
    this.toogleDuplicatedFaultsLayer();
    this.toogleDuplicatedPopulationsLayer();
  }

  static showAllLayers() {
    this.showAllRegularLayers();
    this.showAllDuplicatedLayers();
  }

  static showAllRegularLayers() {
    this.showQuakesLayer();
    this.showFaultsLayer();
    this.showPopulationsLayer();
    this.showIntensitiesLayer();
  }

  static showAllDuplicatedLayers() {
    this.showDuplicatedQuakesLayer();
    this.showDuplicatedFaultsLayer();
    this.showDuplicatedPopulationsLayer();
  }

  static hideAllLayers() {
    this.hideAllRegularLayers();
    this.hideAllDuplicatedLayers();
  }

  static hideAllRegularLayers() {
    this.hideQuakesLayer();
    this.hideFaultsLayer();
    this.hidePopulationsLayer();
    this.hideIntensitiesLayer();
  }

  static hideAllDuplicatedLayers() {
    this.hideDuplicatedQuakesLayer();
    this.hideDuplicatedFaultsLayer();
    this.hideDuplicatedPopulationsLayer();
  }

  // Funciones de marcado / Mark options

  static isLayerMarked(layer) {
    return layer && layer.options.marked === true;
  }

  static markLayer(layer) {
    if (!this.isLayerMarked(layer)) {
      layer.options.marked = true;
      StyleFunctions.markLayer(layer);
    }
  }

  static unmarkLayer(layer, color) {
    if (this.isLayerMarked(layer)) {
      layer.options.marked = false;
      StyleFunctions.unmarkLayer(layer, color);
    }
  }

  static unmarkLayers(groupLayer, color) {
    if (groupLayer) {
      const layers = groupLayer.getLayers();
      for (let i = 0; i < layers.length; i++) {
        this.unmarkLayer(layers[i], color);
      }
    }
  }

  static unmarkAllLayers() {
    this.unmarkLayers(quakesLayer, StyleFunctions.getValue('quakeBorderColor'));
    this.unmarkLayers(faultsLayer, StyleFunctions.getValue('faultColor'));
    this.unmarkLayers(populationsLayer, StyleFunctions.getValue('populationBorderColor'));
    if (duplicatedQuakesLayer) this.unmarkLayers(duplicatedQuakesLayer, StyleFunctions.getValue('quakeBorderColor'));
    if (duplicatedFaultsLayer) this.unmarkLayers(duplicatedFaultsLayer, StyleFunctions.getValue('faultColor'));
    if (duplicatedPopulationsLayer) this.unmarkLayers(duplicatedPopulationsLayer, StyleFunctions.getValue('populationBorderColor'));
  }

  static unmarkQuake(layer) {
    this.unmarkLayer(layer, LayerStyles.quakeBorderColor);
  }

  static unmarkFault(layer) {
    this.unmarkLayer(layer, LayerStyles.faultColor);
  }

  static unmarkPopulation(layer) {
    this.unmarkLayer(layer, LayerStyles.populationBorderColor);
  }

  // Otras funciones / Other functions

  static setAllQuakesDepthColor(layer) {
    StyleFunctions.setAllQuakesDepthColor(layer.getLayers());
  }

  static getLayerByKeyName(key) {
    if (key === 'quakesLayer') {
      return quakesLayer;
    } else if (key === 'faultsLayer') {
      return faultsLayer;
    } else if (key === 'populationsLayer') {
      return populationsLayer;
    } else if (key === 'duplicatedQuakesLayer') {
      return duplicatedQuakesLayer;
    } else if (key === 'duplicatedFaultsLayer') {
      return duplicatedFaultsLayer;
    } else if (key === 'duplicatedPopulationsLayer') {
      return duplicatedPopulationsLayer;
    } else {
      return null;
    }
  }
  
  
  static reorderOverlayLayersInControl() {
    if (!layerControl) return;

    // 1) Elimina TODAS las overlays actuales del control (no toca baseLayers)
    const overlays = layerControl._layers.filter(l => l.overlay);
    overlays.forEach(l => {
      // l.layer es el objeto Leaflet layer
      layerControl.removeLayer(l.layer);
    });

    // 2) Vuelve a añadir en orden lógico
    // --- Capas “principales”
    if (quakesLayer) layerControl.addOverlay(quakesLayer, LangageFunctions.getText('QUAKES_LAYER'));
    if (faultsLayer) layerControl.addOverlay(faultsLayer, LangageFunctions.getText('FAULTS_LAYER'));
    if (populationsLayer) layerControl.addOverlay(populationsLayer, LangageFunctions.getText('POPULATIONS_LAYER'));
    if (intensitiesLayer) layerControl.addOverlay(intensitiesLayer, LangageFunctions.getText('INTENSITIES_LAYER'));
    
    // --- Capas de referencia
    if (territorialLimitLayer) layerControl.addOverlay(territorialLimitLayer, LangageFunctions.getText('TERRITORIAL_LIMIT'));
    if (regionsLayer) layerControl.addOverlay(regionsLayer, LangageFunctions.getText('REGIONS_LAYER'));
    if (provincesLayer) layerControl.addOverlay(provincesLayer, LangageFunctions.getText('PROVINCES_LAYER'));

    // --- Copias al FINAL (en orden fijo)
    if (duplicatedQuakesLayer) layerControl.addOverlay(duplicatedQuakesLayer, LangageFunctions.getText('DUPLICATED_QUAKES_LAYER'));
    if (duplicatedFaultsLayer) layerControl.addOverlay(duplicatedFaultsLayer, LangageFunctions.getText('DUPLICATED_FAULTS_LAYER'));
    if (duplicatedPopulationsLayer) layerControl.addOverlay(duplicatedPopulationsLayer, LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER'));
 
  }

}