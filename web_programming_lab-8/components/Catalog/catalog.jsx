// Catalog.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../BooksList/Books.css';
import { BookContext } from '../BookContext.js';
import SortSelect from '../select.js';

const Catalog = () => {
  const { books } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredBooks = books
  .filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedGenre === '' || book.genre.includes(selectedGenre))
  )
  .sort((a, b) =>
    sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );


  const uniqueGenres = [...new Set(books.flatMap((book) => book.genre.split(', ').map((g) => g.trim())))]; 

  return (
    <div className="books-container">
      <h2 className="books-title">Каталог книг</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Пошук книг"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} />

        <select value={selectedGenre} onChange={handleGenreChange} className="genre-select">
          <option value="">Всі жанри</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
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
    </div>
  );
};

export default Catalog;
