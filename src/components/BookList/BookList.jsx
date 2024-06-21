import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getAllBooks} from '../../services/bookService.js';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getAllBooks();
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h1>Books</h1>
      <Link to="/add" className="add-book-link">Add a new book</Link>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
