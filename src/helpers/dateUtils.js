/**
 * Convierte una fecha a formato ISO (YYYY-MM-DD), si es necesario.
 * Maneja el caso en que la fecha ya esté en ISO, o si viene en formato DD/MM/YYYY.
 *
 * @param {string | number} d - La fecha de entrada.
 * @returns {string} La fecha en formato YYYY-MM-DD o una cadena vacía.
 */
export const toISODate = (d) => {
  if (!d) return "";
  const dateString = String(d);

  // 1. Ya está en formato ISO (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;

  // 2. Formato DD/MM/YYYY -> YYYY-MM-DD
  const m = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (m) {
    // m[3] = YYYY, m[2] = MM, m[1] = DD
    return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  }

  // 3. Si viene 'YYYY' o algún otro string, devolver tal cual
  return dateString;
};