import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/mybooks/"> {/* nombre del repo para GH Pages */}
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
};