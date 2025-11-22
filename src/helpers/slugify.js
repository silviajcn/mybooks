/**
 * Convierte una cadena de texto a un 'slug' amigable para URL.
 * Procesa acentos, eñes y reemplaza espacios con guiones bajos.
 * @param {string} text - La cadena de texto de entrada (ej: "El amor en los tiempos del cólera").
 * @returns {string} El slug resultante (ej: "el-amor-en-los-tiempos-del-colera").
 */
export const createSlug = (text) => {
    if (!text) return '';
    
    let slug = text.toLowerCase();
    
    // 1. Manejar acentos y caracteres diacríticos (ej: á -> a)
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    
    // 2. Manejar ñ (si el paso 1 no es suficiente en todos los entornos, aunque NFD suele cubrirlo)
    slug = slug.replace(/ñ/g, 'n'); 
    
    // 3. Remover caracteres que no sean letras, números, espacios o guiones
    slug = slug.replace(/[^a-z0-9\s-]/g, ''); 
    
    // 4. Reemplazar espacios y múltiples guiones con un solo guion (-)
    slug = slug.trim().replace(/[\s-]+/g, '-'); 
    
    // 5. Eliminar guiones al inicio o al final
    return slug.replace(/^-+|-+$/g, ''); 
};