import { getAllBooks, updateBook, postBook, deleteBook } from "./api.js";

const sortButton = document.getElementById("sort-btn");
const countButton = document.getElementById("count-btn");
const findButton = document.getElementById("search-btn");
const cancelFindButton = document.getElementById("cancel-search-btn");
const findInput = document.getElementById("search-input");
const modalEdit = document.querySelector(".js-edit");
const modalAdd = document.querySelector(".js-add");
const formEdit = document.querySelector(".js-edit-form");
const formAdd = document.querySelector(".js-add-form");
const addButton = document.getElementById("add-btn");
const closeButtonEdit = modalEdit.querySelector(".close");
const closeButtonAdd = modalAdd.querySelector(".close");

const booksContainer = document.getElementById("books-list");
const resultParagraph = document.querySelector('.result');
const countParagraph = document.querySelector('.count');

const itemTemplate = ({ id, title, pages, author, price }) => 
`<li id="${id}" class="book">
    <img src="./reading-book.png" alt="book">
    <div class="book-body">
        <h3 class="book-title">${title}</h3>
        <p class="book-pages">Pages: ${pages}</p>
        <p class="book-author">Author: ${author}</p>
        <p class="book-price">Price: ${price} UAH</p>
    </div>
    <button type="button" class="edit">Edit</button>
    <button class="delete">Delete</button>
</li>`;

let currentBooks = [];
let visibleBooks = [];

const renderItemsList = (items) => {
    booksContainer.innerHTML = "";
    items.forEach(addItemToPage);
};

const addItemToPage = (book) => {
    booksContainer.insertAdjacentHTML("beforeend", itemTemplate(book));
};

const refreshAllBooks = async () => {
    console.log('Refreshing all books...');
    try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const { books, totalPrice } = await response.json();
        currentBooks = books;
        renderItemsList(currentBooks);
        visibleBooks = [...currentBooks];
        resultParagraph.textContent = `Total Price: ${totalPrice} UAH`;
    } catch (error) {
        console.error('Error refreshing books:', error);
    }
};

refreshAllBooks();

findButton.addEventListener("click", async () => {
    const searchTerm = findInput.value.trim().toLowerCase();
    try {
        const response = await fetch(`http://localhost:3000/books?search=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const { books, totalPrice } = await response.json();
        visibleBooks = books;
        renderItemsList(visibleBooks);
        resultParagraph.textContent = `Total Price: ${totalPrice} UAH`;
    } catch (error) {
        console.error('Error searching books:', error);
    }
});

cancelFindButton.addEventListener("click", refreshAllBooks);

sortButton.addEventListener("click", async () => {
    const sortDirection = "price_desc";
    const searchTerm = findInput.value.trim().toLowerCase();

    try {
        const response = await fetch(`http://localhost:3000/books?search=${encodeURIComponent(searchTerm)}&sort=${sortDirection}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const { books, totalPrice } = await response.json();
        visibleBooks = books;
        renderItemsList(visibleBooks);

        resultParagraph.textContent = `Total Price: ${totalPrice} UAH`;
    } catch (error) {
        console.error('Error sorting visible books:', error);
    }
});

countButton.addEventListener("click", async () => {
    const searchTerm = findInput.value.trim(); 

    try {
        const response = await fetch(`http://localhost:3000/books?search=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        if (data && data.books && Array.isArray(data.books) && typeof data.totalPrice === 'number') {
            resultParagraph.textContent = `Total Price of Visible Books: ${data.totalPrice} UAH`;
        } else {
            console.error('Received unexpected data format:', data);
            resultParagraph.textContent = 'Received unexpected data format.';
        }
    } catch (error) {
        console.error('Error counting total price of visible books:', error);
        resultParagraph.textContent = 'Error occurred while counting total price.';
    }
});


let parentId = null;

const openModal = (modal) => {
    modal.classList.add("show-modal");
};

const closeModal = (modal, form) => {
    modal.classList.remove("show-modal");
    form.reset();
};

modalEdit.addEventListener("click", (event) => {
    if (event.target === modalEdit || event.target === closeButtonEdit) {
        closeModal(modalEdit, formEdit);
    }
});

booksContainer.addEventListener("click", async (event) => {
    const bookElement = event.target.closest("li.book");

    if (event.target.classList.contains("edit")) {
        openModal(modalEdit);
        parentId = bookElement.id;
    }

    if (event.target.classList.contains("delete")) {
        try {
            await deleteBook(bookElement.id);
            refreshAllBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
});

formEdit.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log('Submitting edit form for book ID:', parentId);

    const updatedBook = {
        title: formEdit.querySelector(".book-name-input").value.trim(),
        author: formEdit.querySelector(".author-input").value.trim(),
        pages: Number(formEdit.querySelector(".pages-input").value),
        price: Number(formEdit.querySelector(".price-input").value),
    };

    try {
        await updateBook(parentId, updatedBook);
        await refreshAllBooks();
    } catch (error) {
        console.error('Error updating book:', error);
    }

    closeModal(modalEdit, formEdit);  
});



const addNewBook = async ({ title, author, pages, price }) => {
    const bookExists = currentBooks.some(book => book.title.toLowerCase() === title.toLowerCase());

    if (bookExists) {
        alert("Книжка з такою назвою вже існує!");
        return;
    }

    try {
        await postBook({ title, author, pages, price });  
        await refreshAllBooks();  
    } catch (error) {
        console.error("Error adding new book: ", error);
    }
};


addButton.addEventListener("click", () => {
    console.log('Add button clicked');
    openModal(modalAdd);
});

closeButtonAdd.addEventListener("click", () => {
    closeModal(modalAdd, formAdd);
});

modalAdd.addEventListener("click", (event) => {
    if (event.target === modalAdd || event.target === closeButtonAdd) {
        closeModal(modalAdd, formAdd);
    }
});

formAdd.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log('Submitting add form');

    const newBook = {
        title: formAdd.querySelector(".book-name-input").value.trim(),
        author: formAdd.querySelector(".author-input").value.trim(),
        pages: Number(formAdd.querySelector(".pages-input").value),
        price: Number(formAdd.querySelector(".price-input").value),
    };

    if (newBook.pages <= 0 || newBook.price <= 0) {
        alert("Кількість сторінок та ціна повинні бути більше 0.");
        return;
    }

    await addNewBook(newBook);
    closeModal(modalAdd, formAdd);
});
