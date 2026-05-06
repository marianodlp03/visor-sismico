/*
Este archivo contiene únicamente una clase con métodos estáticos para realizar las funciones de consulta.

This file contains only a class with static methods to make query functions.
*/

class QueryFunctions {

  // Consultas de objetos más cercanos / Closest objects functions

  static getClosestObjectFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_CLOSEST_QUAKES_ITEM'), callback: this.zoomToClosestQuake});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_CLOSEST_FAULTS_ITEM'), callback: this.zoomToClosestFault});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_CLOSEST_POPULATIONS_ITEM'), callback: this.zoomToClosestPopulation});
    return array;
  }

  static zoomToLayer(geojsonLayer, layer) {
    if (layer) {
      const popup = layer.getPopup();
      const latlng = MiscFunctions.getLatLngByLayerType(layer);
      LayerFunctions.showLayer(geojsonLayer);
      popup.setLatLng(latlng)
      map.flyTo(latlng, 10);
      map.openPopup(popup);
    } else {
      WindowFunctions.showAlertWindow(map, LangageFunctions.getText('QUERY_NO_OBJECT_FOUND_TEXT'));
    }
  }

  static zoomToClosestQuake(ev) {
    const layerGroup = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const xp = ev.latlng.lng;
    const yp = ev.latlng.lat;
    const layer = GeometryFunctions.getClosestLayerToPoint(layerGroup, xp, yp);
    if (layer) {
      LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    QueryFunctions.zoomToLayer(layerGroup, layer);
  }

  static zoomToClosestFault(ev) {
    const layerGroup = duplicatedFaultsLayer ? duplicatedFaultsLayer : faultsLayer;
    const xp = ev.latlng.lng;
    const yp = ev.latlng.lat;
    const layer = GeometryFunctions.getClosestLayerToPoint(layerGroup, xp, yp);
    if (layer) {
      LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('faultBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    QueryFunctions.zoomToLayer(layerGroup, layer);
  }

  static zoomToClosestPopulation(ev) {
    const layerGroup = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const xp = ev.latlng.lng;
    const yp = ev.latlng.lat;
    const layer = GeometryFunctions.getClosestLayerToPoint(layerGroup, xp, yp);
    if (layer) {
      LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('populationBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    QueryFunctions.zoomToLayer(layerGroup, layer);
  }

  // Funciones de objeto mayor en radio / Biggest object in radius functions

  static getBiggestObjectFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_BIGGEST_MAGNITUDE_QUAKE_IN_RADIUS_TEXT'), callback: this.startBiggestMagnitudeQuakeInRadius});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_BIGGEST_INTENSITY_QUAKE_IN_RADIUS_TEXT'), callback: this.startBiggestIntensityQuakeInRaduis});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_PAN_TO_MAX_INTENSITY_IN_RADIUS'), callback: this.startBiggestIntensityInRadius});
    return array;
  }

  static startBiggestMagnitudeQuakeInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.BIGGEST_MAG_QUAKE);
  }

  static startBiggestIntensityQuakeInRaduis(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.BIGGEST_INT_QUAKE);
  }

  
  static startBiggestIntensityInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.BIGGEST_INTENSITY);
  }

  static zoomToBiggestMagnitudeQuakeInRadius() {
    const layerGroup = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r  = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const layer = this.getBiggestValueInRadius(layerGroup.getLayers(), AttributesConfig.QUAKE_MAGNITUDE, lng, lat, r);
    if (layer) {
      LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    this.zoomToLayer(layerGroup, layer);
  }

  static zoomToBiggestIntensityQuakeInRadius() {
    const layerGroup = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r  = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const layer = this.getBiggestIntensityInRadius(layerGroup.getLayers(), AttributesConfig.QUAKE_INTENSITY, lng, lat, r);
    if (layer) {
      LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    this.zoomToLayer(layerGroup, layer);
  }

  static panToBiggestIntensityInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const layer = this.getBiggestIntensityPolygonInRadius(intensitiesLayer, AttributesConfig.INTENSITY_VALUE, lng, lat, r);
    //const layer = GeometryFunctions.getClosestLayerInRadius(intensitiesLayer, lng, lat, r);
    if (layer) {
      const centroid = GeometryFunctions.getPolygonCentroid(layer);
      const popup = layer.getPopup();
      LayerFunctions.showLayer(intensitiesLayer);
      popup.setLatLng(centroid)
      map.flyTo(centroid, 5);
      map.openPopup(popup);
    } else {
      WindowFunctions.showAlertWindow(map, LangageFunctions.getText('QUERY_NO_OBJECT_FOUND_TEXT'));
    }
  }

  static getBiggestValueInRadius(layers, attribute, xc, yc, r) {
    let i, layer, value, feature;
    let maxValue = 0;
    let targetLayer = null;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = feature.properties[attribute];
      if (value > maxValue && GeometryFunctions.isFeatureInsideRadius(feature, xc, yc, r)) {
        maxValue = value;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getBiggestIntensityInRadius(layers, attribute, xc, yc, r) {
    let i, layer, value, feature;
    let maxValue = -1;
    let targetLayer = null;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = MiscFunctions.getIntensityValue(feature.properties[attribute]);
      if (value === -1) value = 0;
      if (value > maxValue && GeometryFunctions.isFeatureInsideRadius(feature, xc, yc, r)) {
        maxValue = value;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getBiggestIntensityPolygonInRadius(layerGroup, attribute, xc, yc, r) {
    let i, layer, feature, value;
    let maxValue = 0;
    let finalLayer = null;
    const layers = layerGroup.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = feature.properties[attribute];
      if (value > maxValue && GeometryFunctions.isFeatureInsideRadius(feature, xc, yc, r)) {
        maxValue = value;
        finalLayer = layer;
      }
    }
    return finalLayer;
  }

  // Funciones de número de objetos / Object number functions

  static getObjectNumberFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_QUAKES_NUMBER_IN_RADIUS_TEXT'), callback: this.startQuakesNumberInRadius});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_FAULTS_NUMBER_IN_RADIUS_TEXT'), callback: this.startFaultsNumberInRadius});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATIONS_NUMBER_IN_RADIUS_TEXT'), callback: this.startPopulationsNumberInRadius});
    return array;
  }

  static startQuakesNumberInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.QUAKES_NUMBER);
  }

  static startFaultsNumberInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.FAULTS_NUMBER);
  }

  static startPopulationsNumberInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.POPULATIONS_NUMBER);
  }

  static getQuakesNumberInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const layerGroup = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = GeometryFunctions.getLayersInRadius(layerGroup, lng, lat, r * 1000);
    const name = duplicatedQuakesLayer ? LangageFunctions.getText('DUPLICATED_QUAKES_LAYER') : LangageFunctions.getText('QUAKES_LAYER');
    LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('quakeBorderColor'));
    LayerFunctions.showLayer(layerGroup);
    WindowFunctions.showQuakesNumberQuery(name, layers, lat, lng, r);
  }

  static getFaultsNumberInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const layerGroup = duplicatedFaultsLayer ? duplicatedFaultsLayer : faultsLayer;
    const layers = GeometryFunctions.getLayersInRadius(layerGroup, lng, lat, r * 1000);
    const name = duplicatedFaultsLayer ? LangageFunctions.getText('DUPLICATED_FAULTS_LAYER') : LangageFunctions.getText('FAULTS_LAYER');
    LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('faultColor'));
    LayerFunctions.showLayer(layerGroup);
    WindowFunctions.showFaultsNumberQuery(name, layers, lat, lng, r);
  }

  static getPopulationsNumberInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const layerGroup = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const layers = GeometryFunctions.getLayersInRadius(layerGroup, lng, lat, r * 1000);
    const name = duplicatedPopulationsLayer ? LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER') : LangageFunctions.getText('POPULATIONS_LAYER');
    LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('populationBorderColor'));
    LayerFunctions.showLayer(layerGroup);
    WindowFunctions.showPopulationsNumberQuery(name, layers, lat, lng, r);
  }

  // Consultas avanzadas / Advanced queries

  static getAdvancedQueries() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT'), callback: this.startLastQuakeByMagnitude});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT'), callback: this.startLastQuakeByIntensity});
    return array;
  }

  static startLastQuakeByMagnitude(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.LAST_MAG_QUAKE);
  }

  static startLastQuakeByIntensity(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.LAST_INT_QUAKE);
  }

  static getLastQuakeByMagnitudeInRadius(value, lat, lng, r) {
    let i, layer, feature, properties, date;
    let targetLayer = null;
    let maxDate = 0;
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      properties = feature.properties;
      date = MiscFunctions.getDate(properties[AttributesConfig.QUAKE_DATE]);
      if (date > maxDate && properties[AttributesConfig.QUAKE_MAGNITUDE] >= value
        && GeometryFunctions.isFeatureInsideRadius(feature, lng, lat, r)) {
        maxDate = date;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getLastQuakeByIntensityInRadius(value, lat, lng, r) {
    let i, layer, feature, properties, date, intensityValue;
    let targetLayer = null;
    let maxDate = 0;
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      properties = feature.properties;
      date = MiscFunctions.getDate(properties[AttributesConfig.QUAKE_DATE]);
      intensityValue = MiscFunctions.getIntensityValue(properties[AttributesConfig.QUAKE_INTENSITY])
      if (date > maxDate && intensityValue >= value
        && GeometryFunctions.isFeatureInsideRadius(feature, lng, lat, r)) {
        maxDate = date;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  // Consultas de falla / Fault queries

  static getFaultsContextMenuItems() {
    let array = ["-"];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATIONS_DISTANCE_TO_FAULT'), callback: WindowFunctions.showPopulationsDistanceInputQuery});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_BIGGEST_QUAKE_DISTANCE_TO_FAULT'), callback: WindowFunctions.showBiggestQuakeDistanceInputQuery});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATION_NUMBER_DISTANCE_TO_FAULT'), callback: WindowFunctions.showPopulationNumberAndDistanceInputQuery});
    return array;
  }

  static zoomToBiggestQuakeDistanceToFault(distance) {
    const layerGroup = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layer = this.getBiggestQuakeToFault(distance);
    if (layer) {
      LayerFunctions.unmarkLayers(layerGroup, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    this.zoomToLayer(layerGroup, layer);
  }

  static getPopulationsDistanceToFault(distance) {
    const layerGroup = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    return GeometryFunctions.getLayersInBuffer(layerGroup, faultLayer, distance);
  }

  static getBiggestQuakeToFault(distance) {
    let i, layer, feature, value;
    let maxValue = 0;
    let targetLayer = null;
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const layerGroup = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = layerGroup.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = feature.properties[AttributesConfig.QUAKE_MAGNITUDE];
      if (value > maxValue && GeometryFunctions.isFeatureInsideBuffer(faultLayer, feature, distance)) {
        maxValue = value;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getPopulationsByNumberDistanceToFault(distance, populationNumber) {
    let i, layer, feature, value;
    let finalLayers = [];
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const layerGroup = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const layers = layerGroup.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = feature.properties[AttributesConfig.POPULATION_NUMBER];
      if (value >= populationNumber && GeometryFunctions.isLayerInsideBuffer(faultLayer, layer, distance)) {
        finalLayers.push(layer);
      }
    }
    return finalLayers;
  }

  // Consultas de población / Populations queries

  static getPopulationsContextMenuItems() {
    let array = ["-"];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATION_MAX_INTENSITY_TEXT'), callback: this.getPopulationMaxIntensity})
    return array;
  }

  static getPopulationMaxIntensity() {
    const pointLayer = GeneralFunctions.getSelectedObject().target;
    const lat = pointLayer.getLatLng().lat;
    const lng = pointLayer.getLatLng().lng;
    const layers = intensitiesLayer.getLayers();
    const maxIntensityLayer = QueryFunctions.getMaxIntensityLayer(layers, pointLayer);
    const populationName = pointLayer.feature.properties[AttributesConfig.POPULATION_NAME];
    const intenistyValue = maxIntensityLayer.feature.properties[AttributesConfig.INTENSITY_VALUE];
    const intensityString = MiscFunctions.getIntensityString(intenistyValue);
    WindowFunctions.showPopulationMaxIntensity(intensityString, populationName, lat, lng);
  }

  static getMaxIntensityLayer(intensitiesLayer, pointLayer) {
    let i, layer;
    for (i = 0; i < intensitiesLayer.length; i++) {
      layer = intensitiesLayer[i];
      if (GeometryFunctions.isLayerInsidePolygonLayer(layer, pointLayer)) {
        return layer;
      }
    }
    return null;
  }
}