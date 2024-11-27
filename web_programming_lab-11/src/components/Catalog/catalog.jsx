import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../BooksList/Books.css';
import SortSelect from '../select.js';
import Loader from '../Loader/Loader'; 

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false); 

  const fetchFilteredBooks = (searchTerm = '', selectedGenre = '', sortOrder = 'asc') => {
    setLoading(true); 
    let url = `http://localhost:9000/books?sortOrder=${sortOrder}`;
    if (searchTerm) url += `&search=${searchTerm}`;
    if (selectedGenre) url += `&genre=${selectedGenre}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setBooks(data.books);
          setLoading(false); 
        }, 2000);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false); 
      });
};

  useEffect(() => {
    fetchFilteredBooks(); 
  }, []);

  const handleSearchClick = () => {
    fetchFilteredBooks(searchTerm.trim(), selectedGenre, sortOrder);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    fetchFilteredBooks(searchTerm.trim(), selectedGenre, order);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    fetchFilteredBooks(searchTerm.trim(), e.target.value, sortOrder);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSortOrder('asc');
    fetchFilteredBooks();
  };

  const uniqueGenres = [...new Set(books.flatMap((book) => book.genre.split(', ').map((g) => g.trim())))];

  return (
    <div className="books-container">
      <h2 className="books-title">Каталог книг</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Пошук книг"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearchClick}>Пошук</button>

        <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} />

        <select value={selectedGenre} onChange={handleGenreChange} className="genre-select">
          <option value="">Всі жанри</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button onClick={handleClearFilters} className="clear-filters-btn">Скинути фільтри</button>
      </div>

      {/* Лоадер відображається під час завантаження */}
      {loading ? (
        <Loader />
      ) : (
        <div className="books-list">
          {books.map((book) => (
            <div key={book.id} className="book">
              <div className="book-image">
                <img src={book.image} alt={book.title} />
              </div>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <Link to={`/item/${book.id}`} className="learn-more-button">
                Дізнатись більше
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
