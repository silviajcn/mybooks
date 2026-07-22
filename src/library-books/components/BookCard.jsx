
const statusColor = {
  'Leído': 'text-green-600',
  'Leyendo': 'text-blue-600',
  'Abandonado': 'text-red-500',
  'Por leer': 'text-orange-500',
};

export const BookCard = ({ book, onClick }) => {
  // Función de utilidad para formatear la lista de autores
  const formatAuthorsDisplay = (authors) => {
    // Aseguramos que 'authors' sea un array (por si viene null, undefined, o string)
    const validAuthors = Array.isArray(authors) ? authors : [];
    const count = validAuthors.length;

    if (count === 0) {
      return "Autor desconocido";
    }

    if (count === 1) {
      // Si hay 1 autor, muestra solo el nombre
      return validAuthors[0];
    }

    if (count === 2) {
      // Si hay 2 autores, muéstralos separados por ' · '
      return validAuthors.join(" · ");
    } // Si hay 3 o más autores, muestra "Varios autores"

    return "Varios autores";
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <img
        src={book.cover || null}
        alt={book.title}
        className="w-full h-[200px] object-cover rounded-[4px] shadow-[4px_4px_3px_0_rgba(0,0,0,0.15)]"
      />
      <div className="mt-4 text-center w-full">
        <h3 className="text-base font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-500">{formatAuthorsDisplay(book.author)}</p>
        <p
          className={`text-sm font-bold mt-1 ${
            statusColor[book.status] || "text-gray-400"
          }`}
        >
          {book.status}
        </p>
      </div>
    </div>
  );
};