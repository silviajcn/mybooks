import { useDispatch, useSelector } from 'react-redux';
import { onAddNewBook, setActiveBook, setBooks } from '../store';

// Importa tus datos (simulando una API)
import { books as mockBooks } from '../data/books'; 

export const useLibraryStore = () => {

    const dispatch = useDispatch();

    const { books, activeBook } = useSelector(state => state.libraryBooks);
    const { isLoading } = useSelector(state => state.ui);

    const selectBook = (book) => {
        dispatch(setActiveBook(book));
    };

    // ** LÓGICA DE CARGA **
    const startLoadingBooks = async () => {
        // Podrías poner dispatch(startLoading()) aquí
        
        // Simular la llamada asíncrona a la API
        const data = await new Promise(resolve => setTimeout(() => resolve(mockBooks), 50)); 
        
        // Disparar la acción para guardar los libros en el store
        dispatch(setBooks(data));

        // Podrías poner dispatch(finishLoading()) aquí
    }

    const startSavingBook = async (book) => {
        if (book._id) {
            // Actualizar libro existente
        } else {
            // Crear nuevo libro
            dispatch(onAddNewBook({ ...book, _id: new Date().getTime().toString() }));
        }
    }

    
    return {
        // Properties
        books,
        activeBook,
        isLoading,
        
        // Methods
        selectBook,
        startLoadingBooks,
        startSavingBook
    }
}