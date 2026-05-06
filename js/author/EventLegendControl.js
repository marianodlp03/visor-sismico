/*
Este archivo contiene la función constructora de "leyendas de evento", que extiende la clase "Control"
de Leaflet.

This file contains the factory function for "event legends", which extends Leaflet's "Control" class.
*/

L.Control.EventLegend = L.Control.extend({
  container: null,
  minimized: false,

  onAdd: function(map) {
    this.container = L.DomUtil.create('div', 'eventLegend');
    L.DomEvent.disableClickPropagation(this.getContainer());
    this.minimized = false;
    this.update();
    return this.getContainer();
  },

  onRemove: function(map) {

  },

  update: function() {
    let button;
    this.container.innerHTML = this.getTitle();

    if (!this.isMinimized()) {
      if (LayerFunctions.isLayerVisible(intensitiesLayer)) {
        this.container.innerHTML += this.getIntensityContains();
      }
      if (LayerFunctions.isLayerVisible(faultsLayer) || LayerFunctions.isLayerVisible(duplicatedFaultsLayer)) {
        this.container.innerHTML += this.getFaultsContains();
      }

      if (LayerFunctions.isLayerVisible(populationsLayer) || LayerFunctions.isLayerVisible(duplicatedPopulationsLayer)) {
        this.container.innerHTML += this.getPopulationsContains();
      }

      if (LayerFunctions.isLayerVisible(quakesLayer) || LayerFunctions.isLayerVisible(duplicatedQuakesLayer)) {
        this.container.innerHTML += this.getQuakesContains();
      }
    }

    button = this.container.querySelector('#eventLegendMinimizeButton') ;
    button.type = 'button';
    L.DomEvent.on(button, 'click', this.onMinimizeButton, this);
  },

  getTitle() {
    const key = this.isMinimized() ? 'MAXIMIZE_BUTTON_SYMBOl' : 'MINIMIZE_BUTTON_SYMBOl';
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_TITLE');
    const buttonSign = LangageFunctions.getText(key);
    return "<h2>" + title + "  <button id='eventLegendMinimizeButton'>" + buttonSign + "</button></h2>";
  },

  getIntensityContains: function() {
    let i, value;
    const min = INTENSITIES_MIN_VALUE;
    const max = INTENSITIES_MAX_VALUE;
    const maxItems = (max - min + 1) * 2;
    const cols = maxItems;
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_INTENSITY_TITLE');
    let contains = "<p><div><b><em>" + title + "</em></b></div><div><table>";
    for (i = 0; i < maxItems; i++) {
      value = Math.floor(i / 2) + min;
      if (i === 0) {
        contains += "<tr>";
      } else if (i % cols === 0) {
        contains += "</tr><tr>";
      }
        
      if (i % 2 === 0) {
        contains += "<td class='intensitySymbol' style='background:" + StyleFunctions.getIntensityColor(value) + "'></td>"
      } else {
        contains += "<td class='intensityText'>" + INTENSITY_STRING[value] + "</td>"
      }
    }
    contains += "</tr></table></div></p>";
    return contains;
  },

  getFaultsContains: function() {
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_FAULT_TITLE');
    const text = LangageFunctions.getText('EVENT_LEGEND_CONTROL_FAULT_TEXT');
    const color = StyleFunctions.getValue('faultColor');
    const sw = StyleFunctions.getValue('faultWeight');
    const w = 32;
    const h = 16;
    const b = 4;
    const x1 = b;
    const x2 = w - b;
    const y = h - sw;
    let contains = "<p><div><b><em>" + title + "</em></b></div>";
    contains += "<div><svg width='" + w + "' height='" + h + "'><line x1='" + x1 + "' x2='" + x2 + "' y1='" + y + "' y2='" + y + "' stroke='" + color + "' stroke-width='" + sw + "'/></svg>" + text + "</div>";
    return contains;
  },

  getQuakesContains: function() {
    return this.getQuakeDepthContains() + this.getQuakeMagnitudeContains();
  },

  getQuakeDepthContains() {
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_DEPTH_TITLE');
    const maxMag = Math.ceil(QUAKES_MAX_MAGNITUDE);
    const maxSize = Math.max(150, this.getQuakeSizeFormula(maxMag));
    const minDepth = String(MiscFunctions.getFilteredQuakesMinDepth());
    const maxDepth = String(MiscFunctions.getFilteredQuakesMaxDepth());
    const gradient = this.getDepthGradient();
    const b = 4;
    const ts = 8;
    const w = maxSize + b * 2 + 30;
    const yt = 16;
    const h = 20;
    const tw1 = minDepth.length * ts;
    const tw2 = maxDepth.length * ts;
    let contains = "<p>";
    contains += "<div><b><em>" + title + "</em></b></div>";
    contains += "<div><svg width='" + w + "' height='" + h + "'>";
    contains += gradient;
    contains += "<text x='0' y='" + yt + "'>" + minDepth + "</text>";
    contains += "<rect x='" + (tw1 + b) + "' y='2' width='" + (w - tw1 - tw2 - b * 2) + "' height='" + 20 + "' fill='url(#depthGradient)'/>";
    contains += "<text x='" + (w - tw2) + "' y='" + yt + "' >" + maxDepth + "</text>";
    contains += "</svg></div>"
    contains += "</p>";
    return contains;
  },

  getQuakeMagnitudeContains() {
    let i, size, y, r, text, yl;
    const min = Math.max(1, Math.floor(QUAKES_MIN_MAGNITUDE));
    const max = Math.ceil(QUAKES_MAX_MAGNITUDE);
    const maxSize = this.getQuakeSizeFormula(max);
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_MAGNITUDE_TITLE');
    const bc = StyleFunctions.getValue('quakeBorderColor');
    const fc = StyleFunctions.getValue('quakeFillColor');
    const sw = StyleFunctions.getValue('quakeWeight');
    // const fo = StyleFunctions.getValue('quakeFillOpacity');
    const fo = 0;
    const b = 4;
    const ts = 60;
    const w = maxSize + b + ts;
    const h = maxSize  + b * 3;
    const x = (maxSize + b) / 2;
    const mr = maxSize / 2;
    const xl = x + mr + b;
    const xt = xl + b;
    let contains = "<p>";
    contains += "<div><b><em>" + title + "</em></b></div>";
    contains += "<div><svg width='" + w + "' height='" + h + "'>";

    for (i = max; i >= min; i--) {
      text = this.getQuakeText(i, min, max);
      size = this.getQuakeSizeFormula(i);
      r = size / 2;
      y = h / 2 + mr - r;
      yl = y - r;
      contains += "<circle cx='" + x + "' cy='" + y + "'r='" + r + "' stroke='" + bc + "' stroke-width='" + sw + "' fill='" + fc + "' fill-opacity='" + fo + "'/>";
      contains += "<line x1='" + x + "' x2='" + xl + "' y1='" + yl + "' y2='" + yl + "' stroke='black' stroke-width='1'/>";
      contains += "<text x='" + xt + "' y='" + (yl + 4) +"'>" + text + "</text>";
    }
    
    contains += "</svg></div>"
    contains += "</div>";
    contains += "</p>";
    return contains;
  },

  onMinimizeButton: function() {
    if (this.isMinimized()) {
      this.maximize();
    } else {
      this.minimize();
    }
  },

  getPopulationsContains: function() {
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_POPULATION_TITLE');
    const bc = StyleFunctions.getValue('populationBorderColor');
    const fc = StyleFunctions.getValue('populationFillColor');
    const sw = StyleFunctions.getValue('populationWeight');
    const fo = StyleFunctions.getValue('populationFillOpacity');
    const b = 4;
    const w = 32;
    const h = 32;
    const tw = 120;
    const ty = h / 2 + 4;
    let contains = "<p>";
    contains += "<div><b><em>" + title + "</em></b></div>";
    // Primera línea / First line
    contains += "<div><svg width='" + w + "' height='" + h + "'><circle cx='" + w / 2 + "'cy='" + h / 2 + "' r='" + StyleFunctions.getPopulationOldRadius('circle') + "' stroke='" + bc + "' stroke-width='" + sw + "' fill='" + fc + "' fill-opacity='" + fo + "'/></svg>"
    contains += "<svg width='" + tw + "' height='" + h + "'><text x='0' y='" + ty + "'>" + this.getPopulationTextOld(null, 1000) + "</text></svg>";
    contains += "<svg width='" + w + "' height='" + h + "'><polygon points='8," + (h - 8) + " " + (w - 8) + "," + (h - 8) + " " + (w / 2) + ",8' stroke='" + bc + "' stroke-width='" + sw + "' fill='" + fc + "' fill-opacity='" + fo + "'/></svg>"
    contains += "<svg width='" + tw + "' height='" + h + "'><text x='0' y='" + ty + "'>" + this.getPopulationTextOld(1000, 10000) + "</text></svg><div>";

    // Segunda línea / Second line
    contains += "<div><svg width='" + w + "' height='" + h + "'><rect x='13' y='-9' width='" + (32 - 15) + "' height='" + (32 - 15) + "' transform='rotate(45)' stroke='" + bc + "' stroke-width='" + sw + "' fill='" + fc + "' fill-opacity='" + fo + "'/></svg>"
    contains += "<svg width='" + tw + "' height='" + h + "'><text x='0' y='" + ty + "'>" + this.getPopulationTextOld(10000, 100000) + "</text></svg>";
    contains += "<svg width='32' height='32' viewBox='8 8 16 16' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'  version='1.2' baseProfile='tiny'> <title>Qt SVG Document</title> <desc>Generated with Qt</desc> <defs></defs><g fill='none' stroke='black' stroke-width='1' fill-rule='evenodd' stroke-linecap='square' stroke-linejoin='bevel' ><g fill='" + fc + "' fill-opacity='" + fo + "' stroke='" + bc + "' stroke-opacity='1' stroke-width='1' stroke-linecap='square' stroke-linejoin='bevel' transform='matrix(1,0,0,1,0,0)' font-family='MS Shell Dlg 2' font-size='8.25' font-weight='400' font-style='normal'><path vector-effect='none' fill-rule='evenodd' d='M14.409,13.8101 L9.26023,13.8101 L13.4256,16.8365 L11.8346,21.7332 L16,18.7068 L20.1654,21.7332 L18.5744,16.8365 L22.7398,13.8101 L17.591,13.8101 L16,8.91339 L14.409,13.8101'/></g></g></svg>"
    contains += "<svg width='" + tw + "' height='" + h + "'><text x='0' y='" + ty + "'>" + this.getPopulationTextOld(100000) + "</text></svg><div>";
    contains += "</p>";
    return contains;
  },

  getQuakeSizeFormula: function(magnitude) {
    return 4 * (Math.pow(magnitude, MAGNITUDE_EXPONENT));
  },

  getPopulationSizeFormula: function(value) {
    return  2 * (Math.pow(Math.log10(value), POPULATION_EXPONENT) + 7);
  },

  getQuakeText: function(mag, min, max) {
    let text = "";
    const letter = LangageFunctions.getText('EVENT_LEGEND_CONTROL_MAGNITUDE_LETTER');
    if (mag === min) {
      text = min + " ≤ " + letter;
    } else if (mag === max) {
      text = mag + " ≤ " + letter;
    } else {
      text = mag + " ≤ " + letter + " < " + String(mag + 1);
    }
    return text;
  },

  getPopulationTextNew: function(value, min, max) {
    let text = "";
    const letter = LangageFunctions.getText('EVENT_LEGEND_CONTROL_POPULATION_NUMBER_LETTER');
    if (value === min) {
      text = min + " ≤ " + letter;
    } else if (value === max) {
      text = value + " ≤ " + letter;
    } else {
      text = (value / 10) + " ≤ " + letter + " < " + String(value);
    }
    return text;
  },

  getPopulationTextOld: function(min, max) {
    let text = "";
    const letter = LangageFunctions.getText('EVENT_LEGEND_CONTROL_POPULATION_NUMBER_LETTER');
    if (min && max) {
      text = min + " < " + letter + " ≤ " + max;
    } else if (min && !max) {
      text = letter + " > " + min;
    } else {
      text = letter + " ≤ " + max;
    }
    return text;
  },

  getDepthGradient: function() {
    return this.getGradient(StyleFunctions.getValue('quakeMinDepthColor'), 
      StyleFunctions.getValue('quakeMaxDepthColor'), 'depthGradient');
  },

  getGradient: function(minColor, maxColor, gradientId) {
    let contains = "<defs><linearGradient id='" + gradientId + "'>";
    contains += "<stop offset='0%' stop-color='" + minColor + "'/>";
    contains += "<stop offset='100%' stop-color='" + maxColor + "'/>";
    contains += "</linearGradient></defs>";
    return contains;
  },

  getContainer: function() {
    return this.container;
  },

  minimize: function() {
    this.setMinimized(true);
  },

  maximize: function() {
    this.setMinimized(false);
  },

  isMinimized: function() {
    return this.minimized;
  },

  setMinimized: function(value) {
    this.minimized = value;
    this.update();
  },
})

L.control.eventLegend = function(options) {
  return new L.Control.EventLegend(options);
}