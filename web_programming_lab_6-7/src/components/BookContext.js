import React, { createContext, useState } from 'react';
import { initialBooksData } from '../utils/BooksData';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {

  const [books] = useState(initialBooksData); // State for books

  return (
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};
