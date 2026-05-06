/*
Este archivo permite configurar los "pop-ups" desplegables que se muestran al hacer click izquierdo sobre un evento
de capa, como sismos, fallas, poblaciones e intensidades máximas.

El archivo contiene una clase con métodos estáticos y cuatro objetos globales que permiten configurar los atributos que 
se muestran en cada capa y como deben mostrarse.

Para mostrar el atributo de cada capa es necesario crear un objeto dentro del objeto correspondiente ("PopupQuakeAttributes"
para eventos de sismos, por ejemplo) con el nombre exacto del atributo. Dentro de dicho objeto se pueden crear las
siguientes propiedades:
  - Una propiededad que permite mostrar el nombre del atributo según el idioma seleccionado. Para ello es necesario
    que el nombre de la propiedad sea exactamente el mismo que la clave del idioma. Pueden crearse tantas propiedades
    de idioma como sean necesarias.
  - Una propiedad llamada "suffix" que permite añadir un sufijo de texto al final del valor del attribute. Se utiliza
    principalmente para indicar la unidad (metros, por ejemplo) del valor del atributo.
  - Una propiedad llamada "precision" con un número entero, que permite mostrar el número máximo de decimales
    del valor numérico del atributo.

This file allows the configuration of the "pop-ups" that are shown when left clicking on a layer event, such as
quakes, faults, populations and maximum intensities.

This file contains a class with static methods and four global objects that allows to configure the attributes of each
layer that will be shown and how to display them.

To show the attribute of each layer it is necessary to create an object inside the matching object ("PopupQuakeAttributes"
for quake events, for example) with the exact name of the attribute. Inside that object the following properties can
be created:
  - A property that shows the name of the attribute depending on the selected langage. To do so, it is mandatory for
    the name of the property to be exactly the same as the langage key. You can create as many properties as necessary.
  - A property called "suffix" to add a text suffix at the end of the attribute value. It used mainly to indicate
    the attribute value unit (like meters).
  - A property named "precision" with an integer that shows the maximum number of decimals of the attribute
    numeric value.
*/

PopupQuakeAttributes = {
  localizacion: {
    spanish: "Localización",
    english: "Location"
  },

  magnitud: {
    spanish: "Magnitud",
    english: "Magnitude",
    precision: 2
  },

  intensidad: {
    spanish: "Intensidad",
    english: "Intensity"
  },

  latitud: {
    spanish: "Latitud",
    english: "Latitude",
    precision: 4,
    suffix: "º"
  },

  longitud: {
    spanish: "Longitud",
    english: "Longitude",
    precision: 4,
    suffix: "º"
  },

  profundidad: {
    spanish: "Profundidad",
    english: "Depth",
    precision: 3,
    suffix: "km"
  },

  fecha: {
    spanish: "Fecha",
    english: "Date"
  }
}

PopupFaultAttributes = {
  ID: {
    spanish: "ID",
    english: "ID"
  },

  FaultName: {
    spanish: "Nombre",
    english: "Name"
  },

  MaxMagnitu: {
    spanish: "Magnitud máxima",
    english: "Maximum magnitude",
    precision: 2
  }
}

PopupPopulationAttributes = {
  nombre: {
    spanish: "Nombre",
    english: "Name"
  },

  habitantes: {
    spanish: "Número de habitantes",
    english: "Number of habitants"
  }
}

PopupIntensityAttributes = {
  intensidadR: {
    spanish: "Intensidad",
    english: "Intensity"
  }
}

class PopupFunctions {
  static textFormat = "<b> %1:</b> %2%3";

  static getText(obj, feature) {
    const featureProps = feature.properties;
    const format = this.getTextFormat();
    let attribute, value, name, precision, suffix;
    let text = "";
    let counter = 0;

    let hasEstimatedMagnitude = false;

    for (const attributeName in obj) {
      attribute = obj[attributeName];
      value = featureProps[attributeName];
      if (value !== undefined) {
        if (counter > 0) text += "<br>";
        name = this.getAttributeName(attribute);
        precision = this.getAttributePrecision(attribute);
        suffix = this.getAttributeSuffix(attribute);
        if (!suffix) suffix = "";
        if (typeof value === 'number') {
          value = String(this.getPreciseValue(value, precision));
        } else if (typeof value === 'string' && !value.trim()) {
          value = LangageFunctions.getText('POPUP_UNKNOWN_TEXT');
        }
        
        const isEstimated =
          (attributeName === "magnitud") &&
          (
            featureProps.magnitud_origen === "inferida_intensidad" ||
            !!featureProps.magnitud_inferida
          );

        if (isEstimated) {
          value = value + "*";
          hasEstimatedMagnitude = true;
        }

        text += MiscFunctions.format(format, name, value, suffix);
        }

        counter++;
      }

      
      if (hasEstimatedMagnitude) {
        const lang = LangageFunctions.getLangage();
        const note = (lang === "spanish") ? "* Estimado" : "* Estimated";
        text += "<br><small>" + note + "</small>";
      }

      return text;
    }


     
    

  

  static getTextFormat() {
    return this.textFormat;
  }

  static getQuakeAttribute(key) {
    return PopupQuakeAttributes[key];
  }

  static getAttributeName(attribute) {
    const langage = LangageFunctions.getLangage();
    return attribute[langage];
  }

  static getAttributePrecision(attribute) {
    return attribute.precision;
  }

  static getAttributeSuffix(attribute) {
    return attribute.suffix;
  }

  static getPreciseValue(value, precision) {
    if (precision !== undefined) value = value.toFixed(precision);
    return parseFloat(value);
  }
}