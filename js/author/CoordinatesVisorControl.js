/*
Este archivo contiene la función de construcción del "visor de coordenadas", que extiende la clase
"Control" de Leaflet.

This file contains the factory function for the "coordinates visor", which extends Leaflet's "Control" class.
*/

L.Control.CoordinatesVisor = L.Control.extend({
  container: null,
  visible: true,

  onAdd: function(map) {
    this.container = L.DomUtil.create('div', 'coordinateVisor');
    this.update();
    L.DomEvent.disableClickPropagation(this.getContainer());
    this.visible = true;
    return this.container;
  },

  onRemove: function(map) {

  },

  update: function(ev) {
    const lat = ev ? ev.latlng.lat.toFixed(4) : INITIAL_LONGITUDE;
    const long = ev ? ev.latlng.lng.toFixed(4) : INITIAL_LATITUDE;
    const latText = LangageFunctions.getText('COORDINATE_VISOR_CONTROL_LATITUDE');
    const longText = LangageFunctions.getText('COORDINATE_VISOR_CONTROL_LONGITUDE');
    this.container.innerHTML = '<b>' + latText + ':</b> ' + lat + 'º <b>' +  longText + ': </b>' + long + 'º';
  },

  getContainer: function() {
    return this.container;
  },

  isVisible: function() {
    return this.visible;
  },
  
  setVisible: function(value) {
    this.visible = value;
    this.update();
  },

  show: function() {
    this.getContainer().style.display = 'block';
    this.setVisible(true);
  },

  hide: function() {
    this.getContainer().style.display = 'none';
    this.setVisible(false);
  }
})

L.control.coordinatesVisor = function(options) {
  return new L.Control.CoordinatesVisor(options);
}
