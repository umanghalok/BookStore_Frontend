import axios from 'axios';
const API_URL = 'https://bookstore-backend-232e.onrender.com/';

const getAllBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

const addBook = async (book) => {
  // console.log(sessionStorage.getItem('accessToken'));
  // console.log(book);
  return await axios.post(`${API_URL}/add`, book,{
    headers: {
        'Authorization': sessionStorage.getItem('accessToken')
    } });
};

const getBookById = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`);
};

const updateBook = async (id, book) => {
  return await axios.put(`${API_URL}/books/${id}/update`, book,{
    headers: {
        'Authorization': sessionStorage.getItem('accessToken')
    } 
  });
};



const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/books/${id}/delete`, {
    headers: {
        'Authorization': sessionStorage.getItem('accessToken')
    } 
  });
};

export { getAllBooks, addBook, getBookById, updateBook, deleteBook };
