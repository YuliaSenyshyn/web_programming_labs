import { request } from "express";

// api.js для книг
const BASE_URL = "http://localhost:3000";
const RESOURSE_URL = `${BASE_URL}/books`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        const response = await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error("HTTP ERROR: ", error);
        throw error; 
    }
};

export const getAllBooks = async () => {
    try {
        const rawResponse = await baseRequest({ method: "GET" });
        const data = await rawResponse.json();
        console.log('getAllBooks response:', data); 
        return data;
    } catch (error) {
        console.error("Error in getAllBooks:", error);
        return [];
    }
};

export const postBook = async (book) => {
    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


export const updateBook = async (id, body) => {
    try {
        const response = await baseRequest({ urlPath: `/${id}`, method: "PATCH", body });
        const data = await response.json();
        console.log('updateBook response:', data); 
        return data;
    } catch (error) {
        console.error("Error in updateBook:", error);
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await baseRequest({ urlPath: `/${id}`, method: "DELETE" });
        if (response.status === 204) {
            console.log(`Book with ID: ${id} successfully deleted.`);
        }
    } catch (error) {
        console.error('HTTP DELETE Error: ', error);
    }
};
