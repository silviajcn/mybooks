import { AuthorSection } from '../components';

export const BookDetails = () => {
    return (
        <main className="main-content">
            <div className="book-details-container">
                <div className="book-cover-section">
                <img
                    src="https://res.cloudinary.com/silviajcn/image/upload/v1731538361/Cover-Books/Samanta_Schweblin_-_Kentukis_bl8flf.jpg"
                    alt="Portada del libro"
                    className="book-cover-small"
                />
                <div className="book-buttons">
                    <button>Compartir</button>
                    <button>Notas</button>
                    <button>Reseña</button>
                </div>
                </div>
                <div className="book-info-section">
                <h2 className="book-title-large">Kentukis</h2>
                <p className="book-author-large">Samanta Schweblin</p>
                <p className="book-edition">Edición: 2da</p>
                <p><strong>Género:</strong> Ficción</p>
                <p><strong>Fecha de Publicación:</strong> 2023</p>
                </div>
            </div>
            <AuthorSection />
            {/* <QuotesAndReviews /> */}
        </main>
    )
};