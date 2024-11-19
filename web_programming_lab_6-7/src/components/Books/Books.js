import React from 'react';
import '../BooksList/Books.css'; 

const Book = ({ book }) => {
    return (
        <div className="book"> 
            <div className="book-image">
                <img src={book.image} alt={book.title} />
            </div>
            <h3 className="book-title">{book.title}</h3> 
            <p className="book-description">{book.description}</p> 
        </div>
    );
};

export default Book;