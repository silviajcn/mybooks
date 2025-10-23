export const ordinal_numbers = {
  1: 'Primera',
  2: 'Segunda',
  3: 'Tercera',
  4: 'Cuarta',
  5: 'Quinta',
  6: 'Sexta',
  7: 'Séptima',
  8: 'Octava',
  9: 'Novena',
  10: 'Décima',
  11: 'Undécima',
  12: 'Duodécima',
  13: 'Decimotercera',
  14: 'Decimocuarta',
  15: 'Decimoquinta',
  16: 'Decimosexta',
  17: 'Decimoséptima',
  18: 'Decimoctava',
  19: 'Decimonovena',
  20: 'Vigésima',
  30: 'Trigésima',
  40: 'Cuadragésima',
  50: 'Quincuagésima',
  60: 'Sexagésima',
  70: 'Septuagésima',
  80: 'Octogésima',
  90: 'Nonagésima',
  100: 'Centésima',
  200: 'Ducentésima',
  300: 'Tricentésima',
  400: 'Cuadringentésima',
  500: 'Quingentésima',
  600: 'Sexcentésima',
  700: 'Septingentésima',
  800: 'Octingentésima',
  900: 'Noningentésima',
  1000: 'Milésima'
};

/**
 * Genera el número ordinal en español para cualquier número hasta 1000.
 *
 * @param {number} n - El número cardinal (1-1000).
 * @returns {string} La forma ordinal compuesta (ej: "Centésimo nonagésimo noveno").
 */
export function obtenerOrdinal(n) {
  if (n < 1 || n > 1000) {
    return "Número fuera de rango (1-1000)";
  }
  if (ordinal_numbers[n]) {
    return ordinal_numbers[n];
  }

  let resultado = "";

  // 1. Centenas (100 a 999)
  if (n >= 100) {
    const centena = Math.floor(n / 100) * 100;
    resultado += ordinal_numbers[centena] + " ";
    n %= 100;
  }

  // 2. Números del 21 al 99
  if (n >= 21 && n <= 99) {
    const decena = Math.floor(n / 10) * 10;
    const unidad = n % 10;

    resultado += ordinal_numbers[decena] + " ";

    if (unidad > 0) {
      resultado += ordinal_numbers[unidad];
    }
  } 
  // 3. Números del 13 al 19 (tratamiento especial para Undécimo/Duodécimo)
  else if (n >= 13 && n <= 19) {
      resultado += ordinal_numbers[n];
  }

  // 4. Números del 1 al 12
  else if (n >= 1 && n <= 12) {
    resultado += ordinal_numbers[n];
  }

  return resultado.trim();
}