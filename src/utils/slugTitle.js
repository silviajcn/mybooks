/**
 * Convierte un texto a un slug apto para URLs (ej: "Cien Años de Soledad" -> "cien-anios-de-soledad").
 * Se debe asegurar que las ñ y acentos se manejen correctamente.
 * @param {string} text - El texto a convertir.
 * @returns {string} El slug limpio.
 */
export const createSlug = (text) => {
    if (!text) return '';
    
    // 1. Convertir a minúsculas
    let slug = text.toLowerCase();

    // 2. Normalizar acentos y diacríticos (ej: á -> a, è -> e)
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 3. Reemplazar caracteres especiales (como ñ por n)
    slug = slug.replace(/ñ/g, 'n');

    // 4. Reemplazar todos los caracteres que no son letras, números o guiones con un guion.
    slug = slug.replace(/[^a-z0-9\s-]/g, '');

    // 5. Reemplazar espacios y guiones múltiples por un único guion
    slug = slug.trim().replace(/[\s-]+/g, '-');

    // 6. Eliminar guiones al inicio y al final
    return slug.replace(/^-+|-+$/g, '');
};