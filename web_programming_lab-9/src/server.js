// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {initialBooksData} from '../src/utils/BooksData.js';
let books = initialBooksData;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 9000;

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'src/images')));

app.get('/books', (req, res) => {
    const { limit = 5, search, sortOrder, genre } = req.query;  
    let filteredBooks = [...books];
  
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(searchLower)
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter((book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (sortOrder === 'descPrice') {
      filteredBooks.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'ascPrice') {
      filteredBooks.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'descTitle') {
      filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === 'ascTitle') {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    }

    const limitNumber = parseInt(limit, 10);
    const paginatedBooks = filteredBooks.slice(0, limitNumber);

    res.json({ books: paginatedBooks });
});


app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: `Книга з ID: ${bookId} не знайдена.` });
    }
});

app.post('/books', (req, res) => {
  const { title, description, fullDescription, price, genre, image } = req.body;

  if (!title || !description || !fullDescription || !price || !genre || !image) {
    return res.status(400).json({ message: "Всі поля обов'язкові для заповнення." });
  }

  const newBook = {
    id: books.length + 1,
    title,
    description,
    fullDescription,
    price,
    genre,
    image
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Сервер запущений на http://localhost:${PORT}`);
});

let cart = []; 

app.post('/cart', (req, res) => {
  const { bookId, quantity } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Книга не знайдена.' });
  }

  const cartItem = { ...book, quantity };
  cart.push(cartItem);
  res.status(200).json({ message: 'Книга додана до кошика', cartItem });
});

app.post('/calculate-total', (req, res) => {
  const { bookId, quantity } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Книга не знайдена.' });
  }


  const totalPrice = book.price * quantity;

  res.status(200).json({ totalPrice });
});
app.get('/books', (req, res) => {
  const { limit = 5 } = req.query;
  const limitNumber = parseInt(limit, 10);
  const paginatedBooks = books.slice(0, limitNumber);

  res.json({ books: paginatedBooks });
});

