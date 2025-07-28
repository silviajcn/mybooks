import { Link } from 'react-router-dom';

export const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book-detail`}>
        <img src={book.cover || null} alt={book.title} className="book-cover" />
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <p className="book-status">{book.status}</p>
        </div>
      </Link>
    </div>
  )
};