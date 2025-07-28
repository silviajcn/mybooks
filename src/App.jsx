import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

export const App = () => {
  return (
    <BrowserRouter basename="/mybooks"> {/* nombre del repo para GH Pages */}
      <AppRouter />
    </BrowserRouter>
  )
};