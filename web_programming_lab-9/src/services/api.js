import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

export const getBooks = (search = '', genre = '', sortOrder = '') => {
    const params = new URLSearchParams();

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

export const getBookById = (id) => {
    return axios.get(`${API_URL}/books/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching book with ID ${id}:`, error);
            throw error;
        });
};
