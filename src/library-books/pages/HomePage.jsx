import { useNavigate, useOutletContext } from 'react-router-dom';
import { BookCard, QuotesSection, ReadingSection } from '../components';
import { useLibraryStore } from '../../hooks';
import { useEffect } from 'react';

const createSlug = (text) => {
    if (!text) return '';
    let slug = text.toLowerCase();
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Manejar acentos
    slug = slug.replace(/ñ/g, 'n'); // Manejar ñ
    slug = slug.replace(/[^a-z0-9\s-]/g, ''); // Remover caracteres no válidos
    slug = slug.trim().replace(/[\s-]+/g, '-'); // Reemplazar espacios y múltiples guiones
    return slug.replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/fin
};

export const HomePage = () => {
    const { sidebarOpen } = useOutletContext();
    const { books, selectBook, loadBooks } = useLibraryStore();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (books.length === 0) {
        // Carga solo si no están cargados
        loadBooks();
      }
    }, [loadBooks, books.length]);
    
    const handleBookClick = (book) => {
        selectBook(book);
  
        const bookSlug = createSlug(book.title);
        navigate(`/${bookSlug}/${book._id}`);
    };
  
    return (
      <>
        <h2 className="text-2xl text-gray-950 font-bold mb-4">My books</h2>
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <QuotesSection />
          <ReadingSection
            sidebarOpen={sidebarOpen}
            onBookClick={handleBookClick}
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
      </>
    );
};