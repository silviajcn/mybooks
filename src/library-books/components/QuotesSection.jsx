import { useQuotesStore } from '../../hooks/useQuotesStore';

export const QuotesSection = () => {
  const { quote } = useQuotesStore();

  return (
    <div className="bg-[#EFE6DD] p-6 rounded-[10px] flex flex-col justify-center shadow-md relative flex-1 min-w-[280px] w-full lg:max-w-md">
      <h3 className="absolute top-4 left-6 text-[1.2rem] text-gray-800 font-bold">
        Citas
      </h3>
      <p className="text-[1.1rem] text-gray-800 italic text-center mx-auto max-w-[90%] mt-10 mb-4">
        "{quote?.quote}"
      </p>
      <p className="text-base text-gray-600 font-bold absolute bottom-4 right-6">
        {quote?.book} - {quote?.author}
      </p>
    </div>
  );
};
