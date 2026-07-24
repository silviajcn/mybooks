import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLibraryStore } from "../../hooks";
import { createSlug } from "../../helpers";

const getStatusColor = (status) => {
  switch (status) {
    case "Leyendo":
      return "#60a5fa";
    case "Leído":
      return "#4ade80";
    case "Por leer":
      return "#fb923c";
    case "Abandonado":
      return "#f87171";
    case "Por comprar":
      return "#c084fc";
    case "Lista de deseos":
      return "#facc15";
    case "Relectura":
      return "#b45309";
    default:
      return "#d6a46e";
  }
};

const getBookStyle = (seed) => {
  const rand = (seed * 997) % 100;

  let size = "normal";
  if (rand < 35) size = "slim";
  else if (rand < 75) size = "normal";
  else size = "thick";

  const variants = {
    slim: {
      widthClass: "w-[43px] hover:w-[100px]",
      heightClass: "h-[160px]",
      fontClass: "text-[0.65rem]",
      rotate: "rotate-[0.3deg]",
    },
    normal: {
      widthClass: "w-[50px] hover:w-[120px]",
      heightClass: "h-[185px]",
      fontClass: "text-[0.72rem]",
      rotate: "rotate-[-0.2deg]",
    },
    thick: {
      widthClass: "w-[58px] hover:w-[140px]",
      heightClass: "h-[200px]",
      fontClass: "text-[0.80rem]",
      rotate: "rotate-[0.25deg]",
    },
  };

  return variants[size];
};

const truncate = (text, max) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
};

const BookSpine = React.memo(function BookSpine({ book, onBookClick }) {
  const { activeBook } = useLibraryStore();

  const { widthClass, heightClass, fontClass, rotate, size } = useMemo(
    () => getBookStyle(book.id ?? book._id),
    [book.id, book._id]
  );

  const isSelected =
    activeBook && (activeBook.id === book.id || activeBook._id === book._id);

  const maxTitle = size === "slim" ? 16 : size === "normal" ? 22 : 28;
  const spineTitle = truncate(book.title, maxTitle);
  const bookBackgroundColor = getStatusColor(book.status);

  return (
    <div
      className={[
        "relative flex-shrink-0 cursor-pointer select-none group",
        "transition-all duration-300 ease-out hover:z-40",
        isSelected ? "z-30" : "z-10",
      ].join(" ")}
      style={{ transform: rotate }}
      onClick={() => onBookClick(book)}
    >
      <div
        className={[
          widthClass,
          heightClass,
          "rounded-t-[3px] rounded-b-[3px]",
          "relative overflow-hidden flex flex-col justify-between items-center py-2",
          "border-l border-white/30 shadow-md",
          "transition-all duration-300 ease-out",
          isSelected ? "ring-2 ring-amber-400" : "",
        ].join(" ")}
        style={{
          backgroundColor: bookBackgroundColor,
          boxShadow:
            "inset -3px 0 8px rgba(0,0,0,0.3), inset 2px 0 2px rgba(255,255,255,0.25)",
        }}
      >
        {book.cover && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-cover bg-center z-20"
            style={{ backgroundImage: `url(${book.cover})` }}
          />
        )}

        <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:opacity-0 transition-opacity" />

        <div
          className="absolute left-0 right-0 top-0 h-[8px] z-30 group-hover:opacity-0 transition-opacity"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0))",
          }}
        />

        <div
          className="absolute left-0 right-0 bottom-0 h-[10px] z-30 group-hover:opacity-0 transition-opacity"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))",
          }}
        />

        <div
          className={[
            "relative z-30 my-auto text-center font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
            "group-hover:opacity-0 transition-opacity duration-150",
            fontClass,
          ].join(" ")}
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            maxHeight: "80%",
          }}
        >
          {spineTitle}
        </div>

        {size !== "slim" && book.author && (
          <div
            className="relative z-30 text-[0.45rem] text-white/90 text-center truncate w-full px-0.5 mb-1 group-hover:opacity-0 transition-opacity duration-150"
            style={{ textShadow: "0 1px 1px rgba(0,0,0,0.8)" }}
          >
            {truncate(
              Array.isArray(book.author) ? book.author.join(", ") : book.author,
              10
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export const MyBookshelf = () => {
  const { books, selectBook, startLoadingBooks } = useLibraryStore();
  const navigate = useNavigate();

  useEffect(() => {
    startLoadingBooks();
  }, []);

  const handleBookClick = (book) => {
    selectBook(book);
    const bookSlug = createSlug(book.title);
    navigate(`/${bookSlug}/${book._id}`);
  };

  const groupedBooks = useMemo(() => {
    const keyOf = (b) => b.genre || "Sin Género";
    return books.reduce((acc, b) => {
      const key = keyOf(b);
      (acc[key] ||= []).push(b);
      return acc;
    }, {});
  }, [books]);

  const categories = Object.keys(groupedBooks);

  const BookshelfShelf = ({ shelfBooks, title }) => (
    <div className="flex flex-col h-full bg-white/40 border border-stone-200/80 rounded-xl p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-base sm:text-lg font-bold text-stone-800 truncate">
          {title}
        </h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-600">
          {shelfBooks?.length || 0}
        </span>
        <div className="h-[1px] flex-1 bg-stone-300/60 ml-2" />
      </div>

      <div className="relative px-2 mt-auto">
        <div
          className="absolute left-0 right-0 -top-[6px] h-[16px] rounded-t-md shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))," +
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.10), rgba(0,0,0,0.00) 10px)",
            backgroundColor: "#8b5a2b",
            border: "1px solid rgba(70,40,15,0.55)",
          }}
        />

        <div
          className="h-[10px] rounded-b-md border-t border-yellow-900/40 shadow-inner"
          style={{
            background: "linear-gradient(180deg, #a56a33, #7a4b22)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.12)",
          }}
        />

        {/* 👈 Altura ajustada de h-[210px] a h-[235px] para evitar que se corten los libros altos */}
        <div className="mt-5 h-[235px] flex items-end overflow-x-auto overflow-y-hidden pb-2">
          <div className="flex flex-row items-end gap-[6px] min-w-max pr-2">
            {(shelfBooks || []).map((book) => (
              <BookSpine 
                key={book.id ?? book._id} 
                book={book} 
                onBookClick={handleBookClick} 
              />
            ))}

            {(!shelfBooks || shelfBooks.length === 0) && (
              <div className="text-sm text-stone-400 italic px-2 pb-2">
                Estantería vacía
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800 tracking-tight">
            My digital shelf
          </h1>
          <p className="text-stone-600 mt-2">
            A digital version of my library with my books organized
          </p>
        </div>

        <div
          className="rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-6"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.9), rgba(255,255,255,0) 45%)," +
              "repeating-linear-gradient(90deg, rgba(80,60,30,0.03), rgba(80,60,30,0.03) 1px, transparent 1px, transparent 14px)",
          }}
        >
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <BookshelfShelf 
                  key={cat} 
                  shelfBooks={groupedBooks[cat]} 
                  title={cat} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-500 text-lg">
              No hay libros cargados en tu biblioteca.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};