import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, BookDetails } from '../pages';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book-detail' element={<BookDetails />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    )
};