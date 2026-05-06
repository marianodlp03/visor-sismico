
class DataPreprocessFunctions {

  // Convierte intensidad a número (1-12) desde:
  // - número: 8
  // - string numérico: "8"
  // - romano: "VIII"
  // - con espacios: " VIII "
  // - rangos: "VII-VIII" (usa la media 7,5)
  static intensityToNumber(intensity) {
    if (intensity === null || intensity === undefined) return null;

    // Si ya es número
    if (typeof intensity === "number" && Number.isFinite(intensity)) {
      return this.clampIntensity(intensity);
    }

    // Si es string
    if (typeof intensity === "string") {
      const raw = intensity.trim().toUpperCase();
      if (!raw) return null;

      // Si es numérico: "8"
      const asNumber = Number(raw.replace(",", "."));
      if (Number.isFinite(asNumber)) {
        return this.clampIntensity(asNumber);
      }

      // Si es rango tipo "VII-VIII" o "VII/VIII"
           
      const parts = raw.split(/[-/]/).map(s => s.trim()).filter(Boolean);
      if (parts.length > 1) {
        const vals = parts.map(p => this.romanToInt(p)).filter(v => v !== null);
        if (vals.length) {
          const avg = vals.reduce((a,b) => a + b, 0) / vals.length;   // <-- MEDIA
          // No uses clampIntensity aquí, porque clamp te rechaza decimales? (No, clamp acepta float)
          return this.clampIntensity(avg);
        }
      }



      // Romano simple
      return this.clampIntensity(this.romanToInt(raw));
    }

    return null;
  }

  static clampIntensity(v) {
    if (v === null || v === undefined) return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    if (n < 1 || n > 12) return null;
    return n;
  }

  // Conversor romano básico para I..XII (y un poco más por robustez)
  static romanToInt(roman) {
    if (!roman) return null;
    const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
    let total = 0;
    let prev = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const ch = roman[i];
      const val = map[ch];
      if (!val) return null;

      if (val < prev) total -= val;
      else {
        total += val;
        prev = val;
      }
    }
    return total;
  }

  static isZeroMagnitude(m) {
    if (m === null || m === undefined) return true;
    const n = (typeof m === "string") ? Number(m.replace(",", ".")) : Number(m);
    return !Number.isFinite(n) || n === 0;
  }

  static computeMagnitudeFromIntensity(intensityNumber) {
    return 0.545 * intensityNumber + 1.656;
  }

  // Aplica el cálculo sobre un GeoJSON FeatureCollection
  static applyToQuakesGeoJSON(quakesGeoJSON) {
    if (!quakesGeoJSON || !Array.isArray(quakesGeoJSON.features)) return 0;

    let changed = 0;
    for (const feature of quakesGeoJSON.features) {
      const props = feature?.properties;
      if (!props) continue;

      if (this.isZeroMagnitude(props.magnitud) && props.intensidad !== undefined) {
        const iNum = this.intensityToNumber(props.intensidad);
        if (iNum !== null) {
          const mag = this.computeMagnitudeFromIntensity(iNum);
          // Guarda con decimales razonables (puedes cambiar a más/menos)
          props.magnitud = Number(mag.toFixed(2));
          
          
          // ✅ Marca inequívoca de procedencia
          props.magnitud_origen = "inferida_intensidad";     // o "estimated_intensity"
          

          changed++;
        }
      }
    }
    return changed;
  }
  

}
