import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { BookCard, QuotesSection, ReadingSection } from '../components';
import { useLibraryStore } from '../../hooks';
import { createSlug } from '../../helpers';

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
