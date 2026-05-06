/*
Este archivo únicamente contiene una clase con métodos estáticos para cálculos geométricos, como obtención de distancias,
objetos próximos o comprobar si un objeto está dentro de una capa.

This file only contains a class with static methods for geometric calculations, like getting distances, close objects or
to check if an object is inside a layer.
*/

class GeometryFunctions {
  // Distancias a punto (en metros)
  // Distances to point (in meters)

  static getDistanceToLayer(layer, xt, yt) {
    return this.getDistanceToFeature(layer.feature, xt, yt);
  }

  static getDistanceToFeature(feature, xt, yt) {
    const geometry = feature.geometry;
    const type = geometry.type;
    const coordinates = geometry.coordinates;
    if (type === 'Point') {
      return this.getDistanceToPoint(coordinates[0], coordinates[1], xt, yt);
    } else if (type === 'MultiPoint') {
      return this.getDistanceToMultiPoint(coordinates, xt, yt);
    } else if (type === 'LineString') {
      return this.getDistanceToLine(coordinates, xt, yt);
    } else if (type === 'MultiLineString') {
      return this.getDistanceToMultiLine(coordinates, xt, yt);
    } else if (type === 'Polygon') {
      return this.getDistanceToPolygon(coordinates, xt, yt);
    } else if (type === 'MultiPolygon') {
      return this.getDistanceToMultiPolygon(coordinates, xt, yt);
    } else {
      return null;
    }
  }

  static getDistanceToPoint(xp, yp, xt, yt) {
    const tLatLng = L.latLng(yt, xt);
    const pLatLng = L.latLng(yp, xp);
    return map.distance(tLatLng, pLatLng);
  }

  static getDistanceToMultiPoint(coordinates, xt, yt) {
    // Devuelve la distancia mínima
    // Returns minimum distance
    let i, xp, yp, distance;
    let minDistance = Infinity;
    for (i = 0; i < coordinates.length; i++) {
      xp = coordinates[i][0];
      yp = coordinates[i][1];
      distance = this.getDistanceToPoint(xp, yp, xt, yt);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getDistanceToSegment(x1, y1, x2, y2, xt, yt) {
    // Se considera la distancia de un punto a un segmento
    // como la distancia del punto al punto más cercano del segmento
    // Distance from a point to a segment is considered as the distance
    // from the point to the segment closest point
    const tLatLng = L.latLng(yt, xt);
    const cLatLng = this.getClosestPointToSegment(x1, y1, x2, y2, xt, yt);
    return map.distance(tLatLng, cLatLng);
  }

  static getDistanceToLine(coordinates, xt, yt) {
    // Se considera la distancia a una línea como la menor de las distancias
    // del punto a los segmentos que la componen
    // Distance to a line is considered as the lowest of the distances from
    // the point to each of its segments
    let i, x1, y1, x2, y2, distance;
    let minDistance = Infinity;
    for (i = 0; i < coordinates.length - 1; i++) {
      x1 = coordinates[i][0];
      y1 = coordinates[i][1];
      x2 = coordinates[i + 1][0];
      y2 = coordinates[i + 1][1];
      distance = this.getDistanceToSegment(x1, y1, x2, y2, xt, yt);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getDistanceToMultiLine(coordinates, xt, yt) {
    let i, distance;
    let minDistance = Infinity;
    for (i = 0; i < coordinates.length; i++) {
      distance = this.getDistanceToLine(coordinates[i], xt, yt);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getDistanceToPolygon(coordinates, xt, yt) {
    // Se considera la distancia a un polígono como la menor de las distancias
    // del punto a cada uno de los segmentos que lo componen
    // Distance to polygon is considered as the lowest of the distances
    // from the point to each of the points of the polygon
    let i, distance;
    let minDistance = Infinity;
    for (i = 0; i < coordinates.length; i++) {
      distance = this.getDistanceToLine(coordinates[i], xt, yt);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getDistanceToMultiPolygon(coordinates, xt, yt) {
    let i, distance;
    let minDistance = Infinity;
    for (i = 0; i < coordinates.length; i++) {
      distance = this.getDistanceToPolygon(coordinates[i], xt, yt);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  // Funciones de distancia entre capas

  static getLayerDistanceToLayer(targetLayer, sourceLayer) {
    return this.getFeatureDistanceToFeature(targetLayer.feature, sourceLayer.feature);
  }

  static getFeatureDistanceToFeature(targetFeature, sourceFeature) {
    const geometry = sourceFeature.geometry;
    const type = geometry.type;
    const coordinates = geometry.coordinates;
    if (type === 'Point') {
      return this.getPointDistanceToFeature(targetFeature, coordinates[0], coordinates[1]);
    } else if (type === 'MultiPoint') {
      return this.getMultiPointDistanceToFeature(targetFeature, coordinates);
    } else if (type === 'LineString') {
      return this.getLineDistanceToFeature(targetFeature, coordinates);
    } else if (type === 'MultiLineString') {
      return this.getMultiLineDistanceToFeature(targetFeature, coordinates);
    } else if (type === 'Polygon') {
      return this.getPolygonDistanceToFeature(targetFeature, coordinates);
    } else if (type === 'MultiPolygon') {
      return this.getMultiPolygonDistanceToFeature(targetFeature, coordinates);
    } else {
      return null;
    }
  }

  static getPointDistanceToFeature(targetFeature, xs, ys) {
    return this.getDistanceToFeature(targetFeature, xs, ys);
  }

  static getMultiPointDistanceToFeature(targetFeature, sourceCoordinates) {
    let i, xs, ys, distance;
    let minDistance = Infinity;
    for (i = 0; i < sourceCoordinates.length; i++) {
      xs = sourceCoordinates[i][0];
      ys = sourceCoordinates[i][1];
      distance = this.getPointDistanceToFeature(targetFeature, xs, ys);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getLineDistanceToFeature(targetFeature, sourceCoordinates) {
    const targetGeometry = targetFeature.geometry;
    const targetType = targetGeometry.type;
    const targetCoordinates = targetGeometry.coordinates;
    if (targetType === 'Point') {
      return this.getDistanceToLine(sourceCoordinates, targetCoordinates[0], targetCoordinates[1]);
    } else if (targetType === 'MultiPoint') {
      return this.getMultiPointDistanceToLine(sourceCoordinates, targetCoordinates);
    } else {
      return null;
    }
  }

  static getMultiLineDistanceToFeature(targetFeature, sourceCoordinates) {
    const targetGeometry = targetFeature.geometry;
    const targetType = targetGeometry.type;
    const targetCoordinates = targetGeometry.coordinates;
    if (targetType === 'Point') {
      return this.getDistanceToMultiLine(sourceCoordinates, targetCoordinates[0], targetCoordinates[1]);
    } else if (targetType === 'MultiPoint') {
      return this.getMultiPointDistanceToMultiLine(sourceCoordinates, targetCoordinates);
    } else {
      return null;
    }
  }

  static getPolygonDistanceToFeature(targetFeature, sourceCoordinates) {
    const targetGeometry = targetFeature.geometry;
    const targetType = targetGeometry.type;
    const targetCoordinates = targetGeometry.coordinates;
    if (targetType === 'Point') {
      return this.getDistanceToPolygon(sourceCoordinates, targetCoordinates[0], targetCoordinates[1]);
    } else if (targetType === 'MultiPoint') {
      return this.getMultiPointDistanceToPolygon(sourceCoordinates, targetCoordinates);
    } else {
      return null;
    }
  }

  static getMultiPolygonDistanceToFeature(targetFeature, sourceCoordinates) {
    const targetGeometry = targetFeature.geometry;
    const targetType = targetGeometry.type;
    const targetCoordinates = targetGeometry.coordinates;
    if (targetType === 'Point') {
      return this.getDistanceToMultiPolygon(sourceCoordinates, targetCoordinates[0], targetCoordinates[1]);
    } else if (targetType === 'MultiPoint') {
      return this.getMultiPointDistanceToMultiPolygon(sourceCoordinates, targetCoordinates);
    } else {
      return null;
    }
  }

  static getMultiPointDistanceToLine(lineCoordinates, pointCoordinates) {
    let i, xp, yp, distance;
    let minDistance = Infinity;
    for (i = 0; i < pointCoordinates.length; i++) {
      xp = pointCoordinates[i][0];
      yp = pointCoordinates[i][1];
      distance = this.getDistanceToLine(lineCoordinates, xp, yp);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getMultiPointDistanceToMultiLine(lineCoordinates, pointCoordinates) {
    let i, xp, yp, distance;
    let minDistance = Infinity;
    for (i = 0; i < pointCoordinates.length; i++) {
      xp = pointCoordinates[i][0];
      yp = pointCoordinates[i][1];
      distance = this.getDistanceToMultiLine(lineCoordinates, xp, yp);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getMultiPointDistanceToPolygon(polygonCoordinates, pointCoordinates) {
    let i, xp, yp, distance;
    let minDistance = Infinity;
    for (i = 0; i < pointCoordinates.length; i++) {
      xp = pointCoordinates[i][0];
      yp = pointCoordinates[i][1];
      distance = this.getDistanceToPolygon(polygonCoordinates, xp, yp);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  static getMultiPointDistanceToMultiPolygon(polygonCoordinates, pointCoordinates) {
    let i, xp, yp, distance;
    let minDistance = Infinity;
    for (i = 0; i < pointCoordinates.length; i++) {
      xp = pointCoordinates[i][0];
      yp = pointCoordinates[i][1];
      distance = this.getDistanceToMultiPolygon(polygonCoordinates, xp, yp);
      if (distance < minDistance) minDistance = distance;
    }
    return minDistance;
  }

  // Funciones para comprobar si un objeto está dentro de un radio (en metros)
  // Functions to check if an item is inside a radius (in meters)

  static isLayerInsideRadius(layer, xc, yc, r) {
    return this.isFeatureInsideRadius(layer.feature, xc, yc, r);
  }

  static isFeatureInsideRadius(feature, xc, yc, r) {
    const geometry = feature.geometry;
    const type = geometry.type;
    const coordinates = geometry.coordinates;
    if (r <= 0) {
      return true;
    } else if (type === 'Point') {
      return this.isPointInsideRadius(coordinates[0], coordinates[1], xc, yc, r);
    } else if (type === 'MultiPoint') {
      return this.isMultiPointInsideRadius(coordinates, xc, yc, r);
    } else if (type === 'LineString') {
      return this.isLineInsideRadius(coordinates, xc, yc, r);
    } else if (type === 'MultiLineString') {
      return this.isMultiLineInsideRadius(coordinates, xc, yc, r);
    } else if (type === 'Polygon') {
      return this.isPolygonInsideRadius(coordinates, xc, yc, r);
    } else if (type === 'MultiPolygon') {
      return this.isMultiPolygonInsideRadius(coordinates, xc, yc, r);
    } else {
      return null;
    }
  }

  static isPointInsideRadius(xp, yp, xc, yc, r) {
    return r <= 0 ? true : this.getDistanceToPoint(xp, yp, xc, yc) <= r;
  }

  static isMultiPointInsideRadius(coordinates, xc, yc, r) {
    return r <= 0 ? true : this.getDistanceToMultiPoint(coordinates, xc, yc) <= r;
  }

  static isLineInsideRadius(coordinates, xc, yc, r) {
    return r <= 0 ? true : this.getDistanceToLine(coordinates, xc, yc) <= r;
  }

  static isMultiLineInsideRadius(coordinates, xc, yc, r) {
    return r <= 0 ? true : this.getDistanceToMultiLine(coordinates, xc, yc) <= r;
  }

  static isPolygonInsideRadius(coordinates, xc, yc, r) {
    if (r <= 0) {
      return true;
    } else if (this.isPointInsidePolygon(coordinates, xc, yc)) {
      return true;
    } else {
      return this.getDistanceToPolygon(coordinates, xc, yc) <= r;
    }
  }

  static isMultiPolygonInsideRadius(coordinates, xc, yc, r) {
    if (r <= 0) {
      return true;
    } else if (this.isPointInsideMultiPolygon(coordinates, xc, yc)) {
      return true;
    } else {
      return this.getDistanceToMultiPolygon(coordinates, xc, yc) <= r;
    }
  }

  // Funciones para comprobar si un objeto está dentro de un polígono (capa) 

  static isLayerInsidelayerGroup(layerGroup, tLayer) {
    return this.isFeatureInsidelayerGroup(layerGroup, tLayer.feature);
  }

  static isLayerInsidePolygonLayer(pLayer, tLayer) {
    return this.isFeatureInsideFeaturePolygon(pLayer.feature, tLayer.feature);
  }

  static isLayerInsidePolygonFeature(pFeature, tLayer) {
    return this.isFeatureInsideFeaturePolygon(pFeature, tLayer.feature);
  }

  static isFeatureInsidelayerGroup(layerGroup, tFeature) {
    const layers = layerGroup.getLayers();
    for (let i = 0; i < layers.length; i++) {
      if (this.isFeatureInsidePolygonLayer(layers[i], tFeature)) return true;
    }
    return false;
  }

  static isFeatureInsidePolygonLayer(pLayer, tFeature) {
    return this.isFeatureInsideFeaturePolygon(pLayer.feature, tFeature);
  }

  static isFeatureInsideFeaturePolygon(pFeature, tFeature) {
    const geometry = pFeature.geometry;
    const type = geometry.type;
    const coordinates = geometry.coordinates;
    if (type === 'Polygon') {
      return this.isFeatureInsidePolygon(coordinates, tFeature);
    } else if (type === 'MultiPolygon') {
      return this.isFeatureInsideMultiPolygon(coordinates, tFeature);
    } else {
      return null;
    }
  }

  static isFeatureInsideMultiPolygon(pCoordinates, feature) {
    for (let i = 0; i < pCoordinates.length; i++) {
      if (this.isFeatureInsidePolygon(pCoordinates[i], feature)) return true;
    }
    return false;
  }

  static isFeatureInsidePolygon(pCoordinates, feature) {
    const geometry = feature.geometry;
    const type = geometry.type;
    const tCoordinates = geometry.coordinates;
    if (type === 'Point') {
      return this.isPointInsidePolygon(pCoordinates, tCoordinates[0], tCoordinates[1]);
    } else if (type === 'MultiPoint') {
      return this.isMultiPointInsidePolygon(pCoordinates, tCoordinates);
    } else if (type === 'LineString') {
      return this.isLineInsidePolygon(pCoordinates, tCoordinates);
    } else if (type === 'MultiLineString') {
      return this.isMultiLineInsidePolygon(pCoordinates, tCoordinates);
    } else {
      return null;
    }
  }

  static isPointInsidePolygon(coordinates, xt, yt) {
    let i, j, k, xj, yj, xk, yk, isIntersect;
    let isInside = false;
    for (i = 0; i < coordinates.length; i++) {
      for (j = 0, k = coordinates[i].length - 1; j < coordinates[i].length; k = j++) {
        xj = coordinates[i][j][0];
        yj = coordinates[i][j][1];
        xk = coordinates[i][k][0];
        yk = coordinates[i][k][1];
        isIntersect = ((yj > yt) != (yk > yt)) && (xt < (xk - xj) * (yt - yj) / (yk - yj) + xj);
        if (isIntersect) isInside = !isInside;
      }
    }
    return isInside || this.isPointPolygonVertex(coordinates, xt, yt);
  }

  static isPointInsideMultiPolygon(coordinates, xt, yt) {
    for (let i = 0; i < coordinates; i++) {
      if (this.isPointInsidePolygon(coordinates[i], xt, yt)) return true;
    }
    return false;
  }

  static isPointPolygonVertex(coordinates, xt, yt) {
    let i, j, xp, yp;
    for (i = 0; i < coordinates.length; i++) {
      for (j = 0; j < coordinates[i].length; j++) {
        xp = coordinates[i][j][0];
        yp = coordinates[i][j][1];
        if (xt === xp && yt === yp) return true;
      }
    }
    return false;
  }

  static isMultiPointInsidePolygon(pCoordinates, tCoordinates) {
    for (let i = 0; i < tCoordinates.length; i++) {
      if (this.isPointInsidePolygon(pCoordinates, tCoordinates[0], tCoordinates[1])) return true;
    }
    return false;
  }

  static isLineInsidePolygon(pCoordinates, tCoordinates) {
    // Peor precisión - Menos tiempo de procesamiento
    let i, xp, yp;
    for (i = 0; i < tCoordinates.length; i++) {
      xp = tCoordinates[i][0];
      yp = tCoordinates[i][1];
      if (this.isPointInsidePolygon(pCoordinates, xp, yp)) {
        return true;
      }
    }
    return false;
    // Mejor precisión - Más tiempo de procesamiento
    // let i, j, xp, yp, closestPoint;
    // for (i = 0; i < pCoordinates.length; i++) {
    //   for (j = 0; j < pCoordinates[i].length; j++) {
    //     xp = pCoordinates[i][j][0];
    //     yp = pCoordinates[i][j][1];
    //     closestPoint = this.getClosestPointToLine(tCoordinates, xp, yp);
    //     if (this.isPointInsidePolygon(pCoordinates, closestPoint.lng, closestPoint.lat)) return true;
    //   }
    // }
    // return false;
  }

  static isMultiLineInsidePolygon(pCoordinates, tCoordinates) {
    for (let i = 0; i < tCoordinates.length; i++) {
      if (this.isLineInsidePolygon(pCoordinates, tCoordinates[i])) return true;
    }
    return false;
  }

  // Funciones de obtener objeto más cercano
  // Functions to get closest item

  static getClosestLayer(layerGroup, sourceLayer) {
    let i, layer, distance;
    const layers = layerGroup.getLayers();
    let targetLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      distance = this.getLayerDistanceToLayer(layer, sourceLayer);
      if (distance < minDistance) {
        minDistance = distance;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getClosestFeature(layerGroup, sourceLayer) {
    const layer =  this.getClosestLayer(layerGroup, sourceLayer);
    return layer ? layer.feature : null;
  }

  static getClosestLayerToPoint(layerGroup, xp, yp) {
    let i, layer, distance;
    const layers = layerGroup.getLayers();
    let targetLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      distance = this.getDistanceToLayer(layer, xp, yp);
      if (distance < minDistance) {
        minDistance = distance;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getClosestFeatureToPoint(layerGroup, xp, yp) {
    const layer = this.getClosestLayerToPoint(layerGroup, xp, yp);
    return layer ? layer.feature : null;
  }

  // Funciones de obtener objetos en un radio (en metros)
  // Functions de get items in a radius (in meters)

  static getLayersInRadius(layerGroup, xc, yc, r) {
    let i, layer, distance;
    const layers = layerGroup.getLayers();
    let targetLayers = [];
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      distance = this.getDistanceToLayer(layer, xc, yc);
      if (distance === null) {
        continue;
      } else if (distance <= r) {
        targetLayers.push(layer);
      }
    }
    return targetLayers;
  }

  static getFeaturesInRadius(layerGroup, xc, yc, r) {
    let i, layer, distance;
    const layers = layerGroup.getLayers();
    let targetFeatures = [];
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      distance = this.getDistanceToLayer(layer, xc, yc);
      if (distance === null) {
        continue;
      } else if (distance <= r) {
        targetFeatures.push(layer.feature);
      }
    }
    return targetFeatures;
  }

  static getClosestLayerInRadius(layerGroup, xc, yc, r) {
    let i, layer, distance;
    const layers = layerGroup.getLayers();
    let targetLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      distance = this.getDistanceToLayer(layer, xc, yc);
      if (distance < minDistance && (distance <= r || r <= 0)) {
        targetLayer = layer;
        minDistance = distance;
      }
    }
    return targetLayer;
  }

  static getClosestFeatureInRadius(layerGroup, xc, yc, r) {
    const layer = this.getClosestLayerInRadius(layerGroup, xc, yc, r);
    return layer ? layer.feature : null;
  }

  // Funciones para comprobar si un objeto (punto o multipunto) está dentro de un 
  // buffer (definido por una capa de línea o multilinea y una distancia en metros)
  // Functions to check if an item (point or multipont) is inside a buffer (defined
  // by a line or multiline layer and a distance in meters)

  static isLayerInsideBuffer(lineLayer, tLayer, d) {
    return this.isFeatureInsideBuffer(lineLayer, tLayer.feature, d);
  }

  static isFeatureInsideBuffer(lineLayer, tFeature, d) {
    const geometry = tFeature.geometry;
    const type = geometry.type;
    const coordinates = geometry.coordinates;
    if (type === 'Point') {
      return this.isPointInsideBuffer(lineLayer, coordinates[0], coordinates[1], d);
    } else if (type === 'MultiPoint') {
      return this.isMultiPointInsideBuffer(lineLayer, coordinates, d);
    } else {
      return null;
    }
  }

  static isPointInsideBuffer(lineLayer, xp, yp, d) {
    const geometry = lineLayer.feature.geometry;
    const type = geometry.type;
    const lineCoordinates = geometry.coordinates;
    if (type === 'LineString') {
      return this.isPointInsideLineBuffer(lineCoordinates, xp, yp, d);
    } else if (type === 'MultiLineString') {
      return this.isPointInsideMultiLineBuffer(lineCoordinates, xp, yp, d);
    } else {
      return null;
    }
  }

  static isMultiPointInsideBuffer(lineLayer, pointCoordinates, d) {
    for (let i = 0; i < pointCoordinates.length; i++) {
      if (this.isPointInsideBuffer(lineLayer, pointCoordinates[0], pointCoordinates[1], d)) {
        return true;
      }
    }
    return false;
  }

  static isPointInsideLineBuffer(lineCoordinates, xp, yp, d) {
    return d <= 0 ? true : this.getDistanceToLine(lineCoordinates, xp, yp) <= d;
  }

  static isPointInsideMultiLineBuffer(lineCoordinates, xp, yp, d) {
    for (let i = 0; i < lineCoordinates.length; i++) {
      if (this.isPointInsideLineBuffer(lineCoordinates[i], xp, yp, d)) return true;
    }
    return false;
  }

  // Funciones para obtener objetos dentro de un buffer
  // Functions to get items inside a buffer

  static getLayersInBuffer(layerGroup, lineLayer, d) {
    let i, layers, targetLayers, layer, distance;
    const type = lineLayer.feature.geometry.type;
    if (type === 'LineString' || type === 'MultiLineString') {
      layers = layerGroup.getLayers();
      targetLayers = [];
      for (i = 0; i < layers.length; i++) {
        layer = layers[i];
        distance = this.getLayerDistanceToLayer(layer, lineLayer);
        if (distance !== null && distance <= d) targetLayers.push(layer);
      }
      return targetLayers;
    } else {
      return null;
    }
  }

  static getFeaturesInBuffer(layerGroup, lineLayer, d) {
    let i, layers, targetFeatures, layer, distance;
    const type = lineLayer.feature.geometry.type;
    if (type === 'LineString' || type === 'MultiLineString') {
      layers = layerGroup.getLayers();
      targetFeatures = [];
      for (i = 0; i < layers.length; i++) {
        layer = layers[i];
        distance = this.getLayerDistanceToLayer(layer, lineLayer);
        if (distance !== null && distance <= d) targetFeatures.push(layer.feature);
      }
      return targetFeatures;
    } else {
      return null;
    }
  }

  static getClosestLayerInBuffer(layerGroup, lineLayer, d) {
    let i, layers, targetLayer, minDistance, layer, distance
    const type = lineLayer.feature.geometry.type;
    if (type === 'LineString' || type === 'MultiLineString') {
      layers = layerGroup.getLayers();
      targetLayer = null;
      minDistance = Infinity;
      for (i = 0; i < layers.length; i++) {
        layer = layers[i];
        distance = this.getLayerDistanceToLayer(layer, lineLayer);
        if (distance !== null && distance <= d && distance < minDistance)  {
          minDistance = distance;
          targetLayer = layer;
        }
      }
      return targetLayer;
    } else {
      return null;
    }
  }

  static getClosestFeatureInBuffer(layerGroup, lineLayer, d) {
    const layer = this.getClosestLayerInBuffer(layerGroup, lineLayer, d);
    return layer ? layer.feature : null;
  }

  // Otros / Others

  static isPointInsideBounds(bounds, lat, lng) {
    const latlng = L.latLng(lat, lng);
    return bounds.contains(latlng);
  }

  static getClosestPointToSegment(x1, y1, x2, y2, xt, yt) {
    const latLng1 = L.latLng(y1, x1);
    const latLng2 = L.latLng(y2, x2);
    const tLatLng = L.latLng(yt, xt);
    const point1 = map.latLngToLayerPoint(latLng1);
    const point2 = map.latLngToLayerPoint(latLng2);
    const tPoint = map.latLngToLayerPoint(tLatLng);
    const cPoint = L.LineUtil.closestPointOnSegment(tPoint, point1, point2);
    return map.layerPointToLatLng(cPoint);
  }

  static getClosestPointToLine(lineCoordinates, xt, yt) {
    let i, x1, y1, x2, y2, cLatLng, distance;
    const tLatLng = L.latLng(yt, xt);
    let minDistance = Infinity;
    let targetPoint = null;
    for (i = 0; i < lineCoordinates.length - 1; i++) {
      x1 = lineCoordinates[i][0];
      y1 = lineCoordinates[i][1];
      x2 = lineCoordinates[i + 1][0];
      y2 = lineCoordinates[i + 1][1];
      cLatLng = this.getClosestPointToSegment(x1, y1, x2, y2, xt, yt);
      distance = map.distance(tLatLng, cLatLng);
      if (distance < minDistance) {
        minDistance = distance;
        targetPoint = cLatLng;
      }
    }
    return targetPoint;
  }

  static getPolygonCentroid(polygonLayer) {
    let latLng
    const type = polygonLayer.feature.geometry.type;
    if (type === 'Polygon') {
      latLng = polygonLayer.getLatLngs()[0];
      return L.PolyUtil.centroid(latLng);
    } else if (type === 'MultiPolygon') {
      latLng = polygonLayer.getLatLngs()[0][0];
      return L.PolyUtil.centroid(latLng);
    } else {
      return null;
    }
  }
}