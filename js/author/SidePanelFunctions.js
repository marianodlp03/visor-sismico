/*
Este archivo contiene una clase con métodos estáticos que controla el funcionamiento de todos los elementos
del panel lateral.

This file contains a class with static methods that controls the working of all elements of the side panel.
*/

class SidePanelFunctions {
  // Funciones de inicialización / Initialization functions

  static setText(id, textKey) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.innerHTML = LangageFunctions.getText(textKey);
    }
  }

  static initializeButton(id, textKey, clickListener) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.innerHTML = LangageFunctions.getText(textKey);
      element.type = 'button';
      element.addEventListener('click', clickListener);
    }
  }

  static initializeCheckbox(id, checked, clickListener) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.checked = checked;
      if (clickListener) element.addEventListener('click' , clickListener);
    }
  }

  static initializeTextInput(id, text, size, maxLength, changeListener) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.type = text;
      element.value = text;
      if (size) element.size = size;
      if (maxLength) element.maxlength = maxLength;
      if (changeListener) element.addEventListener('change', changeListener);
    }
  }

  static initializeNumericInput(id, value, size, step, precision, min, max, inputListener, blurListener) {
    let i, element;
    let newValue = precision ? value.toFixed(precision) : value;
    newValue = parseFloat(newValue);
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.type = 'number';
      element.valueAsNumber = value;
      if (size !== undefined) element.size = size;
      if (step !== undefined) element.step = step;
      if (min !== undefined) element.min = min;
      if (max !== undefined) element.max = max;
      if (inputListener) element.addEventListener('input', inputListener);
      if (blurListener) element.addEventListener('blur', blurListener);
    }
  }

  static initializeDateInput(id, date, blurListener, step) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.type = 'date';
      element.valueAsDate = date;
      if (step) element.step = step;
      element.addEventListener('blur', blurListener);
    }
  }

  static initializeColorInput(id, value, changeListener) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.type = 'color';
      element.value = value;
      element.addEventListener('change', changeListener);
    }
  }

  static initializeFileInput(id, changeListener) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.type = 'file';
      element.accept = '.geojson';
      if (changeListener) element.addEventListener('change', changeListener);
    }
  }

  static initializeSelect(id, optionsFunction, initialValue, changeListener) {
    let i, j, element, options, option;
    const elements = document.querySelectorAll('#' + id);
    for (i = 0; i < elements.length; i++) {
      element = elements[i];
      this.removeAllOptions(element);
      options = optionsFunction();
      for (j = 0; j < options.length; j++) {
        option = options[j];
        element.add(option);
      }
      element.value = initialValue;
       if (changeListener) element.addEventListener('change', changeListener);
    }
  }

  static removeAllOptions(element) {
    let options = element.options;
    while (options.length > 0) {
      options[0].remove();
    }
  }

  static initializeAll() {
    this.setTexts();
    this.initializeInputs();
    this.initializeButtons();
  }

  static setTexts() {
    this.setAllFiltersTabTexts();
    this.setQuakeFiltersTexts();
    this.setFaultFiltersTexts();
    this.setPopulationFiltersTexts();
    this.setSpatialFiltersTexts();
    this.setFilesTabTexts();
    this.setOptionsTabTexts();
    this.setInstructionsTabTexts();
    this.setContactTabTexts();
  }

  static initializeInputs() {
    this.initializeQuakeFiltersInputs();
    this.initializeFaultFiltersInputs();
    this.initializePopulationFiltersInputs();
    this.initializeSpatialFiltersInputs();
    this.initializeFilesTabInputs();
    this.initializeOptionsTabInputs();
  }

  // Textos / Texts

  static setAllFiltersTabTexts() {
    this.setText('allFiltersTabTitle' , 'SIDE_PANEL_ALL_FILTERS_TAB_TITLE');
    this.setText('allFiltersTabDescription', 'SIDE_PANEL_ALL_FILTERS_TAB_DESCRIPTION');
    this.setText('quakeFiltersTitle', 'SIDE_PANEL_QUAKE_FILTERS_TITLE');
    this.setText('faultFiltersTitle', 'SIDE_PANEL_FAULT_FILTERS_TITLE');
    this.setText('populationFiltersTitle', 'SIDE_PANEL_POPULATION_FILTERS_TITLE');
  }

  static setQuakeFiltersTexts() {
    this.setText('quakeFiltersTabTitle', 'SIDE_PANEL_QUAKE_FILTERS_TAB_TITLE');
    this.setText('quakeFiltersTabDescription', 'SIDE_PANEL_QUAKE_FILTERS_TAB_DESCRIPTION');
    this.setText('quakeMagnitudeFiltersTitle', 'SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_TITLE');
    this.setText('quakeMagnitudeFiltersDescription', 'SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_DESCRIPTION');
    this.setText('quakeMinMagnitudeFilterText', 'SIDE_PANEL_QUAKE_MIN_MAGNITUDE_FILTER_TEXT');
    this.setText('quakeMaxMagnitudeFilterText', 'SIDE_PANEL_QUAKE_MAX_MAGNITUDE_FILTER_TEXT');
    this.setText('quakeIntensityFiltersTitle', 'SIDE_PANEL_QUAKE_INTENSITY_FILTERS_TITLE');
    this.setText('quakeIntensityFiltersDescription', 'SIDE_PANEL_QUAKE_INTENSITY_FILTERS_DESCRIPTION');
    this.setText('quakeMinIntensityFilterText', 'SIDE_PANEL_QUAKE_MIN_INTENSITY_FILTER_TEXT');
    this.setText('quakeMaxIntensityFilterText', 'SIDE_PANEL_QUAKE_MAX_INTENSITY_FILTER_TEXT');
    this.setText('quakeDepthFiltersTitle', 'SIDE_PANEL_QUAKE_DEPTH_FILTERS_TITLE');
    this.setText('quakeMinDepthFilterText', 'SIDE_PANEL_QUAKE_MIN_DEPTH_FILTER_TEXT');
    this.setText('quakeMaxDepthFilterText', 'SIDE_PANEL_QUAKE_MAX_DEPTH_FILTER_TEXT');
    this.setText('quakeDateFiltersTitle', 'SIDE_PANEL_QUAKE_DATE_FILTERS_TITLE');
    this.setText('quakeMinDateFilterText', 'SIDE_PANEL_QUAKE_MIN_DATE_FILTER_TEXT');
    this.setText('quakeMaxDateFilterText', 'SIDE_PANEL_QUAKE_MAX_DATE_FILTER_TEXT');
  }

  static setFaultFiltersTexts() {
    this.setText('faultFiltersTabTitle', 'SIDE_PANEL_FAULT_FILTERS_TAB_TITLE');
    this.setText('faultFiltersTabDescription', 'SIDE_PANEL_FAULT_FILTERS_TAB_DESCRIPTION');
    this.setText('faultMagnitudeFiltersTitle', 'SIDE_PANEL_FAULT_MAGNITUDE_FILTERS_TITLE');
    this.setText('faultMinMagnitudeFilterText', 'SIDE_PANEL_FAULT_MIN_MAGNITUDE_FILTER_TEXT')
    this.setText('faultMaxMagnitudeFilterText', 'SIDE_PANEL_FAULT_MAX_MAGNITUDE_FILTER_TEXT');
    this.setText('faultDepthFiltersTitle', 'SIDE_PANEL_FAULT_DEPTH_FILTERS_TITLE');
    this.setText('faultMinDepthFilterText', 'SIDE_PANEL_FAULT_MIN_DEPTH_FILTER_TEXT');
    this.setText('faultMaxDepthFilterText', 'SIDE_PANEL_FAULT_MAX_DEPTH_FILTER_TEXT');
  }

  static setPopulationFiltersTexts() {
    this.setText('populationFiltersTabTitle', 'SIDE_PANEL_POPULATION_FILTERS_TAB_TITLE');
    this.setText('populationFiltersTabDescription', 'SIDE_PANEL_POPULATION_FILTERS_TAB_DESCRIPTION');
    this.setText('populationFiltersNumberTitle', 'SIDE_PANEL_POPULATION_NUMBER_FILTERS_TITLE');
    this.setText('populationMinNumberFilterText', 'SIDE_PANEL_POPULATION_MIN_NUMBER_FILTER_TEXT');
    this.setText('populationMaxNumberFilterText', 'SIDE_PANEL_POPULATION_MAX_NUMBER_FILTER_TEXT');
  }

  static setSpatialFiltersTexts() {
    this.setText('spatialFiltersTabTitle' , 'SIDE_PANEL_SPATIAL_FILTERS_TAB_TITLE');
    this.setText('spatialFiltersTabDescription' , 'SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION');
    this.setText('spatialFiltersTitle', 'SIDE_PANEL_SPATIAL_FILTERS_TITLE');
    this.setText('spatialFiltersCoordinatesTitle', 'SIDE_PANEL_SPATIAL_FILTERS_COORDINATES_TITLE');
    this.setText('spatialFiltersRadiusTitle', 'SIDE_PANEL_SPATIAL_FILTERS_RADIUS_TITLE')
    this.setText('spatialFiltersConditionTitle', 'SIDE_PANEL_SPATIAL_CONDITION_TITLE');
    this.setText('spatialLatitudeFilterText', 'SIDE_PANEL_SPATIAL_LATITUDE_FILTER_TEXT');
    this.setText('spatialLongitudeFilterText', 'SIDE_PANEL_SPATIAL_LONGITUDE_FILTER_TEXT');
    this.setText('spatialRadiusFilterText', 'SIDE_PANEL_SPATIAL_RADIUS_FILTER_TEXT');
    this.setText('spatialFiltersFixedRadiusText', 'SIDE_PANEL_SPATIAL_RADIUS_FIXED_TEXT');
    this.setText('spatialFiltersInsideTerritorialLimitText', 'SIDE_PANEL_SPATIAL_INSIDE_TERRITORIAL_LIMIT_FILTER_TEXT');
  }

  static setFilesTabTexts() {
    this.setText('filesTabTitle', 'SIDE_PANEL_FILES_TAB_TITLE');
    this.setText('filesTabDescription', 'SIDE_PANEL_FILES_TAB_DESCRIPTION');
    this.setText('filesTabImportTitle', 'SIDE_PANEL_FILES_IMPORT_TITLE');
    this.setText('filesTabImportUserLayer1Title', 'SIDE_PANEL_FILES_IMPORT_USER_LAYER_1_TITLE');
    this.setText('filesTabImportLayerName', 'SIDE_PANEL_FILES_IMPORT_LAYER_NAME_TEXT');
    this.setText('filesTabExportTitle', 'SIDE_PANEL_FILES_EXPORT_TITLE');
    this.setText('filesTabExportNameText', 'SIDE_PANEL_FILES_EXPORT_NAME_TEXT');
    this.setText('filesTabExportLayerText', 'SIDE_PANEL_FILES_EXPORT_LAYER_TEXT');
    this.setText('filesTabExportOnlyVisibleBoundsText', 'SIDE_PANEL_FILES_EXPORT_ONLY_VISIBLE_BOUNDS_TEXT');
  }

  static setOptionsTabTexts() {
    this.setText('optionsTabTitle', 'SIDE_PANEL_OPTIONS_TITLE');
    this.setText('optionsTabDescription', 'SIDE_PANEL_OPTIONS_DESCRIPTION');
    this.setText('optionsTabLangageTitle', 'SIDE_PANEL_OPTIONS_LANGAGE_TITLE');
    this.setText('optionsTabLangageText', 'SIDE_PANEL_OPTIONS_LANGAGE_TEXT');
    this.setText('optionsTabControlsTitle', 'SIDE_PANEL_OPTIONS_CONTROLS_TITLE');
    this.setText('optionsTabLayerControlAllwaysDeployedText', 'SIDE_PANEL_OPTIONS_LAYER_CONTROL_ALWAYS_DEPLOYED_TEXT');
    this.setText('optionsTabScalebarControlVisibleText', 'SIDE_PANEL_OPTIONS_SCALEBAR_CONTROL_VISIBLE_TEXT');
    this.setText('optionsTabCoordinateVisorControlVisibleText', 'SIDE_PANEL_OPTIONS_COORDINATE_VISOR_CONTROL_VISIBLE_TEXT');
    this.setText('optionsTabFilterLegendControlVisibleText', 'SIDE_PANEL_OPTIONS_FILTER_LEGEND_CONTROL_VISIBLE_TEXT');
    this.setText('optionsTabEventLegendControlVisibleText', 'SIDE_PANEL_OPTIONS_EVENT_LEGEND_CONTROL_VISIBLE_TEXT');
    this.setText('optionsTabStylesTitle', 'SIDE_PANEL_OPTIONS_STYLES_TITLE');
    this.setText('optionsTabQuakesStylesTitle', 'SIDE_PANEL_OPTIONS_QUAKES_STYLES_TITLE');
    this.setText('optionsTabQuakesBorderColorText', 'SIDE_PANEL_OPTIONS_QUAKES_BORDER_COLOR_TEXT');
    this.setText('optionsTabQuakesFillColorText', 'SIDE_PANEL_OPTIONS_QUAKES_FILL_COLOR_TEXT');
    this.setText('optionsTabQuakesMinDepthColorText', 'SIDE_PANEL_OPTIONS_QUAKES_MIN_DEPTH_COLOR_TEXT');
    this.setText('optionsTabQuakesMaxDepthColorText', 'SIDE_PANEL_OPTIONS_QUAKES_MAX_DEPTH_COLOR_TEXT');
    this.setText('optionsTabFaultsStylesTitle', 'SIDE_PANEL_OPTIONS_FAULTS_STYLES_TITLE');
    this.setText('optionsTabFaultsBorderColorText', 'SIDE_PANEL_OPTIONS_FAULTS_BORDER_COLOR_TEXT');
    this.setText('optionsTabPopulationsStylesTitle', 'SIDE_PANEL_OPTIONS_POPULATIONS_STYLES_TITLE');
    this.setText('optionsTabPopulationsBorderColorText', 'SIDE_PANEL_OPTIONS_POPULATIONS_BORDER_COLOR_TEXT');
    this.setText('optionsTabPopulationsFillColorText', 'SIDE_PANEL_OPTIONS_POPULATIONS_FILL_COLOR_TEXT');
    this.setText('optionsTabPopulationsMinNumberColorText', 'SIDE_PANEL_OPTIONS_POPULATIONS_MIN_NUMBER_COLOR_TEXT');
    this.setText('optionsTabPopulationsMaxNumberColorText', 'SIDE_PANEL_OPTIONS_POPULATIONS_MAX_NUMBER_COLOR_TEXT');
    this.setText('optionsTabIntensitiesStylesTitle', 'SIDE_PANEL_OPTIONS_INTENSITIES_STYLES_TITLE');
    this.setText('optionsTabIntensitiesBorderColorText', 'SIDE_PANEL_OPTIONS_INTENSITIES_BORDER_COLOR_TEXT');
    this.setText('optionsTabRegionsStylesTitle', 'SIDE_PANEL_OPTIONS_REGIONS_STYLES_TITLE');
    this.setText('optionsTabRegionsBorderColorText', 'SIDE_PANEL_OPTIONS_REGIONS_BORDER_COLOR_TEXT');
    this.setText('optionsTabProvincesStylesTitle', 'SIDE_PANEL_OPTIONS_PROVINCES_STYLES_TITLE');
    this.setText('optionsTabProvincesBorderColorText', 'SIDE_PANEL_OPTIONS_PROVINCES_BORDER_COLOR_TEXT');
    this.setText('optionsTabTerritorialLimitStylesTitle', 'SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_STYLES_TITLE');
    this.setText('optionsTabTerritorialLimitBorderColorText', 'SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_BORDER_COLOR_TEXT');
    this.setText('optionsTabFilterCircleStylesTitle', 'SIDE_PANEL_OPTIONS_FILTER_CIRCLE_STYLES_TITLE');
    this.setText('optionsTabFilterCircleBorderColorText', 'SIDE_PANEL_OPTIONS_FILTER_CIRCLE_BORDER_COLOR_TEXT');
    this.setText('optionsTabFilterCircleFillColorText', 'SIDE_PANEL_OPTIONS_FILTER_CIRCLE_FILL_COLOR_TEXT');
    this.setText('optionsTabImportedLayerStylesTitle', 'SIDE_PANEL_OPTIONS_IMPORTED_LAYER_TITLE');
    this.setText('optionsTabImportedLayerBorderColorText', 'SIDE_PANEL_OPTIONS_IMPORTED_LAYER_BORDER_COLOR_TEXT');
    this.setText('optionsTabImportedLayerFillColorText', 'SIDE_PANEL_OPTIONS_IMPORTED_LAYER_FILL_COLOR_TEXT');
    this.setText('optionsTabSystemStylesTitle', 'SIDE_PANEL_OPTIONS_SYSTEM_STYLES_TITLE');
    this.setText('optionsTabMarkedBorderColorText', 'SIDE_PANEL_OPTIONS_MARKED_COLOR_TEXT');
  }

  static setInstructionsTabTexts() {
    this.setText('instructionsTabTitle', 'SIDE_PANEL_INSTRUCTIONS_TITLE');
    this.setText('instructionsTabDescription', 'SIDE_PANEL_INSTRUCTIONS_DESCRIPTION');
  }

  static setContactTabTexts() {
    this.setText('contactTabTitle', 'SIDE_PANEL_CONTACT_TITLE');
    this.setText('contactTabDescription', 'SIDE_PANEL_CONTACT_DESCRIPTION');
  }

  // Inputs

  static initializeQuakeFiltersInputs() {
    this.initializeFiltersMagnitudeInputs('quakeMinMagnitudeFilterInput', INITIAL_QUAKES_MIN_MAGNITUDE, QUAKES_MIN_MAGNITUDE, QUAKES_MAX_MAGNITUDE, this.onQuakeMinMagnitudeChange, this.onQuakeMinMagnitudeBlur);
    this.initializeFiltersMagnitudeInputs('quakeMaxMagnitudeFilterInput', INITIAL_QUAKES_MAX_MAGNITUDE, QUAKES_MIN_MAGNITUDE, QUAKES_MAX_MAGNITUDE, this.onQuakeMaxMagnitudeChange, this.onQuakeMaxMagnitudeBlur);
    this.initializeIntensitySelect('quakeMinIntensityFilterInput', INITIAL_QUAKES_MIN_INTENSITY, this.onQuakeMinIntensityChange);
    this.initializeIntensitySelect('quakeMaxIntensityFilterInput', INITIAL_QUAKES_MAX_INTENSITY, this.onQuakeMaxIntensityChange);
    this.initializeFiltersDepthInputs('quakeMinDepthFilterInput', INITIAL_QUAKES_MIN_DEPTH, QUAKES_MIN_DEPTH, QUAKES_MAX_DEPTH, this.onQuakeMinDepthChange, this.onQuakeMinDepthBlur);
    this.initializeFiltersDepthInputs('quakeMaxDepthFilterInput', INITIAL_QUAKES_MAX_DEPTH, QUAKES_MIN_DEPTH, QUAKES_MAX_DEPTH, this.onQuakeMaxDepthChange, this.onQuakeMaxDepthBlur);
    this.initializeDateInput('quakeMinDateFilterInput', INITIAL_QUAKES_MIN_DATE, this.onQuakeMinDateBlur);
    this.initializeDateInput('quakeMaxDateFilterInput', INITIAL_QUAKES_MAX_DATE, this.onQuakeMaxDateBlur);
  }

  static initializeFaultFiltersInputs() {
    this.initializeFiltersMagnitudeInputs('faultMinMagnitudeFilterInput', INITIAL_FAULTS_MIN_MAGNITUDE, FAULTS_MIN_MAGNITUDE, FAULTS_MAX_MAGNITUDE, this.onFaultMinMagnitudeChange, this.onFaultMinMagnitudeBlur);
    this.initializeFiltersMagnitudeInputs('faultMaxMagnitudeFilterInput', INITIAL_FAULTS_MAX_MAGNITUDE, FAULTS_MIN_MAGNITUDE, FAULTS_MAX_MAGNITUDE, this.onFaultMaxMagnitudeChange, this.onFaultMaxMagnitudeBlur);
    this.initializeFiltersDepthInputs('faultMinDepthFilterInput', INITIAL_FAULTS_MIN_DEPTH, FAULTS_MIN_DEPTH, FAULTS_MAX_DEPTH, this.onFaultMinDepthChange, this.onFaultMinDepthBlur);
    this.initializeFiltersDepthInputs('faultMaxDepthFilterInput', INITIAL_FAULTS_MAX_DEPTH, FAULTS_MIN_DEPTH, FAULTS_MAX_DEPTH, this.onFaultMaxDepthChange, this.onFaultMaxDepthBlur);
  }

  static initializePopulationFiltersInputs() {
    this.initializePopulationFiltersNumericInputs('populationMinNumberFilterInput', INITIAL_POPULATIONS_MIN_NUMBER, POPULATIONS_MIN_NUMBER, POPULATIONS_MAX_NUMBER, this.onPopulationMinNumberChange, this.onPopulationMinNumberBlur);
    this.initializePopulationFiltersNumericInputs('populationMaxNumberFilterInput', INITIAL_POPULATIONS_MAX_NUMBER, POPULATIONS_MIN_NUMBER, POPULATIONS_MAX_NUMBER, this.onPopulationMaxNumberChange, this.onPopulationMaxNumberBlur);
  }

  static initializeSpatialFiltersInputs() {
    insideTerritorialLimit = DEFAULT_INSIDE_TERRITORIAL_LIMIT;
    this.initializeNumericInput('spatialLatitudeFilterInput', INITIAL_LATITUDE, 10, 1, 4, MIN_LATITUDE, MAX_LATITUDE, this.onSpatialLatitudeChange, this.onSpatialLatitudeBlur);
    this.initializeNumericInput('spatialLongitudeFilterInput', INITIAL_LONGITUDE, 10, 1, 4, MIN_LONGITUDE, MAX_LONGITUDE, this.onSpatialLongitudeChange, this.onSpatialLongitudeBlur);
    this.initializeNumericInput('spatialRadiusFilterInput', INITIAL_RADIUS, 10, 1, 3, MIN_RADIUS, MAX_RADIUS, this.onSpatialRadiusChange, this.onSpatialRadiusBlur);
    this.initializeCheckbox('spatialFiltersFixedRadiusCheckbox', spatialRadiusFixed, this.onSpatialRadiusFixedClick)
    this.initializeCheckbox('spatialFiltersInsideTerritorialLimitCheckbox', insideTerritorialLimit, this.onSpatialInsideTerritorialLimitClick)
  }

  static initializeFilesTabInputs() {
    this.initializeTextInput('filesTabImportLayerNameInput', "", 20, 20);
    this.initializeFileInput('filesTabImportLayerFileInput', this.onImportLayerInputChange);
    this.initializeTextInput('filesTabExportNameInput', DEFAULT_EXPORT_NAME, 30, 20, this.onExportNameChange);
    this.initializeExportLayerSelect();
    this.initializeCheckbox('filesTabExportOnlyVisibleBoundsCheckbox', DEFAULT_EXPORT_LAYER_VISIBLE_BOUND_ONLY_CHECKED);
  }

  static initializeOptionsTabInputs() {
    this.initializeSelect('optionsTabLangageInput', this.getLangageSelectOptions, availableLangages[0], this.onLangageSelectChange)
    this.initializeOptionsControlsInputs();
    this.initializeOptionsStylesInputs();
  }

  //

  static initializeFiltersMagnitudeInputs(id, value, min, max, changeListener, blurListener) {
    this.initializeNumericInput(id, value, 5, 0.1, 2, min, max, changeListener, blurListener);
  }

  static initializeFiltersDepthInputs(id, value, min, max, changeListener, blurListener) {
    this.initializeNumericInput(id, value, 8, 1, 3, min, max, changeListener, blurListener);
  }

  static initializeQuakeFiltersIntensityInputs(id, changeListener, initialValue) {
    this.initializeQuakeIntensitySelect(id, changeListener, initialValue);
  }

  static initializePopulationFiltersNumericInputs(id, value, min, max, changeListener, blurListener) {
    this.initializeNumericInput(id, value, 10, 1, 0, min, max, changeListener, blurListener);
  }

  static initializeIntensitySelect(id, initialValue, changeListener) {
    this.initializeSelect(id, this.getIntensitySelectOptions, initialValue, changeListener);
  }

  static initializeExportLayerSelect() {
    this.initializeSelect('filesTabExportLayerSelect', this.getExportLayerSelectOptions, 'quakesLayer');
  }

  static initializeOptionsControlsInputs() {
    this.initializeCheckbox('optionsTabLayerControlAllwaysDeployedCheckbox', DEFAULT_LAYER_CONTROL_ALLWAYS_DEPLOYED, this.onControlLayerAllwaysDeployedClick);
    this.initializeCheckbox('optionsTabScalebarControlVisibleCheckbox', DEAULT_SCALEBAR_CONTROL_VISIBLE, this.onScalebarControlVisibleClick);
    this.initializeCheckbox('optionsTabCoordinateVisorControlVisibleCheckbox', DEFAULT_COORDINATE_VISOR_CONTROL_VISIBLE, this.onCoordinateVisorVisibleClick);
    this.initializeCheckbox('optionsTabFilterLegendControlVisibleCheckbox', DEFAULT_FILTER_LEGEND_CONTROL_VISIBLE, this.onFilterLegendControlVisibleClick);
    this.initializeCheckbox('optionsTabEventLegendControlVisibleCheckbox', DEFAULT_EVENT_LEGEND_CONTROL_VISIBLE, this.onEventLegendControlVisibleClick);
  }

  static initializeOptionsStylesInputs() {
    this.initializeColorInput('optionsTabQuakesBorderColorInput', StyleFunctions.getValue('quakeBorderColor'), this.onOptionsQuakesBorderColorChange);
    this.initializeColorInput('optionsTabQuakesFillColorInput', StyleFunctions.getValue('quakeFillColor'), this.onOptionsQuakesFillColorChange);
    this.initializeColorInput('optionsTabQuakesMinDepthColorInput', StyleFunctions.getValue('quakeMinDepthColor'), this.onOptionsQuakesMinDepthColorChange);
    this.initializeColorInput('optionsTabQuakesMaxDepthColorInput', StyleFunctions.getValue('quakeMaxDepthColor'), this.onOptionsQuakesMaxDepthColorChange);
    this.initializeColorInput('optionsTabFaultsBorderColorInput', StyleFunctions.getValue('faultColor'), this.onOptionsFaultsBorderColorChange);
    this.initializeColorInput('optionsTabPopulationsBorderColorInput', StyleFunctions.getValue('populationBorderColor'), this.onOptionsPopulationsBorderColorChange);
    this.initializeColorInput('optionsTabPopulationsFillColorInput', StyleFunctions.getValue('populationFillColor'), this.onOptionsPopulationsFillColorChange);
    this.initializeColorInput('optionsTabIntensitiesBorderColorInput', StyleFunctions.getValue('intensityBorderColor'), this.onOptionsIntensitiesBorderColorChange);
    this.initializeColorInput('optionsTabRegionsBorderColorInput', StyleFunctions.getValue('regionBorderColor'), this.onOptionsRegionsBorderColorChange);
    this.initializeColorInput('optionsTabProvincesBorderColorInput', StyleFunctions.getValue('provinceBorderColor'), this.onOptionsProvincesBorderColorChange);
    this.initializeColorInput('optionsTabTerritorialLimitBorderColorInput', StyleFunctions.getValue('territorialLimitBorderColor'), this.onOptionsTerritorialLimitBorderColorChange);
    this.initializeColorInput('optionsTabFilterCircleBorderColorInput', StyleFunctions.getValue('filterCircleBorderColor'), this.onOptionsFilterCircleBorderColorChange);
    this.initializeColorInput('optionsTabFilterCircleFillColorInput', StyleFunctions.getValue('filterCircleFillColor'), this.onOptionsFilterCircleFillColorChange);
    this.initializeColorInput('optionsTabImportedLayerBorderColorInput', StyleFunctions.getValue('importedLayerBorderColor'), this.onOptionsImportedLayerBorderColorChange);
    this.initializeColorInput('optionsTabImportedLayerFillColorInput', StyleFunctions.getValue('importedLayerFillColor'), this.onOptionsImportedLayerFillColorChange);
    this.initializeColorInput('optionsTabMarkedColorInput', StyleFunctions.getValue('markedColor'), this.onOptionsMarkedColorChange);
  }

  static getIntensitySelectOptions() {
    let i, option;
    let options = [];
    for (i = QUAKES_MIN_INTENSITY; i <= QUAKES_MAX_INTENSITY; i++) {
      option = document.createElement('option');
      option.label = i === 0 ? LangageFunctions.getText('SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY') : MiscFunctions.getIntensityString(i);
      option.value = i;
      options.push(option);
    }
    return options;
  }

  static getExportLayerSelectOptions() {
    let i, option, value;
    let options = [];
    const quakesLayerName = LangageFunctions.getText('QUAKES_LAYER');
    const faultsLayerName = LangageFunctions.getText('FAULTS_LAYER');
    const populationsLayerName = LangageFunctions.getText('POPULATIONS_LAYER');
    const duplicatedQuakesLayerName = LangageFunctions.getText('DUPLICATED_QUAKES_LAYER');
    const duplicatedFaultsLayerName = LangageFunctions.getText('DUPLICATED_FAULTS_LAYER');
    const duplicatedDopulationsLayerName = LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER');
    const labelArray = [quakesLayerName, faultsLayerName, populationsLayerName, 
      duplicatedQuakesLayerName, duplicatedFaultsLayerName, duplicatedDopulationsLayerName];
    const valueArray = ['quakesLayer', 'faultsLayer', 'populationsLayer', 
    'duplicatedQuakesLayer', 'duplicatedFaultsLayer', 'duplicatedPopulationsLayer'];

    for (i = 0; i < labelArray.length; i++) {
      value = valueArray[i];
      if (!LayerFunctions.getLayerByKeyName(value)) {
        continue;
      }
      option = document.createElement('option');
      option.label = labelArray[i];
      option.value = value;
      options.push(option);
    }

    return options;
  }

  static getLangageSelectOptions() {
    let i, langage, option;
    let options = [];
    for (i = 0; i < availableLangages.length; i++) {
      langage = availableLangages[i];
      option = document.createElement('option');
      option.label = LangageFunctions.getText('NAME', langage);
      option.value = langage;
      options.push(option);
    }
    return options;
  }

  // Botones / Buttons

  static initializeButtons() {
    this.initializeAllFiltersTabButtons();
    this.initializeQuakesFiltersTabButtons();
    this.initializeFaultsFiltersTabButtons();
    this.initializePopulationsFiltersTabButtons();
    this.initializeSpatialFiltersTabButtons();
    this.initializeFilesTabButtons();
  }

  static initializeFilterButton(id, clickListener) {
    this.initializeButton(id, 'SIDE_PANEL_FILTER_BUTTON', clickListener);
  }

  static initializeDuplicateButton(id, clickListener) {
    this.initializeButton(id, 'SIDE_PANEL_DUPLICATE_BUTTON', clickListener);
  }

  static initializeRefreshButton(id, clickListener) {
    this.initializeButton(id, 'SIDE_PANEL_REFRESH_BUTTON', clickListener);
  }

  static initializeUnmarkButton(id, clickListener) {
    this.initializeButton(id, 'SIDE_PANEL_UNMARK_BUTTON', clickListener);
  }

  static initializeAllFiltersTabButtons() {
    this.initializeButton('allFilterButton', 'SIDE_PANEL_FILTER_ALL_BUTTON', this.onAllFilterButtonClick);
    this.initializeButton('allDuplicateButton', 'SIDE_PANEL_DUPLICATE_ALL_BUTTON', this.onAllDuplicateButtonClick);
    this.initializeButton('allRefreshButton', 'SIDE_PANEL_REFRESH_ALL_BUTTON', this.onAllRefreshButtonClick);
    this.initializeButton('allUnmarkButton', 'SIDE_PANEL_UNMARK_ALL_BUTTON', this.onAllUnmarkButtonClick);
  }

  static initializeQuakesFiltersTabButtons() {
    this.initializeFilterButton('quakesFilterButton', this.onQuakesFilterButtonClick);
    this.initializeDuplicateButton('quakesDuplicateButton', this.onQuakesDuplicateButtonClick);
    this.initializeRefreshButton('quakesRefreshButton', this.onQuakesRefreshButtonClick);
    this.initializeUnmarkButton('quakesUnmarkButton', this.onQuakesUnmarkButtonClick);
  }

  static initializeFaultsFiltersTabButtons() {
    this.initializeFilterButton('faultsFilterButton', this.onFaultsFilterButtonClick);
    this.initializeDuplicateButton('faultsDuplicateButton', this.onFaultsDuplicateButton);
    this.initializeRefreshButton('faultsRefreshButton', this.onFaultsRefreshButtonClick)
    this.initializeUnmarkButton('faultsUnmarkButton', this.onFaultsUnmarkButtonClick);
  }

  static initializePopulationsFiltersTabButtons() {
    this.initializeFilterButton('populationsFilterButton', this.onPopulationsFilterButtonClick);
    this.initializeDuplicateButton('populationsDuplicateButton', this.onPopulationsDuplicateButton);
    this.initializeRefreshButton('populationsRefreshButton', this.onPopulationsRefreshButtonClick)
    this.initializeUnmarkButton('populationsUnmarkButton', this.onPopulationsUnmarkButtonClick);
  }

  static initializeSpatialFiltersTabButtons() {
    this.initializeButton('spatialFilterButton', 'SIDE_PANEL_FILTER_ALL_BUTTON', this.onSpatialFilterButtonClick);
    this.initializeButton('spatialDuplicateButton', 'SIDE_PANEL_DUPLICATE_ALL_BUTTON', this.onSpatialDuplicateButton);
    this.initializeButton('spatialRefreshButton', 'SIDE_PANEL_REFRESH_ALL_BUTTON', this.onSpatialRefreshButtonClick);
    this.initializeButton('spatialUnmarkButton', 'SIDE_PANEL_UNMARK_ALL_BUTTON', this.onSpatialUnmarkButtonClick);
  }

  static initializeFilesTabButtons() {
    this.initializeButton('filesTabImportLayerButton', 'SIDE_PANEL_FILES_IMPORT_LAYER_BUTTON_TEXT', this.onImportLayerButton);
    this.initializeButton('filesTabExportCsvButton', 'SIDE_PANEL_FILES_EXPORT_CSV_BUTTON_TEXT', this.onExportCsvButtonClick);
    this.initializeButton('filesTabExportGeojsonButton', 'SIDE_PANEL_FILES_EXPORT_GEOJSON_BUTTON_TEXT', this.onExportGeojsonButtonClick);
  }


  // Funciones de obtención de valores / Value Get functions

  static getFilterInputValue(id) {
    return document.querySelector('#' + id).valueAsNumber;
  }

  static getFilterSelectValue(id) {
    return parseFloat(document.querySelector('#' + id).value);
  }

  static getFilterDateValue(id) {
    return document.querySelector('#' + id).valueAsDate;
  }

  static getInputTextValue(id) {
    return document.querySelector('#' + id).value;
  }

  static getInputFileObject(id) {
    return document.querySelector('#' + id).files[0];
  }

  // Sismos / Quakes

  static getQuakeMinMagnitudeFilter() {
    return this.getFilterInputValue('quakeMinMagnitudeFilterInput');
  }

  static getQuakeMaxMagnitudeFilter() {
    return this.getFilterInputValue('quakeMaxMagnitudeFilterInput');
  }

  static getQuakeMinDepthFilter() {
    return this.getFilterInputValue('quakeMinDepthFilterInput');
  }

  static getQuakeMaxDepthFilter() {
    return this.getFilterInputValue('quakeMaxDepthFilterInput');
  }

  static getQuakeMinIntensityFilter() {
    return this.getFilterSelectValue('quakeMinIntensityFilterInput');
  }

  static getQuakeMaxIntensityFilter() {
    return this.getFilterSelectValue('quakeMaxIntensityFilterInput');
  }

  static getQuakeMinDateFilter() {
    return this.getFilterDateValue('quakeMinDateFilterInput');
  }

  static getQuakeMaxDateFilter() {
    return this.getFilterDateValue('quakeMaxDateFilterInput');
  }

  // Fallas / Faults

  static getFaultMinMagnitudeFilter() {
    return this.getFilterInputValue('faultMinMagnitudeFilterInput');
  }

  static getFaultMaxMagnitudeFilter() {
    return this.getFilterInputValue('faultMaxMagnitudeFilterInput');
  }

  static getFaultMinDepthFilter() {
    return this.getFilterInputValue('faultMinDepthFilterInput');
  }

  static getFaultMaxDepthFilter() {
    return this.getFilterInputValue('faultMaxDepthFilterInput');
  }

  // Poblaciones / Populations

  static getPopulationMinNumberFilter() {
    return this.getFilterInputValue('populationMinNumberFilterInput');
  }

  static getPopulationMaxNumberFilter() {
    return this.getFilterInputValue('populationMaxNumberFilterInput');
  }

  // Espacial / Spatial

  static getSpatialLatitudeFilter() {
    return this.getFilterInputValue('spatialLatitudeFilterInput');
  }

  static getSpatialLongitudeFilter() {
    return this.getFilterInputValue('spatialLongitudeFilterInput');
  }

  static getSpatialRadiusFilter() {
    return this.getFilterInputValue('spatialRadiusFilterInput');
  }

  // Archivos

  static getFilesTabImportLayerName() {
    return document.querySelector('#filesTabImportLayerNameInput').value;
  }

  static getFilesTabImportLayerFile() {
    return this.getInputFileObject('filesTabImportLayerFileInput');
  }

  static getFilesTabExportName() {
    const value = document.querySelector('#filesTabExportNameInput').value;
    return value ? value : DEFAULT_EXPORT_NAME;
  }

  static getFilesTabExportLayerType() {
    return document.querySelector('#filesTabExportLayerSelect').value;
  }

  static getFiltesTabExportLayerName() {
    let text = "";
    const element = document.querySelector('#filesTabExportLayerSelect');
    const index = element.options.selectedIndex;
    const option = element.options[index];
    if (option) {
      text = option.label;
    }
    return text;
  }

  static isFilesTabExportOnlyVisibleBounds() {
    return document.querySelector('#filesTabExportOnlyVisibleBoundsCheckbox').checked;
  }

  // Opciones

  static getOptionsQuakesBorderColor() {
    return document.querySelector('#optionsTabQuakesBorderColorInput').value;
  }

  static getOptionsQuakesFillColor() {
    return document.querySelector('#optionsTabQuakesFillColorInput').value;
  }

  static getOptionsQuakesMinDepthColor() {
    return document.querySelector('#optionsTabQuakesMinDepthColorInput').value;
  }

  static getOptionsQuakesMaxDepthColor() {
    return document.querySelector('#optionsTabQuakesMaxDepthColorInput').value;
  }

  static getOptionsFaultsBorderColor() {
    return document.querySelector('#optionsTabFaultsBorderColorInput').value;
  }

  static getOptionsPopulationsBorderColor() {
    return document.querySelector('#optionsTabPopulationsBorderColorInput').value;
  }

  static getOptionsPopulationsFillColor() {
    return document.querySelector('#optionsTabPopulationsFillColorInput').value;
  }

  static getOptionsPopulationsMinNumberColor() {
    return document.querySelector('#optionsTabPopulationsMinNumberColorInput').value;
  }

  static getOptionsPopulationsMaxNumberColor() {
    return document.querySelector('#optionsTabPopulationsMaxNumberColorInput').value;
  }

  static getOptionsIntensitiesBorderColor() {
    return document.querySelector('#optionsTabIntensitiesBorderColorInput').value;
  }

  static getOptionsRegionsBorderColor() {
    return document.querySelector('#optionsTabRegionsBorderColorInput').value;
  }

  static getOptionsProvincesBorderColor() {
    return document.querySelector('#optionsTabProvincesBorderColorInput').value;
  }

  static getOptionsTerritorialLimitBorderColor() {
    return document.querySelector('#optionsTabTerritorialLimitBorderColorInput').value;
  }

  static getOptionsFilterCircleBorderColor() {
    return document.querySelector('#optionsTabFilterCircleBorderColorInput').value;
  }

  static getOptionsFilterCircleFillColor() {
    return document.querySelector('#optionsTabFilterCircleFillColorInput').value;
  }

  static getOptionsImportedLayerBorderColor() {
    return document.querySelector('#optionsTabImportedLayerBorderColorInput').value;
  }

  static getOptionsImportedLayerFillColor() {
    return document.querySelector('#optionsTabImportedLayerFillColorInput').value;
  }

  static getOptionsMarkedColor() {
    return document.querySelector('#optionsTabMarkedColorInput').value;
  }

  // Funciones de asignación de valores / Value set functions

  static setFilterValue(id, value, precision) {
    let i, element, newValue;
    const array = document.querySelectorAll('#' + id);
    newValue = precision ? value.toFixed(precision) : value;
    newValue = parseFloat(newValue);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.value = newValue;
    }
  }

  static setFilterDate(id, date) {
    let i, element;
    const array = document.querySelectorAll('#' + id);
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.valueAsDate = date;
    }
  }

  // Sismos / Quakes

  static setQuakeMinMagnitudeFilter(value) {
    this.setFilterValue('quakeMinMagnitudeFilterInput', value, 2);
  }

  static setQuakeMaxMagnitudeFilter(value) {
    this.setFilterValue('quakeMaxMagnitudeFilterInput', value, 2);
  }

  static setQuakeMinIntensityFilter(value) {
    this.setFilterValue('quakeMinIntensityFilterInput', value);
  }

  static setQuakeMaxIntensityFilter(value) {
    this.setFilterValue('quakeMaxIntensityFilterInput', value);
  }

  static setQuakeMinDepthFilter(value) {
    this.setFilterValue('quakeMinDepthFilterInput', value, 3);
  }

  static setQuakeMaxDepthFilter(value) {
    this.setFilterValue('quakeMaxDepthFilterInput', value, 3);
  }

  static setQuakeMinDateFilter(date) {
    this.setFilterDate('quakeMinDateFilterInput', date);
  }

  static setQuakeMaxDateFilter(date) {
    this.setFilterDate('quakeMaxDateFilterInput', date);
  }

  // Fallas / Faults

  static setFaultMinMagnitudeFilter(value) {
    this.setFilterValue('faultMinMagnitudeFilterInput', value, 2);
  }

  static setFaultMaxMagnitudeFilter(value) {
    this.setFilterValue('faultMaxMagnitudeFilterInput', value, 2);
  }

  static setFaultMinDepthFilter(value) {
    this.setFilterValue('faultMinDepthFilterInput', value, 3);
  }

  static setFaultMaxDepthFilter(value) {
    this.setFilterValue('faultMaxDepthFilterInput', value, 3);
  }

  // Poblaciones / Populations

  static setPopulationMinNumberFilter(value) {
    this.setFilterValue('populationMinNumberFilterInput', value, 0);
  }

  static setPopulationMaxNumberFilter(value) {
    this.setFilterValue('populationMaxNumberFilterInput', value, 0);
  }

  // Espacial / Spatial

  static setSpatialLatitudeFilter(value) {
    this.setFilterValue('spatialLatitudeFilterInput', value, 4);
  }

  static setSpatialLongitudeFilter(value) {
    this.setFilterValue('spatialLongitudeFilterInput', value, 4);
  }

  static setSpatialRadiusFilter(value) {
    this.setFilterValue('spatialRadiusFilterInput', value, 3);
  }

  // Archivos / Files

  static setFilesTabImportLayerName(text) {
    document.querySelector('#filesTabImportLayerNameInput').value = text;
  }

  static setFilesTabExportName(text) {
    document.querySelector('#filesTabExportNameInput').value = text;
  }

  // Funciones de escucha de ventos / Event listener functions

  // Sismos / Quakes

  static onQuakeMinMagnitudeChange() {
    let value = this.valueAsNumber;
    const maxValue = SidePanelFunctions.getQuakeMaxMagnitudeFilter();
    if (value > maxValue) SidePanelFunctions.setQuakeMaxMagnitudeFilter(value);
  }

  static onQuakeMinMagnitudeBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < QUAKES_MIN_MAGNITUDE) {
      value = QUAKES_MIN_MAGNITUDE;
    } else if (value > QUAKES_MAX_MAGNITUDE) {
      value = QUAKES_MAX_MAGNITUDE;
      SidePanelFunctions.setQuakeMaxMagnitudeFilter(value);
    }
    SidePanelFunctions.setQuakeMinMagnitudeFilter(value);
  }

  static onQuakeMaxMagnitudeChange() {
    let value = this.valueAsNumber;
    const minValue = SidePanelFunctions.getQuakeMinMagnitudeFilter();
    if (value < minValue) SidePanelFunctions.setQuakeMinMagnitudeFilter(value);
  }

  static onQuakeMaxMagnitudeBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < QUAKES_MIN_MAGNITUDE) {
      value = QUAKES_MIN_MAGNITUDE;
      SidePanelFunctions.setQuakeMinMagnitudeFilter(value);
    } else if (value > QUAKES_MAX_MAGNITUDE) {
      value = QUAKES_MAX_MAGNITUDE;
    }
    SidePanelFunctions.setQuakeMaxMagnitudeFilter(value);
  }

  static onQuakeMinDepthChange() {
    let value = this.valueAsNumber;
    const maxValue = SidePanelFunctions.getQuakeMaxDepthFilter();
    if (value > maxValue) SidePanelFunctions.setQuakeMaxDepthFilter(value);
  }

  static onQuakeMinDepthBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < QUAKES_MIN_DEPTH) {
      value = QUAKES_MIN_DEPTH;
    } else if (value > QUAKES_MAX_DEPTH) {
      value = QUAKES_MAX_DEPTH;
      SidePanelFunctions.setQuakeMaxDepthFilter(value);
    }
    SidePanelFunctions.setQuakeMinDepthFilter(value);
  }

  static onQuakeMaxDepthChange() {
    let value = this.valueAsNumber;
    const minValue = SidePanelFunctions.getQuakeMinDepthFilter();
    if (value < minValue) SidePanelFunctions.setQuakeMinDepthFilter(value);
  }

  static onQuakeMaxDepthBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < QUAKES_MIN_DEPTH) {
      value = QUAKES_MIN_DEPTH;
      SidePanelFunctions.setQuakeMinDepthFilter(value);
    } else if (value > QUAKES_MAX_DEPTH) {
      value = QUAKES_MAX_DEPTH;
    }
    SidePanelFunctions.setQuakeMaxDepthFilter(value);
  }

  static onQuakeMinIntensityChange() {
    const value = this.value;
    const maxValue = SidePanelFunctions.getQuakeMaxIntensityFilter();
    SidePanelFunctions.setQuakeMinIntensityFilter(value);
    if (value > maxValue) SidePanelFunctions.setQuakeMaxIntensityFilter(value);
  }

  static onQuakeMaxIntensityChange() {
    const value = this.value;
    const minValue = SidePanelFunctions.getQuakeMinIntensityFilter();
    SidePanelFunctions.setQuakeMaxIntensityFilter(value);
    if (value < minValue) SidePanelFunctions.setQuakeMinIntensityFilter(value);
  }

  static onQuakeMinDateBlur() {
    let date = this.valueAsDate;
    const maxDate = SidePanelFunctions.getQuakeMaxDateFilter();
    if (date < QUAKES_MIN_DATE || date === null) {
      date = QUAKES_MIN_DATE;
    } else if (date > QUAKES_MAX_DATE) {
      date = QUAKES_MAX_DATE;
    }
    SidePanelFunctions.setQuakeMinDateFilter(date);
    if (date > maxDate) SidePanelFunctions.setQuakeMaxDateFilter(date);
  }

  static onQuakeMaxDateBlur() {
    let date = this.valueAsDate;
    const minDate = SidePanelFunctions.getQuakeMinDateFilter();
    if (date > QUAKES_MAX_DATE || date === null) {
      date = QUAKES_MAX_DATE;
    } else if (date < QUAKES_MIN_DATE) {
      date = QUAKES_MIN_DATE;
    }
    SidePanelFunctions.setQuakeMaxDateFilter(date);
    if (date < minDate) SidePanelFunctions.setQuakeMinDateFilter(date);
  }

  // Fallas / Faults

  static onFaultMinMagnitudeChange() {
    let value = this.valueAsNumber;
    const maxValue = SidePanelFunctions.getFaultMaxMagnitudeFilter();
    if (value > maxValue) SidePanelFunctions.setFaultMaxMagnitudeFilter(value);
  }

  static onFaultMinMagnitudeBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < FAULTS_MIN_MAGNITUDE) {
      value = FAULTS_MIN_MAGNITUDE;
    } else if (value > FAULTS_MAX_MAGNITUDE) {
      value = FAULTS_MAX_MAGNITUDE;
      SidePanelFunctions.setFaultMaxMagnitudeFilter(value);
    }
    SidePanelFunctions.setFaultMinMagnitudeFilter(value);
  }

  static onFaultMaxMagnitudeChange() {
    let value = this.valueAsNumber;
    const minValue = SidePanelFunctions.getFaultMinMagnitudeFilter();
    if (value < minValue) SidePanelFunctions.setFaultMinMagnitudeFilter(value);
  }

  static onFaultMaxMagnitudeBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < FAULTS_MIN_MAGNITUDE) {
      value = FAULTS_MIN_MAGNITUDE;
      SidePanelFunctions.setFaultMinMagnitudeFilter(value);
    } else if (value > FAULTS_MAX_MAGNITUDE) {
      value = FAULTS_MAX_MAGNITUDE;
    }
    SidePanelFunctions.setFaultMaxMagnitudeFilter(value);
  }

  static onFaultMinDepthChange() {
    let value = this.valueAsNumber;
    const maxValue = SidePanelFunctions.getFaultMaxDepthFilter();
    if (value > maxValue) SidePanelFunctions.setFaultMaxDepthFilter(value);
  }

  static onFaultMinDepthBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < FAULTS_MIN_DEPTH) {
      value = FAULTS_MIN_DEPTH;
    } else if (value > FAULTS_MAX_DEPTH) {
      value = FAULTS_MAX_DEPTH;
      SidePanelFunctions.setFaultMaxDepthFilter(value);
    }
    SidePanelFunctions.setFaultMinDepthFilter(value);
  }

  static onFaultMaxDepthChange() {
    let value = this.valueAsNumber;
    const minValue = SidePanelFunctions.getFaultMinDepthFilter();
    if (value < minValue) SidePanelFunctions.setFaultMinDepthFilter(value);
  }

  static onFaultMaxDepthBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < FAULTS_MIN_DEPTH) {
      value = FAULTS_MIN_DEPTH;
      SidePanelFunctions.setFaultMinDepthFilter(value);
    } else if (value > FAULTS_MAX_DEPTH) {
      value = FAULTS_MAX_DEPTH;
    }
    SidePanelFunctions.setFaultMaxDepthFilter(value);
  }

  // Poblaciones / Populations

  static onPopulationMinNumberChange() {
    let value = this.valueAsNumber;
    const maxValue = SidePanelFunctions.getPopulationMaxNumberFilter();
    if (value > maxValue) SidePanelFunctions.setPopulationMaxNumberFilter(value);
  }

  static onPopulationMinNumberBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < POPULATIONS_MIN_NUMBER) {
      value = POPULATIONS_MIN_NUMBER;
    } else if (value > POPULATIONS_MAX_NUMBER) {
      value = POPULATIONS_MAX_NUMBER;
      SidePanelFunctions.setPopulationMaxNumberFilter(value);
    }
    SidePanelFunctions.setPopulationMinNumberFilter(value);
  }

  static onPopulationMaxNumberChange() {
    let value = this.valueAsNumber;
    const minValue = SidePanelFunctions.getPopulationMinNumberFilter();
    if (value < minValue) SidePanelFunctions.setPopulationMinNumberFilter(value);
  }

  static onPopulationMaxNumberBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value) || value < POPULATIONS_MIN_NUMBER) {
      value = POPULATIONS_MIN_NUMBER;
      SidePanelFunctions.setPopulationMinNumberFilter(value);
    } else if (value > POPULATIONS_MAX_NUMBER) {
      value = POPULATIONS_MAX_NUMBER;
    }
    SidePanelFunctions.setPopulationMaxNumberFilter(value);
  }

  // Espacial / Spatial

  static onSpatialLatitudeChange() {
    let value = this.valueAsNumber;
    if (!Number.isNaN(value)) {
      value = MiscFunctions.clamp(value, -90, 90);
      SidePanelFunctions.setSpatialLatitudeFilter(value);
      GeneralFunctions.finishDraw();
    }
  }

  static onSpatialLatitudeBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value)) {
      value = INITIAL_LATITUDE;
      SidePanelFunctions.setSpatialLatitudeFilter(value);
      GeneralFunctions.finishDraw();
    }
  }

  static onSpatialLongitudeChange() {
    let value = this.valueAsNumber;
    if (!Number.isNaN(value)) {
      value = MiscFunctions.clamp(this.valueAsNumber, -180, 180);
      SidePanelFunctions.setSpatialLongitudeFilter(value);
      GeneralFunctions.finishDraw();
    }
  }

  static onSpatialLongitudeBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value)) {
      value = INITIAL_LONGITUDE;
      SidePanelFunctions.setSpatialLongitudeFilter(value);
      GeneralFunctions.finishDraw();
    }
  }

  static onSpatialRadiusChange() {
    // Valor en km
    // Value in km
    let value = this.valueAsNumber;
    if (!Number.isNaN(value)) {
      value = MiscFunctions.clamp(this. valueAsNumber, MIN_RADIUS, MAX_RADIUS);
      SidePanelFunctions.setSpatialRadiusFilter(value);
      GeneralFunctions.finishDraw();
    }
  }

  static onSpatialRadiusBlur() {
    let value = this.valueAsNumber;
    if (Number.isNaN(value)) {
      value = MIN_RADIUS;
      SidePanelFunctions.setSpatialRadiusFilter(value);
      GeneralFunctions.finishDraw();
    }
  }

  static onSpatialRadiusFixedClick() {
    let i, element;
    const array = document.querySelectorAll('#spatialFiltersFixedRadiusCheckbox');
    spatialRadiusFixed = !spatialRadiusFixed;
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.checked = spatialRadiusFixed;
    }
  }

  static onSpatialInsideTerritorialLimitClick() {
    let i, element;
    const array = document.querySelectorAll('#spatialFiltersInsideTerritorialLimitCheckbox');
    insideTerritorialLimit = !insideTerritorialLimit;
    for (i = 0; i < array.length; i++) {
      element = array[i];
      element.checked = insideTerritorialLimit;
    }
  }

  // Botones / Buttons

  // Filtrar / Filter

  static onAllFilterButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeAllRegularLayers();
    LayerFunctions.addQuakesLayer(SidePanelFunctions.getQuakeFilters());
    LayerFunctions.addFaultsLayer(SidePanelFunctions.getFaultFilters());
    LayerFunctions.addPopulationsLayer(SidePanelFunctions.getPopulationFilters());
    LayerFunctions.addIntensitiesLayer();
    LayerFunctions.hideIntensitiesLayer();
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showFilterAllWindow();
    SidePanelFunctions.setFilterLegendAllRegularLayersFilters();
  }

  static onQuakesFilterButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeQuakesLayer();
    LayerFunctions.addQuakesLayer(SidePanelFunctions.getQuakeFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showFilterQuakesWindow();
    SidePanelFunctions.setFilterLegendQuakesFilters();
  }

  static onFaultsFilterButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeFaultsLayer();
    LayerFunctions.addFaultsLayer(SidePanelFunctions.getFaultFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showFilterFaultsWindow();
    SidePanelFunctions.setFilterLegendFaultsFilters();
  }

  static onPopulationsFilterButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removePopulationsLayer();
    LayerFunctions.addPopulationsLayer(SidePanelFunctions.getPopulationFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showFilterPopulationsWindow();
    SidePanelFunctions.setFilterLegendPopulationsFilters();
  }

  static onSpatialFilterButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeAllRegularLayers();
    LayerFunctions.addQuakesLayer(SidePanelFunctions.getSpatialFilters());
    LayerFunctions.addFaultsLayer(SidePanelFunctions.getSpatialFilters());
    LayerFunctions.addPopulationsLayer(SidePanelFunctions.getSpatialFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showFilterAllWindow();
    SidePanelFunctions.setFilterLegendAllRegularLayersFilters();
  }

  // Duplicar y filtrar / Duplicate and filter

  static onAllDuplicateButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeAllDuplicatedLayers();
    LayerFunctions.addDuplicatedQuakesLayer(SidePanelFunctions.getQuakeFilters());
    LayerFunctions.addDuplicatedFaultsLayer(SidePanelFunctions.getFaultFilters());
    LayerFunctions.addDuplicatedPopulationsLayer(SidePanelFunctions.getPopulationFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    SidePanelFunctions.initializeExportLayerSelect();
    WindowFunctions.showDuplicateAllWindow();
    SidePanelFunctions.setFilterLegendAllDuplicatedLayersFilters();
  }

  static onQuakesDuplicateButtonClick() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeDuplicatedQuakesLayer();
    LayerFunctions.addDuplicatedQuakesLayer(SidePanelFunctions.getQuakeFilters());
    SidePanelFunctions.initializeExportLayerSelect();
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showDuplicateQuakesWindow();
    SidePanelFunctions.setFilterLegendDuplicatedQuakesFilters();
  }

  static onFaultsDuplicateButton() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeDuplicatedFaultsLayer();
    LayerFunctions.addDuplicatedFaultsLayer(SidePanelFunctions.getFaultFilters());
    SidePanelFunctions.initializeExportLayerSelect();
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showDuplicateFaultsWindow();
    SidePanelFunctions.setFilterLegendDuplicatedFaultsFilters();
  }

  static onPopulationsDuplicateButton() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeDuplicatedPopulationsLayer();
    LayerFunctions.addDuplicatedPopulationsLayer(SidePanelFunctions.getPopulationFilters());
    SidePanelFunctions.initializeExportLayerSelect();
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showDuplicatePopulationsWindow();
    SidePanelFunctions.setFilterLegendDuplicatedPopulationsFilters();
  }

  static onSpatialDuplicateButton() {
    LayerFunctions.hideAllLayers();
    LayerFunctions.removeAllDuplicatedLayers();
    LayerFunctions.addDuplicatedQuakesLayer(SidePanelFunctions.getSpatialFilters());
    LayerFunctions.addDuplicatedFaultsLayer(SidePanelFunctions.getSpatialFilters());
    LayerFunctions.addDuplicatedPopulationsLayer(SidePanelFunctions.getSpatialFilters());
    SidePanelFunctions.initializeExportLayerSelect();
    LayerFunctions.reorderOverlayLayersInControl();
    WindowFunctions.showDuplicateAllWindow();
    SidePanelFunctions.setFilterLegendAllDuplicatedLayersFilters();
  }

  // Limpiar / Refresh

  static onAllRefreshButtonClick() {
    SidePanelFunctions.initializeQuakeFiltersInputs();
    SidePanelFunctions.initializeFaultFiltersInputs();
    SidePanelFunctions.initializePopulationFiltersInputs();
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removeAllLayers();
    LayerFunctions.removeFilterBufferLayer();
    LayerFunctions.addQuakesLayer(SidePanelFunctions.getQuakeFilters());
    LayerFunctions.addFaultsLayer(SidePanelFunctions.getFaultFilters());
    LayerFunctions.addPopulationsLayer(SidePanelFunctions.getPopulationFilters());
    LayerFunctions.addIntensitiesLayer();
    LayerFunctions.hideIntensitiesLayer();
    LayerFunctions.reorderOverlayLayersInControl();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    WindowFunctions.showRefreshAllWindow();
    SidePanelFunctions.setFilterLegendAllLayersFilters();
  }

  static onQuakesRefreshButtonClick() {
    SidePanelFunctions.initializeQuakeFiltersInputs();
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removeQuakesLayer();
    LayerFunctions.removeDuplicatedQuakesLayer();
    LayerFunctions.addQuakesLayer(SidePanelFunctions.getQuakeFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    WindowFunctions.showRefreshQuakesWindow();
    SidePanelFunctions.setFilterLegendQuakesFilters();
    SidePanelFunctions.setFilterLegendDuplicatedQuakesFilters();
  }

  static onFaultsRefreshButtonClick() {
    SidePanelFunctions.initializeFaultFiltersInputs();
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removeFaultsLayer();
    LayerFunctions.removeDuplicatedFaultsLayer();
    LayerFunctions.addFaultsLayer(SidePanelFunctions.getFaultFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    LayerFunctions.removeFilterBufferLayer();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    WindowFunctions.showRefreshFaultsWindow();
    SidePanelFunctions.setFilterLegendFaultsFilters();
    SidePanelFunctions.setFilterLegendDuplicatedFaultsFilters();
  }

  static onPopulationsRefreshButtonClick() {
    SidePanelFunctions.initializePopulationFiltersInputs();
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removePopulationsLayer();
    LayerFunctions.removeDuplicatedPopulationsLayer();
    LayerFunctions.addPopulationsLayer(SidePanelFunctions.getPopulationFilters());
    LayerFunctions.reorderOverlayLayersInControl();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    WindowFunctions.showRefreshPopulationsWindow();
    SidePanelFunctions.setFilterLegendPopulationsFilters();
    SidePanelFunctions.setFilterLegendDuplicatedPopulationsFilters();
  }

  static onSpatialRefreshButtonClick() {
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removeAllLayers();
    LayerFunctions.removeFilterBufferLayer();
    LayerFunctions.addQuakesLayer(GeneralFunctions.getQuakeInitialFilters());
    LayerFunctions.addFaultsLayer();
    LayerFunctions.reorderOverlayLayersInControl();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    WindowFunctions.showRefreshAllWindow();
    SidePanelFunctions.setFilterLegendAllLayersFilters();
  }

  // Desmarcar / Unmark

  static onAllUnmarkButtonClick() {
    LayerFunctions.hideAllLayers(); 
    WindowFunctions.showUnmarkAllWindow();
  }

  static onQuakesUnmarkButtonClick() {
    LayerFunctions.hideQuakesLayer();
    if (duplicatedQuakesLayer) LayerFunctions.hideDuplicatedQuakesLayer();
    WindowFunctions.showUnmarkQuakesWindow();
  }

  static onFaultsUnmarkButtonClick() {
    LayerFunctions.hideFaultsLayer();
    if (duplicatedFaultsLayer) LayerFunctions.hideDuplicatedFaultsLayer();
    WindowFunctions.showUnmarkFaultsWindow();
  }

  static onPopulationsUnmarkButtonClick() {
    LayerFunctions.hidePopulationsLayer();
    if (duplicatedPopulationsLayer) LayerFunctions.hideDuplicatedPopulationsLayer();
    WindowFunctions.showUnmarkPopulationsWindow();
  }

  static onSpatialUnmarkButtonClick() {
    LayerFunctions.hideAllLayers();
    WindowFunctions.showUnmarkAllWindow();
  }   

  // Pestaña de archivos / Files tab

  static onImportLayerInputChange() {
    const file = SidePanelFunctions.getFilesTabImportLayerFile();
    const filename = file.name;
    if (filename.endsWith(".geojson")) {
      FileFunctions.readFile(file);
    }
  }

  static onImportLayerName() {
    let text = SidePanelFunctions.getFilesTabImportLayerName();
    if (text.length > MAX_FILE_NAME) {
      SidePanelFunctions.setFilesTabImportLayerName(text.substring(0, MAX_FILE_NAME));
    }
  }

  static onImportLayerButton() {
    const file = SidePanelFunctions.getFilesTabImportLayerFile();
    const filename = file.name;
    let name = filename.substring(0, filename.length - 8);
    if (SidePanelFunctions.getFilesTabImportLayerName()) {
      name = SidePanelFunctions.getFilesTabImportLayerName();
    }
    FileFunctions.importLayer(name);
    WindowFunctions.showImportLayerWindow(name);
  }

  static onExportNameChange() {
    let text = SidePanelFunctions.getFilesTabExportName();
    if (!text) text = DEFAULT_EXPORT_NAME;
    if (text.length > MAX_FILE_NAME) {
      SidePanelFunctions.setFilesTabExportName(text.substring(0, MAX_FILE_NAME));
    }
  }

  static onExportCsvButtonClick() {
    const type = SidePanelFunctions.getFilesTabExportLayerType();
    const layer = LayerFunctions.getLayerByKeyName(type);
    const newLayer = SidePanelFunctions.isFilesTabExportOnlyVisibleBounds() ? FileFunctions.getBoundsLayer(layer, map.getBounds()) : layer;
    const name = SidePanelFunctions.getFilesTabExportName();
    const text = FileFunctions.getCsvFile(newLayer);
    FileFunctions.exportFile(text, name, 'csv');
    WindowFunctions.showExportLayerWindow(SidePanelFunctions.getFiltesTabExportLayerName());
  }

  static onExportGeojsonButtonClick() {
    const type = SidePanelFunctions.getFilesTabExportLayerType();
    const layer = LayerFunctions.getLayerByKeyName(type);
    const newLayer = SidePanelFunctions.isFilesTabExportOnlyVisibleBounds() ? FileFunctions.getBoundsLayer(layer, map.getBounds()) : layer;
    const name = SidePanelFunctions.getFilesTabExportName();
    const text = FileFunctions.getGeojsonFile(newLayer);
    FileFunctions.exportFile(text, name, 'geojson');
    WindowFunctions.showExportLayerWindow(SidePanelFunctions.getFiltesTabExportLayerName());
  }

  // Pestaña de opciones / Options tab

  static onLangageSelectChange() {
    const value = document.querySelector('#optionsTabLangageInput').value;
    langage = value;
    SidePanelFunctions.setTexts();
    SidePanelFunctions.initializeButtons();
    LangageFunctions.updateContextMenuTexts();
    LangageFunctions.updateLayersTexts();
    if (eventLegendControl) eventLegendControl.update();
    if (filterLegendControl) filterLegendControl.update();
    if (coordinatesVisorControl) coordinatesVisorControl.update();
  }

  static onControlLayerAllwaysDeployedClick() {
    GeneralFunctions.toogleLayerControlCollpase();
  }

  static onScalebarControlVisibleClick() {
    GeneralFunctions.toogleControlVisibility(scalebarControl);
  }

  static onCoordinateVisorVisibleClick() {
    GeneralFunctions.toogleControlVisibility(coordinatesVisorControl);
  }

  static onFilterLegendControlVisibleClick() {
    GeneralFunctions.toogleControlVisibility(filterLegendControl);
  }

  static onEventLegendControlVisibleClick() {
    GeneralFunctions.toogleControlVisibility(eventLegendControl);
  }

  static onOptionsQuakesBorderColorChange() {
    const value = SidePanelFunctions.getOptionsQuakesBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('quakeBorderColor', value);
    quakesLayer.setStyle(style);
    if (duplicatedQuakesLayer) duplicatedQuakesLayer.setStyle(style);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsQuakesFillColorChange() {
    const value = SidePanelFunctions.getOptionsQuakesFillColor();
    const style = {fillColor: value};
    StyleFunctions.setValue('quakeFillColor', value);
    quakesLayer.setStyle(style);
    if (duplicatedQuakesLayer) duplicatedQuakesLayer.setStyle(style);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsQuakesMinDepthColorChange() {
    const value = SidePanelFunctions.getOptionsQuakesMinDepthColor();
    StyleFunctions.setValue('quakeMinDepthColor', value);
    StyleFunctions.updateQuakesLayerFillColor(quakesLayer);
    if (duplicatedQuakesLayer) StyleFunctions.updateQuakesLayerFillColor(duplicatedQuakesLayer);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsQuakesMaxDepthColorChange() {
    const value = SidePanelFunctions.getOptionsQuakesMaxDepthColor();
    StyleFunctions.setValue('quakeMaxDepthColor', value);
    StyleFunctions.updateQuakesLayerFillColor(quakesLayer);
    if (duplicatedQuakesLayer) StyleFunctions.updateQuakesLayerFillColor(duplicatedQuakesLayer);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsFaultsBorderColorChange() {
    const value = SidePanelFunctions.getOptionsFaultsBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('faultColor', value);
    faultsLayer.setStyle(style);
    if (duplicatedFaultsLayer) duplicatedFaultsLayer.setStyle(style);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsPopulationsBorderColorChange() {
    const value = SidePanelFunctions.getOptionsPopulationsBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('populationBorderColor', value);
    populationsLayer.setStyle(style);
    if (duplicatedPopulationsLayer) duplicatedPopulationsLayer.setStyle(style);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsPopulationsFillColorChange() {
    const value = SidePanelFunctions.getOptionsPopulationsFillColor();
    const style = {fillColor: value};
    StyleFunctions.setValue('populationFillColor', value);
    populationsLayer.setStyle(style);
    if (duplicatedPopulationsLayer) duplicatedPopulationsLayer.setStyle(style);
    if (eventLegendControl) eventLegendControl.update();
  }

  static onOptionsIntensitiesBorderColorChange() {
    const value = SidePanelFunctions.getOptionsIntensitiesBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('intensityBorderColor', value);
    intensitiesLayer.setStyle(style);
  }

  static onOptionsRegionsBorderColorChange() {
    const value = SidePanelFunctions.getOptionsRegionsBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('regionBorderColor', value);
    regionsLayer.setStyle(style);
  }

  static onOptionsProvincesBorderColorChange() {
    const value = SidePanelFunctions.getOptionsProvincesBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('provinceBorderColor', value);
    provincesLayer.setStyle(style);
  }

  static onOptionsTerritorialLimitBorderColorChange() {
    const value = SidePanelFunctions.getOptionsTerritorialLimitBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('territorialLimitBorderColor', value);
    territorialLimitLayer.setStyle(style);
  }

  static onOptionsFilterCircleBorderColorChange() {
    const value = SidePanelFunctions.getOptionsFilterCircleBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('filterCircleBorderColor', value);
    if (filterCircle) {
      filterCircle.setStyle(style);
    }
    if (filterCircleOrigin) {
      filterCircleOrigin.setStyle(style);
    }
  }

  static onOptionsFilterCircleFillColorChange() {
    const value = SidePanelFunctions.getOptionsFilterCircleFillColor();
    const style = {fillColor: value};
    StyleFunctions.setValue('filterCircleFillColor', value);
    if (filterCircle) {
      filterCircle.setStyle(style);
    }
    if (filterCircleOrigin) {
      filterCircleOrigin.setStyle(style);
    }
  }

  static onOptionsImportedLayerBorderColorChange() {
    const value = SidePanelFunctions.getOptionsImportedLayerBorderColor();
    const style = {color: value};
    StyleFunctions.setValue('importedLayerBorderColor', value);
    if (importedLayer && importedLayer.setStyle !== undefined) {
      importedLayer.setStyle(style);
    }
  }

  static onOptionsImportedLayerFillColorChange() {
    const value = SidePanelFunctions.getOptionsImportedLayerFillColor();
    const style = {fillColor: value};
    StyleFunctions.setValue('importedLayerFillColor', value);
    if (importedLayer && importedLayer.setStyle !== undefined) {
      importedLayer.setStyle(style);
    }
  }

  static onOptionsMarkedColorChange() {
    const value = SidePanelFunctions.getOptionsMarkedColor();
    StyleFunctions.setValue('markedColor', value);
    LayerFunctions.unmarkAllLayers();
  }

  // Funciones de obtención de filtros / Filters get functions

  static getQuakeFilters() {
   return {
      minMagnitude: this.getQuakeMinMagnitudeFilter(),
      maxMagnitude: this.getQuakeMaxMagnitudeFilter(),
      minIntensity: this.getQuakeMinIntensityFilter(),
      maxIntensity: this.getQuakeMaxIntensityFilter(),
      minDepth: this.getQuakeMinDepthFilter(),
      maxDepth: this.getQuakeMaxDepthFilter(),
      minDate: this.getQuakeMinDateFilter(),
      maxDate: this.getQuakeMaxDateFilter(),
      latitude: this.getSpatialLatitudeFilter(),
      longitude: this.getSpatialLongitudeFilter(),
      radius: this.getSpatialRadiusFilter(),
      insideTerritorialLimit: insideTerritorialLimit
    }
  }

  static getFaultFilters() {
    return {
      minMagnitude: this.getFaultMinMagnitudeFilter(),
      maxMagnitude: this.getFaultMaxMagnitudeFilter(),
      minDepth: this.getFaultMinDepthFilter(),
      maxDepth: this.getFaultMaxDepthFilter(),
      latitude: this.getSpatialLatitudeFilter(),
      longitude: this.getSpatialLongitudeFilter(),
      radius: this.getSpatialRadiusFilter(),
      insideTerritorialLimit: insideTerritorialLimit
    }
  }

  static getPopulationFilters() {
    return {
      minNumber: this.getPopulationMinNumberFilter(),
      maxNumber: this.getPopulationMaxNumberFilter(),
      latitude: this.getSpatialLatitudeFilter(),
      longitude: this.getSpatialLongitudeFilter(),
      radius: this.getSpatialRadiusFilter(),
      insideTerritorialLimit: insideTerritorialLimit
    }
  }

  static getSpatialFilters() {
    return {
      latitude: this.getSpatialLatitudeFilter(),
      longitude: this.getSpatialLongitudeFilter(),
      radius: this.getSpatialRadiusFilter(),
      insideTerritorialLimit: insideTerritorialLimit
    }
  }

  // Funciones de asignación de la leyenda de filtros / Filter legend set functions

  static setFilterLegendAllLayersFilters() {
    this.setFilterLegendAllRegularLayersFilters();
    this.setFilterLegendAllDuplicatedLayersFilters();
  }

  static setFilterLegendAllRegularLayersFilters() {
    this.setFilterLegendQuakesFilters();
    this.setFilterLegendFaultsFilters();
    this.setFilterLegendPopulationsFilters();
  }

  static setFilterLegendAllDuplicatedLayersFilters() {
    this.setFilterLegendDuplicatedQuakesFilters();
    this.setFilterLegendDuplicatedFaultsFilters();
    this.setFilterLegendDuplicatedPopulationsFilters();
  }

  static setFilterLegendQuakesFilters() {
    if (filterLegendControl) {
      filterLegendControl.setValue('minQuakeMag', SidePanelFunctions.getQuakeMinMagnitudeFilter());
      filterLegendControl.setValue('maxQuakeMag', SidePanelFunctions.getQuakeMaxMagnitudeFilter());
      filterLegendControl.setValue('minQuakeDepth', SidePanelFunctions.getQuakeMinDepthFilter());
      filterLegendControl.setValue('maxQuakeDepth', SidePanelFunctions.getQuakeMaxDepthFilter());
      filterLegendControl.setValue('minQuakeInt', SidePanelFunctions.getQuakeMinIntensityFilter());
      filterLegendControl.setValue('maxQuakeInt', SidePanelFunctions.getQuakeMaxIntensityFilter());
      filterLegendControl.setValue('minQuakeDate', SidePanelFunctions.getQuakeMinDateFilter());
      filterLegendControl.setValue('maxQuakeDate', SidePanelFunctions.getQuakeMaxDateFilter());
      filterLegendControl.update();
    }
  }

  static setFilterLegendFaultsFilters() {
    if (filterLegendControl) {
      filterLegendControl.setValue('minFaultMag', SidePanelFunctions.getFaultMinMagnitudeFilter());
      filterLegendControl.setValue('maxFaultMag', SidePanelFunctions.getFaultMaxMagnitudeFilter());
      filterLegendControl.setValue('minFaultDepth', SidePanelFunctions.getFaultMinDepthFilter());
      filterLegendControl.setValue('maxFaultDepth', SidePanelFunctions.getFaultMaxDepthFilter());
      filterLegendControl.update();
    }
  }

  static setFilterLegendPopulationsFilters() {
    if (filterLegendControl) {
      filterLegendControl.setValue('minPopNumber', SidePanelFunctions.getPopulationMinNumberFilter());
      filterLegendControl.setValue('maxPopNumber', SidePanelFunctions.getPopulationMaxNumberFilter());
      filterLegendControl.update();
    }
  }

  static setFilterLegendDuplicatedQuakesFilters() {
    if (filterLegendControl) {
      filterLegendControl.setValue('minDupQuakeMag', SidePanelFunctions.getQuakeMinMagnitudeFilter());
      filterLegendControl.setValue('maxDupQuakeMag', SidePanelFunctions.getQuakeMaxMagnitudeFilter());
      filterLegendControl.setValue('minDupQuakeDepth', SidePanelFunctions.getQuakeMinDepthFilter());
      filterLegendControl.setValue('maxDupQuakeDepth', SidePanelFunctions.getQuakeMaxDepthFilter());
      filterLegendControl.setValue('minDupQuakeInt', SidePanelFunctions.getQuakeMinIntensityFilter());
      filterLegendControl.setValue('maxDupQuakeInt', SidePanelFunctions.getQuakeMaxIntensityFilter());
      filterLegendControl.setValue('minDupQuakeDate', SidePanelFunctions.getQuakeMinDateFilter());
      filterLegendControl.setValue('maxDupQuakeDate', SidePanelFunctions.getQuakeMaxDateFilter());
      filterLegendControl.update();
    }
  }

  static setFilterLegendDuplicatedFaultsFilters() {
    if (filterLegendControl) {
      filterLegendControl.setValue('minDupFaultMag', SidePanelFunctions.getFaultMinMagnitudeFilter());
      filterLegendControl.setValue('maxDupFaultMag', SidePanelFunctions.getFaultMaxMagnitudeFilter());
      filterLegendControl.setValue('minDupFaultDepth', SidePanelFunctions.getFaultMinDepthFilter());
      filterLegendControl.setValue('maxDupFaultDepth', SidePanelFunctions.getFaultMaxDepthFilter());
      filterLegendControl.update();
    }
  }

  static setFilterLegendDuplicatedPopulationsFilters() {
    if (filterLegendControl) {
      filterLegendControl.setValue('minDupPopNumber', SidePanelFunctions.getPopulationMinNumberFilter());
      filterLegendControl.setValue('maxDupPopNumber', SidePanelFunctions.getPopulationMaxNumberFilter());
      filterLegendControl.update();
    }
  }
}