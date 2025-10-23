import { Navigate, Route, Routes } from 'react-router-dom';
// import { Home } from '../pages';
// import { BookDetail, RegisterBook } from '../components';
import { LoginPage } from '../auth';
import { LibraryBooksPage, RegisterBook, HomePage, ScrollToTop } from '../library-books';
import BookDetails from '../library-books/pages/BookDetails';


export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'authenticated', 'no-authenticated', 'checking'

    return (
      <>
        <ScrollToTop />
        <Routes>
          {authStatus === "no-authenticated" ? (
            <Route path="/auth/*" element={<LoginPage />} />
          ) : (
            <Route path="/*" element={<LibraryBooksPage />}>
              <Route index element={<HomePage />} />
              <Route path="register-book" element={<RegisterBook />} />
              <Route path=":slug/:_id" element={<BookDetails />} />

              {/* <Route path="favorites" element={<Favorites />} /> */}
              {/* ...otras rutas anidadas... */}
            </Route>
          )}
          {/* <Route path='/' element={<Home />} />
            <Route path='/register-book' element={<RegisterBook />} />
            <Route path='/book-detail' element={<BookDetail />} />
            <Route path='/*' element={<Navigate to='/' />} /> */}

          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </>
    );
};