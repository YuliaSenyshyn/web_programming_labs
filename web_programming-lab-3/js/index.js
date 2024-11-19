import { books } from "./books.js";

const sortButton = document.getElementById("sort-btn");
const countButton = document.getElementById("count-btn");
const findButton = document.getElementById("search-btn");
const cancelFindButton = document.getElementById("cancel-search-btn");
const findInput = document.getElementById("search-input");

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
</li>`;

let currentBooks = [...books];

const renderItemsList = (items) => {
    booksContainer.innerHTML = "";
    for (const item of items) {
        addItemToPage(item);
    }
};

let visibleBooks = [...currentBooks]; 

const addItemToPage = ({ id, title, pages, author, price }) => {
    booksContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, title, pages, author, price })
    );
};

renderItemsList(currentBooks);

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
