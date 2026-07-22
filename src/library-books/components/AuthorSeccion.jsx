import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

/**
 * Componente que renderiza un carrusel (Swiper) para mostrar
 * la información detallada de los autores de un libro.
 * * @param {Array<Object>} detailedAuthors - Array de objetos de autor con datos completos.
 * @param {Function} formatAuthors - Función utilitaria para formatear los nombres de los autores.
 * @param {string} allAuthorNames - String con todos los nombres de autores separados por comas.
 */
export const AuthorSeccion = ({ detailedAuthors }) => {
  // Si no hay autores, muestra un mensaje
  if (!detailedAuthors || detailedAuthors.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No hay datos de autor disponibles para este libro.
      </div>
    );
  }

  return (
    <aside className="author-section bg-white p-6 rounded-[10px] shadow border border-gray-100 w-full max-w-sm mx-auto lg:max-w-md lg:mx-0 text-center">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="authorSwiper"
      >
        {/* Mapeo de cada autor a un SwiperSlide */}
        {detailedAuthors.map((author, index) => (
          <SwiperSlide key={author.name}>
            {/* Imagen del Autor (Cuadrada y Centrada) */}
            <div className="mb-4 flex justify-center">
              <img
                src={author.photo}
                className="author-photo w-32 h-32 object-cover rounded-lg flex-shrink-0 border-4 border-[#e7d7c9] shadow-md"
                alt={`Foto de ${author.name}`}
              />
            </div>

            {/* Contenido del Encabezado (Nombre y Metadatos) */}
            <div className="author-details pb-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                {detailedAuthors.length > 1
                  ? `Autor (${index + 1}/${detailedAuthors.length})`
                  : "Sobre el Autor"}
              </h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {author.name}
              </h4>

              {/* Metadatos compactos */}
              <div className="text-sm space-y-0.5 text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">
                    Nacionalidad:
                  </span>
                  <span className="ml-1 font-normal text-gray-600">
                    {author.nationality}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Género:</span>
                  <span className="ml-1 font-normal text-gray-600">
                    {author.gender}
                  </span>
                </p>
              </div>
            </div>

            {/* Biografía (Cuerpo de la Tarjeta) */}
            <div className="bio-section pt-4 text-left">
              {author.bio ? (
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {author.bio}
                  {author.fullBio.length > author.bioMaxLength && (
                    <button
                      onClick={() => console.log("Mostrar biografía completa")}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold ml-1 text-xs"
                    >
                      [Leer más]
                    </button>
                  )}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">
                  Biografía no disponible para {author.name}.
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Sección de "Otros Libros" - Fija y fuera del carrusel */}
      {/* <hr className="border-gray-100 mt-4" />
      <div className="other-books-section pt-4">
        <h5 className="font-semibold text-gray-800 tracking-tight mb-3">
          Otros Libros de {allAuthorNames} 📚
        </h5>
      </div> */}
    </aside>
  );
};