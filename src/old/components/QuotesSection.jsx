

export const QuotesSection = () => {
    return (
        <div className="bg-[#EFE6DD] p-6 rounded-[10px] flex flex-col justify-center shadow-md relative flex-1 min-w-[260px] w-full lg:max-w-md">
            <h3 className="absolute top-4 left-6 text-[1.2rem] text-gray-800 font-bold">Citas</h3>
            <p className="text-[1.2rem] text-gray-800 italic text-center mx-auto max-w-[90%] mt-10 mb-4">
                "Los libros son el tesoro más valioso del mundo, cada página guarda una historia."
            </p>
            <p className="text-base text-gray-600 font-bold absolute bottom-4 right-6">- Anónimo</p>
        </div>
    )
};