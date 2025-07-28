import React from 'react';
import { BookCard, QuotesSection, ReadingSection } from '../components';
import { Navbar, Sidebar } from '../layouts';
import { books } from '../data';

export const Home = () => {

    
    return (
        <main className="main-content">
            <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                <div className='main-content'>
                    <h2 className="library-title">Mi Biblioteca</h2>
                    <div className='content-row'>
                        <QuotesSection />
                        <ReadingSection />
                    </div>
                    
                    
                    <div className="book-grid">
                        {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
};