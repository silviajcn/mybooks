export const genresOptions = [
    { id: 1, option: "novela", value: "Novela" },
    { id: 2, option: "poesia", value: "Poesía" },
    { id: 3, option: "diarios", value: "Diarios" },
    { id: 4, option: "cuentos", value: "Cuentos" },
    { id: 5, option: "ensayo", value: "Ensayo" },
    { id: 6, option: "filosofia", value: "Filosofía" },
    { id: 7, option: "autoayuda", value: "Autoayuda" },
    { id: 8, option: "comic", value: "Cómic" },
    { id: 9, option: "teatro", value: "Teatro" },
    { id: 10, option: "biografia", value: "Biografía" },
    { id: 11, option: "miscelaneo", value: "Misceláneo" },
    { id: 12, option: "academico", value: "Académico" },
    { id: 13, option: "manifiesto", value: "Manifiesto" },
    { id: 14, option: "obras_completas", value: "Obras completas" },
    { id: 15, option: "cartas", value: "Cartas" },
    { id: 16, option: "otro", value: "Otro" }
];

export const publicationYears = Array.from({ length: 120 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { id: i + 1, option: year.toString(), value: year.toString() };
});

export const formatOptions = [
    { id: 1, option: "fisico", value: "Físico" },
    { id: 2, option: "digital", value: "Digital" }
];

export const originOptions = [
    { id: 1, option: "compra", value: "Compra" },
    { id: 2, option: "prestamo", value: "Préstamo" },
    { id: 3, option: "regalo", value: "Regalo" },
    { id: 4, option: "intercambio", value: "Intercambio" },
    { id: 5, option: "donacion", value: "Donación" },
    { id: 6, option: "otro", value: "Otro" }
];

export const placeOriginOptions = [
  { id: 1, option: "desconocido", value: "Desconocido" },
  { id: 2, option: "buscalibre", value: "Buscalibre" },
  { id: 3, option: "biblioteca_julio_mario", value: "Biblioteca Julio Mario Santo Domingo" },
  { id: 4, option: "biblioteca_luis_angel_arango", value: "Biblioteca Luis Ángel Arango" },
  { id: 5, option: "biblioteca_virgilio_barco", value: "Biblioteca Virgilio Barco" },
  { id: 6, option: "biblioteca_usquen_servita", value: "Biblioteca Usquén Servitá" },
  { id: 7, option: "libreria_quevedo", value: "Librería Quevedo" },
  { id: 8, option: "emerlín", value: "Emerlín" },
  { id: 9, option: "blanco", value: "Blanco" },
  { id: 10, option: "archive", value: "Archive" },
  { id: 11, option: "penguin", value: "Penguin" },
  { id: 12, option: "itaca_libreria_bar", value: "Ítaca librería-bar" },
  { id: 13, option: "libreria_de_la_u", value: "Librería de la U" },
  { id: 14, option: "betzaida", value: "Betzaida" },
  { id: 15, option: "libreria_ediciones_hispanicas", value: "Librería Ediciones hispánicas" }
];

export const statusOptions = [
    { id: 1, option: "por_leer", value: "Por leer" },
    { id: 2, option: "leyendo", value: "Leyendo" },
    { id: 3, option: "leido", value: "Leído" },
    { id: 4, option: "abandonado", value: "Abandonado" },
    { id: 5, option: "por_comprar", value: "Por comprar" },
    { id: 6, option: "relectura", value: "Relectura" },
    { id: 7, option: "lista_deseo", value: "Lista de deseos" }
];

export const gender = [
    { id: 1, option: "masculino", value: "Masculino" },
    { id: 2, option: "femenino", value: "Femenino" },
];