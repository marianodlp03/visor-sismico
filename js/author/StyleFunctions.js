/*
Este archivo contiene una clase con métodos estáticos para la gestión de estilos de capas 
y un objeto global cuyas propiedades contienen el estilo o simbología de cada una de las capas.

Estos valores pueden configurarse para modificar los estilos por defecto, aunque es recomendable
no modificarlos una vez iniciado el visor salvo que se comprenda como funciona el motor de Leaflet,
además hay que tener en cuenta que estos valores son modificados al cambiar el estilo de las capas
en la pestaña de opciones del panel lateral.

This file contains a class with static methods for the management of layer styles and a global
object whose properties contains the style or symbology of each of the layers.

These values can be configured to modify the default styles, although this is not recomended
one the visor is booted, unless one understands how the Leaflet engine works, besides, it must
be taken into account that this values are modified when changing the layer styles with the
side panel options tab.
*/

LayerStyles = {
  // Comunidad Autónoma / Region
  regionBorderColor: '#000000',
  regionWeight: 2,

  // Provincia / Province
  provinceBorderColor: '#000000',
  provinceWeight: 1,

  // Límite territorial / Territorial limit
  territorialLimitBorderColor: '#800080',
  territorialLimitWeight: 1,

  // Sismo / Quake
  quakeFillColor: '#ff7800',
  quakeBorderColor: '#000000',
  quakeWeight: 2,
  quakeFillOpacity: 0.8,
  quakeMinDepthColor: '#ffe564',
  quakeMaxDepthColor: '#783c0a',

  // Falla / Fault
  faultColor: '#ff0000',
  faultWeight: 3,

  // Población / Population
  populationBorderColor: '#000000',
  populationFillColor: '#ffffff',
  populationFillOpacity: 0.8,
  populationWeight: 1.5,
  populationMinRadius: 1,
  populationMaxRadius: 3,

  // Intensidad / Intensity
  intensityBorderColor: '#808080',
  intensityFillOpacity: 0.5,
  intensityWeight: 1,

  // Círculo de búsqueda / Filter Circle
  filterCircleBorderColor: '#3388ff',
  filterCircleFillColor: '#3388ff',
  filterCircleFillOpacity: 0.1,

  // Buffer de filtrado / Filter buffer
  filterBufferOpacity: 0.5,

  // Capa importada / Imported layer
  importedLayerBorderColor: '#3388ff',
  importedLayerFillColor: '#3388ff',

  // Sistema / System
  markedColor: '#ffff00',
  markedWeightGain: 2,
  highlighWeightGain: 2
}

class StyleFunctions {
  static getValue(key) {
    return LayerStyles[key];
  }

  static setValue(key, value) {
    LayerStyles[key] = value;
  }

  static getRegionsStyle() {
    return {
      color: LayerStyles.regionBorderColor,
      weight: LayerStyles.regionWeight,
      fillOpacity: 0
    }
  }

  static getProvincesStyle() {
    return {
      color: LayerStyles.provinceBorderColor,
      weight: LayerStyles.provinceWeight,
      fillOpacity: 0
    }
  }

  static getTerritorialLimitStyle() {
    return {
      color: LayerStyles.territorialLimitBorderColor,
      weight: LayerStyles.territorialLimitWeight,
      fillOpacity: 0
    }
  }

  static getQuakesStyle(feature) {
    const magnitudeAttribute = AttributesConfig.QUAKE_MAGNITUDE;
    const magnitude = Math.max(1, feature.properties[magnitudeAttribute]);
    return {
      radius: 2 * Math.pow(magnitude, MAGNITUDE_EXPONENT),
      color: LayerStyles.quakeBorderColor,
      fillColor: LayerStyles.quakeFillColor,
      weight: LayerStyles.quakeWeight,
      fillOpacity: LayerStyles.quakeFillOpacity
    }
  }

  static getFaultsStyle() {
    return {
      color: LayerStyles.faultColor,
      weight: LayerStyles.faultWeight
    }
  }

  static getPopulationNewStyle(feature, pane) {
    const valueAttribute = AttributesConfig.POPULATION_NUMBER;
    const value = feature.properties[valueAttribute];
    const radius = StyleFunctions.getPopulationNewRadius(value);
    return {
      radius: radius,
      color: LayerStyles.populationBorderColor,
      fillColor: LayerStyles.populationFillColor,
      weight: LayerStyles.quakeWeight,
      fillOpacity: LayerStyles.populationFillOpacity
    }
  }

  static getPopulationOldStyle(feature, pane) {
    const valueAttribute = AttributesConfig.POPULATION_NUMBER;
    const shape = this.getPopulationShape(feature.properties[valueAttribute]);
    const radius = this.getPopulationOldRadius(shape);
    return {
      pane: pane,
      color: LayerStyles.populationBorderColor,
      fillColor: LayerStyles.populationFillColor,
      fillOpacity: LayerStyles.populationFillOpacity,
      weight: LayerStyles.populationWeight,
      radius: radius,
      shape: shape
    }
  }

  static getIntensitiesStyle(feature) {
    const valueAttribute = AttributesConfig.INTENSITY_VALUE;
    const value = feature.properties[valueAttribute];
    return {
      color: LayerStyles.intensityBorderColor,
      weight: LayerStyles.intensityWeight,
      fillOpacity: LayerStyles.intensityFillOpacity,
      fillColor: this.getIntensityColor(value)
    }
  }

  static getImportedLayerStyle() {
    return {
      color: LayerStyles.importedLayerBorderColor,
      fillColor: LayerStyles.importedLayerFillColor
    }
  }

  static getFilterCircleOptions(isInteractive) {
    if (isInteractive === undefined) isInteractive = false;
    return {
      interactive: isInteractive,
      pane: PaneSymbol.FILTER_CIRCLE,
      color: LayerStyles.filterCircleBorderColor,
      fillColor: LayerStyles.filterCircleFillColor,
      fillOpacity: LayerStyles.filterCircleFillOpacity
    }
  }

  static getFilterCircleOriginOptions(isInteractive) {
    if (isInteractive === undefined) isInteractive = false;
    return {
      interactive: isInteractive,
      pane: PaneSymbol.FILTER_CIRCLE,
      color: LayerStyles.filterCircleBorderColor,
      fillColor: LayerStyles.filterCircleFillColor,
      fillOpacity: 1,
      radius: 1
    }
  }

  static getFilterBufferOptions(width) {
    return {
      isInteractive: false,
      pane: PaneSymbol.FILTER_BUFFER,
      corridor: width,
      color: LayerStyles.faultColor,
      opacity: LayerStyles.filterBufferOpacity
    }
  }

  static getQuakeFillColor(depth, max) {
    const rate = depth / max;
    return this.getGradientColor(rate, LayerStyles.quakeMinDepthColor, LayerStyles.quakeMaxDepthColor);
  }


  static getPopulationShape(populationNumber) {
    if (populationNumber > 100000) {
      return 'star-5';
    } else if (populationNumber > 10000) {
      return 'diamond';
    } else if (populationNumber > 1000) {
      return 'triangle';
    } else {
      return 'circle';
    }
  }

  static getPopulationFillColor(populationNumber, max) {
    const rate = populationNumber / max;
    return this.getGradientColor(rate, LayerStyles.populationMinNumberColor, LayerStyles.populationMaxNumberColor);
  }

  static getPopulationNewRadius(populationNumber) {
    return Math.pow(Math.log10(populationNumber), POPULATION_EXPONENT) + 4;
  }

  static getPopulationOldRadius(shape) {
    if (shape === 'star-5') {
      return 20;
    } else if (shape === 'diamond') {
      return 8;
    } else if (shape === 'triangle') {
      return 7;
    } else {
      return 6;
    }
  }

  static getIntensityColor(value) {
    let color = 'gray';
    if (value <= 1) {
      color = '#003da7';
    } else if (value <= 2) {
      color = '#00a784';
    } else if (value <= 3) {
      color = '#44a700';
    } else if (value <= 4) {
      color = '#95d300';
    } else if (value <= 5) {
      color = '#c7e900';
    } else if (value <= 6) {
      color = '#fffd00';
    } else if (value <= 7) {
      color = '#ffbe00';
    } else if (value <= 8) {
      color = '#fb7f00';
    } else if (value <= 9) {
      color = '#f93f00';
    } else if (value <= 10) {
      color = '#f80900';
    } else if (value <= 11) {
      color = '#f80087';
    } else if (value <= 12) {
      color = '#7800f8';
    }
    return color;
  }

  // static getGradientColor(rate, minColor, maxColor) {
  //   // Los parámetros minColor y maxColor deben estar en color hexadecimal
  //   // Parameters minColor and maxColor must be in hexadecimal color
  //   const minHsvColor = MiscFunctions.hexColorToHsvColor(minColor);
  //   const maxHsvColor = MiscFunctions.hexColorToHsvColor(maxColor);
  //   const maxH = maxHsvColor[0];
  //   const maxS = maxHsvColor[1];
  //   const maxV = maxHsvColor[2];
  //   const minH = minHsvColor[0];
  //   const minS = minHsvColor[1];
  //   const minV = minHsvColor[2];
  //   const dH = maxH - minH;
  //   const dS = maxS - minS;
  //   const dV = maxV - minV;
  //   const h = (rate * dH) + minH;
  //   const s = (rate * dS) + minS;
  //   const v = (rate * dV) + minV; 
  //   return MiscFunctions.hsvColorToHexColor([h, s, v]);
  // }

  static getGradientColor(rate, minColor, maxColor) {
    // Los parámetros minColor y maxColor deben estar en color hexadecimal
    // Parameters minColor and maxColor must be in hexadecimal color
    const minRgbColor = MiscFunctions.hexColorToRgbColor(minColor);
    const maxRgbColor = MiscFunctions.hexColorToRgbColor(maxColor);
    const dr = maxRgbColor[0] - minRgbColor[0];
    const dg = maxRgbColor[1] - minRgbColor[1];
    const db = maxRgbColor[2] - minRgbColor[2];
    const r = Math.round(minRgbColor[0] + (rate * dr));
    const g = Math.round(minRgbColor[1] + (rate * dg));
    const b = Math.round(minRgbColor[2] + (rate * db));
    return MiscFunctions.rgbColorToHexColor([r, g, b]);
  }

  // Funciones de resaltado / Highlight functions

  static highlightLayer(ev) {
    const layer = ev.target;
    const newWeight = layer.options.weight + LayerStyles.highlighWeightGain;
    if (layer.setStyle !== undefined) {
      layer.setStyle({
        weight: newWeight
      })
    }
  }

  static unhighlightLayer(ev) {
    const layer = ev.target;
    const newWeight = layer.options.weight - LayerStyles.highlighWeightGain;
    if (layer.setStyle !== undefined) {
      layer.setStyle({
        weight: newWeight
      })
    }
  }

  // Funciones de marcado / Mark options


  static markLayer(layer) {
  if (!layer || layer.setStyle === undefined) return;

  // Guardar estilo original solo la primera vez
  if (!layer.options._markedBackup) {
    layer.options._markedBackup = {
      color: layer.options.color,
      weight: layer.options.weight
    };
  }

  layer.options.marked = true;

  const baseWeight = (layer.options._markedBackup.weight !== undefined)
    ? layer.options._markedBackup.weight
    : (layer.options.weight || 0);

  layer.setStyle({
    color: LayerStyles.markedColor,
    weight: baseWeight + LayerStyles.markedWeightGain
  });
}


  
static markLayer(layer) {
  if (!layer || layer.setStyle === undefined) return;

  // Guardar estilo original solo la primera vez
  if (!layer.options._markedBackup) {
    layer.options._markedBackup = {
      color: layer.options.color,
      weight: layer.options.weight
    };
  }

  layer.options.marked = true;

  const baseWeight = (layer.options._markedBackup.weight !== undefined)
    ? layer.options._markedBackup.weight
    : (layer.options.weight || 0);

  layer.setStyle({
    color: LayerStyles.markedColor,
    weight: baseWeight + LayerStyles.markedWeightGain
  });
}

static unmarkLayer(layer, fallbackColor) {
  if (!layer || layer.setStyle === undefined) return;

  const backup = layer.options._markedBackup;
  const color = (backup && backup.color !== undefined)
    ? backup.color
    : (fallbackColor !== undefined ? fallbackColor : layer.options.color);

  const weight = (backup && backup.weight !== undefined)
    ? backup.weight
    : Math.max(0, (layer.options.weight || 0) - LayerStyles.markedWeightGain);

  layer.options.marked = false;

  layer.setStyle({
    color: color,
    weight: weight
  });
}

  // Otras / Others

  static updateQuakesLayerFillColor(groupLayer) {
    let i, layer, value, color;
    const maxValue = MiscFunctions.getFilteredQuakesMaxDepth();
    const layers = groupLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      value = layer.feature.properties[AttributesConfig.QUAKE_DEPTH];
      color = StyleFunctions.getQuakeFillColor(value, maxValue);
      layer.setStyle({fillColor: color});
    }
  }
}