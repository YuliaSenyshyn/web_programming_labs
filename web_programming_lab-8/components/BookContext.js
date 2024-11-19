import React, { createContext, useState, useEffect } from 'react';
import { initialBooksData } from '../utils/BooksData.js';
import {getBooks} from '../api.js'

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooksData); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        console.log("response: ", response);
        setBooks(response); 
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); 

  return (
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};

