import { Link } from 'react-router-dom';

const statusColor = {
  'Leído': 'text-green-600',
  'Leyendo': 'text-blue-600',
  'Abandonado': 'text-red-500',
  'Por leer': 'text-orange-500',
};

export const BookCard = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
      <Link to={`/book-detail`} className="w-full flex flex-col items-center">
        <img
          src={book.cover || null}
          alt={book.title}
          className="w-full h-[200px] object-cover rounded-[4px] shadow-[4px_4px_3px_0_rgba(0,0,0,0.15)]"
        />
        <div className="mt-4 text-center w-full">
          <h3 className="text-base font-bold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-500">{book.author}</p>
          <p className={`text-sm font-bold mt-1 ${statusColor[book.status] || 'text-gray-400'}`}>
            {book.status}
          </p>
        </div>
      </Link>
    </div>
  )
};