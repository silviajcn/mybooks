import { useQuotesStore } from '../../hooks/useQuotesStore';

export const QuotesSection = () => {
  const { quote, next, prev } = useQuotesStore();

  return (
    <div className="bg-[#EFE6DD] p-6 rounded-[10px] flex flex-col justify-center shadow-md relative flex-1 min-w-[280px] w-full lg:max-w-lg">
      {/* Cabecera con Título y Botones de Navegación */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[1.2rem] text-gray-800 font-bold">
          Quotes
        </h3>
        <div className="flex gap-1.5">
          <button 
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center rounded bg-stone-300/60 hover:bg-stone-300 text-gray-700 transition cursor-pointer text-sm font-bold"
            title="Anterior"
          >
            ‹
          </button>
          <button 
            onClick={next}
            className="w-7 h-7 flex items-center justify-center rounded bg-stone-300/60 hover:bg-stone-300 text-gray-700 transition cursor-pointer text-sm font-bold"
            title="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      {/* Cita centrado vertical y horizontalmente de forma limpia */}
      <div className="my-auto py-4 flex flex-col items-center text-center">
        <p className="text-[1.05rem] text-gray-800 italic leading-relaxed max-w-[95%]">
          &ldquo;{quote?.quote}&rdquo;
        </p>
      </div>

      {/* Autor y libro alineados abajo sin solaparse */}
      <div className="w-full text-right">
        <p className="text-sm text-gray-700 font-bold truncate">
          {quote?.book} - <span className="font-normal text-gray-600">{quote?.author}</span>
        </p>
      </div>
    </div>
  );
};