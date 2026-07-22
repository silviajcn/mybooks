/**
 * Convierte una fecha a formato local (DD/MM/YYYY).
 * Maneja el caso en que la fecha ya esté en formato DD/MM/YYYY o si viene en formato ISO (YYYY-MM-DD).
 *
 * @param {string | number} d - La fecha de entrada.
 * @returns {string} La fecha en formato DD/MM/YYYY o una cadena vacía.
 */
export const toLocalDateFormat = (d) => {
  if (!d) return "";
  const dateString = String(d);

  // 1. Ya está en formato DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return dateString;

  // 2. Formato ISO (YYYY-MM-DD) -> DD/MM/YYYY
  const m = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    // m[1] = YYYY, m[2] = MM, m[3] = DD
    // Devolvemos en formato DD/MM/YYYY
    return `${m[3].padStart(2, "0")}/${m[2].padStart(2, "0")}/${m[1]}`;
  }

  // 3. Si viene algún otro string (ej: solo el año 'YYYY'), devolver tal cual
  return dateString;
};


/**
 * Retorna la fecha actual en formato "dd/MM/yyyy".
 */
export const getCurrentDateFormatted = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`; // Ejemplo: "25/11/2025"
};