import React, { createContext, useState, useEffect } from 'react';
import booksData from '../BooksList/BooksList'; // Ваші дані книг

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setBooks(booksData); 
            setLoading(false);
        }, 1000); 
    }, []);

    return (
        <BooksContext.Provider value={{ books, loading }}>
            {children}
        </BooksContext.Provider>
    );
};
