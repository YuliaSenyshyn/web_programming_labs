import axios from 'axios'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000/api';


// Функція для отримання списку книг з фільтрацією
export const getBooks = (search = '', genre = '', sortOrder = '') => {
    const params = new URLSearchParams();

    // Додаємо параметри до запиту, якщо вони є
    if (search) params.append('search', search);
    if (genre) params.append('genre', genre);
    if (sortOrder) params.append('sortOrder', sortOrder);

    return axios.get(`${API_URL}/books?${params.toString()}`)

        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching books:', error);
            throw error;
        });
};

// Функція для отримання книги за її ID
export const getBookById = (id) => {
    return axios.get(`${API_URL}/books/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching book with ID ${id}:`, error);
            throw error;
        });
};

