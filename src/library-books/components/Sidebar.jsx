import { Link } from 'react-router-dom';

export const Sidebar = ({ onClose }) => {
    return (
        <aside className="fixed top-0 left-0 z-[1100] h-screen bg-white text-gray-700 pt-8 shadow-[2px_0_8px_rgba(0,0,0,0.1)] flex flex-col justify-between items-center w-full max-w-xs sm:max-w-[250px] sm:w-[250px] transition-all duration-300">
            <button
                className="absolute top-2 left-6 text-gray-200 hover:text-red-200 text-2xl cursor-pointer"
                onClick={onClose}
                aria-label="Cerrar menú"
            >
                X
            </button>
            <h1 className="text-[1.8rem] text-gray-800 pl-5 mb-8 w-full text-left">My Book Shelf</h1>
            <nav className="flex flex-col w-full">
                <Link to="/" className='text-gray-600 text-[1.2rem] py-4 px-8 flex items-center transition hover:bg-gray-100'>
                    <span className="icon mr-2.5 text-[1.5rem]">🏠</span> Inicio
                </Link>
                <Link to="/search" className='text-gray-600 text-[1.2rem] py-4 px-8 flex items-center transition hover:bg-gray-100'>
                    <span className="icon mr-2.5 text-[1.5rem]">🔍</span> Buscar
                </Link>
                <Link to="/my-bookshelf" className='text-gray-600 text-[1.2rem] py-4 px-8 flex items-center transition hover:bg-gray-100'>
                    <span className="icon mr-2.5 text-[1.5rem]">📚</span> Mi Biblioteca
                </Link>
                <Link to="/register-book" className='text-gray-600 text-[1.2rem] py-4 px-8 flex items-center transition hover:bg-gray-100'>
                    <span className="icon mr-2.5 text-[1.5rem]">📑</span> Registrar libro
                </Link>
                <Link to="/favorites" className='text-gray-600 text-[1.2rem] py-4 px-8 flex items-center transition hover:bg-gray-100'>
                    <span className="icon mr-2.5 text-[1.5rem]">🩷</span> Favoritos
                </Link>
                <Link to="/contribute" className='text-gray-600 text-[1.2rem] py-4 px-8 flex items-center transition hover:bg-gray-100'>
                    <span className="icon mr-2.5 text-[1.5rem]">✍️</span> Contribuir
                </Link>
            </nav>
            <div className="sidebar-footer px-8 py-4 text-[0.9rem] text-gray-400 w-full">
                <a href="#" className="block text-gray-400 no-underline mt-2 hover:text-gray-600">Soporte</a>
                <a href="#" className="block text-gray-400 no-underline mt-2 hover:text-gray-600">Términos y Condiciones</a>
                <a href="#" className="block text-gray-400 no-underline mt-2 hover:text-gray-600">Política de Privacidad</a>
            </div>
        </aside>
    )
};