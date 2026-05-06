/*
Este archivo únicamente contiene un objeto global con el nombre clave de los atributos principales
de las capas de usuario. Es muy importante no cambiar el nombre de las propiedades, únicamente
el valor de la propiedad al nombre de los atributos de los archivos de datos.

This file only contains a global object with the key name of the main attributes of the
user layers. It is very important not to change the name of the properties, only the value of the
field to the name of the attributes of the data files.
*/

AttributesConfig = {
  // Sismos / Quakes
  QUAKE_MAGNITUDE: 'magnitud',
  QUAKE_DATE: 'fecha',
  QUAKE_INTENSITY: 'intensidad',
  QUAKE_DEPTH: 'profundidad',
  QUAKE_LOCALIZATION: 'localizacion',

  // Fallas / Faults
  FAULT_MAGNITUDE: 'MaxMagnitu',
  FAULT_DEPTH: 'MaxDepth',
  FAULT_NAME: 'FaultName',

  // Poblaciones / Populations
  POPULATION_NUMBER: 'habitantes',
  POPULATION_NAME: 'nombre',

  // Intensidades / Intensities
  INTENSITY_VALUE: 'intensidad'
}