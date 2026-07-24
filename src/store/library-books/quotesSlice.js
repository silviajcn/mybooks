import { createSlice } from '@reduxjs/toolkit';
import { books as quotes } from '../../data/quotes';

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    quotes,
    currentIndex: 0,
  },
  reducers: {
    nextQuote: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.quotes.length;
    },
    prevQuote: (state) => {
      state.currentIndex = (state.currentIndex - 1 + state.quotes.length) % state.quotes.length;
    },
  },
});

export const { nextQuote, prevQuote } = quotesSlice.actions;