/*
Este archivo contiene una clase que controla el funcionamiento de los dos tipos de ventanas usadas en el visor.
Las ventanas de tipo "QueryWindow" son modales y son utilizadas para introducir valores en consultas y mostrar
resultados de estas.

Las ventanas de tipo "AlertWindow" no son modales y son utilizadas para alertar cuando se ha realizado una
acción, como filtrar o exportar una capa. Estas últimas contienen unas propiedades estáticas que permiten
configurar su funcionamiento.

This file contains a class that controls the functionality of the two types of windows used by the visor.
The "QueryWindow" window types are modals and used to input values in queries and display their results.

The "AlertWindow" window types are not modal and are used to alert when an action has been done, such as
filtering or exporting a layer. These last ones contains some static properties to configure their behaviour.
*/

class WindowFunctions {
  // Ventana de consulta / Query Window

  static getQueryWindow(map, title, content) {
    this.deleteAllHtmlElements();
    const options = {
      title: title,
      content: content,
      modal: true,
      closeButton: true
    }
    let win = L.control.window(map, options);
    let container = win._container;
    L.DomEvent.disableClickPropagation(container);
    return win;
  }

  static showQueryWindow(map, title, content) {
    this.closeQueryWindow();
    queryWindow = this.getQueryWindow(map, title, content);
    queryWindow.show()
  }

  static closeQueryWindow() {
    if (queryWindow) {
      queryWindow.close();
      queryWindow = null;
    }
  }

  // Consultas de número / Number queries

  static showQuakesNumberQuery(layerName, layers, lat, lng, r) {
    const titleFormat = LangageFunctions.getText('QUERY_QUAKE_NUMBER_IN_RADIUS_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT');
    const title = MiscFunctions.format(titleFormat, layerName);
    const text = MiscFunctions.format(textFormat, layers.length, lat, lng, r);
    const table = this.getQuakesNumberTable(layers);
    const content = "<p>" + text + "</p><p>" + table + "</p>";
    this.showQueryWindow(map, title, content);
  }

  static showFaultsNumberQuery(layerName, layers, lat, lng, r) {
    const titleFormat = LangageFunctions.getText('QUERY_FAULT_NUMBER_IN_RADIUS_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT');
    const title = MiscFunctions.format(titleFormat, layerName);
    const text = MiscFunctions.format(textFormat, layers.length, lat, lng, r);
    const table = this.getFaultsNumberTable(layers);
    const content = "<p>" + text + "</p><p>" + table + "</p>";
    this.showQueryWindow(map, title, content);
  }

  static showPopulationsNumberQuery(layerName, layers, lat, lng, r) {
    const titleFormat = LangageFunctions.getText('QUERY_POPULATION_NUMBER_IN_RADIUS_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT');
    const title = MiscFunctions.format(titleFormat, layerName);
    const text = MiscFunctions.format(textFormat, layers.length, lat, lng, r);
    const table = this.getPopulationsNumberTable(layers);
    const content = "<p>" + text + "</p><p>" + table + "</p>";
    this.showQueryWindow(map, title, content);
  }

  static getQuakesNumberTable(layers) {
    let i, layer, properties;
    let text = "<table border='1px'><tr><td>" + LangageFunctions.getText('QUERY_NAME_TEXT')
    + "</td><td>" + LangageFunctions.getText('QUERY_QUAKE_MAGNITUDE_TEXT') + "</td></tr>";

    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      properties = layer.feature.properties;
      text += "<tr><td>" + properties[AttributesConfig.QUAKE_LOCALIZATION]
      + "</td><td>" + properties[AttributesConfig.QUAKE_MAGNITUDE] + "</td></tr>";
      LayerFunctions.markLayer(layer);
    }

    text += "</table>";
    return text;
  }

  static getFaultsNumberTable(layers) {
    let i, layer, properties;
    let text = "<table border='1px'><tr><td>" + LangageFunctions.getText('QUERY_NAME_TEXT')
    + "</td><td>" + LangageFunctions.getText('QUERY_FAULT_MAGNITUDE_TEXT') + "</td></tr>";

    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      properties = layer.feature.properties;
      text += "<tr><td>" + properties[AttributesConfig.FAULT_NAME]
      + "</td><td>" + properties[AttributesConfig.FAULT_MAGNITUDE] + "</td></tr>";
      LayerFunctions.markLayer(layer);
    }

    text += "</table>";
    return text;
  }

  static getPopulationsNumberTable(layers) {
    let i, layer, properties;
    let text = "<table border='1px'><tr><td>" + LangageFunctions.getText('QUERY_NAME_TEXT')
    + "</td><td>" + LangageFunctions.getText('QUERY_POPULATION_NUMBER_TEXT') + "</td></tr>";

    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      properties = layer.feature.properties;
      text += "<tr><td>" + properties[AttributesConfig.POPULATION_NAME]
      + "</td><td>" + properties[AttributesConfig.POPULATION_NUMBER] + "</td></tr>";
      LayerFunctions.markLayer(layer);
    }

    text += "</table>";
    return text;
  }

  static getPopulationsNumberTableObject(layers) {
    let i, layer, properties;
    let populationNumber = 0;
    let text = "<table border='1px'><tr><td>" + LangageFunctions.getText('QUERY_NAME_TEXT')
    + "</td><td>" + LangageFunctions.getText('QUERY_POPULATION_NUMBER_TEXT') + "</td></tr>";

    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      properties = layer.feature.properties;
      text += "<tr><td>" + properties[AttributesConfig.POPULATION_NAME]
      + "</td><td>" + properties[AttributesConfig.POPULATION_NUMBER] + "</td></tr>";
      LayerFunctions.markLayer(layer);
      populationNumber += properties[AttributesConfig.POPULATION_NUMBER];
    }

    text += "</table>";
    return {
      text: text,
      number: populationNumber
    };
  }

  // Consultas avanzadas / Advanced queries

  static showMagnitudeInputQuery() {
    let input, button;
    const title = "";
    const content = "<p><span>" + LangageFunctions.getText('QUERY_MAGNITUDE_INPUT_TEXT') + "</span>"
    + "<input type='number' id='queryInput' value='0' step='0.1' size='5'>"
    + "<button id='queryButton'>" + LangageFunctions.getText('QUERY_ACCEPT_BUTTON_TEXT') + "</button></p>";
    queryWindow = this.getQueryWindow(map, title, content);
    input = document.querySelector('#queryInput');
    button = document.querySelector('#queryButton');
    button.type = 'button';
    input.addEventListener('change', WindowFunctions.onMagnitudeQueryInputChange);
    button.addEventListener('click', WindowFunctions.onMagnitudeQueryButtonClick);
    queryWindow.show();
  }

  static showIntensitySelectQuery() {
    let i, select, button;
    const options = SidePanelFunctions.getIntensitySelectOptions();
    const title = "";
    const content = "<p><span>" + LangageFunctions.getText('QUERY_INTENSITY_SELECT_TEXT') + "</span>"
    + "<select id='querySelect'></select>" + "<button id='queryButton'>" 
    + LangageFunctions.getText('QUERY_ACCEPT_BUTTON_TEXT') + "</button>"
    queryWindow = this.getQueryWindow(map, title, content);
    select = document.querySelector('#querySelect');
    button = document.querySelector('#queryButton');
    button.type = 'button';
    button.addEventListener('click', WindowFunctions.onIntensityQueryButtonClick);
    for (i = 0; i < options.length; i++) {
      select.add(options[i]);
    }
    queryWindow.show();
  }

  static showLastQuakeByMagnitudeInRadius(value) {
    let text = "";
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const layer = QueryFunctions.getLastQuakeByMagnitudeInRadius(value, lat, lng, r * 1000);
    const titleFormat = LangageFunctions.getText('QUERY_LAST_QUAKE_BY_MAGNITUDE_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_LAST_QUAKE_BY_MAGNITUDE_FORMAT');
    const title = MiscFunctions.format(titleFormat, value);
    if (layer) {
      const localization = layer.feature.properties[AttributesConfig.QUAKE_LOCALIZATION];
      const magnitude = layer.feature.properties[AttributesConfig.QUAKE_MAGNITUDE];
      const date = layer.feature.properties[AttributesConfig.QUAKE_DATE].trim();
      LayerFunctions.unmarkLayers(geojsonLayer, StyleFunctions.getValue('quakeBorderColor'));;
      LayerFunctions.showLayer(geojsonLayer);
      LayerFunctions.markLayer(layer);
      text = MiscFunctions.format(textFormat, localization, magnitude, date, lat, lng, r);
    } else {
      text = LangageFunctions.getText('QUERY_NO_OBJECT_FOUND_TEXT');
    }
    WindowFunctions.showQueryWindow(map, title, text);
  }

  static showLastQuakeByIntensityInRadius(value) {
    let text = "";
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const intensityString = MiscFunctions.getIntensityString(value) ? MiscFunctions.getIntensityString(value) : LangageFunctions.getText('SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY');
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const layer = QueryFunctions.getLastQuakeByIntensityInRadius(value, lat, lng, r * 1000);
    const titleFormat = LangageFunctions.getText('QUERY_LAST_QUAKE_BY_INTENSITY_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_LAST_QUAKE_BY_INTENSITY_FORMAT');
    const title = MiscFunctions.format(titleFormat, intensityString);
    if (layer) {
      const localization = layer.feature.properties[AttributesConfig.QUAKE_LOCALIZATION];
      const intensity = layer.feature.properties[AttributesConfig.QUAKE_INTENSITY] ? layer.feature.properties[AttributesConfig.QUAKE_INTENSITY] : LangageFunctions.getText('SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY');
      const date = layer.feature.properties[AttributesConfig.QUAKE_DATE].trim();
      LayerFunctions.unmarkLayers(geojsonLayer, StyleFunctions.getValue('quakeBorderColor'));;
      LayerFunctions.showLayer(geojsonLayer);
      LayerFunctions.markLayer(layer);
      text = MiscFunctions.format(textFormat, localization, intensity, date, lat, lng, r);
    } else {
      text = LangageFunctions.getText('QUERY_NO_OBJECT_FOUND_TEXT');
    }
    WindowFunctions.showQueryWindow(map, title, text);
  }

  static onMagnitudeQueryInputChange() {
    const input = document.querySelector('#queryInput');
    const value = input.valueAsNumber;
    const newValue = parseFloat(MiscFunctions.clamp(value, QUAKES_MIN_MAGNITUDE, QUAKES_MAX_MAGNITUDE).toFixed(2));
    input.valueAsNumber = newValue;
  }

  static onMagnitudeQueryButtonClick() {
    const input = document.querySelector('#queryInput');
    const value = input.valueAsNumber;
    WindowFunctions.showLastQuakeByMagnitudeInRadius(value);
  }

  static onIntensityQueryButtonClick() {
    const select = document.querySelector('#querySelect');
    const value = select.value;
    WindowFunctions.showLastQuakeByIntensityInRadius(value);
  }

  // Consultas de fallas / Faults queries

  static showDistanceInputQuery(buttonListener) {
    let input, button;
    const title = "";
    const content = "<p><span>" + LangageFunctions.getText('QUERY_DISTANCE_INPUT_TEXT') + "</span>"
    + "<input type='number' id='queryInput' value='0' step='1' size='10'>"
    + "<button id='queryButton'>" + LangageFunctions.getText('QUERY_ACCEPT_BUTTON_TEXT') + "</button></p>";
    queryWindow = WindowFunctions.getQueryWindow(map, title, content);
    input = document.querySelector('#queryInput');
    button = document.querySelector('#queryButton');
    button.type = 'button';
    input.addEventListener('change', WindowFunctions.onDistanceQueryInputChange);
    button.addEventListener('click', buttonListener);
    queryWindow.show();
  }

  static showPopulationsDistanceToFault(distance) {
    const titleFormat = LangageFunctions.getText('QUERY_POPULATIONS_NUMBER_TO_FAULT_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_POPULATIONS_NUMBER_TO_FAULT_FORMAT');
    const layers = QueryFunctions.getPopulationsDistanceToFault(distance);
    const totalPopulations = layers.length;
    const tableObj = this.getPopulationsNumberTableObject(layers);
    const table = tableObj.text;
    const populatioNumber = tableObj.number;
    const title = MiscFunctions.format(titleFormat, parseFloat((distance / 1000).toFixed(3)));
    const text = MiscFunctions.format(textFormat, populatioNumber, totalPopulations);
    const content = "<p>" + text + "</p><p>" + table + "</p>";
    this.showQueryWindow(map, title, content);
  }

  static showPopulationNumberAndDistanceInputQuery() {
    let populationInput, distanceInput, button;
    const title = "";
    const content = "<p><span>" + LangageFunctions.getText('QUERY_DISTANCE_INPUT_TEXT') + "</span>"
    + "<input type='number' id='queryInput' value='0' step='1' size='10'></p>"
    + "<p><span>" + LangageFunctions.getText('QUERY_POPULATION_NUMBER_INPUT_TEXT') + "</span>"
    + "<input type='number' id= 'queryInput2', value='0', step=1, size='10'></p>"
    + "<p><button id='queryButton'>" + LangageFunctions.getText('QUERY_ACCEPT_BUTTON_TEXT') + "</button></p>";
    queryWindow = WindowFunctions.getQueryWindow(map, title, content);
    populationInput = document.querySelector('#queryInput2');
    distanceInput = document.querySelector('#queryInput');
    button = document.querySelector('#queryButton');
    button.type = 'button';
    populationInput.valueAsNumber = POPULATIONS_MIN_NUMBER;
    populationInput.addEventListener('change', WindowFunctions.onPopulationNumberQueryInputChange);
    distanceInput.addEventListener('change', WindowFunctions.onDistanceQueryInputChange);
    button.addEventListener('click', WindowFunctions.onPopulationNumberAndDistanceButtonClick);
    queryWindow.show();
  }

  static showPopulationsByNumberDistanceToFault(distance, populationNumber) {
    const titleFormat = LangageFunctions.getText('QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_FORMAT');
    const layers = QueryFunctions.getPopulationsByNumberDistanceToFault(distance, populationNumber);
    const totalPopulations = layers.length;
    const tableObj = this.getPopulationsNumberTableObject(layers);
    const table = tableObj.text;
    const totalPopulatioNumber = tableObj.number;
    const title = MiscFunctions.format(titleFormat, populationNumber, parseFloat((distance / 1000).toFixed(3)));
    const text = MiscFunctions.format(textFormat, totalPopulatioNumber, totalPopulations);
    const content = "<p>" + text + "</p><p>" + table + "</p>";
    this.showQueryWindow(map, title, content);
  }

  static showBiggestQuakeDistanceInputQuery() {
    WindowFunctions.showDistanceInputQuery(WindowFunctions.onBiggestQuakeDistanceToFaultButtonClick);
  }

  static showPopulationsDistanceInputQuery() {
    WindowFunctions.showDistanceInputQuery(WindowFunctions.onPopulationsDistanceToFaultClick)
  }

  static onDistanceQueryInputChange() {
    const input = document.querySelector('#queryInput');
    const value = input.valueAsNumber;
    const newValue = parseFloat(MiscFunctions.clamp(value, 0, MAX_BUFFER_WIDTH).toFixed(3));
    input.valueAsNumber = newValue;
  }

  static onPopulationNumberQueryInputChange() {
    const input = document.querySelector('#queryInput2');
    const value = input.valueAsNumber;
    const newValue = parseFloat(MiscFunctions.clamp(value, POPULATIONS_MIN_NUMBER, POPULATIONS_MAX_NUMBER).toFixed(0));
    input.valueAsNumber = newValue;
  }

  static onBiggestQuakeDistanceToFaultButtonClick() {
    const input = document.querySelector('#queryInput');
    const value = input.valueAsNumber * 1000;
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    WindowFunctions.closeQueryWindow();
    LayerFunctions.removeFilterBufferLayer();
    LayerFunctions.addFilterBufferLayer(faultLayer.getLatLngs(), value);
    QueryFunctions.zoomToBiggestQuakeDistanceToFault(value);
  }

  static onPopulationsDistanceToFaultClick() {
    const input = document.querySelector('#queryInput');
    const value = input.valueAsNumber * 1000;
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const geojsonLayer = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    LayerFunctions.removeFilterBufferLayer();
    LayerFunctions.addFilterBufferLayer(faultLayer.getLatLngs(), value);
    LayerFunctions.unmarkLayers(geojsonLayer, StyleFunctions.getValue('populationBorderColor'));
    LayerFunctions.showLayer(geojsonLayer);
    WindowFunctions.showPopulationsDistanceToFault(value);
  }

  static onPopulationNumberAndDistanceButtonClick() {
    const populationInput = document.querySelector('#queryInput2');
    const distanceInput = document.querySelector('#queryInput');
    const populationNumber = populationInput.valueAsNumber;
    const distanceValue = distanceInput.valueAsNumber * 1000;
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const geojsonLayer = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    LayerFunctions.removeFilterBufferLayer();
    LayerFunctions.addFilterBufferLayer(faultLayer.getLatLngs(), distanceValue);
    LayerFunctions.unmarkLayers(geojsonLayer, StyleFunctions.getValue('populationBorderColor'));
    LayerFunctions.showLayer(geojsonLayer);
    WindowFunctions.showPopulationsByNumberDistanceToFault(distanceValue, populationNumber);
  }

  // Consultas de población / Population queries

  static showPopulationMaxIntensity(intensity, populationName, lat, lng) {
    const titleFormat = LangageFunctions.getText('QUERY_POPULATION_MAX_INTENSITY_TITLE');
    const textFormat = LangageFunctions.getText('QUERY_POPULATION_MAX_INTENSITY_TEXT');
    const title = MiscFunctions.format(titleFormat, populationName);
    const text = MiscFunctions.format(textFormat, intensity, parseFloat(lat.toFixed(4)), parseFloat(lng.toFixed(4)));
    const content = "<p>" + text + "</p>";
    this.showQueryWindow(map, title, content);
  } 

  // Ventana de alerta / Alert window
  static alertWindowDelay = 2000;
  static alertWindowX = 430;
  static alertWindowY = 0;
  static alertWindowTimeoutId = null;

  static getAlertWindow(map, content) {
    const options = {
      content: content,
      modal: false,
      closeButton: true
    }
    return L.control.window(map, options);
  }

  static showAlertWindow(map, content, x, y) {
    this.closeAlertWindow();
    if (x === undefined) x = this.getAlertWindowX();
    if (y === undefined) y = this.getAlertWindowY();
    alertWindow = this.getAlertWindow(map, content);
    alertWindow.showOn([x, y]);
    this.setAlertWindowTimeoutId(setTimeout(function() {
      WindowFunctions.closeAlertWindow();
    }, this.getAlertWindowDelay()));
  }

  static closeAlertWindow() {
    if (alertWindow) {
      const id = this.getAlertWindowTimeoutId();
      if (id) clearTimeout(id);
      alertWindow.close();
      alertWindow = null;
    }
  }

  static getAlertWindowDelay() {
    return this.alertWindowDelay;
  }

  static getAlertWindowX() {
    return this.alertWindowX;
  }

  static getAlertWindowY() {
    return this.alertWindowY;
  }

  static getAlertWindowTimeoutId() {
    return this.alertWindowTimeoutId;
  }

  static setAlertWindowTimeoutId(id) {
    this.alertWindowTimeoutId = id;
  }

  // Filter / Filtrar
  static showFilterAllWindow() {
    this.showAlertWindow(map, LangageFunctions.getText('ALERT_WINDOW_FILTER_ALL_LAYERS_TEXT'));
  }
  
  static showFilterWindow(layerName) {
    const format = LangageFunctions.getText('ALERT_WINDOW_FILTER_LAYER_FORMAT');
    const text = MiscFunctions.format(format, layerName);
    this.showAlertWindow(map, text);
  }

  static showFilterQuakesWindow() {
    this.showFilterWindow(LangageFunctions.getText('QUAKES_LAYER'));
  }

  static showFilterFaultsWindow() {
    this.showFilterWindow(LangageFunctions.getText('FAULTS_LAYER'));
  }

  static showFilterPopulationsWindow() {
    this.showFilterWindow(LangageFunctions.getText('POPULATIONS_LAYER'));
  }

  // Duplicar y filtrar / Duplicate and filter

  static showDuplicateAllWindow() {
    this.showAlertWindow(map, LangageFunctions.getText('ALERT_WINDOW_DUPLICATE_ALL_LAYERS_TEXT'));
  }

  static showDuplicateWindow(layerName) {
    const format = LangageFunctions.getText('ALERT_WINDOW_DUPLICATE_LAYER_FORMAT');
    const text = MiscFunctions.format(format, layerName);
    this.showAlertWindow(map, text);
  }

  static showDuplicateQuakesWindow() {
    this.showDuplicateWindow(LangageFunctions.getText('DUPLICATED_QUAKES_LAYER'));
  }

  static showDuplicateFaultsWindow() {
    this.showDuplicateWindow(LangageFunctions.getText('DUPLICATED_FAULTS_LAYER'));
  }

  static showDuplicatePopulationsWindow() {
    this.showDuplicateWindow(LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER'));
  }

  // Limpiar / Refresh

  static showRefreshAllWindow() {
    this.showAlertWindow(map, LangageFunctions.getText('ALERT_WINDOW_REFRESH_ALL_TEXT'));
  }

  static showRefreshWindow(layerName) {
    const format = LangageFunctions.getText('ALERT_WINDOW_REFRESH_FORMAT');
    const text = MiscFunctions.format(format, layerName);
    this.showAlertWindow(map, text);
  }

  static showRefreshQuakesWindow() {
    this.showRefreshWindow(LangageFunctions.getText('QUAKES_LAYER'));
  }

  static showRefreshFaultsWindow() {
    this.showRefreshWindow(LangageFunctions.getText('FAULTS_LAYER'));
  }

  static showRefreshPopulationsWindow() {
    this.showRefreshWindow(LangageFunctions.getText('POPULATIONS_LAYER'));
  }

  // Desmarcar / Unmark

  static showUnmarkAllWindow() {
    this.showAlertWindow(map, LangageFunctions.getText('ALERT_WINDOW_UNMARK_ALL_TEXT'));
  }

  static showUnmarkWindow(layerName) {
    const format = LangageFunctions.getText('ALERT_WINDOW_UNMARK_FORMAT');
    const text = MiscFunctions.format(format, layerName);
    this.showAlertWindow(map, text);
  }

  static showUnmarkQuakesWindow() {
    this.showUnmarkWindow(LangageFunctions.getText('QUAKES_LAYER'));
  }

  static showUnmarkFaultsWindow() {
    this.showUnmarkWindow(LangageFunctions.getText('FAULTS_LAYER'));
  }

  static showUnmarkPopulationsWindow() {
    this.showUnmarkWindow(LangageFunctions.getText('POPULATIONS_LAYER'));
  }

  // Archivos / Files

  static showImportLayerWindow(layerName) {
    const format = LangageFunctions.getText('ALERT_WINDOW_IMPORT_LAYER_FORMAT');
    const text = MiscFunctions.format(format, layerName);
    this.showAlertWindow(map, text);
  }

  static showExportLayerWindow(layerName) {
    const format = LangageFunctions.getText('ALERT_WINDOW_EXPORT_LAYER_FORMAT');
    const text = MiscFunctions.format(format, layerName);
    this.showAlertWindow(map, text);
  }

  // Otros / Others

  static deleteAllHtmlElements() {
    this.deleteInputElements();
    this.deleteInput2Elements();
    this.deleteButtonElements();
  }

  static deleteInputElements() {
    this.deleteHtmlElements(document.querySelectorAll('#queryInput'));
  }

  static deleteInput2Elements() {
    this.deleteHtmlElements(document.querySelectorAll('#queryInput2'));
  }

  static deleteSelectElements() {
    this.deleteHtmlElements(document.querySelectorAll('#querySelect'));
  }

  static deleteButtonElements() {
    this.deleteHtmlElements(document.querySelectorAll('#queryButton'));
  }

  static deleteHtmlElements(array) {
    let i, element;
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.remove();
    }
  }
}