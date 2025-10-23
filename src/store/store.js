import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice';
import { libraryBooksSlice } from './library-books/libraryBooksSlice';
import { quotesSlice } from './library-books/quotesSlice';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        libraryBooks: libraryBooksSlice.reducer,
        quotes: quotesSlice.reducer,
    },
});