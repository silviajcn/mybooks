import { useParams, useNavigate } from 'react-router-dom';
import { useLibraryStore } from '../../hooks';
import { obtenerOrdinal } from '../../data/nrosOrdinales';

// const statusColor = {
//   Leído: "text-green-600 bg-green-100",
//   Leyendo: "text-blue-600 bg-blue-100",
//   Abandonado: "text-red-500 bg-red-100",
//   "Por leer": "text-orange-500 bg-orange-100",
// };

export const BookDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { books, selectBook, isLoading, startDeletingBook, hasBookSelected } = useLibraryStore();

  const book = books.find((b) => String(b._id || b.id) === String(_id));

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Cargando detalles...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-10 text-gray-600">No book selected</div>
    );
  }

  const AUTHOR_BIO_MAX_LENGTH = 200;
  const authorBio =
    book.authorBio && book.authorBio.length > AUTHOR_BIO_MAX_LENGTH
      ? book.authorBio.slice(0, AUTHOR_BIO_MAX_LENGTH) + "..."
      : book.authorBio || "";

  // Lógica para obtener el ordinal
  const ordinalDeLectura = obtenerOrdinal(Number(book.numberReading));

  const onEditClick = () => {
    selectBook(book);
    navigate("/register-book");
  };

  const handleDelete = () => {
    startDeletingBook();
    navigate("/");
  }

  return (
    <div className=" min-h-screen">
      <main className="main-content mx-auto">
        <div className="book-details-container flex flex-col lg:flex-row gap-8">
          {/* Portada y botones */}
          <div className="book-cover-section bg-white p-4 rounded-[10px] shadow w-full max-w-xs mx-auto lg:mx-0 flex-1 items-center">
            <img
              src={book.cover}
              alt={`Portada de ${book.title}`}
              className="book-cover-small mb-4 rounded w-full h-64 object-cover"
            />
            <p className="book-rating text-yellow-500 text-lg">
              {"⭐".repeat(Math.round(book.bookScore))}{" "}
              <span className="text-gray-700">{book.bookScore.toFixed(1)}</span>
            </p>
            <div className="book-buttons flex gap-2 flex-wrap justify-center mt-2">
              <button
                className="w-24 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                onClick={() => onEditClick(book)}
              >
                Editar
              </button>

              <button
                className="w-24 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                style={{
                  display: hasBookSelected ? "" : "none",
                }}
                onClick={() => handleDelete(book)}
              >
                Eliminar
              </button>
            </div>

            {/* <div className="book-buttons flex gap-2 flex-wrap justify-center mt-2">
              <button className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
                Compartir
              </button>
              <button className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
                Notas
              </button>
              <button className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
                Reseña
              </button>
            </div> */}
          </div>

          {/* Info del libro */}
          <div className="book-info-section bg-white p-4 rounded-[10px] shadow flex-1">
            <h2 className="book-title-large text-2xl font-bold mb-2 text-gray-900 break-words">
              {book.title}
            </h2>
            {book.subtitle !== "N/A" && (
              <h3 className="book-subtitle text-xl font-semibold mb-2 text-gray-600 break-words">
                {book.subtitle}
              </h3>
            )}
            <p className="book-author-large text-gray-600 mb-2 font-semibold">
              {book.author}
            </p>

            <div className="book-rating-section flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              {/* <p className="book-rating text-yellow-500 text-lg">
                {"⭐".repeat(Math.round(book.bookScore))}{" "}
                <span className="text-gray-700">
                  {book.bookScore.toFixed(1)}
                </span>
              </p> */}
              {/* <div
                className={`book-status-detail px-3 py-2 rounded font-semibold text-sm ${
                  statusColor[book.status] || "text-gray-600 bg-gray-100"
                }`}
              >
                Estado: {book.status}
              </div> */}
              {/* <button className="add-to-library px-4 py-2 bg-[#0062cc] text-white rounded hover:bg-blue-700 transition text-sm mt-2 sm:mt-0">
                Agregar a mi biblioteca ▼
              </button> */}
            </div>

            {/* Informacion de libro y lecturas */}
            <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 space-y-5">
              {/* Sección 1: Detalles del libro */}
              <section>
                {/* Título de la sección: Restablecemos text-lg y aumentamos ligeramente el margen */}
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2.5">
                  Detalles del Libro 📚
                </h3>

                {/* Contenedor de la lista de detalles: Volvemos a gap-y-2 para la legibilidad vertical */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                  {/* Item de detalle - El tamaño de fuente de los datos se mantiene en text-sm */}
                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ISBN
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.ISBN}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Género
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.genre}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Publicación
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.publicationDate}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Editorial
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.editorial}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total de páginas
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.nroPages}
                    </p>
                  </div>
                </div>
              </section>

              {/* Separador visual para las dos grandes secciones */}
              <hr className="border-gray-200" />

              {/* Sección 2: Detalles de lectura */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2.5">
                  Detalles de Lectura 📖
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.status}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calificación
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      5
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nro. lectura
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      ({book.numberReading}) {ordinalDeLectura} lectura
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Formato de lectura
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.format}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Origen
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.origin}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lugar / Persona de origen
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.originPlace}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de inicio
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.initialDate}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de fin
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      {book.endDate}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paginas leídas
                    </p>
                    <p className="text-sm font-normal text-gray-900 mt-0.5">
                      <b>{book.pagesRead}</b> de <b>{book.nroPages}</b> páginas
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Autor */}
          <aside className="author-section bg-white p-6 rounded-[10px] shadow border border-gray-100 w-full max-w-sm mx-auto lg:max-w-md lg:mx-0 text-center">
            {/* Imagen del Autor (Cuadrada y Centrada) */}
            <div className="mb-4 flex justify-center">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRMPLvdJgTHoxVnvzmv8qvBph6pasaVCCjX6mIW2XYcMNVcqLONbe0SHMganfOPTzuvftqfrNlqmZhHE8eezJk9BMpHPKqHouF10eSvwQ"
                alt="Foto del Autor"
                className="author-photo w-32 h-32 object-cover rounded-lg flex-shrink-0 border-4 border-[#e7d7c9] shadow-md"
              />
            </div>

            {/* Contenido del Encabezado (Nombre y Metadatos) */}
            <div className="author-details pb-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                Sobre el Autor
              </h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {book.author}
              </h4>

              {/* Metadatos compactos */}
              <div className="text-sm space-y-0.5 text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">
                    Nacionalidad:
                  </span>
                  <span className="ml-1 font-normal text-gray-600">
                    Argentina
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Género:</span>
                  <span className="ml-1 font-normal text-gray-600">
                    Femenino
                  </span>
                </p>
              </div>
            </div>

            {/* Biografía (Cuerpo de la Tarjeta) */}
            {/* Establecemos text-left para el párrafo de la biografía y un espaciado consistente. */}
            <div className="bio-section pt-4 mb-4 text-left">
              {/* Aquí debería ir tu variable de texto (authorBioDisplay o similar) */}
              {authorBio ? (
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {authorBio}
                  {book.authorBio.length > AUTHOR_BIO_MAX_LENGTH && (
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
                  Biografía no disponible.
                </p>
              )}

              {/* ESPACIO RESERVADO: Puedes usar un div vacío si quieres reservar el espacio del botón 'Leer más' */}
              {/* <div className="h-5"></div> */}
            </div>

            <hr className="border-gray-100" />

            {/* Otros Libros */}
            <div className="other-books-section pt-4">
              <h5 className="font-semibold text-gray-800 tracking-tight mb-3">
                Otros Libros del Autor
              </h5>

              <div className="flex gap-3 justify-center overflow-x-auto pb-1">
                <img
                  src="https://res.cloudinary.com/silviajcn/image/upload/v1751764253/DB_BOOKS/Amparo_D%C3%A1vila_-_Cuentos_reunidos_nzjaba.webp"
                  className="mini-cover w-16 h-24 rounded shadow-md flex-shrink-0 object-cover"
                  alt="Libro 1"
                />
                <img
                  src="https://res.cloudinary.com/silviajcn/image/upload/v1751764253/DB_BOOKS/Amparo_D%C3%A1vila_-_Cuentos_reunidos_nzjaba.webp"
                  className="mini-cover w-16 h-24 rounded shadow-md flex-shrink-0 object-cover"
                  alt="Libro 2"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Citas y Reseñas */}
        <div className="book-quotes-and-reviews bg-white p-4 rounded-[10px] shadow border border-gray-100 flex flex-col gap-8 mt-6 lg:flex-row lg:gap-8">
          {/* Sección de Citas */}
          {/* <div className="book-quotes-section bg-white p-4 rounded-xl shadow-lg w-full max-w-sm mx-auto lg:w-64 text-center border border-gray-100">
            <h3 className="font-semibold mb-3 text-lg text-gray-800 border-b pb-2">
              Citas del Libro
            </h3>
            <div className="quote-content h-32 flex flex-col justify-between">
              <p className="quote-text text-gray-600 italic mb-3 flex-grow overflow-hidden text-sm">
                "{currentQuote}"
              </p>

              {hasMultipleQuotes && (
                <div className="quote-navigation flex gap-3 justify-center pt-2 border-t mt-auto">
                  <button
                    onClick={handlePrevQuote}
                    className="quote-nav-button bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition duration-200 shadow-md disabled:opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                  <span className="text-sm font-mono self-center text-gray-500">
                    {currentQuoteIndex + 1} / {book.quotes.length}
                  </span>
                  <button
                    onClick={handleNextQuote}
                    className="quote-nav-button bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition duration-200 shadow-md disabled:opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div> */}

          {/* Sección de Biografía del Autor y Reseñas */}
          <div className="community-info-section bg-white p-0 rounded-xl w-full max-w-sm mx-auto lg:flex-1 lg:max-w-none lg:mx-0">
            {/* SECCIÓN DE RESEÑAS */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-bold text-xl text-gray-800 mb-3">
                Reseñas de la Comunidad
              </h4>
              {/* Contenedor de las reseñas con un estilo definido */}
              <div className="bg-white p-3 space-y-3 rounded-lg border border-indigo-200 shadow-inner">
                {/* Reseña 1 */}
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 shadow-sm">
                  <p className="text-gray-700 italic text-sm leading-snug mb-1">
                    "Una lectura que te cambiará la vida. Macondo es un universo
                    aparte."
                  </p>
                  <p className="text-right text-xs font-semibold text-indigo-600 mt-1">
                    - Usuario123 (5 ⭐)
                  </p>
                </div>

                {/* Reseña 2 */}
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 shadow-sm">
                  <p className="text-gray-700 italic text-sm leading-snug mb-1">
                    "Un poco denso al principio, pero la recompensa es enorme."
                  </p>
                  <p className="text-right text-xs font-semibold text-indigo-600 mt-1">
                    - LectorFiel (4 ⭐)
                  </p>
                </div>
              </div>

              {/* Botón de acción mejorado */}
              <button className="w-full mt-4 bg-[#EFE6DD] text-[1rem] text-gray-800 font-bold py-2.5 rounded-lg shadow-md hover:bg-[#e8d8c8]  transition duration-300 transform hover:scale-[1.01] text-sm">
                Ver todas las reseñas (42)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};