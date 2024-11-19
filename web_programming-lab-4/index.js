import { books } from "./books.js"; 

const sortButton = document.getElementById("sort-btn");
const countButton = document.getElementById("count-btn");
const findButton = document.getElementById("search-btn");
const cancelFindButton = document.getElementById("cancel-search-btn");
const findInput = document.getElementById("search-input");
const modalEdit = document.querySelector(".js-edit");
const modalAdd = document.querySelector(".js-add");
const formEdit = document.querySelector(".js-edit-form");``
const formAdd = document.querySelector(".js-add-form");
const addButton = document.getElementById("add-btn");
const closeButtonEdit = modalEdit.querySelector(".close");
const closeButtonAdd = modalAdd.querySelector(".close");

const booksContainer = document.getElementById("books-list");
const resultParagraph = document.querySelector('.result');

const itemTemplate = ({ id, title, pages, author, price }) => `
<li id="${id}" class="book">
    <img src="./reading-book.png" alt="book">
    <div class="book-body">
        <h3 class="book-title">${title}</h3>
        <p class="book-pages">Pages: ${pages}</p>
        <p class="book-author">Author: ${author}</p>
        <p class="book-price">Price: ${price} UAH</p>
    </div>
    <button type="button" class="edit">Edit</button>
</li>`;

let currentBooks = [...books];

const renderItemsList = (items) => {
    booksContainer.innerHTML = "";
    for (const item of items) {
        addItemToPage(item);
    }
};

const addItemToPage = ({ id, title, pages, author, price }) => {
    booksContainer.insertAdjacentHTML("afterbegin", itemTemplate({ id, title, pages, author, price }));
};

renderItemsList(currentBooks);

let visibleBooks = [...currentBooks];

findButton.addEventListener("click", () => {
    const searchTerm = findInput.value.trim().toLowerCase();
    visibleBooks = currentBooks.filter((book) => book.title.toLowerCase().includes(searchTerm));
    renderItemsList(visibleBooks);
});

cancelFindButton.addEventListener("click", () => {
    renderItemsList(currentBooks);
    findInput.value = "";
    visibleBooks = [...currentBooks];
});

sortButton.addEventListener("click", () => {
    const sortedBooks = [...visibleBooks].sort((a, b) => b.price - a.price);
    renderItemsList(sortedBooks);
});

countButton.addEventListener("click", () => {
    const total = visibleBooks.reduce((acc, { price }) => acc + price, 0);
    resultParagraph.textContent = `Total Price: ${total} UAH`;
});

let parentId = 0;

booksContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("edit")) {
        return;
    }
    parentId = event.target.closest("li").id;

    const bookToEdit = currentBooks.find(book => book.id == parentId);
    if (bookToEdit) {
        formEdit.querySelector(".book-name-input").value = bookToEdit.title;
        formEdit.querySelector(".author-input").value = bookToEdit.author;
        formEdit.querySelector(".pages-input").value = bookToEdit.pages;
        formEdit.querySelector(".price-input").value = bookToEdit.price;
    }

    modalEdit.classList.add("show-modal");
});

const closeModal = (modal, form) => {
    modal.classList.remove("show-modal");
    form.reset();
};

modalEdit.addEventListener("click", (event) => {
    if (event.target === event.currentTarget || event.target === closeButtonEdit) {
        closeModal(modalEdit, formEdit);
    }
});

formEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = formEdit.querySelector(".book-name-input").value.trim();
    const newAuthor = formEdit.querySelector(".author-input").value.trim();
    const newPages = Number(formEdit.querySelector(".pages-input").value);
    const newPrice = Number(formEdit.querySelector(".price-input").value);

    if (newPages <= 0 || newPrice <= 0) {
        alert("Кількість сторінок та ціна повинні бути більше 0.");
        return;
    }

    if (currentBooks.some(book => book.title.toLowerCase() === newName.toLowerCase() && book.id != parentId)) {
        alert("Книга з такою назвою вже існує.");
        return;
    }

    for (const book of currentBooks) {
        if (book.id == parentId) {
            book.title = newName;
            book.author = newAuthor;
            book.pages = newPages;
            book.price = newPrice;
            break;
        }
    }

    closeModal(modalEdit, formEdit);
    renderItemsList(currentBooks);
});

const newCard = ({ id, title, pages, author, price }) => {
    currentBooks.push({ id, title, pages, author, price });
    renderItemsList(currentBooks);
};

addButton.addEventListener("click", () => {
    modalAdd.classList.add("show-modal");
});

closeButtonAdd.addEventListener("click", () => {
    closeModal(modalAdd, formAdd);
});

modalAdd.addEventListener("click", (event) => {
    if (event.target === event.currentTarget || event.target === closeButtonAdd) {
        closeModal(modalAdd, formAdd);
    }
});

let nextId = currentBooks.length ? Math.max(...currentBooks.map(book => book.id)) + 1 : 1; 

formAdd.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = formAdd.querySelector(".book-name-input").value.trim();
    const newAuthor = formAdd.querySelector(".author-input").value.trim();
    const newPages = Number(formAdd.querySelector(".pages-input").value);
    const newPrice = Number(formAdd.querySelector(".price-input").value);

    if (newPages <= 0 || newPrice <= 0) {
        alert("Кількість сторінок та ціна повинні бути більше 0.");
        return;
    }

    if (currentBooks.some(book => book.title.toLowerCase() === newName.toLowerCase())) {
        alert("Книга з такою назвою вже існує.");
        return;
    }

    newCard({
        id: nextId++,
        title: newName,
        pages: newPages,
        author: newAuthor,  
        price: newPrice,
    });

    closeModal(modalAdd, formAdd);
}); 

renderItemsList(currentBooks);
