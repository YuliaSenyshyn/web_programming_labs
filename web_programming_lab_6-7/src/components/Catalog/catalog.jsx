import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../BooksList/Books.css'; 
import { initialBooksData } from '../../utils/BooksData';
import SortSelect from '../select.js';

const Catalog = () => {
  const [visibleBooks, setVisibleBooks] = useState(3); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleViewMore = () => {
    setVisibleBooks((prev) => prev + 3); 
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredBooks = initialBooksData
    .filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    )
    .slice(0, visibleBooks);

  return (
    <div className="books-container">
      <h2 className="books-title">Каталог книг</h2>
      
      {/* Search and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Пошук книг"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} />
      </div>

      <div className="books-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book">
            <Link to={`/item/${book.id}`} className="book-link">
              <div className="book-image">
                <img src={book.image} alt={book.title} />
              </div>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </Link>
          </div>
        ))}
      </div>
      {visibleBooks < initialBooksData.length && (
        <div className="view-more-container">
          <button className="view-more" onClick={handleViewMore}>
            Переглянути більше
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
