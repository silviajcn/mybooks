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
            state.activeBook = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveBook, setBooks, onAddNewBook } = libraryBooksSlice.actions;