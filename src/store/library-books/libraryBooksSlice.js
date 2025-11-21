import { createSlice } from '@reduxjs/toolkit';
import { books } from '../../data/books';

const tempBooks = books;

export const libraryBooksSlice = createSlice({
    name: 'libraryBooks',
    initialState: {
        books: tempBooks,
        activeBook: null,
    },
    reducers: {
        setActiveBook: (state, {payload}) => {
            state.activeBook = payload;
        },
        setBooks: (state, {payload}) => {
            state.books = payload;
        },
        onAddNewBook: (state, {payload}) => {
            state.books.push(payload);
            //state.activeBook = null;
        },
        onUpdateBook: (state, {payload}) => {
            state.books = state.books.map(book => {
                if (book._id === payload._id) {
                    return payload;
                }
                return book;
            })
        },
        clearActiveBook: (state) => {
            state.activeBook = null;
        },
        onDeleteBook: (state) => {
            if (state.activeBook) {
                state.books = state.books.filter(book => book._id !== state.activeBook._id);
                state.activeBook = null;
            }
            
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveBook, setBooks, onAddNewBook, clearActiveBook, onUpdateBook, onDeleteBook } = libraryBooksSlice.actions;