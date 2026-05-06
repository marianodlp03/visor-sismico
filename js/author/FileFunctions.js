/*
Este archivo contiene únicamente una clase con métodos estáticos para la gestión de archivos,
importanción, exportación e impresión.

This file contains only a class with static methods for file managament, importation, exportation
and print.
*/

class FileFunctions {
  // Impresión / Print

  static printMap() {
    printControl.printMap('CurrentSize', LangageFunctions.getText('PRINTED_MAP_FILENAME'));
  }

  // Importación

  static importLayer(name) {
    const text = fileReader.result;
    const geojson = JSON.parse(text);
    LayerFunctions.removeImportedLayer();
    LayerFunctions.addImportedLayer(geojson, name);
  }

  static readFile(file) {
    fileReader.readAsText(file);
    fileReader.addEventListener('progress', this.onFileReaderProgress);
    fileReader.addEventListener('loadstart', this.onFileReaderLoadstart);
    fileReader.addEventListener('loadend', this.onFileReaderLoadend);
  }

  static onFileReaderProgress(event) {
    let progressbar = document.querySelector('#filesTabProgressbar');
    progressbar.value = (event.loaded / event.total) * 100;
  }

  static onFileReaderLoadstart(event) {
    let button = document.querySelector('#filesTabImportLayerButton');
    let progressbar = document.querySelector('#filesTabProgressbar');
    button.hidden = true;
    progressbar.value = 0;
  }

  static onFileReaderLoadend(event) {
    let button = document.querySelector('#filesTabImportLayerButton');
    let progressbar = document.querySelector('#filesTabProgressbar');
    button.hidden = false;
    progressbar.hidden = true;
    event.target.removeEventListener('progress', FileFunctions.onFileReaderProgress);
    event.target.removeEventListener('loadstart', FileFunctions.onFileReaderLoadstart);
    event.target.removeEventListener('loadend', FileFunctions.onFileReaderLoadend);
  }

  // Exportación / Export

  static exportFile(text, name, fileType) {
    const filename = name + "." + fileType;
    const options = {
      type: fileType === 'csv' ? 'text/csv' : 'application/geo+json',
      charset: 'utf-8'
    };
    const file = new Blob([text], options);
    const url = URL.createObjectURL(file);
    let link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  }

  static getCsvFile(geoJsonLayer) {
    let i, layer, text, properties;
    const layers = geoJsonLayer.getLayers();
    text = this.getGeojsonAttributesNames(layers[0].feature.properties);
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      properties = layer.feature.properties;
      text += "\n" + this.getGeojsonAttributesValues(properties);
    }
    return text;
  }

  static getGeojsonFile(geoJsonLayer) {
    return JSON.stringify(geoJsonLayer.toGeoJSON());
  }

  static getGeojsonAttributesNames(properties) {
    let text = "";
    let counter = 0;
    for (const prop in properties)  {
      if (counter > 0) text += ";"
      text += prop;
      counter++;
    }
    return text;
  }

  static getGeojsonAttributesValues(properties) {
    let text = "";
    let counter = 0;
    for (const prop in properties) {
      if (counter > 0) text += ";";
      text += properties[prop];
      counter++;
    }
    return text;
  }

  static getBoundsLayer(geoJsonLayer, bounds) {
    const data = geoJsonLayer.toGeoJSON();
    const layer = L.geoJSON(data, {
      filter: function(feature) {
        const lat = feature.geometry.coordinates[1];
        const lng = feature.geometry.coordinates[0];
        return GeometryFunctions.isPointInsideBounds(bounds, lat, lng);
      }
    })
    return layer;
  }
}