/*
Este archivo contiene la función constructora de "leyendas de filtros", que extiende la clase "Control"
de Leaflet.

This file contains the factory function for "filter legends", which extends Leaflet's "Control" class.
*/

L.Control.FilterLegend = L.Control.extend({
  container: null,
  minimized: false,

  // Sismos / Quakes
  minQuakeMag: null,
  maxQuakeMag: null,
  minQuakeDepth: null,
  maxQuakeDepth: null,
  minQuakeInt: null,
  maxQuakeInt: null,
  minQuakeDate: null,
  maxQuakeDate: null,

  // Copia de sismos / Duplicated quakes
  minDupQuakeMag: null,
  maxDupQuakeMag: null,
  minDupQuakeDepth: null,
  maxDupQuakeDepth: null,
  minDupQuakeInt: null,
  maxDupQuakeInt: null,
  minDupQuakeDate: null,
  maxDupQuakeDate: null,

  // Fallas / Faults
  minFaultMag: null,
  maxFaultMag: null,
  minFaultDepth: null,
  maxFaultDepth: null,

  // Copia de fallas / Duplicated faults
  minDupFaultMag: null,
  maxDupFaultMag: null,
  minDupFaultDepth: null,
  maxDupFaultDepth: null,

  // Poblaciones / Populations
  minPopNumber: null,
  maxPopNumber: null,

  // Copia de Poblaciones / Duplicated populations
  minDupPopNumber: null,
  maxDupPopNumber: null,

  onAdd: function(map) {
    this.container = L.DomUtil.create('div', 'filterLegend');
    L.DomEvent.disableClickPropagation(this.getContainer());
    this.visible = true;
    this.initializeValues();
    this.update();
    return this.getContainer();
  },

  onRemove: function(map) {

  },

  initializeValues: function() {
    this.setValue('minQuakeMag', INITIAL_QUAKES_MIN_MAGNITUDE);
    this.setValue('maxQuakeMag', INITIAL_QUAKES_MAX_MAGNITUDE);
    this.setValue('minQuakeDepth', INITIAL_QUAKES_MIN_DEPTH);
    this.setValue('maxQuakeDepth', INITIAL_QUAKES_MAX_DEPTH);
    this.setValue('minQuakeInt', INITIAL_QUAKES_MIN_INTENSITY);
    this.setValue('maxQuakeInt', INITIAL_QUAKES_MAX_INTENSITY);
    this.setValue('minQuakeDate', INITIAL_QUAKES_MIN_DATE);
    this.setValue('maxQuakeDate', INITIAL_QUAKES_MAX_DATE);

    this.setValue('minFaultMag', INITIAL_FAULTS_MIN_MAGNITUDE);
    this.setValue('maxFaultMag', INITIAL_FAULTS_MAX_MAGNITUDE);
    this.setValue('minFaultDepth', INITIAL_FAULTS_MIN_DEPTH);
    this.setValue('maxFaultDepth', INITIAL_FAULTS_MAX_DEPTH);

    this.setValue('minPopNumber', INITIAL_POPULATIONS_MIN_NUMBER);
    this.setValue('maxPopNumber', INITIAL_POPULATIONS_MAX_NUMBER);
  },

  update: function() {
    let button;
    let text = "<table>";
    text += this.getTableHeader();
    text += "<tbody>";
    if (!this.isMinimized()) {
      text += this.getTableRow1();
      text += this.getTableRow2();
      text += this.getTableRow3();
      text += this.getTableRow4();
      if (duplicatedQuakesLayer) text += this.getTableRow5();
      if (duplicatedFaultsLayer) text += this.getTableRow6();
      if (duplicatedPopulationsLayer) text += this.getTableRow7();
    }
    text += "</tbody></table>";
    this.container.innerHTML = text;
    button = this.container.querySelector('#filterLegendMinimizeButton');
    button.type = 'button';
    L.DomEvent.on(button, 'click', this.onMinimizeButton, this);
  },

  getTableHeader: function() {
    const title = LangageFunctions.getText('FILTER_LEGEND_CONTROL_TITLE');
    const btnSign = this.isMinimized() ? LangageFunctions.getText('MAXIMIZE_BUTTON_SYMBOl') : LangageFunctions.getText('MINIMIZE_BUTTON_SYMBOl');
    return "<thead><tr><th colspan='6'><em>" + title + "  </em><button id='filterLegendMinimizeButton'>" + btnSign + "</button></tr></th></thead>";
  },

  getTableRow1: function() {
    const magText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_MAGNITUDE');
    const depthText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_DEPTH');
    const intText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_INTENSITY');
    const dateText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_DATE');
    const popText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_POPULATION');
    return "<tr><td></td><td><b>" + magText + "</td><td><b>" + depthText + "</td><td><b>" 
    + intText + "</td><td><b>" + dateText + "</td><td><b>" + popText + "</td></tr>";
  },

  getTableRow2: function() {
    let minIntText, maxIntText;
    const title = LangageFunctions.getText('QUAKES_LAYER');
    const minMag = this.getValue('minQuakeMag');
    const maxMag = this.getValue('maxQuakeMag');
    const minDepth = this.getValue('minQuakeDepth');
    const maxDepth = this.getValue('maxQuakeDepth');
    const minInt = this.getValue('minQuakeInt');
    const maxInt = this.getValue('maxQuakeInt');
    const minDate = this.getValue('minQuakeDate');
    const maxDate = this.getValue('maxQuakeDate');
    const minDateText = minDate ? minDate.toLocaleDateString() : "-";
    const maxDateText = maxDate ? maxDate.toLocaleDateString() : "-";
    minIntText = minInt !== undefined ? MiscFunctions.getIntensityString(minInt) : "-";
    maxIntText = maxInt !== undefined ? MiscFunctions.getIntensityString(maxInt) : "-";
    if (!minIntText) minIntText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_UNKNOWN');
    if (!maxIntText) maxIntText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_UNKNOWN');
    return "<tr><td><b>" + title + "</b></td><td>" + minMag + "-" + maxMag + "</td>" + 
    "<td>" + minDepth + "-" + maxDepth + "</td><td>" + minIntText + "-" + maxIntText + "</td>" + 
    "<td>" + minDateText + "-" + maxDateText + "</td><td>-</td></tr>";
  },

  getTableRow3: function() {
    const title = LangageFunctions.getText('FAULTS_LAYER');
    const minMag = this.getValue('minFaultMag');
    const maxMag = this.getValue('maxFaultMag');
    const minDepth = this.getValue('minFaultDepth');
    const maxDepth = this.getValue('maxFaultDepth');
    return "<tr><td><b>" + title + "</b></td><td>" + minMag + "-" + maxMag 
    + "</td><td>" + minDepth + "-" + maxDepth + "</td><td>-</td><td>-</td><td>-</td></tr>";
  },

  getTableRow4: function() {
    const title = LangageFunctions.getText('POPULATIONS_LAYER');
    const minPop = this.getValue('minPopNumber');
    const maxPop = this.getValue('maxPopNumber');
    return "<tr><td><b>" + title + "</b></td><td>-</td><td>-</td><td>-</td><td>-</td><td>"
    + minPop + "-" + maxPop + "</td></tr>";
  },

  getTableRow5: function() {
    let minIntText, maxIntText;
    const title = LangageFunctions.getText('DUPLICATED_QUAKES_LAYER');
    const minMag = this.getValue('minDupQuakeMag');
    const maxMag = this.getValue('maxDupQuakeMag');
    const minDepth = this.getValue('minDupQuakeDepth');
    const maxDepth = this.getValue('maxDupQuakeDepth');
    const minInt = this.getValue('minDupQuakeInt');
    const maxInt = this.getValue('maxDupQuakeInt');
    const minDate = this.getValue('minDupQuakeDate');
    const maxDate = this.getValue('maxDupQuakeDate');
    const minDateText = minDate ? minDate.toLocaleDateString() : "-";
    const maxDateText = maxDate ? maxDate.toLocaleDateString() : "-";
    minIntText = minInt !== undefined ? MiscFunctions.getIntensityString(minInt) : "-";
    maxIntText = maxInt !== undefined ? MiscFunctions.getIntensityString(maxInt) : "-";
    if (!minIntText) minIntText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_UNKNOWN');
    if (!maxIntText) maxIntText = LangageFunctions.getText('FILTER_LEGEND_CONTROL_UNKNOWN');
    if (duplicatedQuakesLayer) {
      return "<tr><td><b>" + title + "</b></td><td>" + minMag + "-" + maxMag + "</td>" + 
      "<td>" + minDepth + "-" + maxDepth + "</td><td>" + minIntText + "-" + maxIntText + "</td>" + 
      "<td>" + minDateText + "-" + maxDateText + "</td><td>-</td></tr>";
    } else {
      return "<tr><td><b>" + title + "</b></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
    }
  },

  getTableRow6: function() {
    const title = LangageFunctions.getText('DUPLICATED_FAULTS_LAYER');
    const minMag = this.getValue('minDupFaultMag');
    const maxMag = this.getValue('maxDupFaultMag');
    const minDepth = this.getValue('minDupFaultDepth');
    const maxDepth = this.getValue('maxDupFaultDepth');
    if (duplicatedFaultsLayer) {
      return "<tr><td><b>" + title + "</b></td><td>" + minMag + "-" + maxMag 
    + "</td><td>" + minDepth + "-" + maxDepth + "</td><td>-</td><td>-</td><td>-</td></tr>";
    } else {
      return "<tr><td><b>" + title + "</b></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>"
    }
  },

  getTableRow7: function() {
    const title = LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER');
    const minPop = this.getValue('minDupPopNumber');
    const maxPop = this.getValue('maxDupPopNumber');
    if (duplicatedPopulationsLayer) {
      return "<tr><td><b>" + title + "</b></td><td>-</td><td>-</td><td>-</td><td>-</td><td>"
      + minPop + "-" + maxPop + "</td></tr>";
    } else {
      return "<tr><td><b>" + title + "</b></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>"
    }
  },

  getValue: function(key) {
    return this[key];
  },

  setValue: function(key, value) {
    this[key] = value;
  },

  getContainer: function() {
    return this.container;
  },

  onMinimizeButton: function() {
    if (this.isMinimized()) {
      this.maximize();
    } else {
      this.minimize();
    }
  },

  minimize: function() {
    this.setMinimize(true);
  },

  maximize: function() {
    this.setMinimize(false);
  },

  isMinimized: function() {
    return this.minimized;
  },

  setMinimize: function(value) {
    this.minimized = value;
    this.update();
  }
})

L.control.filterLegend = function(options) {
  return new L.Control.FilterLegend(options);
}