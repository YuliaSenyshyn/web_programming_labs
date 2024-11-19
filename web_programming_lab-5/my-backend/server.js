const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let books =[
        {
          id: 1,
          title: 'Слово про будинок Слово',
          description: 'Ця книжка розкриває особисте життя українських письменників...',
          fullDescription: 'Ця книжка розкриває особисте життя українських письменників, їх творчість, боротьбу за виживання в умовах суспільних змін. Вона пропонує унікальний погляд на інтимність і публічність літературного процесу, розкриваючи глибокі переживання авторів.',
          price: 150.00,
          genre: 'Біографія',
        },
        {
          id: 2,
          title: 'Кайдашева сім\'я',
          description: 'Роман Івана Нечуя-Левицького, що зображує життя...',
          fullDescription: 'Роман Івана Нечуя-Левицького "Кайдашева сім\'я" зображує життя селянської родини на фоні соціальних та економічних змін. Через персонажів і їх стосунки автор досліджує проблеми родинних конфліктів, звичаїв та моральних цінностей.',
          price: 120.00,
          genre: 'Реалізм',
        },
        {
          id: 3,
          title: 'Тигролови',
          description: 'Роман Івана Багряного, що розповідає про боротьбу...',
          fullDescription: 'Роман Івана Багряного "Тигролови" є епічним твором, що розповідає про боротьбу українських повстанців проти радянської влади. В центрі сюжету - непрості стосунки людини і природи, а також теми свободи та гідності.',
          price: 200.00,
          genre: 'Історичний роман',
        },
        {
          id: 4,
          title: 'Кафе на краю світу',
          description: 'Мотивуюча книга Джона Стрелекі про сенс життя і пошуки щастя.',
          fullDescription: 'У "Кафе на краю світу" Джон Стрелекі розповідає про зустріч із трьома важливими запитаннями, які можуть змінити життя. Книга пропонує читачеві задуматися про власні цілі та сенс існування, мотивуючи його шукати справжнє щастя.',
          price: 180.00,
          genre: 'Саморозвиток',
        },
        {
          id: 5,
          title: 'Іди туди, де страшно',
          description: 'Книга психолога і коуча Сюзанни Немблін, яка допомагає подолати внутрішні страхи та вийти із зони комфорту.',
          fullDescription: 'Сюзанна Немблін у "Іди туди, де страшно" пропонує стратегії для подолання внутрішніх страхів і сумнівів. Книга містить практичні поради та особисті історії, які надихають читача вийти за межі звичного і досягти успіху в житті.',
          price: 160.00,
          genre: 'Саморозвиток',
        },
      ];


app.get('/books', (req, res) => {
    const { search, sort } = req.query;
    let filteredBooks = [...books];

    if (search) {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sort === 'price_desc') {
        filteredBooks.sort((a, b) => b.price - a.price);
    } else if (sort === 'price_asc') {
        filteredBooks.sort((a, b) => a.price - b.price);
    }

    const totalPrice = filteredBooks.reduce((sum, book) => sum + book.price, 0);  // Підрахунок загальної ціни
    res.json({ books: filteredBooks, totalPrice });
});

// Отримання книги за ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send(`Book with ID: ${bookId} not found.`);
    }
});

// app.get('/books', (req, res) => {
//     let filteredBooks = [...books];


//     const totalVisiblePrice = filteredBooks.reduce((total, book) => total + book.price, 0);

//     if (isNaN(totalVisiblePrice)) {
//         return res.status(500).json({ error: "Calculation error" });
//     }

//     res.json({ totalVisiblePrice });
// });



// Додавання нової книги
app.post("/books", (req, res) => {
    const { title, pages, author, price } = req.body;

    if (!title || !pages || !author || !price) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const newId = Math.max(...books.map(book => book.id)) + 1;

    const newBook = { id: newId, title, pages, author, price };
    books.push(newBook);

    res.status(201).json(newBook);
});

app.patch("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { title, pages, author, price } = req.body;
    const book = books.find(p => p.id === bookId);

    if (book) {
        book.title = title || book.title;
        book.pages = pages || book.pages;
        book.author = author || book.author;
        book.price = price || book.price;
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send(`Book with ID: ${bookId} not found.`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/books`);
});
