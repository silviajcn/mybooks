import React, { useMemo } from "react";

// =================================================================
// 1. DATOS SIMULADOS DE LIBROS
//    En una aplicación real, estos vendrían de tu estado/base de datos
// =================================================================

const mockBooks = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "G. G. Márquez",
    year: 1967,
    color: "#A52A2A",
  },
  {
    id: 2,
    title: "Pelea de gallos y otros cuentos",
    author: "M. F. Ampuero",
    year: 2018,
    color: "#32CD32",
  },
  {
    id: 3,
    title: "El amor en los tiempos del cólera",
    author: "G. G. Márquez",
    year: 1985,
    color: "#FFD700",
  },
  {
    id: 4,
    title: "La casa de los espíritus",
    author: "Isabel Allende",
    year: 1982,
    color: "#4682B4",
  },
  {
    id: 5,
    title: "Ensayo sobre la ceguera",
    author: "José Saramago",
    year: 1995,
    color: "#800080",
  },
  {
    id: 6,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    color: "#444444",
  },
  {
    id: 7,
    title: "Rayuela",
    author: "Julio Cortázar",
    year: 1963,
    color: "#DAA520",
  },
  {
    id: 8,
    title: "Crónica de una muerte anunciada",
    author: "G. G. Márquez",
    year: 1981,
    color: "#F08080",
  },
  {
    id: 9,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: 1953,
    color: "#FFA07A",
  },
  {
    id: 10,
    title: "Crimen y castigo",
    author: "Fiódor Dostoievski",
    year: 1866,
    color: "#2F4F4F",
  },
  {
    id: 11,
    title: "El nombre del viento",
    author: "Patrick Rothfuss",
    year: 2007,
    color: "#CD853F",
  },
  {
    id: 12,
    title: "Un mundo feliz",
    author: "Aldous Huxley",
    year: 1932,
    color: "#6A5ACD",
  },
  {
    id: 13,
    title: "Lo que el viento se llevó",
    author: "M. Mitchell",
    year: 1936,
    color: "#FF6347",
  },
  {
    id: 14,
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    year: 2001,
    color: "#556B2F",
  },
];

// =================================================================
// 2. FUNCIÓN DE UTILIDAD PARA ESTILOS ALEATORIOS
// =================================================================

const getBookStyle = (seed) => {
  // Genera un estilo pseudo-aleatorio basado en el ID para consistencia
  const rand = (seed * 997) % 100;

  // 1. Espesor (Ancho): 3 opciones
  let widthClass;
  if (rand < 30) {
    widthClass = "w-[18px]"; // Delgado
  } else if (rand < 80) {
    widthClass = "w-[24px]"; // Normal
  } else {
    widthClass = "w-[30px]"; // Grueso
  }

  // 2. Altura (Solo variaciones muy sutiles, 3 opciones)
  let heightClass;
  if (rand < 20) {
    heightClass = "h-[95%]";
  } else if (rand < 90) {
    heightClass = "h-[97%]";
  } else {
    heightClass = "h-[92%]";
  }

  // 3. Pequeña inclinación para darle un toque orgánico
  const transformClass =
    rand % 5 === 0
      ? "transform rotate-[0.5deg]"
      : rand % 7 === 0
      ? "transform rotate-[-0.5deg]"
      : "";

  return { widthClass, heightClass, transformClass };
};

// =================================================================
// 3. COMPONENTE PARA EL LOMO INDIVIDUAL
// =================================================================

const BookSpine = React.memo(({ book }) => {
  // Aplicar estilos dinámicos de tamaño (grosor, altura, inclinación)
  const { widthClass, heightClass, transformClass } = useMemo(
    () => getBookStyle(book.id),
    [book.id]
  );

  // Lógica para tamaño de fuente dinámico:
  // Si el título es muy largo, usa un tamaño de fuente menor para asegurar que quepa
  let fontSizeClass = "text-xs"; // Por defecto
  if (book.title.length > 28) {
    fontSizeClass = "text-[0.55rem]"; // Muy pequeño
  } else if (book.title.length > 20) {
    fontSizeClass = "text-[0.6rem]"; // Pequeño
  } else if (book.title.length > 15) {
    fontSizeClass = "text-sm"; // Normal
  } else {
    fontSizeClass = "text-base"; // Grande
  }

  return (
    <div
      className={`
        ${widthClass} ${heightClass} ${transformClass}
        relative flex-shrink-0 cursor-pointer 
        transition-all duration-200 
        hover:shadow-xl hover:scale-[1.03] hover:z-10
      `}
      style={{
        backgroundColor: book.color, // Color específico del libro
        boxShadow: "inset -2px 0 5px rgba(0,0,0,0.3)", // Sombra interior para darle profundidad
        borderRadius: "2px 0 0 2px", // Borde redondeado sutil
        margin: "0 1px", // Espacio sutil entre libros
      }}
      title={`${book.title} (${book.year})`}
      // Simular un click que podría llevar a los detalles del libro
      onClick={() => console.log(`Mostrando detalles de: ${book.title}`)}
    >
      {/* Título rotado para simular el lomo */}
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          whitespace-nowrap ${fontSizeClass} 
          text-white font-serif font-bold tracking-tight 
          text-shadow-sm
        `}
        style={{
          transform: "translate(-50%, -50%) rotate(90deg)",
          // Para que el texto se vea bien en colores oscuros
          textShadow: "0 0 1px rgba(0,0,0,0.8)",
        }}
      >
        {book.title}
      </div>

      {/* Detalle del autor en la parte inferior del lomo */}
      <div
        className="absolute bottom-1 w-full text-center text-[0.4rem] font-medium text-white/80"
        style={{
          transform: "rotate(90deg) translate(-50%, -50%)",
          transformOrigin: "top left",
        }}
      >
        {book.author}
      </div>
    </div>
  );
});

// =================================================================
// 4. COMPONENTE PRINCIPAL DE LA ESTANTERÍA
// =================================================================

export const MyBookshelf = () => {
  // La estantería es un contenedor con una balda de madera
  const Bookshelf = ({ books, shelfId }) => (
    <div className="w-full flex justify-start items-end h-[280px] p-2 relative">
      {/* La balda (shelf) de madera */}
      <div
        className="absolute bottom-0 left-0 right-0 h-4 bg-yellow-900 shadow-xl z-10 
                      rounded-b-sm border-t-2 border-yellow-800"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,.05), rgba(255,255,255,.05) 10px, transparent 10px, transparent 20px)",
        }}
      />

      {/* Los libros */}
      <div className="flex flex-row items-end h-full w-full overflow-x-auto overflow-y-hidden pb-4 pr-4 z-20">
        {books.map((book) => (
          <BookSpine key={book.id} book={book} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="font-['Inter'] min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
          Mis libros
        </h1>

        {/* Contenedor principal de la estantería: simula la pared */}
        <div
          className="bg-stone-200 p-4 rounded-xl shadow-inner border border-stone-300"
          style={{
            minHeight: "600px",
            // Detalle de color de pared o fondo
            backgroundImage:
              "radial-gradient(circle, #f5f5f4 0%, #e7e5e4 100%)",
          }}
        >
          {/* Estantería 1: Ficción */}
          <h2 className="text-2xl font-semibold mb-2 text-stone-700 border-b border-stone-300 pb-1">
            Ficción Clásica
          </h2>
          <Bookshelf books={mockBooks.slice(0, 8)} shelfId="fiction" />

          {/* Separador de pared y espacio */}
          <div className="my-8 border-t border-stone-300/50"></div>

          {/* Estantería 2: Ciencia Ficción y Fantasía */}
          <h2 className="text-2xl font-semibold mb-2 text-stone-700 border-b border-stone-300 pb-1">
            Ciencia Ficción
          </h2>
          <Bookshelf books={mockBooks.slice(8, 14)} shelfId="scifi" />
        </div>
      </div>
    </div>
  );
};