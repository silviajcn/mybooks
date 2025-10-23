import { createSlice } from '@reduxjs/toolkit';
import { books as quotes } from '../../data/quotes';

function getRandomIndex(length, exclude) {
  let idx;
  do {
    idx = Math.floor(Math.random() * length);
  } while (idx === exclude);
  return idx;
}

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    quotes,
    currentIndex: 0,
  },
  reducers: {
    nextQuote: (state) => {
      state.currentIndex = getRandomIndex(state.quotes.length, state.currentIndex);
    },
  },
});

export const { nextQuote } = quotesSlice.actions;