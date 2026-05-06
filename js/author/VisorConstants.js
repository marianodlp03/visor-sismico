/*
Este archivo contiene las constantes del visor, que son objetos globales. Permiten configurar
diversos aspectos del visor, como los valores iniciales o almacenar valores mínimos y máximos
que dado que son llamados habitualmente es preferible obtenerlos al cargar el visor, por
temas de rendimiento. 

Es muy aconsejable que este archivo sea cargado después que el resto archivos, pues
contiene llamadas a funciones de otros archivos.

This file contains the visor constants, that are global objects. They allow to configure
various aspects of the visor, such as initial values or to store minimum and maximum values
since they are called often an it is preferable to obtain them when loading the visor, for
performance issues.

It is very advisable for this file to be loaded after the rest of files, since it
contains calls to functions from other files.
*/

// Otros / Others

const POPULATION_NAMES = MiscFunctions.getPopulationNames(populationsData.features);
const INTENSITY_STRING = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const MAX_FILE_NAME = 20;
const MAX_BUFFER_WIDTH = 1000; // En km / In km
const CONTEXT_MENU_WIDTH = 400;
const MAGNITUDE_EXPONENT = 1.8;
const POPULATION_EXPONENT = 2.2;

// Valores máximos y mínimos / Maximum and minimum values

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
const MIN_RADIUS = 0; // En km / In km
const MAX_RADIUS = 10000; // En km / In km

const QUAKES_MIN_MAGNITUDE = MiscFunctions.getQuakesMinMagnitude();
const QUAKES_MAX_MAGNITUDE = MiscFunctions.getQuakesMaxMagnitude();
const QUAKES_MIN_INTENSITY = MiscFunctions.getQuakesMinIntensity();
const QUAKES_MAX_INTENSITY = MiscFunctions.getQuakesMaxIntensity();
const QUAKES_MIN_DEPTH = MiscFunctions.getQuakesMinDepth();
const QUAKES_MAX_DEPTH = MiscFunctions.getQuakesMaxDepth();
const QUAKES_MIN_DATE = MiscFunctions.getQuakesMinDate();
const QUAKES_MAX_DATE = MiscFunctions.getQuakesMaxDate();

const FAULTS_MIN_MAGNITUDE = MiscFunctions.getFaultsMinMagnitude();
const FAULTS_MAX_MAGNITUDE = MiscFunctions.getFaultsMaxMagnitude();
const FAULTS_MIN_DEPTH = MiscFunctions.getFaultsMinDepth();
const FAULTS_MAX_DEPTH = MiscFunctions.getFaultsMaxDepth();

const POPULATIONS_MIN_NUMBER = MiscFunctions.getPopulationsMinNumber();
const POPULATIONS_MAX_NUMBER = MiscFunctions.getPopulationsMaxNumber();

const INTENSITIES_MIN_VALUE = MiscFunctions.getIntensitiesMinValue();
const INTENSITIES_MAX_VALUE = MiscFunctions.getIntensitiesMaxValue();

// Valores iniciales Initial values
const INITIAL_QUAKES_MIN_MAGNITUDE = QUAKES_MIN_MAGNITUDE;
const INITIAL_QUAKES_MAX_MAGNITUDE = QUAKES_MAX_MAGNITUDE;
const INITIAL_QUAKES_MIN_INTENSITY = QUAKES_MIN_INTENSITY;
const INITIAL_QUAKES_MAX_INTENSITY = QUAKES_MAX_INTENSITY;
const INITIAL_QUAKES_MIN_DEPTH = QUAKES_MIN_DEPTH;
const INITIAL_QUAKES_MAX_DEPTH = QUAKES_MAX_DEPTH;
const INITIAL_QUAKES_MIN_DATE = MiscFunctions.getPreviousYearDate(QUAKES_MAX_DATE);
const INITIAL_QUAKES_MAX_DATE = QUAKES_MAX_DATE;
const INITIAL_FAULTS_MIN_MAGNITUDE = FAULTS_MIN_MAGNITUDE;
const INITIAL_FAULTS_MAX_MAGNITUDE = FAULTS_MAX_MAGNITUDE;
const INITIAL_FAULTS_MIN_DEPTH = FAULTS_MIN_DEPTH;
const INITIAL_FAULTS_MAX_DEPTH = FAULTS_MAX_DEPTH;
const INITIAL_POPULATIONS_MIN_NUMBER = 2000;
const INITIAL_POPULATIONS_MAX_NUMBER = POPULATIONS_MAX_NUMBER;
const INITIAL_LONGITUDE = -3.7;
const INITIAL_LATITUDE = 40.41;
const INITIAL_RADIUS = MIN_RADIUS;
const INITIAL_ZOOM_LEVEL = 7;

// Valores por defecto / Default values

const DEFAULT_INSIDE_TERRITORIAL_LIMIT = false;
const DEAULT_RADIUS_FILTER_FIXED = false;
const DEFAULT_EXPORT_NAME = "Exported";
const DEFAULT_EXPORT_LAYER_VISIBLE_BOUND_ONLY_CHECKED = false;
const DEFAULT_LAYER_CONTROL_ALLWAYS_DEPLOYED = true;
const DEAULT_SCALEBAR_CONTROL_VISIBLE = true;
const DEFAULT_COORDINATE_VISOR_CONTROL_VISIBLE = true;
const DEFAULT_FILTER_LEGEND_CONTROL_VISIBLE = true;
const DEFAULT_EVENT_LEGEND_CONTROL_VISIBLE = true;
