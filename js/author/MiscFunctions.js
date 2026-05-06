/*
Este archivo contiene únicamente una clase con métodos estáticos para diversas funciones misceláneas
que no tienen cabida en otras clases.

This file contains only a class with static methods for various miscelaneous functions that
belong to no other class.
*/

class MiscFunctions {
  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  // static searchPopulation() {
  //   let i, obj, latlng, coords;
  //   const array = populationsData.features;
  //   const value = searchboxControl.getValue();
  //   if (value !== "") {
  //     for (i = 0; i < array.length; i++) {
  //       obj = array[i];
  //       if (obj.properties.nombre === value) {
  //         coords = obj.geometry.coordinates;
  //         latlng = L.latLng(coords[1], coords[0]);
  //         map.setView(latlng, 12);
  //       }
  //     }
  //   }

  //   searchboxControl.hide();
  //   searchboxControl.clear();
  // }

  static searchPopulation() {
    let i, name, population, coordinates, latlng;
    const populationArray = populationsData.features;
    const value = searchboxControl.getValue();
    if (value) {
      const searchArray = fuse.search(value);
      if (searchArray.length > 0) {
        name = searchArray[0].item;
      }
      if (name) {
        for (i = 0; i < populationArray.length; i++) {
          population = populationArray[i];
          if (name === population.properties[AttributesConfig.POPULATION_NAME]) {
            coordinates = population.geometry.coordinates;
            latlng = L.latLng(coordinates[1], coordinates[0]);
            map.setView(latlng, 12);
          }
        }
      }
    }
    searchboxControl.hide();
    searchboxControl.clear();
  }

  static getDate(ddmmyyyy) {
    const array = ddmmyyyy.trim().split('/');
    const day = array[0];
    const month = array[1];
    const year = array[2];
    const yyyymmdd = year + '/' + month + '/' + day;
    return new Date(yyyymmdd);
  }

  static getPreviousYearDate(date) {
    let newDate = date ? new Date(date) : new Date();
    newDate.setFullYear(newDate.getFullYear() - 1);
    return newDate;
  }

  static format(text) {
    for (let i = 1; i < arguments.length; i++) {
      text = text.replace("%" + i, arguments[i]);
    }
    text = text.replace(/%\d/g, "").trim();
    text = text.replace(/\s\s+/g, ' ');
    return text;
  }

  static getPopulationNames(array) {
    let i, obj;
    let finalArray = [];
    for (i = 0; i < array.length; i++) {
      obj = array[i].properties;
      finalArray.push(obj.nombre);
    }

    return finalArray;
  }

  static getLatLngByLayerType(layer) {
    // Devuelve el primer objeto latlng encontrado
    // Returns first latlng object found
    let latlng = null;
    const type = layer.feature.geometry.type;
    if (type === 'Point') {
      latlng = layer.getLatLng();
    } else if (type === 'MultiPoint') {
      latlng = layer.getLatLngs()[0];
    } else if (type === 'LineString') {
      latlng = layer.getLatLngs()[0];
    } else if (type === 'MultiLineString') {
      latlng = layer.getLatLngs()[0][0];
    }
    return latlng;
  }

  // Funciones de conversión / Conversion functions

  static getHexArray() {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  }

  static decimalToHexadecimal(decimalValue) {
    // Devuelve un número hexadecimal a partir de un número decimal
    // Returns a hexadecimal number from a decimal number
    let q, m;
    let hexValue = "";
    decimalValue = parseInt(decimalValue);
    if (Number.isNaN(decimalValue)) {
      return null;
    }

    q = decimalValue;
    while (q > 15) {
      m = decimalValue % 16;
      q = Math.trunc(decimalValue / 16);
      hexValue = this.getHexadecimalValue(m) + hexValue;
    }
    hexValue = this.getHexadecimalValue(q) + hexValue;
    return hexValue;
  }

  static hexadecimalToDecimal(hexValue) {
    // Devuelve un número decimal a partir de un número hexadecimal
    // Returns a decimal number from a hexadecimal number 
    let i, value, length, index;
    let decimalValue = 0;
    hexValue = String(hexValue);
    length = hexValue.length;
    for (i = 0; i < length; i++) {
      index = length - i - 1;
      value = this.getDecimalValue(hexValue[index]);
      if (value !== null) {
        decimalValue += value * Math.pow(16, i);
      } else {
        return null;
      }
    }
    return decimalValue;
  }

  static getDecimalValue(hexValue) {
    // Devuelve un número a partir de un número hexadecimal (valores entre 0 y 15)
    // Returns a number from a hexadecimal number (values between 0 and 15)
    let index;
    hexValue = String(hexValue).toUpperCase();
    index = this.getHexArray().indexOf(hexValue);
    if (index !== -1) {
      return index;
    } else {
      return null;
    }
  }

  static getHexadecimalValue(decimalValue) {
    // Devuelve un número exadecimal a partir de un número decimal (valores entre 0 y 15)
    // Returns a hexadecimal number from a decimal number (values between 0 and 15)
    const value = this.getHexArray()[decimalValue];
    return value !== undefined ? value : null;
  }

  // Funciones de color / Color functions

  static hexColorToRgbColor(hexColor) {
    // Devuelve un array de color RGB a partir de un string de color hexadecimal
    // Returns a RGB color array from a hexadecimal string
    const r = this.hexadecimalToDecimal(hexColor.substring(1, 3));
    const g = this.hexadecimalToDecimal(hexColor.substring(3, 5));
    const b = this.hexadecimalToDecimal(hexColor.substring(5, 7));
    return [r, g, b];
  }

  static rgbColorToHexColor(rgbColor) {
    // Devuelve un string de color hexadecimal a partir de un array de color RGB
    // Returns a hexadecimal color string from a RGB color array
    let rHex = String(this.decimalToHexadecimal(rgbColor[0]));
    let gHex = String(this.decimalToHexadecimal(rgbColor[1]));
    let bHex = String(this.decimalToHexadecimal(rgbColor[2]));
    if (rHex.length < 2) rHex = '0' + rHex;
    if (gHex.length < 2) gHex = '0' + gHex;
    if (bHex.length < 2) bHex = '0' + bHex;
    return '#' + rHex + gHex + bHex;
  }

  static rgbColorToHsvColor(rgbColor) {
    // Devuelve un array de color HSV (saturación y valor en porcentaje) a partir de un array de color RGB
    // Returns a HSV array color (saturarion and value in percentage) from a RGB color array
    let h = 0;
    let s = 0;
    let v = 0;
    const r = rgbColor[0] / 255;
    const g = rgbColor[1] / 255;
    const b = rgbColor[2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    if (max === r) {
      h = (((g - b) / d) % 6) * 60;
    } else if (max === g) {
      h = (((b - r) / d) + 2) * 60;
    } else if (max === b) {
      h = (((r - g) / d) + 4) * 60;
    }

    if (h < 0) h += 360;

    if (max !== 0) s = (d / max) * 100;
    v = max * 100;
    return [h, s, v];
  }

  static hsvColorToRgbColor(hsvColor) {
    let r, g, b;
    let array = [0, 0 , 0];
    const h = hsvColor[0] / 60;
    const s = hsvColor[1] / 100;
    const v = hsvColor[2] / 100;
    const c = s * v;
    const min = v - c;
    const x = (1 - Math.abs((h % 2) - 1)) * c;
    if (h < 1) {
      array = [c, x, 0];
    } else if (h < 2) {
      array = [x, c, 0];
    } else if (h < 3) {
      array = [0, c, x];
    } else if (h < 4) {
      array = [0, x, c];
    } else if (h < 5) {
      array = [x, 0, c];
    } else if (h <= 6) {
      array = [c, 0, x];
    } else {
      return array;
    }
    r = Math.round((array[0] + min) * 255);
    g = Math.round((array[1] + min) * 255);
    b = Math.round((array[2] + min) * 255);
    return [r, g, b];
  }

  static hexColorToHsvColor(hexColor) {
    return this.rgbColorToHsvColor(this.hexColorToRgbColor(hexColor));
  }

  static hsvColorToHexColor(hsvColor) {
    return this.rgbColorToHexColor(this.hsvColorToRgbColor(hsvColor));
  }

  // Funciones de valores / Value functions

  static getFeaturesMinValue(features, attribute) {
    let value = Infinity;
    let i, properties;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      if (properties[attribute] < value) value = properties[attribute];
    }
    if (value === Infinity || value < 0) value = 0;
    return value;
  }

  static getFeaturesMaxValue(features, attribute) {
    let value = 0;
    let i, properties;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      if (properties[attribute] > value) value = properties[attribute];
    }
    return value;
  }

  static getLayersMinValue(layers, attribute) {
    let i, properties;
    let value = Infinity;
    for (i = 0; i < layers.length; i++) {
      properties = layers[i].feature.properties;
      if (properties[attribute] < value) value = properties[attribute];
    }
    if (value === Infinity || value < 0) value = 0;
    return value;
  }

  static getLayersMaxValue(layers, attribute) {
    let i, properties;
    let value = 0;
    for (i = 0; i < layers.length; i++) {
      properties = layers[i].feature.properties;
      if (properties[attribute] > value) value = properties[attribute];
    }
    return value;
  }

  static getAllLayersMinValue(layersArray, attribute) {
    let i, layers, value;
    let min = Infinity;
    for (i = 0; i < layersArray.length; i++) {
      layers = layersArray[i];
      if (layers) {
        value = this.getLayersMinValue(layers, attribute);
        if (value < min) {
          min = value;
        }
      }
    }
    if (min === Infinity || min < 0) min = 0;
    return min;
  }

  static getAllLayersMaxValue(layersArray, attribute) {
    let i, layers, value;
    let max = 0;
    for (i = 0; i < layersArray.length; i++) {
      layers = layersArray[i];
      if (layers) {
        value = this.getLayersMaxValue(layers, attribute);
        if (value > max) {
          max = value;
        }
      }
    }
    return max;
  }
  
  static getQuakesMinMagnitude() {
    return this.getFeaturesMinValue(quakesData.features, AttributesConfig.QUAKE_MAGNITUDE);
  }

  static getQuakesMaxMagnitude() {
    return this.getFeaturesMaxValue(quakesData.features, AttributesConfig.QUAKE_MAGNITUDE);
  }

  static getQuakesMinDepth() {
    return this.getFeaturesMinValue(quakesData.features, AttributesConfig.QUAKE_DEPTH);
  }

  static getQuakesMaxDepth() {
    return this.getFeaturesMaxValue(quakesData.features, AttributesConfig.QUAKE_DEPTH);
  }

  static getFaultsMinMagnitude() {
    return this.getFeaturesMinValue(faultsData.features, AttributesConfig.FAULT_MAGNITUDE);
  }

  static getFaultsMaxMagnitude() {
    return this.getFeaturesMaxValue(faultsData.features, AttributesConfig.FAULT_MAGNITUDE);
  }

  static getFaultsMinDepth() {
    return this.getFeaturesMinValue(faultsData.features, AttributesConfig.FAULT_DEPTH);
  }

  static getFaultsMaxDepth() {
    return this.getFeaturesMaxValue(faultsData.features, AttributesConfig.FAULT_DEPTH);
  }

  static getPopulationsMinNumber() {
    return this.getFeaturesMinValue(populationsData.features, AttributesConfig.POPULATION_NUMBER);
  }

  static getPopulationsMaxNumber() {
    return this.getFeaturesMaxValue(populationsData.features, AttributesConfig.POPULATION_NUMBER);
  }

  static getIntensitiesMinValue() {
    return this.getFeaturesMinValue(intensitiesData.features, AttributesConfig.INTENSITY_VALUE);
  }

  static getIntensitiesMaxValue() {
    return this.getFeaturesMaxValue(intensitiesData.features, AttributesConfig.INTENSITY_VALUE);
  }

  static getQuakesMinIntensity() {
    let i, properties, value;
    let minValue = Infinity;
    const attribute = AttributesConfig.QUAKE_INTENSITY;
    const array = quakesData.features;
    for (i = 0; i < array.length; i++) {
      properties = array[i].properties;
      value = this.getIntensityValue(properties[attribute]);
      if (value < minValue) {
        minValue = value;
      }
    }
    if (minValue === Infinity || minValue < 0) {
      minValue = 0;
    }
    return minValue;
  }

  static getQuakesMaxIntensity() {
    let i, properties, value;
    let maxValue = 0;
    const attribute = AttributesConfig.QUAKE_INTENSITY;
    const array = quakesData.features;
    for (i = 0; i < array.length; i++) {
      properties = array[i].properties;
      value = this.getIntensityValue(properties[attribute]);
      if (value === -1) {
        value = 0;
      }
      if (value > maxValue) {
        maxValue = value;
      }
    }
    return maxValue;
  }

  static getQuakesMinDate() {
    let i, properties, date, value;
    let minValue = Infinity;
    const attribute = AttributesConfig.QUAKE_DATE;
    const features = quakesData.features;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      value = properties[attribute];
      date = this.getDate(value);
      if (date < minValue) minValue = date;
    }
    if (minValue === Infinity) minValue = Date.now();
    return minValue;
  }

  static getQuakesMaxDate() {
    let i, properties, date, value;
    let maxValue = 0;
    const attribute = AttributesConfig.QUAKE_DATE;
    const features = quakesData.features;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      value = properties[attribute];
      date = this.getDate(value);
      if (date > maxValue) maxValue = date;
    }
    return maxValue;
  }

  static getIntensityString(intensityValue) {
    return INTENSITY_STRING[intensityValue];
  }

  static getIntensityValue(intensityString) {
    let i, value;
    const array = intensityString.trim().split('-');
    let maxValue = 0;
    for (i = 0; i < array.length; i++) {
      value = INTENSITY_STRING.indexOf(array[i]);
      if (value < 0) value = 0;
      if (value > maxValue) maxValue = value;
    }
    return maxValue;
    // const index = INTENSITY_STRING.indexOf(intensityString);
    // return index !== -1 ? index : 0;
  }

  static getFilteredQuakesMinDepth() {
    const layer1 = quakesLayer;
    const layer2 = duplicatedQuakesLayer;
    let array = [];
    if (layer1) array.push(layer1.getLayers());
    if (layer2) array.push(layer2.getLayers());
    return this.getAllLayersMinValue(array, AttributesConfig.QUAKE_DEPTH);
  }

  static getFilteredQuakesMaxDepth() {
    const layer1 = quakesLayer;
    const layer2 = duplicatedQuakesLayer;
    let array = [];
    if (layer1) array.push(layer1.getLayers());
    if (layer2) array.push(layer2.getLayers());
    return this.getAllLayersMaxValue(array, AttributesConfig.QUAKE_DEPTH);
  }

  static getFilteredPopulationsMinValue() {
    const layer1 = populationsLayer;
    const layer2 = duplicatedPopulationsLayer;
    let array = [];
    if (layer1) array.push(layer1.getLayers());
    if (layer2) array.push(layer2.getLayers());
    return this.getAllLayersMinValue(array, AttributesConfig.POPULATION_NUMBER);
  }

  static getFilteredPopulationsMaxValue() {
    const layer1 = populationsLayer;
    const layer2 = duplicatedPopulationsLayer;
    let array = [];
    if (layer1) array.push(layer1.getLayers());
    if (layer2) array.push(layer2.getLayers());
    return this.getAllLayersMaxValue(array, AttributesConfig.POPULATION_NUMBER);
  }
}